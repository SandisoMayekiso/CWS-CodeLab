/* =========================================================
   CWS CODELAB
   STUDENT COURSES

   Handles:
   - Firebase authentication guard
   - Student profile loading
   - Course catalogue rendering
   - Search
   - Category filtering
   - Access/status filtering
   - Free-course enrolment
   - Student progress display
   - Mobile sidebar
   - Sign out

   CURRENT FIRESTORE MODEL:

   /users/{uid}

   {
       enrolledCourses: [
           "programming-fundamentals",
           "html-css"
       ],

       courseProgress: {
           "programming-fundamentals": 25,
           "html-css": 70
       }
   }

   Later we can move enrolments/progress into dedicated
   Firestore collections once the full student portal and
   security rules are built.
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

    updateDoc,

    arrayUnion,

    serverTimestamp

} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


/* =========================================================
   URLS
========================================================= */

const LOGIN_URL =
    new URL(
        "../pages/login.html",
        import.meta.url
    ).href;


const PRICING_URL =
    new URL(
        "../pages/pricing.html",
        import.meta.url
    ).href;


/* =========================================================
   STATE
========================================================= */

const state = {

    user:
        null,

    profile:
        {},

    courses:
        [],

    activeFilter:
        "all",

    category:
        "all",

    search:
        "",

    enrollingCourseId:
        null

};


/* =========================================================
   ELEMENTS
========================================================= */

const courseGrid =
    document.getElementById(
        "student-course-grid"
    );


const emptyState =
    document.getElementById(
        "student-course-empty"
    );


const resultCount =
    document.getElementById(
        "student-course-result-count"
    );


const sectionTitle =
    document.getElementById(
        "student-course-section-title"
    );


const searchInput =
    document.getElementById(
        "student-course-search"
    );


const categoryFilter =
    document.getElementById(
        "student-category-filter"
    );


const filterButtons =
    document.querySelectorAll(
        "[data-course-filter]"
    );


const resetFiltersButton =
    document.getElementById(
        "student-reset-filters"
    );


const loadingScreen =
    document.getElementById(
        "student-courses-loading"
    );


/* =========================================================
   INITIAL COURSE DATA
========================================================= */

state.courses =
    Array.isArray(
        window.CWS_COURSES
    )

        ? [...window.CWS_COURSES]

        : [];


/* =========================================================
   YEAR
========================================================= */

setText(
    "student-courses-year",
    new Date().getFullYear()
);


/* =========================================================
   SIDEBAR
========================================================= */

initialiseSidebar();


/* =========================================================
   FILTERS
========================================================= */

initialiseFilters();


/* =========================================================
   PLACEHOLDER LINKS
========================================================= */

initialiseFuturePages();


/* =========================================================
   AUTHENTICATION
========================================================= */

setLoading(
    true
);


const unsubscribe =
    onAuthStateChanged(
        auth,

        async user => {


            /* =================================================
               NOT AUTHENTICATED
            ================================================= */

            if (!user) {


                window.location.replace(
                    LOGIN_URL
                );


                return;

            }


            /* =================================================
               AUTHENTICATED
            ================================================= */

            state.user =
                user;


            try {


                await loadStudentProfile(
                    user
                );


                populateStudentIdentity();


                populateCategoryFilter();


                renderCourses();


                setLoading(
                    false
                );


                console.log(
                    "CWS CodeLab student courses initialized."
                );


            } catch (error) {


                console.error(
                    "CWS CodeLab could not load student courses:",
                    error
                );


                showMessage(
                    getErrorMessage(
                        error
                    ),
                    "error"
                );


                /*
                 * Authentication succeeded even if profile
                 * loading fails.
                 */

                populateFirebaseIdentity(
                    user
                );


                populateCategoryFilter();


                renderCourses();


                setLoading(
                    false
                );


            }


        },

        error => {


            console.error(
                "CWS CodeLab authentication observer failed:",
                error
            );


            window.location.replace(
                LOGIN_URL
            );


        }
    );


/* =========================================================
   LOAD STUDENT PROFILE
========================================================= */

async function loadStudentProfile(
    user
) {


    const reference =
        doc(
            db,
            "users",
            user.uid
        );


    const snapshot =
        await getDoc(
            reference
        );


    if (!snapshot.exists()) {


        throw new Error(
            "student-profile-not-found"
        );

    }


    state.profile = {

        id:
            snapshot.id,

        ...snapshot.data()

    };


}


/* =========================================================
   POPULATE STUDENT
========================================================= */

function populateStudentIdentity() {


    const name =
        normaliseName(
            state.profile.displayName ||
            state.user?.displayName ||
            deriveNameFromEmail(
                state.user?.email
            ) ||
            "Student"
        );


    const email =
        state.profile.email ||
        state.user?.email ||
        "";


    const initial =
        getInitial(
            name
        );


    const plan =
        formatPlan(
            state.profile.plan ||
            "free"
        );


    setText(
        "student-name",
        name
    );


    setText(
        "student-email",
        email
    );


    setText(
        "sidebar-student-name",
        name
    );


    setText(
        "sidebar-account-plan",
        `${plan} Learner`
    );


    setText(
        "sidebar-student-avatar",
        initial
    );


    setText(
        "student-topbar-avatar",
        initial
    );


}


/* =========================================================
   FIREBASE IDENTITY FALLBACK
========================================================= */

function populateFirebaseIdentity(
    user
) {


    const name =
        normaliseName(
            user.displayName ||
            deriveNameFromEmail(
                user.email
            ) ||
            "Student"
        );


    const initial =
        getInitial(
            name
        );


    setText(
        "student-name",
        name
    );


    setText(
        "student-email",
        user.email || ""
    );


    setText(
        "sidebar-student-name",
        name
    );


    setText(
        "sidebar-student-avatar",
        initial
    );


    setText(
        "student-topbar-avatar",
        initial
    );


}


/* =========================================================
   FILTER INITIALIZATION
========================================================= */

function initialiseFilters() {


    searchInput?.addEventListener(
        "input",
        () => {


            state.search =
                searchInput.value
                    .trim()
                    .toLowerCase();


            renderCourses();


        }
    );


    categoryFilter?.addEventListener(
        "change",
        () => {


            state.category =
                categoryFilter.value;


            renderCourses();


        }
    );


    filterButtons.forEach(
        button => {


            button.addEventListener(
                "click",
                () => {


                    filterButtons.forEach(
                        item => {


                            item.classList.remove(
                                "active"
                            );


                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    state.activeFilter =
                        button.dataset
                            .courseFilter ||
                        "all";


                    renderCourses();


                }
            );


        }
    );


    resetFiltersButton?.addEventListener(
        "click",
        resetFilters
    );


}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function populateCategoryFilter() {


    if (!categoryFilter) {

        return;

    }


    const categories = [

        ...new Set(

            state.courses
                .map(
                    course =>
                        String(
                            course.category ||
                            ""
                        )
                            .trim()
                )
                .filter(
                    Boolean
                )

        )

    ]
        .sort(
            (
                a,
                b
            ) =>
                a.localeCompare(
                    b
                )
        );


    categoryFilter.innerHTML = `

        <option value="all">
            All Categories
        </option>

        ${categories
            .map(
                category => `

                    <option
                        value="${escapeHtml(
                            category.toLowerCase()
                        )}"
                    >
                        ${escapeHtml(
                            category
                        )}
                    </option>

                `
            )
            .join("")}

    `;


}


/* =========================================================
   RENDER COURSES
========================================================= */

function renderCourses() {


    if (!courseGrid) {

        return;

    }


    const courses =
        getFilteredCourses();


    courseGrid.innerHTML =
        courses
            .map(
                createCourseCard
            )
            .join("");


    initialiseCourseActions();


    updateStatistics();


    updateResultInformation(
        courses.length
    );


    if (emptyState) {


        emptyState.hidden =
            courses.length !== 0;


    }


    courseGrid.hidden =
        courses.length === 0;


}


/* =========================================================
   FILTERED COURSES
========================================================= */

function getFilteredCourses() {


    return state.courses
        .filter(
            course => {


                const enrolled =
                    isCourseEnrolled(
                        course.id
                    );


                const access =
                    String(
                        course.access ||
                        ""
                    )
                        .toLowerCase();


                const status =
                    String(
                        course.status ||
                        ""
                    )
                        .toLowerCase();


                /* =========================================
                   TAB FILTER
                ========================================== */

                if (
                    state.activeFilter ===
                        "enrolled" &&
                    !enrolled
                ) {

                    return false;

                }


                if (
                    state.activeFilter ===
                        "free" &&
                    access !== "free"
                ) {

                    return false;

                }


                if (
                    state.activeFilter ===
                        "pro" &&
                    access !== "pro"
                ) {

                    return false;

                }


                if (
                    state.activeFilter ===
                        "coming-soon" &&
                    !isComingSoon(
                        course
                    )
                ) {

                    return false;

                }


                /* =========================================
                   CATEGORY
                ========================================== */

                if (
                    state.category !==
                        "all" &&
                    String(
                        course.category ||
                        ""
                    )
                        .toLowerCase() !==
                        state.category
                ) {

                    return false;

                }


                /* =========================================
                   SEARCH
                ========================================== */

                if (
                    state.search
                ) {


                    const searchable =
                        [

                            course.title,

                            course.shortTitle,

                            course.category,

                            course.level,

                            course.description,

                            course.outcome,

                            ...(Array.isArray(
                                course.skills
                            )
                                ? course.skills
                                : [])

                        ]
                            .join(" ")
                            .toLowerCase();


                    if (
                        !searchable.includes(
                            state.search
                        )
                    ) {

                        return false;

                    }


                }


                /*
                 * Keep status variable used for future
                 * filtering extensions.
                 */

                void status;


                return true;


            }
        )
        .sort(
            (
                a,
                b
            ) => {


                const aEnrolled =
                    isCourseEnrolled(
                        a.id
                    );


                const bEnrolled =
                    isCourseEnrolled(
                        b.id
                    );


                if (
                    aEnrolled !==
                    bEnrolled
                ) {


                    return aEnrolled
                        ? -1
                        : 1;


                }


                return (
                    Number(
                        a.order ||
                        999
                    ) -
                    Number(
                        b.order ||
                        999
                    )
                );


            }
        );


}


/* =========================================================
   COURSE CARD
========================================================= */

function createCourseCard(
    course
) {


    const enrolled =
        isCourseEnrolled(
            course.id
        );


    const comingSoon =
        isComingSoon(
            course
        );


    const access =
        String(
            course.access ||
            "Free"
        );


    const progress =
        getCourseProgress(
            course.id
        );


    const icon =
        getCourseIcon(
            course
        );


    const accent =
        sanitiseAccent(
            course.accent
        );


    return `

        <article
            class="student-course-card"
            data-course-id="${escapeHtml(
                course.id
            )}"
            style="--course-accent: ${accent};"
        >

            <div class="student-course-card-accent"></div>


            <div class="student-course-card-body">


                <div class="student-course-badges">

                    ${createAccessBadge(
                        access
                    )}

                    ${comingSoon

                        ? `
                            <span
                                class="student-course-badge coming-soon"
                            >
                                Coming Soon
                            </span>
                        `

                        : ""
                    }

                    ${enrolled

                        ? `
                            <span
                                class="student-course-badge enrolled"
                            >
                                Enrolled
                            </span>
                        `

                        : ""
                    }

                </div>


                <div class="student-course-card-header">


                    <div class="student-course-icon">
                        ${escapeHtml(
                            icon
                        )}
                    </div>


                    <div>

                        <h3>
                            ${escapeHtml(
                                course.title ||
                                "CodeLab Course"
                            )}
                        </h3>

                        <span class="student-course-category">
                            ${escapeHtml(
                                course.category ||
                                "Software Development"
                            )}
                        </span>

                    </div>


                </div>


                <p class="student-course-description">

                    ${escapeHtml(
                        course.description ||
                        "Build practical development skills through structured lessons and projects."
                    )}

                </p>


                <div class="student-course-meta">


                    <div>

                        <strong>
                            ${escapeHtml(
                                String(
                                    course.duration ||
                                    "—"
                                )
                            )}
                        </strong>

                        <span>
                            Duration
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${escapeHtml(
                                String(
                                    course.modules ??
                                    "—"
                                )
                            )}
                        </strong>

                        <span>
                            Modules
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${escapeHtml(
                                String(
                                    course.projects ??
                                    "—"
                                )
                            )}
                        </strong>

                        <span>
                            Projects
                        </span>

                    </div>


                </div>


                ${enrolled && !comingSoon

                    ? createProgressMarkup(
                        progress
                    )

                    : ""
                }


                <div class="student-course-card-footer">


                    <span class="student-course-level">

                        ${escapeHtml(
                            course.level ||
                            "Beginner"
                        )}

                    </span>


                    ${createCourseAction(
                        course,
                        enrolled,
                        comingSoon
                    )}


                </div>


            </div>

        </article>

    `;


}


/* =========================================================
   ACCESS BADGE
========================================================= */

function createAccessBadge(
    access
) {


    const value =
        String(
            access ||
            "Free"
        );


    const className =
        value.toLowerCase() ===
        "pro"

            ? "pro"

            : "free";


    return `

        <span
            class="student-course-badge ${className}"
        >
            ${escapeHtml(
                value
            )}
        </span>

    `;


}


/* =========================================================
   PROGRESS MARKUP
========================================================= */

function createProgressMarkup(
    progress
) {


    const value =
        clamp(
            progress,
            0,
            100
        );


    return `

        <div class="student-course-progress">


            <div class="student-course-progress-header">

                <span>
                    Course progress
                </span>

                <strong>
                    ${value}%
                </strong>

            </div>


            <div class="student-course-progress-track">

                <div
                    class="student-course-progress-bar"
                    style="width: ${value}%;"
                ></div>

            </div>


        </div>

    `;


}


/* =========================================================
   COURSE ACTION
========================================================= */

function createCourseAction(
    course,
    enrolled,
    comingSoon
) {


    if (comingSoon) {


        return `

            <button
                type="button"
                class="student-course-action"
                disabled
            >
                Coming Soon
            </button>

        `;


    }


    if (enrolled) {


        return `

            <button
                type="button"
                class="student-course-action primary"
                data-course-action="continue"
                data-course-id="${escapeHtml(
                    course.id
                )}"
            >
                Continue
                <span aria-hidden="true">→</span>
            </button>

        `;


    }


    if (
        String(
            course.access ||
            ""
        )
            .toLowerCase() ===
        "pro"
    ) {


        return `

            <button
                type="button"
                class="student-course-action pro"
                data-course-action="pro"
                data-course-id="${escapeHtml(
                    course.id
                )}"
            >
                View Pro
            </button>

        `;


    }


    const loading =
        state.enrollingCourseId ===
        course.id;


    return `

        <button
            type="button"
            class="student-course-action primary"
            data-course-action="enroll"
            data-course-id="${escapeHtml(
                course.id
            )}"
            ${loading ? "disabled" : ""}
        >
            ${loading
                ? "Enrolling..."
                : "Enroll Free"
            }
        </button>

    `;


}


/* =========================================================
   COURSE ACTIONS
========================================================= */

function initialiseCourseActions() {


    document
        .querySelectorAll(
            "[data-course-action]"
        )
        .forEach(
            button => {


                button.addEventListener(
                    "click",
                    async () => {


                        const action =
                            button.dataset
                                .courseAction;


                        const courseId =
                            button.dataset
                                .courseId;


                        if (
                            !courseId
                        ) {

                            return;

                        }


                        const course =
                            state.courses
                                .find(
                                    item =>
                                        item.id ===
                                        courseId
                                );


                        if (!course) {

                            return;

                        }


                        if (
                            action ===
                            "enroll"
                        ) {


                            await enrolInFreeCourse(
                                course
                            );


                            return;

                        }


                        if (
                            action ===
                            "continue"
                        ) {


                            showMessage(
                                `${course.title} is enrolled. The lesson workspace is the next student page we will connect.`,
                                "info"
                            );


                            return;

                        }


                        if (
                            action ===
                            "pro"
                        ) {


                            window.location.href =
                                PRICING_URL;


                        }


                    }
                );


            }
        );


}


/* =========================================================
   FREE COURSE ENROLMENT
========================================================= */

async function enrolInFreeCourse(
    course
) {


    if (
        !state.user?.uid
    ) {


        window.location.replace(
            LOGIN_URL
        );


        return;

    }


    /* =====================================================
       NEVER GRANT PRO FROM CLIENT
    ===================================================== */

    if (
        String(
            course.access ||
            ""
        )
            .toLowerCase() !==
        "free"
    ) {


        showMessage(
            "Pro courses require CodeLab Pro access.",
            "error"
        );


        return;

    }


    if (
        isCourseEnrolled(
            course.id
        )
    ) {

        return;

    }


    state.enrollingCourseId =
        course.id;


    renderCourses();


    try {


        const reference =
            doc(
                db,
                "users",
                state.user.uid
            );


        await updateDoc(
            reference,
            {

                enrolledCourses:
                    arrayUnion(
                        course.id
                    ),

                updatedAt:
                    serverTimestamp()

            }
        );


        const currentEnrolments =
            getEnrolledCourses();


        if (
            !currentEnrolments.includes(
                course.id
            )
        ) {


            currentEnrolments.push(
                course.id
            );


        }


        state.profile.enrolledCourses =
            currentEnrolments;


        showMessage(
            `You are now enrolled in ${course.title}.`,
            "success"
        );


    } catch (error) {


        console.error(
            "CWS CodeLab enrolment failed:",
            error
        );


        showMessage(
            getErrorMessage(
                error
            ),
            "error"
        );


    } finally {


        state.enrollingCourseId =
            null;


        renderCourses();


    }


}


/* =========================================================
   ENROLMENT
========================================================= */

function getEnrolledCourses() {


    return Array.isArray(
        state.profile.enrolledCourses
    )

        ? [
            ...state.profile.enrolledCourses
        ]

        : [];


}


function isCourseEnrolled(
    courseId
) {


    return getEnrolledCourses()
        .includes(
            courseId
        );


}


/* =========================================================
   COURSE PROGRESS
========================================================= */

function getCourseProgress(
    courseId
) {


    const progressMap =
        state.profile.courseProgress;


    if (
        !progressMap ||
        typeof progressMap !==
        "object"
    ) {

        return 0;

    }


    const value =
        progressMap[
            courseId
        ];


    /* =====================================================
       NUMBER FORMAT
    ===================================================== */

    if (
        typeof value ===
        "number"
    ) {


        return clamp(
            Math.round(
                value
            ),
            0,
            100
        );


    }


    /* =====================================================
       OBJECT FORMAT

       Allows future structure:

       courseProgress: {
           courseId: {
               percentage: 50
           }
       }
    ===================================================== */

    if (
        value &&
        typeof value ===
        "object"
    ) {


        const percentage =
            Number(
                value.percentage ??
                value.progress ??
                0
            );


        return clamp(
            Number.isFinite(
                percentage
            )
                ? Math.round(
                    percentage
                )
                : 0,
            0,
            100
        );


    }


    return 0;


}


/* =========================================================
   STATS
========================================================= */

function updateStatistics() {


    const enrolled =
        state.courses.filter(
            course =>
                isCourseEnrolled(
                    course.id
                )
        );


    const completed =
        enrolled.filter(
            course =>
                getCourseProgress(
                    course.id
                ) >= 100
        );


    const inProgress =
        enrolled.filter(
            course => {


                const progress =
                    getCourseProgress(
                        course.id
                    );


                return (
                    progress > 0 &&
                    progress < 100
                );


            }
        );


    const available =
        state.courses.filter(
            course =>
                !isComingSoon(
                    course
                )
        );


    setText(
        "enrolled-course-count",
        enrolled.length
    );


    setText(
        "in-progress-course-count",
        inProgress.length
    );


    setText(
        "completed-course-count",
        completed.length
    );


    setText(
        "available-course-count",
        available.length
    );


}


/* =========================================================
   RESULT INFORMATION
========================================================= */

function updateResultInformation(
    count
) {


    if (resultCount) {


        resultCount.textContent =
            count === 1

                ? "1 course"

                : `${count} courses`;


    }


    if (!sectionTitle) {

        return;

    }


    const titles = {

        all:
            "All Courses",

        enrolled:
            "My Enrolled Courses",

        free:
            "Free Courses",

        pro:
            "Pro Courses",

        "coming-soon":
            "Coming Soon"

    };


    sectionTitle.textContent =
        titles[
            state.activeFilter
        ] ||
        "Courses";


}


/* =========================================================
   RESET FILTERS
========================================================= */

function resetFilters() {


    state.search =
        "";


    state.category =
        "all";


    state.activeFilter =
        "all";


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (categoryFilter) {

        categoryFilter.value =
            "all";

    }


    filterButtons.forEach(
        button => {


            button.classList.toggle(
                "active",
                button.dataset
                    .courseFilter ===
                    "all"
            );


        }
    );


    renderCourses();


}


/* =========================================================
   COMING SOON
========================================================= */

function isComingSoon(
    course
) {


    const status =
        String(
            course.status ||
            ""
        )
            .trim()
            .toLowerCase();


    return (
        status.includes(
            "coming"
        ) ||
        status.includes(
            "soon"
        ) ||
        status.includes(
            "upcoming"
        )
    );


}


/* =========================================================
   COURSE ICON
========================================================= */

function getCourseIcon(
    course
) {


    if (
        course.icon &&
        String(
            course.icon
        ).length <= 5
    ) {


        return String(
            course.icon
        );


    }


    const title =
        String(
            course.shortTitle ||
            course.title ||
            "CR"
        );


    const words =
        title
            .split(/\s+/)
            .filter(
                Boolean
            );


    if (
        words.length >= 2
    ) {


        return (
            words[0][0] +
            words[1][0]
        )
            .toUpperCase();


    }


    return title
        .slice(
            0,
            2
        )
        .toUpperCase();


}


/* =========================================================
   ACCENT
========================================================= */

function sanitiseAccent(
    value
) {


    const accent =
        String(
            value ||
            ""
        )
            .trim();


    if (
        /^#[0-9a-f]{3,8}$/i
            .test(
                accent
            )
    ) {


        return accent;

    }


    return "#6c7cff";


}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function initialiseSidebar() {


    const sidebar =
        document.getElementById(
            "student-sidebar"
        );


    const toggle =
        document.getElementById(
            "student-sidebar-toggle"
        );


    const close =
        document.getElementById(
            "student-sidebar-close"
        );


    const overlay =
        document.getElementById(
            "student-sidebar-overlay"
        );


    function openSidebar() {


        sidebar?.classList.add(
            "open"
        );


        overlay?.classList.add(
            "open"
        );


        toggle?.setAttribute(
            "aria-expanded",
            "true"
        );


    }


    function closeSidebar() {


        sidebar?.classList.remove(
            "open"
        );


        overlay?.classList.remove(
            "open"
        );


        toggle?.setAttribute(
            "aria-expanded",
            "false"
        );


    }


    toggle?.addEventListener(
        "click",
        () => {


            if (
                sidebar?.classList.contains(
                    "open"
                )
            ) {


                closeSidebar();


            } else {


                openSidebar();


            }


        }
    );


    close?.addEventListener(
        "click",
        closeSidebar
    );


    overlay?.addEventListener(
        "click",
        closeSidebar
    );


    document.addEventListener(
        "keydown",
        event => {


            if (
                event.key ===
                "Escape"
            ) {


                closeSidebar();


            }


        }
    );


    window.addEventListener(
        "resize",
        () => {


            if (
                window.innerWidth >
                900
            ) {


                closeSidebar();


            }


        }
    );


}


/* =========================================================
   FUTURE PAGE PLACEHOLDERS
========================================================= */

function initialiseFuturePages() {


    document
        .querySelectorAll(
            "[data-future-page]"
        )
        .forEach(
            button => {


                button.addEventListener(
                    "click",
                    () => {


                        const label =
                            String(
                                button.dataset
                                    .futurePage ||
                                "section"
                            )
                                .replaceAll(
                                    "-",
                                    " "
                                );


                        showMessage(
                            `${capitaliseWords(
                                label
                            )} will be connected as we build the student portal.`,
                            "info"
                        );


                    }
                );


            }
        );


}


/* =========================================================
   SIGN OUT
========================================================= */

const signOutButton =
    document.getElementById(
        "student-sign-out-button"
    );


signOutButton?.addEventListener(
    "click",
    async () => {


        const originalHTML =
            signOutButton.innerHTML;


        signOutButton.disabled =
            true;


        signOutButton.textContent =
            "Signing out...";


        try {


            await signOut(
                auth
            );


            window.location.replace(
                LOGIN_URL
            );


        } catch (error) {


            console.error(
                "CWS CodeLab sign out failed:",
                error
            );


            signOutButton.disabled =
                false;


            signOutButton.innerHTML =
                originalHTML;


            showMessage(
                "CodeLab could not sign you out. Please try again.",
                "error"
            );


        }


    }
);


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "info"
) {


    const element =
        document.getElementById(
            "student-courses-message"
        );


    if (!element) {

        return;

    }


    const allowedTypes = [

        "info",

        "success",

        "error"

    ];


    const safeType =
        allowedTypes.includes(
            type
        )
            ? type
            : "info";


    element.textContent =
        message;


    element.className =
        `student-courses-message ${safeType}`;


    element.hidden =
        false;


    window.clearTimeout(
        showMessage.timeout
    );


    showMessage.timeout =
        window.setTimeout(
            () => {


                element.hidden =
                    true;


            },
            6000
        );


}


/* =========================================================
   LOADING
========================================================= */

function setLoading(
    loading
) {


    if (!loadingScreen) {

        return;

    }


    loadingScreen.hidden =
        !loading;


}


/* =========================================================
   ERRORS
========================================================= */

function getErrorMessage(
    error
) {


    const code =
        error?.code ||
        error?.message ||
        "";


    if (
        String(
            code
        ).includes(
            "permission-denied"
        )
    ) {


        return "CodeLab could not access your student course information. Check the Firestore security rules.";


    }


    if (
        String(
            code
        ).includes(
            "student-profile-not-found"
        )
    ) {


        return "Your Firebase account exists, but the CodeLab student profile could not be found.";


    }


    if (
        String(
            code
        ).includes(
            "network"
        )
    ) {


        return "CodeLab could not reach Firebase. Check your internet connection and try again.";


    }


    return "CodeLab could not complete the course request. Please try again.";


}


/* =========================================================
   NAME
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


function deriveNameFromEmail(
    email
) {


    if (!email) {

        return "";

    }


    return String(
        email
    )
        .split("@")[0]
        .replace(
            /[._-]+/g,
            " "
        )
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


function getInitial(
    name
) {


    return normaliseName(
        name
    )
        .charAt(0)
        .toUpperCase() ||
        "S";


}


/* =========================================================
   PLAN
========================================================= */

function formatPlan(
    value
) {


    const plan =
        String(
            value ||
            "free"
        )
            .trim()
            .toLowerCase();


    return (
        plan.charAt(0)
            .toUpperCase() +
        plan.slice(1)
    );


}


/* =========================================================
   CLAMP
========================================================= */

function clamp(
    number,
    minimum,
    maximum
) {


    const numeric =
        Number(
            number
        );


    if (
        !Number.isFinite(
            numeric
        )
    ) {

        return minimum;

    }


    return Math.min(
        maximum,
        Math.max(
            minimum,
            numeric
        )
    );


}


/* =========================================================
   TEXT
========================================================= */

function setText(
    id,
    value
) {


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
   CAPITALISE
========================================================= */

function capitaliseWords(
    value
) {


    return String(
        value ||
        ""
    )
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {


    return String(
        value ??
        ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );


}


/* =========================================================
   PUBLIC API
========================================================= */

window.CWSStudentCourses = {


    getUser() {

        return state.user;

    },


    getProfile() {

        return state.profile;

    },


    getEnrolledCourses,


    refresh() {

        renderCourses();

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
