/* =========================================================
   CWS CODELAB
   AUTHENTICATION GUARD

   Protects authenticated student pages.

   Responsibilities:
   - Check Firebase authentication state
   - Redirect unauthenticated users
   - Load Firestore student profile
   - Populate dashboard user information
   - Create missing student profile when appropriate
   - Handle Firebase sign out
   - Control dashboard loading screen

   Firebase Project:
   cws-codelab
========================================================= */


/* =========================================================
   FIREBASE CONFIG
========================================================= */

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   FIREBASE AUTH
========================================================= */

import {

    onAuthStateChanged,

    signOut

} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


/* =========================================================
   FIRESTORE
========================================================= */

import {

    doc,

    getDoc,

    setDoc,

    serverTimestamp

} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


/* =========================================================
   PAGE URLS
========================================================= */

const LOGIN_URL =
    new URL(
        "../pages/login.html",
        import.meta.url
    ).href;


const DASHBOARD_URL =
    new URL(
        "../student/dashboard.html",
        import.meta.url
    ).href;


/* =========================================================
   STATE
========================================================= */

let authCheckComplete =
    false;


let currentUser =
    null;


let currentProfile =
    null;


/* =========================================================
   START AUTH CHECK
========================================================= */

setLoadingState(
    true
);


/* =========================================================
   AUTH STATE OBSERVER
========================================================= */

const unsubscribe =
    onAuthStateChanged(
        auth,

        async user => {


            /* =================================================
               NOT AUTHENTICATED
            ================================================= */

            if (!user) {


                console.log(
                    "CWS CodeLab: No authenticated user."
                );


                currentUser =
                    null;


                currentProfile =
                    null;


                redirectToLogin();


                return;

            }


            /* =================================================
               AUTHENTICATED
            ================================================= */

            console.log(
                "CWS CodeLab: Authenticated user detected."
            );


            currentUser =
                user;


            try {


                /* =============================================
                   LOAD FIRESTORE PROFILE
                ============================================== */

                const profile =
                    await loadStudentProfile(
                        user
                    );


                currentProfile =
                    profile;


                /* =============================================
                   WAIT FOR DASHBOARD API
                ============================================== */

                const dashboard =
                    await waitForDashboardApi();


                /* =============================================
                   POPULATE DASHBOARD
                ============================================== */

                dashboard.setStudent(
                    {

                        uid:
                            user.uid,

                        displayName:
                            profile.displayName ||
                            user.displayName ||
                            deriveNameFromEmail(
                                user.email
                            ) ||
                            "Student",

                        email:
                            profile.email ||
                            user.email ||
                            "",

                        photoURL:
                            profile.photoURL ||
                            user.photoURL ||
                            "",

                        plan:
                            formatPlan(
                                profile.plan ||
                                "free"
                            ),

                        role:
                            profile.role ||
                            "student",

                        accountStatus:
                            profile.accountStatus ||
                            "active",

                        createdAt:
                            convertFirestoreDate(
                                profile.createdAt
                            )

                    }
                );


                /* =============================================
                   STATS

                   These values are currently placeholders until
                   progress/enrolment collections are introduced.
                ============================================== */

                dashboard.setStats(
                    {

                        courses:
                            safeNumber(
                                profile.enrolledCourseCount
                            ),

                        progress:
                            safeNumber(
                                profile.overallProgress
                            ),

                        projects:
                            safeNumber(
                                profile.completedProjectCount
                            ),

                        certificates:
                            safeNumber(
                                profile.certificateCount
                            )

                    }
                );


                dashboard.clearMessage();


                authCheckComplete =
                    true;


                setLoadingState(
                    false
                );


                console.log(
                    "CWS CodeLab: Dashboard authentication complete."
                );


            } catch (error) {


                console.error(
                    "CWS CodeLab dashboard authentication error:",
                    error
                );


                /*
                 * The Firebase account exists, so don't
                 * immediately log the learner out just because
                 * a profile read encountered an issue.
                 */

                try {


                    const dashboard =
                        await waitForDashboardApi();


                    dashboard.setStudent(
                        {

                            uid:
                                user.uid,

                            displayName:
                                user.displayName ||
                                deriveNameFromEmail(
                                    user.email
                                ) ||
                                "Student",

                            email:
                                user.email ||
                                "",

                            photoURL:
                                user.photoURL ||
                                "",

                            plan:
                                "Free",

                            role:
                                "student"

                        }
                    );


                    dashboard.showMessage(
                        getProfileErrorMessage(
                            error
                        ),
                        "error"
                    );


                } catch (
                    dashboardError
                ) {


                    console.error(
                        "CWS CodeLab could not initialize dashboard UI:",
                        dashboardError
                    );


                }


                authCheckComplete =
                    true;


                setLoadingState(
                    false
                );


            }


        },

        error => {


            console.error(
                "CWS CodeLab authentication observer error:",
                error
            );


            redirectToLogin();


        }
    );


/* =========================================================
   LOAD STUDENT PROFILE
========================================================= */

async function loadStudentProfile(
    user
) {


    if (!user?.uid) {


        throw new Error(
            "Authenticated user does not have a Firebase UID."
        );

    }


    const userReference =
        doc(
            db,
            "users",
            user.uid
        );


    const snapshot =
        await getDoc(
            userReference
        );


    /* =====================================================
       PROFILE EXISTS
    ===================================================== */

    if (
        snapshot.exists()
    ) {


        return {

            id:
                snapshot.id,

            ...snapshot.data()

        };

    }


    /* =====================================================
       PROFILE MISSING

       This can happen if:
       - Account existed before Firestore setup
       - Profile creation previously failed
       - OAuth user was created before profile integration

       Create a safe default student profile.
    ===================================================== */

    console.warn(
        "CWS CodeLab: Student profile missing. Creating one."
    );


    const displayName =
        user.displayName ||
        deriveNameFromEmail(
            user.email
        ) ||
        "Student";


    const provider =
        getUserProvider(
            user
        );


    const profile = {

        uid:
            user.uid,

        displayName,

        email:
            user.email ||
            "",

        photoURL:
            user.photoURL ||
            "",

        role:
            "student",

        plan:
            "free",

        accountStatus:
            "active",

        lastSignInProvider:
            provider,

        createdAt:
            serverTimestamp(),

        updatedAt:
            serverTimestamp(),

        lastLoginAt:
            serverTimestamp()

    };


    await setDoc(
        userReference,
        profile
    );


    /*
     * serverTimestamp() is resolved by Firestore after
     * the write. Return usable dashboard information now.
     */

    return {

        ...profile,

        createdAt:
            new Date()

    };


}


/* =========================================================
   SIGN OUT
========================================================= */

document.addEventListener(
    "click",
    async event => {


        const button =
            event.target.closest(
                "#sign-out-button"
            );


        if (!button) {

            return;

        }


        /*
         * dashboard.js currently contains a temporary
         * sign-out message handler.

         * Stop that placeholder listener and perform
         * real Firebase sign out instead.
         */

        event.preventDefault();

        event.stopImmediatePropagation();


        const originalHTML =
            button.innerHTML;


        button.disabled =
            true;


        button.setAttribute(
            "aria-busy",
            "true"
        );


        button.textContent =
            "Signing out...";


        try {


            await signOut(
                auth
            );


            /*
             * onAuthStateChanged() will also detect the logout,
             * but redirect immediately for responsive UX.
             */

            window.location.replace(
                LOGIN_URL
            );


        } catch (error) {


            console.error(
                "CWS CodeLab sign-out error:",
                error
            );


            button.disabled =
                false;


            button.setAttribute(
                "aria-busy",
                "false"
            );


            button.innerHTML =
                originalHTML;


            try {


                const dashboard =
                    await waitForDashboardApi();


                dashboard.showMessage(
                    "CodeLab could not sign you out. Please try again.",
                    "error"
                );


            } catch (
                dashboardError
            ) {


                console.error(
                    dashboardError
                );


            }


        }


    },
    true
);


/* =========================================================
   WAIT FOR DASHBOARD API

   dashboard.js creates:

   window.CWSDashboard

   Since module and defer execution order can differ slightly,
   this prevents race conditions.
========================================================= */

function waitForDashboardApi(
    timeout = 5000
) {


    return new Promise(
        (
            resolve,
            reject
        ) => {


            /* =================================================
               ALREADY READY
            ================================================= */

            if (
                window.CWSDashboard
            ) {


                resolve(
                    window.CWSDashboard
                );


                return;

            }


            const startedAt =
                Date.now();


            const interval =
                window.setInterval(
                    () => {


                        if (
                            window.CWSDashboard
                        ) {


                            window.clearInterval(
                                interval
                            );


                            resolve(
                                window.CWSDashboard
                            );


                            return;

                        }


                        if (
                            Date.now() -
                            startedAt >=
                            timeout
                        ) {


                            window.clearInterval(
                                interval
                            );


                            reject(
                                new Error(
                                    "Dashboard API did not initialize."
                                )
                            );


                        }


                    },
                    50
                );


        }
    );


}


/* =========================================================
   LOADING
========================================================= */

function setLoadingState(
    loading
) {


    const loadingElement =
        document.getElementById(
            "dashboard-loading"
        );


    /*
     * The module may execute before the DOM element exists.
     */

    if (!loadingElement) {


        if (
            document.readyState ===
            "loading"
        ) {


            document.addEventListener(
                "DOMContentLoaded",
                () => {


                    setLoadingState(
                        loading
                    );


                },
                {
                    once:
                        true
                }
            );


        }


        return;

    }


    loadingElement.hidden =
        !loading;


}


/* =========================================================
   LOGIN REDIRECT
========================================================= */

function redirectToLogin() {


    if (
        isLoginPage()
    ) {

        return;

    }


    setLoadingState(
        true
    );


    window.location.replace(
        LOGIN_URL
    );


}


/* =========================================================
   CHECK CURRENT PAGE
========================================================= */

function isLoginPage() {


    return window.location
        .pathname
        .toLowerCase()
        .endsWith(
            "/pages/login.html"
        );


}


/* =========================================================
   FIRESTORE TIMESTAMP
========================================================= */

function convertFirestoreDate(
    value
) {


    if (!value) {

        return null;

    }


    /*
     * Firestore Timestamp
     */

    if (
        typeof value.toDate ===
        "function"
    ) {


        return value.toDate();

    }


    /*
     * JavaScript Date
     */

    if (
        value instanceof Date
    ) {

        return value;

    }


    /*
     * Date string / timestamp
     */

    const date =
        new Date(
            value
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return null;

    }


    return date;


}


/* =========================================================
   PROVIDER
========================================================= */

function getUserProvider(
    user
) {


    const providerData =
        Array.isArray(
            user?.providerData
        )

            ? user.providerData

            : [];


    if (
        providerData.length === 0
    ) {

        return "unknown";

    }


    const providerId =
        String(
            providerData[0]
                ?.providerId ||
            ""
        )
            .toLowerCase();


    if (
        providerId.includes(
            "google"
        )
    ) {

        return "google";

    }


    if (
        providerId.includes(
            "github"
        )
    ) {

        return "github";

    }


    if (
        providerId.includes(
            "apple"
        )
    ) {

        return "apple";

    }


    if (
        providerId.includes(
            "password"
        )
    ) {

        return "password";

    }


    return providerId ||
        "unknown";


}


/* =========================================================
   NAME FROM EMAIL
========================================================= */

function deriveNameFromEmail(
    email
) {


    if (!email) {

        return "";

    }


    const localPart =
        String(
            email
        )
            .split("@")[0]
            .replace(
                /[._-]+/g,
                " "
            )
            .trim();


    return localPart
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


/* =========================================================
   PLAN
========================================================= */

function formatPlan(
    plan
) {


    const value =
        String(
            plan ||
            "free"
        )
            .trim();


    if (!value) {

        return "Free";

    }


    return (
        value.charAt(0)
            .toUpperCase() +
        value.slice(1)
            .toLowerCase()
    );


}


/* =========================================================
   SAFE NUMBER
========================================================= */

function safeNumber(
    value
) {


    const number =
        Number(
            value
        );


    if (
        !Number.isFinite(
            number
        )
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.round(
            number
        )
    );


}


/* =========================================================
   PROFILE ERROR MESSAGE
========================================================= */

function getProfileErrorMessage(
    error
) {


    const code =
        error?.code ||
        "";


    if (
        code ===
        "permission-denied" ||
        code ===
        "firestore/permission-denied"
    ) {


        return "You are signed in, but CodeLab could not load your student profile. Check the Firestore security rules.";

    }


    if (
        code ===
        "unavailable" ||
        code ===
        "firestore/unavailable"
    ) {


        return "You are signed in, but the CodeLab database is temporarily unavailable.";

    }


    return "You are signed in, but CodeLab could not fully load your student profile.";


}


/* =========================================================
   PUBLIC AUTH GUARD API
========================================================= */

window.CWSAuthGuard = {


    getUser() {

        return currentUser;

    },


    getProfile() {

        return currentProfile;

    },


    isReady() {

        return authCheckComplete;

    },


    async signOut() {

        await signOut(
            auth
        );

    }


};


/* =========================================================
   CLEANUP
========================================================= */

window.addEventListener(
    "pagehide",
    () => {


        if (
            typeof unsubscribe ===
            "function"
        ) {


            unsubscribe();

        }


    }
);


/* =========================================================
   INITIALIZATION
========================================================= */

console.log(
    "CWS CodeLab authentication guard loaded."
);
