/* =========================================================
   CWS CODELAB
   FIREBASE AUTHENTICATION

   Handles:
   - Email/password registration
   - Email/password login
   - Google login
   - GitHub login
   - Apple login
   - Password reset
   - Authentication persistence
   - Firebase user profile
   - Firestore student profile
   - Authentication errors
   - Dashboard redirects

   Firebase Project:
   cws-codelab
========================================================= */


/* =========================================================
   FIREBASE CORE
========================================================= */

import {
    auth,
    db
} from "./firebase-config.js";


/* =========================================================
   FIREBASE AUTHENTICATION
========================================================= */

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signInWithPopup,

    GoogleAuthProvider,

    GithubAuthProvider,

    OAuthProvider,

    updateProfile,

    sendPasswordResetEmail,

    setPersistence,

    browserLocalPersistence,

    browserSessionPersistence

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
   APPLICATION URLS

   import.meta.url points to:
   /CWS-CodeLab/js/auth.js

   This lets these URLs continue working even while the
   project is hosted inside the GitHub Pages repository path.
========================================================= */

const DASHBOARD_URL =
    new URL(
        "../student/dashboard.html",
        import.meta.url
    ).href;


const LOGIN_URL =
    new URL(
        "../pages/login.html",
        import.meta.url
    ).href;


/* =========================================================
   FIREBASE AUTH LANGUAGE
========================================================= */

try {

    auth.useDeviceLanguage();

} catch (error) {

    console.warn(
        "CWS CodeLab: Could not apply browser language.",
        error
    );

}


/* =========================================================
   INITIALIZE AUTH PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           PAGE ELEMENTS
        ===================================================== */

        const registerForm =
            document.getElementById(
                "register-form"
            );


        const loginForm =
            document.getElementById(
                "login-form"
            );


        const forgotForm =
            document.getElementById(
                "forgot-password-form"
            );


        const socialButtons =
            document.querySelectorAll(
                "[data-auth-provider]"
            );


        /* =====================================================
           REGISTER
        ===================================================== */

        if (registerForm) {

            initialiseFirebaseRegistration(
                registerForm
            );

        }


        /* =====================================================
           LOGIN
        ===================================================== */

        if (loginForm) {

            initialiseFirebaseLogin(
                loginForm
            );

        }


        /* =====================================================
           PASSWORD RESET
        ===================================================== */

        if (forgotForm) {

            initialiseFirebasePasswordReset(
                forgotForm
            );

        }


        /* =====================================================
           SOCIAL LOGIN
        ===================================================== */

        if (
            socialButtons.length > 0
        ) {

            initialiseSocialLogin(
                socialButtons
            );

        }


        console.log(
            "CWS CodeLab Firebase authentication initialized."
        );


    }
);


/* =========================================================
   REGISTRATION
========================================================= */

function initialiseFirebaseRegistration(
    form
) {


    /*
     * Capture mode is intentional.
     *
     * auth-ui.js currently has temporary frontend-only
     * submit handling.
     *
     * This Firebase handler runs first and stops that old
     * placeholder handler from also processing the form.
     */

    form.addEventListener(
        "submit",
        async event => {


            event.preventDefault();

            event.stopImmediatePropagation();


            clearFormErrors(
                form
            );


            hideMessage(
                "register-message"
            );


            /* =================================================
               ELEMENTS
            ================================================= */

            const nameInput =
                document.getElementById(
                    "full-name"
                );


            const emailInput =
                document.getElementById(
                    "email"
                );


            const passwordInput =
                document.getElementById(
                    "password"
                );


            const confirmInput =
                document.getElementById(
                    "confirm-password"
                );


            const termsInput =
                document.getElementById(
                    "terms"
                );


            const submitButton =
                document.getElementById(
                    "register-button"
                );


            /* =================================================
               VALUES
            ================================================= */

            const fullName =
                normaliseName(
                    nameInput?.value
                );


            const email =
                normaliseEmail(
                    emailInput?.value
                );


            const password =
                passwordInput?.value ||
                "";


            const confirmPassword =
                confirmInput?.value ||
                "";


            /* =================================================
               VALIDATE
            ================================================= */

            let valid =
                true;


            /* NAME */

            if (
                fullName.length < 2
            ) {


                showFieldError(
                    nameInput,
                    "full-name-error",
                    "Please enter your full name."
                );


                valid =
                    false;

            }


            /* EMAIL */

            if (
                !isValidEmail(
                    email
                )
            ) {


                showFieldError(
                    emailInput,
                    "email-error",
                    "Enter a valid email address."
                );


                valid =
                    false;

            }


            /* PASSWORD */

            if (
                !isStrongPassword(
                    password
                )
            ) {


                showFieldError(
                    passwordInput,
                    "password-error",
                    "Use at least 8 characters with uppercase, lowercase and a number."
                );


                valid =
                    false;

            }


            /* CONFIRM PASSWORD */

            if (
                !confirmPassword ||
                confirmPassword !==
                    password
            ) {


                showFieldError(
                    confirmInput,
                    "confirm-password-error",
                    "Passwords do not match."
                );


                valid =
                    false;

            }


            /* TERMS */

            if (
                !termsInput?.checked
            ) {


                setText(
                    "terms-error",
                    "You must accept the Terms and Privacy Policy."
                );


                valid =
                    false;

            }


            /* =================================================
               STOP IF INVALID
            ================================================= */

            if (!valid) {


                showMessage(
                    "register-message",
                    "Please correct the highlighted fields.",
                    "error"
                );


                focusFirstInvalidField(
                    form
                );


                return;

            }


            /* =================================================
               CREATE ACCOUNT
            ================================================= */

            setButtonLoading(
                submitButton,
                true,
                "Creating account..."
            );


            try {


                /*
                 * Keep a newly-created CodeLab account
                 * signed in between browser sessions.
                 */

                await setPersistence(
                    auth,
                    browserLocalPersistence
                );


                /* =============================================
                   FIREBASE AUTH ACCOUNT
                ============================================== */

                const credential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    credential.user;


                console.log(
                    "CWS CodeLab: Firebase user created."
                );


                /* =============================================
                   FIREBASE DISPLAY NAME
                ============================================== */

                await updateProfile(
                    user,
                    {

                        displayName:
                            fullName

                    }
                );


                /* =============================================
                   FIRESTORE STUDENT PROFILE
                ============================================== */

                try {


                    await createStudentProfile(
                        user,
                        {

                            displayName:
                                fullName,

                            provider:
                                "password"

                        }
                    );


                } catch (profileError) {


                    console.error(
                        "CWS CodeLab: Authentication account was created, but Firestore profile creation failed.",
                        profileError
                    );


                    showMessage(
                        "register-message",
                        "Your account was created, but CodeLab could not finish setting up your student profile. Please sign in again after checking the Firestore configuration.",
                        "error"
                    );


                    return;

                }


                /* =============================================
                   SUCCESS
                ============================================== */

                showMessage(
                    "register-message",
                    "Account created successfully. Opening your student dashboard...",
                    "success"
                );


                redirectToDashboard();


            } catch (error) {


                console.error(
                    "CWS CodeLab registration error:",
                    error
                );


                showMessage(
                    "register-message",
                    getFriendlyAuthError(
                        error
                    ),
                    "error"
                );


            } finally {


                setButtonLoading(
                    submitButton,
                    false
                );


            }


        },
        true
    );


}


/* =========================================================
   EMAIL / PASSWORD LOGIN
========================================================= */

function initialiseFirebaseLogin(
    form
) {


    form.addEventListener(
        "submit",
        async event => {


            event.preventDefault();

            event.stopImmediatePropagation();


            clearFormErrors(
                form
            );


            hideMessage(
                "login-message"
            );


            /* =================================================
               ELEMENTS
            ================================================= */

            const emailInput =
                document.getElementById(
                    "email"
                );


            const passwordInput =
                document.getElementById(
                    "password"
                );


            const rememberInput =
                document.getElementById(
                    "remember-me"
                );


            const submitButton =
                document.getElementById(
                    "login-button"
                );


            /* =================================================
               VALUES
            ================================================= */

            const email =
                normaliseEmail(
                    emailInput?.value
                );


            const password =
                passwordInput?.value ||
                "";


            /* =================================================
               VALIDATION
            ================================================= */

            let valid =
                true;


            if (
                !isValidEmail(
                    email
                )
            ) {


                showFieldError(
                    emailInput,
                    "email-error",
                    "Enter a valid email address."
                );


                valid =
                    false;

            }


            if (!password) {


                showFieldError(
                    passwordInput,
                    "password-error",
                    "Enter your password."
                );


                valid =
                    false;

            }


            if (!valid) {


                showMessage(
                    "login-message",
                    "Please enter your account details.",
                    "error"
                );


                focusFirstInvalidField(
                    form
                );


                return;

            }


            /* =================================================
               LOGIN
            ================================================= */

            setButtonLoading(
                submitButton,
                true,
                "Signing in..."
            );


            try {


                /* =============================================
                   SESSION PERSISTENCE

                   Checked:
                   stay signed in after browser restart.

                   Unchecked:
                   session only.
                ============================================== */

                await setAuthPersistence(
                    Boolean(
                        rememberInput?.checked
                    )
                );


                /* =============================================
                   FIREBASE LOGIN
                ============================================== */

                const credential =
                    await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    credential.user;


                /* =============================================
                   ENSURE FIRESTORE PROFILE
                ============================================== */

                await ensureStudentProfile(
                    user,
                    "password"
                );


                /* =============================================
                   SUCCESS
                ============================================== */

                showMessage(
                    "login-message",
                    "Sign in successful. Opening your dashboard...",
                    "success"
                );


                redirectToDashboard();


            } catch (error) {


                console.error(
                    "CWS CodeLab login error:",
                    error
                );


                showMessage(
                    "login-message",
                    getFriendlyAuthError(
                        error
                    ),
                    "error"
                );


            } finally {


                setButtonLoading(
                    submitButton,
                    false
                );


            }


        },
        true
    );


}


/* =========================================================
   SOCIAL LOGIN
========================================================= */

function initialiseSocialLogin(
    buttons
) {


    buttons.forEach(
        button => {


            /*
             * Capture mode prevents the temporary social
             * login handler in auth-ui.js from also running.
             */

            button.addEventListener(
                "click",
                async event => {


                    event.preventDefault();

                    event.stopImmediatePropagation();


                    const providerName =
                        String(
                            button.dataset
                                .authProvider ||
                            ""
                        )
                            .trim()
                            .toLowerCase();


                    if (!providerName) {

                        return;

                    }


                    await handleSocialLogin(
                        providerName,
                        button
                    );


                },
                true
            );


        }
    );


}


/* =========================================================
   HANDLE SOCIAL LOGIN
========================================================= */

async function handleSocialLogin(
    providerName,
    button
) {


    hideMessage(
        "login-message"
    );


    const provider =
        createOAuthProvider(
            providerName
        );


    if (!provider) {


        showMessage(
            "login-message",
            "This sign-in provider is not supported.",
            "error"
        );


        return;

    }


    const readableProvider =
        getProviderDisplayName(
            providerName
        );


    const rememberInput =
        document.getElementById(
            "remember-me"
        );


    setButtonLoading(
        button,
        true,
        `Opening ${readableProvider}...`
    );


    try {


        /* =================================================
           PERSISTENCE
        ================================================= */

        await setAuthPersistence(
            Boolean(
                rememberInput?.checked
            )
        );


        /* =================================================
           OAUTH POPUP
        ================================================= */

        const credential =
            await signInWithPopup(
                auth,
                provider
            );


        const user =
            credential.user;


        /* =================================================
           FIRESTORE PROFILE
        ================================================= */

        await ensureStudentProfile(
            user,
            providerName
        );


        /* =================================================
           SUCCESS
        ================================================= */

        showMessage(
            "login-message",
            `${readableProvider} sign in successful. Opening your dashboard...`,
            "success"
        );


        redirectToDashboard();


    } catch (error) {


        console.error(
            `CWS CodeLab ${readableProvider} authentication error:`,
            error
        );


        const informationalErrors =
            [
                "auth/popup-closed-by-user",
                "auth/cancelled-popup-request"
            ];


        const messageType =
            informationalErrors.includes(
                error?.code
            )

                ? "info"

                : "error";


        showMessage(
            "login-message",
            getFriendlyAuthError(
                error
            ),
            messageType
        );


    } finally {


        setButtonLoading(
            button,
            false
        );


    }


}


/* =========================================================
   CREATE OAUTH PROVIDER
========================================================= */

function createOAuthProvider(
    providerName
) {


    /* =====================================================
       GOOGLE
    ===================================================== */

    if (
        providerName ===
        "google"
    ) {


        const provider =
            new GoogleAuthProvider();


        /*
         * Give the learner a chance to choose
         * between Google accounts.
         */

        provider.setCustomParameters(
            {

                prompt:
                    "select_account"

            }
        );


        return provider;

    }


    /* =====================================================
       GITHUB
    ===================================================== */

    if (
        providerName ===
        "github"
    ) {


        return new GithubAuthProvider();

    }


    /* =====================================================
       APPLE
    ===================================================== */

    if (
        providerName ===
        "apple"
    ) {


        const provider =
            new OAuthProvider(
                "apple.com"
            );


        provider.addScope(
            "email"
        );


        provider.addScope(
            "name"
        );


        return provider;

    }


    return null;


}


/* =========================================================
   PASSWORD RESET
========================================================= */

function initialiseFirebasePasswordReset(
    form
) {


    form.addEventListener(
        "submit",
        async event => {


            event.preventDefault();

            event.stopImmediatePropagation();


            clearFormErrors(
                form
            );


            hideMessage(
                "forgot-message"
            );


            const emailInput =
                document.getElementById(
                    "reset-email"
                );


            const submitButton =
                form.querySelector(
                    'button[type="submit"]'
                );


            const email =
                normaliseEmail(
                    emailInput?.value
                );


            /* =================================================
               VALIDATION
            ================================================= */

            if (
                !isValidEmail(
                    email
                )
            ) {


                showFieldError(
                    emailInput,
                    "reset-email-error",
                    "Enter a valid email address."
                );


                showMessage(
                    "forgot-message",
                    "Please enter a valid email address.",
                    "error"
                );


                emailInput?.focus();


                return;

            }


            /* =================================================
               SEND RESET
            ================================================= */

            setButtonLoading(
                submitButton,
                true,
                "Sending reset email..."
            );


            try {


                await sendPasswordResetEmail(
                    auth,
                    email
                );


                /*
                 * Generic wording is deliberate.
                 * It avoids unnecessarily revealing whether
                 * a particular email address has an account.
                 */

                showMessage(
                    "forgot-message",
                    "If a CodeLab account exists for that email address, password-reset instructions have been sent.",
                    "success"
                );


                form.reset();


            } catch (error) {


                console.error(
                    "CWS CodeLab password reset error:",
                    error
                );


                showMessage(
                    "forgot-message",
                    getFriendlyAuthError(
                        error
                    ),
                    "error"
                );


            } finally {


                setButtonLoading(
                    submitButton,
                    false
                );


            }


        },
        true
    );


}


/* =========================================================
   CREATE NEW STUDENT FIRESTORE PROFILE
========================================================= */

async function createStudentProfile(
    user,
    options = {}
) {


    if (!user?.uid) {


        throw new Error(
            "Cannot create student profile without a Firebase UID."
        );

    }


    const displayName =
        normaliseName(
            options.displayName ||
            user.displayName ||
            deriveNameFromEmail(
                user.email
            ) ||
            "Student"
        );


    const provider =
        normaliseProviderName(
            options.provider ||
            getFirebaseUserProvider(
                user
            )
        );


    const userReference =
        doc(
            db,
            "users",
            user.uid
        );


    await setDoc(
        userReference,
        {

            uid:
                user.uid,

            displayName,

            email:
                user.email || "",

            photoURL:
                user.photoURL || "",

            /*
             * These are initial profile values only.
             *
             * We will enforce protected entitlement fields
             * with Firestore Security Rules before Pro
             * subscriptions are enabled.
             */

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

        }
    );


    console.log(
        `CWS CodeLab: Student profile created for ${user.uid}.`
    );


}


/* =========================================================
   ENSURE STUDENT PROFILE

   Called after login/OAuth.

   If the profile does not exist:
   create it.

   If it already exists:
   update only ordinary profile/login information.

   We deliberately do NOT overwrite role or plan on login.
========================================================= */

async function ensureStudentProfile(
    user,
    providerName = ""
) {


    if (!user?.uid) {


        throw new Error(
            "Cannot load student profile without a Firebase UID."
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
       NEW PROFILE
    ===================================================== */

    if (!snapshot.exists()) {


        await createStudentProfile(
            user,
            {

                provider:
                    providerName

            }
        );


        return;

    }


    /* =====================================================
       EXISTING PROFILE
    ===================================================== */

    const currentProfile =
        snapshot.data() ||
        {};


    const updateData = {

        uid:
            user.uid,

        email:
            user.email ||
            currentProfile.email ||
            "",

        lastSignInProvider:
            normaliseProviderName(
                providerName ||
                getFirebaseUserProvider(
                    user
                )
            ),

        updatedAt:
            serverTimestamp(),

        lastLoginAt:
            serverTimestamp()

    };


    /*
     * Do not replace an existing useful student name
     * with an empty OAuth display name.
     */

    if (
        user.displayName
    ) {


        updateData.displayName =
            user.displayName;

    }


    if (
        user.photoURL
    ) {


        updateData.photoURL =
            user.photoURL;

    }


    await setDoc(
        userReference,
        updateData,
        {

            merge:
                true

        }
    );


    console.log(
        `CWS CodeLab: Student profile refreshed for ${user.uid}.`
    );


}


/* =========================================================
   AUTHENTICATION PERSISTENCE
========================================================= */

async function setAuthPersistence(
    rememberUser
) {


    const persistence =
        rememberUser

            ? browserLocalPersistence

            : browserSessionPersistence;


    await setPersistence(
        auth,
        persistence
    );


}


/* =========================================================
   REDIRECT
========================================================= */

function redirectToDashboard() {


    /*
     * Small timeout lets the user briefly see the
     * successful status message.
     */

    window.setTimeout(
        () => {


            window.location.replace(
                DASHBOARD_URL
            );


        },
        500
    );


}


/* =========================================================
   OPTIONAL LOGIN REDIRECT
========================================================= */

function redirectToLogin() {


    window.location.replace(
        LOGIN_URL
    );


}


/* =========================================================
   BUTTON LOADING
========================================================= */

function setButtonLoading(
    button,
    loading,
    loadingText = ""
) {


    if (!button) {

        return;

    }


    /* =====================================================
       START LOADING
    ===================================================== */

    if (loading) {


        if (
            !button.dataset.originalHtml
        ) {


            button.dataset.originalHtml =
                button.innerHTML;

        }


        button.disabled =
            true;


        button.setAttribute(
            "aria-busy",
            "true"
        );


        button.classList.add(
            "is-loading"
        );


        if (
            loadingText
        ) {


            button.textContent =
                loadingText;

        }


        return;

    }


    /* =====================================================
       STOP LOADING
    ===================================================== */

    button.disabled =
        false;


    button.setAttribute(
        "aria-busy",
        "false"
    );


    button.classList.remove(
        "is-loading"
    );


    if (
        button.dataset.originalHtml
    ) {


        button.innerHTML =
            button.dataset.originalHtml;


        delete button.dataset
            .originalHtml;

    }


}


/* =========================================================
   FORM ERRORS
========================================================= */

function showFieldError(
    input,
    errorId,
    message
) {


    if (input) {


        input.classList.add(
            "input-error"
        );


        input.setAttribute(
            "aria-invalid",
            "true"
        );


        if (
            errorId
        ) {


            input.setAttribute(
                "aria-describedby",
                errorId
            );


        }


    }


    setText(
        errorId,
        message
    );


}


/* =========================================================
   CLEAR FORM ERRORS
========================================================= */

function clearFormErrors(
    form
) {


    if (!form) {

        return;

    }


    form.querySelectorAll(
        ".input-error"
    )
        .forEach(
            input => {


                input.classList.remove(
                    "input-error"
                );


                input.removeAttribute(
                    "aria-invalid"
                );


            }
        );


    form.querySelectorAll(
        ".form-error"
    )
        .forEach(
            error => {


                error.textContent =
                    "";


            }
        );


}


/* =========================================================
   FOCUS INVALID FIELD
========================================================= */

function focusFirstInvalidField(
    form
) {


    const invalidInput =
        form?.querySelector(
            ".input-error"
        );


    invalidInput?.focus();


}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    id,
    message,
    type = "info"
) {


    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    const allowedTypes =
        [
            "error",
            "success",
            "info"
        ];


    const safeType =
        allowedTypes.includes(
            type
        )

            ? type

            : "info";


    element.textContent =
        message;


    element.classList.remove(
        "error",
        "success",
        "info"
    );


    element.classList.add(
        safeType
    );


    element.hidden =
        false;


}


/* =========================================================
   HIDE MESSAGE
========================================================= */

function hideMessage(
    id
) {


    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.hidden =
        true;


    element.textContent =
        "";


    element.classList.remove(
        "error",
        "success",
        "info"
    );


}


/* =========================================================
   TEXT
========================================================= */

function setText(
    id,
    value
) {


    if (!id) {

        return;

    }


    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.textContent =
        String(
            value ?? ""
        );


}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(
    email
) {


    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(
            email
        );


}


/* =========================================================
   PASSWORD VALIDATION
========================================================= */

function isStrongPassword(
    password
) {


    return (

        password.length >= 8 &&

        /[A-Z]/.test(
            password
        ) &&

        /[a-z]/.test(
            password
        ) &&

        /\d/.test(
            password
        )

    );


}


/* =========================================================
   NORMALIZE EMAIL
========================================================= */

function normaliseEmail(
    value
) {


    return String(
        value ||
        ""
    )
        .trim()
        .toLowerCase();


}


/* =========================================================
   NORMALIZE NAME
========================================================= */

function normaliseName(
    value
) {


    return String(
        value ||
        ""
    )
        .trim()
        .replace(
            /\s+/g,
            " "
        );


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


    const firstPart =
        String(
            email
        )
            .split("@")[0]
            .replace(
                /[._-]+/g,
                " "
            )
            .trim();


    if (!firstPart) {

        return "";

    }


    return firstPart
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


/* =========================================================
   PROVIDER DISPLAY NAME
========================================================= */

function getProviderDisplayName(
    provider
) {


    const names = {

        google:
            "Google",

        github:
            "GitHub",

        apple:
            "Apple",

        password:
            "Email"

    };


    return names[
        provider
    ] || "Account";


}


/* =========================================================
   NORMALIZE PROVIDER
========================================================= */

function normaliseProviderName(
    provider
) {


    const value =
        String(
            provider ||
            ""
        )
            .toLowerCase();


    if (
        value.includes(
            "google"
        )
    ) {

        return "google";

    }


    if (
        value.includes(
            "github"
        )
    ) {

        return "github";

    }


    if (
        value.includes(
            "apple"
        )
    ) {

        return "apple";

    }


    if (
        value.includes(
            "password"
        )
    ) {

        return "password";

    }


    return value ||
        "unknown";


}


/* =========================================================
   FIREBASE USER PROVIDER
========================================================= */

function getFirebaseUserProvider(
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


    return normaliseProviderName(
        providerData[0]
            ?.providerId
    );


}


/* =========================================================
   FRIENDLY FIREBASE ERRORS
========================================================= */

function getFriendlyAuthError(
    error
) {


    const code =
        error?.code ||
        "";


    const messages = {


        /* =============================================
           EMAIL
        ============================================== */

        "auth/email-already-in-use":
            "An account already exists with this email address. Try signing in instead.",


        "auth/invalid-email":
            "Enter a valid email address.",


        "auth/missing-email":
            "Enter your email address.",


        "auth/missing-password":
            "Enter your password.",


        "auth/weak-password":
            "Your password is too weak. Use at least 8 characters with uppercase, lowercase and a number.",


        /* =============================================
           LOGIN
        ============================================== */

        "auth/invalid-credential":
            "The email address or password is incorrect.",


        "auth/wrong-password":
            "The email address or password is incorrect.",


        "auth/user-not-found":
            "The email address or password is incorrect.",


        "auth/user-disabled":
            "This CodeLab account has been disabled.",


        /* =============================================
           SECURITY
        ============================================== */

        "auth/too-many-requests":
            "Too many authentication attempts were made. Please wait before trying again.",


        "auth/network-request-failed":
            "CodeLab could not reach Firebase. Check your internet connection and try again.",


        /* =============================================
           OAUTH
        ============================================== */

        "auth/popup-closed-by-user":
            "The sign-in window was closed before authentication finished.",


        "auth/cancelled-popup-request":
            "The previous sign-in request was cancelled.",


        "auth/popup-blocked":
            "Your browser blocked the sign-in window. Allow pop-ups for CodeLab and try again.",


        "auth/operation-not-allowed":
            "This sign-in method has not been enabled in Firebase Authentication yet.",


        "auth/unauthorized-domain":
            "This website domain is not authorized in Firebase Authentication. Add the current domain under Authentication → Settings → Authorized domains.",


        "auth/account-exists-with-different-credential":
            "An account already exists with this email address using another sign-in method. Sign in with the original provider first.",


        "auth/credential-already-in-use":
            "This sign-in credential is already connected to another account.",


        /* =============================================
           FIRESTORE
        ============================================== */

        "permission-denied":
            "CodeLab could not access your student profile. Check the Firestore security rules.",


        "firestore/permission-denied":
            "CodeLab could not access your student profile. Check the Firestore security rules.",


        "unavailable":
            "The CodeLab database is temporarily unavailable. Please try again.",


        "firestore/unavailable":
            "The CodeLab database is temporarily unavailable. Please try again."


    };


    if (
        messages[
            code
        ]
    ) {

        return messages[
            code
        ];

    }


    console.warn(
        "Unhandled Firebase error:",
        code,
        error
    );


    return "CodeLab could not complete the authentication request. Please try again.";


}


/* =========================================================
   EXPORT OPTIONAL AUTH UTILITIES

   auth-guard.js and other modules can reuse these later.
========================================================= */

export {

    createStudentProfile,

    ensureStudentProfile,

    redirectToDashboard,

    redirectToLogin,

    getFriendlyAuthError

};
