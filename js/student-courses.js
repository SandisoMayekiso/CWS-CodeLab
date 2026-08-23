/* =========================================================
   CWS CODELAB
   STUDENT COURSES

   Responsibilities:
   - Firebase authentication
   - Student profile loading
   - Central course catalogue loading
   - Search and filtering
   - URL filters
   - Free-course enrolment
   - Pro-course handling
   - Course progress
   - Course detail modal
   - Course curriculum preview
   - Continue / Resume learning
   - Lesson workspace navigation
   - Mobile sidebar
   - Sign out

   FIRESTORE MODEL

   /users/{uid}

   {
       enrolledCourses: [
           "programming-fundamentals",
           "html-css"
       ],

       courseProgress: {

           "programming-fundamentals": {

               completedLessons: [
                   "pf-l01",
                   "pf-l02"
               ],

               completedCount: 2,
               totalLessons: 24,
               percentage: 8,

               currentLessonId:
                   "pf-l03",

               completed:
                   false,

               startedAt: Timestamp,
               lastAccessedAt: Timestamp
           }

       },

       lastActiveCourseId:
           "programming-fundamentals"
   }
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


const LESSON_URL =
    new URL(
        "../student/lesson.html",
        import.meta.url
    ).href;


/* =========================================================
   VALID FILTERS
========================================================= */

const VALID_FILTERS = [

    "all",

    "enrolled",

    "free",

    "pro",

    "coming-soon"

];


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
        getRequestedFilter(),

    category:
        "all",

    search:
        "",

    enrollingCourseId:
        null,

    selectedCourseId:
        null,

    authReady:
        false,

    courseDataReady:
        false

};


/* =========================================================
   ELEMENTS
========================================================= */

const elements = {

    courseGrid:
        document.getElementById(
            "student-course-grid"
        ),

    emptyState:
        document.getElementById(
            "student-course-empty"
        ),

    resultCount:
        document.getElementById(
            "student-course-result-count"
        ),

    sectionTitle:
        document.getElementById(
            "student-course-section-title"
        ),

    searchInput:
        document.getElementById(
            "student-course-search"
        ),

    categoryFilter:
        document.getElementById(
            "student-category-filter"
        ),

    filterButtons:
        document.querySelectorAll(
            "[data-course-filter]"
        ),

    resetButton:
        document.getElementById(
            "student-reset-filters"
        ),

    loadingScreen:
        document.getElementById(
            "student-courses-loading"
        ),

    message:
        document.getElementById(
            "student-courses-message"
        ),

    courseDialog:
        document.getElementById(
            "course-detail-dialog"
        ),

    courseDialogClose:
        document.getElementById(
            "course-detail-close"
        )

};


/* =========================================================
   INITIALIZE PAGE
========================================================= */

initializePage();


async function initializePage() {


    setText(
        "student-courses-year",
        new Date()
            .getFullYear()
    );


    initialiseSidebar();


    initialiseFilters();


    initialiseFuturePages();


    initialiseCourseDialog();


    setLoading(
        true
    );


    try {


        state.courses =
            await waitForCourseData();


        state.courseDataReady =
            true;


        populateCategoryFilter();


        updateActiveFilterTab();


        console.log(
            `CWS CodeLab: ${state.courses.length} courses loaded.`
        );


    } catch (error) {


        console.error(
            "CWS CodeLab course catalogue error:",
            error
        );


        showMessage(
            "CodeLab could not load the course catalogue.",
            "error"
        );


        setLoading(
            false
        );


    }


}


/* =========================================================
   FIREBASE AUTHENTICATION
========================================================= */

const unsubscribe =
    onAuthStateChanged(
        auth,

        async user => {


            /* =================================================
               NOT SIGNED IN
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


            state.authReady =
                true;


            try {


                await loadStudentProfile(
                    user
                );


                populateStudentIdentity();


            } catch (error) {


                console.error(
                    "CWS CodeLab student profile error:",
                    error
                );


                populateFirebaseIdentity(
                    user
                );


                showMessage(
                    getErrorMessage(
                        error
                    ),
                    "error"
                );


            }


            try {


                if (
                    !state.courseDataReady
                ) {


                    state.courses =
                        await waitForCourseData();


                    state.courseDataReady =
                        true;


                    populateCategoryFilter();


                }


                updateActiveFilterTab();


                renderCourses();


                setLoading(
                    false
                );


                if (
                    state.activeFilter !==
                    "all"
                ) {


                    scrollToCourseLibrary();


                }


                console.log(
                    "CWS CodeLab student course workspace initialized."
                );


            } catch (error) {


                console.error(
                    "CWS CodeLab course rendering error:",
                    error
                );


                showMessage(
                    "Your account is signed in, but the course library could not be displayed.",
                    "error"
                );


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
   WAIT FOR data/courses.js
========================================================= */

function waitForCourseData(
    timeout = 6000
) {


    return new Promise(
        (
            resolve,
            reject
        ) => {


            /* =================================================
               ALREADY AVAILABLE
            ================================================= */

            if (
                Array.isArray(
                    window.CWS_COURSES
                )
            ) {


                resolve(
                    [
                        ...window.CWS_COURSES
                    ]
                );


                return;


            }


            const started =
                Date.now();


            const timer =
                window.setInterval(
                    () => {


                        if (
                            Array.isArray(
                                window.CWS_COURSES
                            )
                        ) {


                            window.clearInterval(
                                timer
                            );


                            resolve(
                                [
                                    ...window.CWS_COURSES
                                ]
                            );


                            return;


                        }


                        if (
                            Date.now() -
                            started >=
                            timeout
                        ) {


                            window.clearInterval(
                                timer
                            );


                            reject(
                                new Error(
                                    "course-data-unavailable"
                                )
                            );


                        }


                    },
                    40
                );


        }
    );


}


/* =========================================================
   URL FILTER
========================================================= */

function getRequestedFilter() {


    const parameters =
        new URLSearchParams(
            window.location.search
        );


    const requested =
        String(
            parameters.get(
                "filter"
            ) ||
            "all"
        )
            .trim()
            .toLowerCase();


    return VALID_FILTERS.includes(
        requested
    )

        ? requested

        : "all";


}


/* =========================================================
   UPDATE URL FILTER
========================================================= */

function updateURLFilter() {


    const url =
        new URL(
            window.location.href
        );


    if (
        state.activeFilter ===
        "all"
    ) {


        url.searchParams.delete(
            "filter"
        );


    } else {


        url.searchParams.set(
            "filter",
            state.activeFilter
        );


    }


    window.history.replaceState(
        {},
        "",
        url.href
    );


}


/* =========================================================
   LOAD STUDENT PROFILE
========================================================= */

async function loadStudentProfile(
    user
) {


    if (!user?.uid) {


        throw new Error(
            "firebase-user-missing"
        );


    }


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
   STUDENT IDENTITY
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


    const plan =
        formatPlan(
            state.profile.plan ||
            "free"
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
        user.email ||
        ""
    );


    setText(
        "sidebar-student-name",
        name
    );


    setText(
        "sidebar-account-plan",
        "Free Learner"
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
   INITIALIZE FILTERS
========================================================= */

function initialiseFilters() {


    /* =====================================================
       SEARCH
    ===================================================== */

    elements.searchInput
        ?.addEventListener(
            "input",
            () => {


                state.search =
                    elements.searchInput
                        .value
                        .trim()
                        .toLowerCase();


                renderCourses();


            }
        );


    /* =====================================================
       CATEGORY
    ===================================================== */

    elements.categoryFilter
        ?.addEventListener(
            "change",
            () => {


                state.category =
                    elements.categoryFilter
                        .value;


                renderCourses();


            }
        );


    /* =====================================================
       MAIN FILTER TABS
    ===================================================== */

    elements.filterButtons
        .forEach(
            button => {


                button.addEventListener(
                    "click",
                    () => {


                        const filter =
                            String(
                                button.dataset
                                    .courseFilter ||
                                "all"
                            );


                        if (
                            !VALID_FILTERS.includes(
                                filter
                            )
                        ) {


                            return;


                        }


                        state.activeFilter =
                            filter;


                        updateActiveFilterTab();


                        updateURLFilter();


                        renderCourses();


                    }
                );


            }
        );


    /* =====================================================
       RESET
    ===================================================== */

    elements.resetButton
        ?.addEventListener(
            "click",
            resetFilters
        );


}


/* =========================================================
   ACTIVE FILTER
========================================================= */

function updateActiveFilterTab() {


    elements.filterButtons
        .forEach(
            button => {


                const filter =
                    button.dataset
                        .courseFilter ||
                    "all";


                button.classList.toggle(
                    "active",
                    filter ===
                        state.activeFilter
                );


            }
        );


}


/* =========================================================
   CATEGORY FILTER OPTIONS
========================================================= */

function populateCategoryFilter() {


    if (
        !elements.categoryFilter
    ) {


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


    elements.categoryFilter
        .innerHTML = `

            <option value="all">
                All Categories
            </option>

            ${categories
                .map(
                    category => `

                        <option
                            value="${escapeHtml(
                                category
                                    .toLowerCase()
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


    if (
        !elements.courseGrid
    ) {


        return;


    }


    const courses =
        getFilteredCourses();


    elements.courseGrid
        .innerHTML =
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


    if (
        elements.emptyState
    ) {


        elements.emptyState.hidden =
            courses.length !== 0;


    }


    elements.courseGrid.hidden =
        courses.length === 0;


}


/* =========================================================
   FILTER COURSES
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
                        .trim()
                        .toLowerCase();


                /* =========================================
                   ACTIVE FILTER
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
                    access !==
                        "free"
                ) {


                    return false;


                }


                if (
                    state.activeFilter ===
                        "pro" &&
                    access !==
                        "pro"
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
                                : []),

                            ...(Array.isArray(
                                course.prerequisites
                            )
                                ? course.prerequisites
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


                return true;


            }
        )


        /* =================================================
           ENROLLED FIRST, THEN COURSE ORDER
        ================================================= */

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


    const modules =
        getModuleCount(
            course
        );


    return `

        <article
            class="student-course-card"
            data-course-id="${escapeHtml(
                course.id
            )}"
            style="--course-accent:${accent};"
        >


            <div
                class="student-course-card-accent"
            ></div>


            <div
                class="student-course-card-body"
            >


                <!-- =========================================
                     BADGES
                ========================================== -->

                <div class="student-course-badges">

                    ${createAccessBadge(
                        course
                    )}

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

                    ${
                        enrolled &&
                        progress >= 100

                            ? `

                                <span
                                    class="student-course-badge enrolled"
                                >
                                    Completed
                                </span>

                            `

                            : ""
                    }

                </div>


                <!-- =========================================
                     HEADER
                ========================================== -->

                <div
                    class="student-course-card-header"
                >


                    <div
                        class="student-course-icon"
                    >

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


                        <span
                            class="student-course-category"
                        >

                            ${escapeHtml(
                                course.category ||
                                "Software Development"
                            )}

                        </span>


                    </div>


                </div>


                <!-- =========================================
                     DESCRIPTION
                ========================================== -->

                <p
                    class="student-course-description"
                >

                    ${escapeHtml(
                        course.description ||
                        "Build practical software development skills."
                    )}

                </p>


                <!-- =========================================
                     META
                ========================================== -->

                <div class="student-course-meta">


                    <div>

                        <strong>
                            ${escapeHtml(
                                course.duration ||
                                "Self-paced"
                            )}
                        </strong>

                        <span>
                            Duration
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${modules}
                        </strong>

                        <span>
                            Modules
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${safeNumber(
                                course.projects
                            )}
                        </strong>

                        <span>
                            Projects
                        </span>

                    </div>


                </div>


                <!-- =========================================
                     PROGRESS
                ========================================== -->

                ${
                    enrolled &&
                    !comingSoon

                        ? createProgressMarkup(
                            progress
                        )

                        : ""
                }


                <!-- =========================================
                     FOOTER
                ========================================== -->

                <div
                    class="student-course-card-footer"
                >


                    <span
                        class="student-course-level"
                    >

                        ${escapeHtml(
                            course.level ||
                            "Beginner"
                        )}

                    </span>


                    <div
                        class="student-course-actions"
                    >


                        <!-- DETAILS -->

                        <button
                            type="button"
                            class="student-course-action"
                            data-course-action="details"
                            data-course-id="${escapeHtml(
                                course.id
                            )}"
                        >
                            Details
                        </button>


                        <!-- PRIMARY ACTION -->

                        ${createPrimaryCourseAction(
                            course,
                            enrolled,
                            comingSoon,
                            progress
                        )}


                    </div>


                </div>


            </div>


        </article>

    `;


}


/* =========================================================
   ACCESS BADGE
========================================================= */

function createAccessBadge(
    course
) {


    /* =====================================================
       COMING SOON
    ===================================================== */

    if (
        isComingSoon(
            course
        )
    ) {


        return `

            <span
                class="student-course-badge coming-soon"
            >
                Coming Soon
            </span>

        `;


    }


    /* =====================================================
       FREE / PRO
    ===================================================== */

    const access =
        String(
            course.access ||
            "Free"
        );


    const className =
        access
            .toLowerCase() ===
            "pro"

            ? "pro"

            : "free";


    return `

        <span
            class="student-course-badge ${className}"
        >

            ${escapeHtml(
                access
            )}

        </span>

    `;


}


/* =========================================================
   PRIMARY COURSE ACTION
========================================================= */

function createPrimaryCourseAction(
    course,
    enrolled,
    comingSoon,
    progress
) {


    /* =====================================================
       COMING SOON
    ===================================================== */

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


    /* =====================================================
       ENROLLED
    ===================================================== */

    if (enrolled) {


        const label =
            progress >= 100

                ? "Review Course"

                : progress > 0

                    ? "Continue"

                    : "Start Course";


        return `

            <button
                type="button"
                class="student-course-action primary"
                data-course-action="continue"
                data-course-id="${escapeHtml(
                    course.id
                )}"
            >

                ${label}

                <span aria-hidden="true">
                    →
                </span>

            </button>

        `;


    }


    /* =====================================================
       PRO
    ===================================================== */

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


    /* =====================================================
       FREE ENROLMENT
    ===================================================== */

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
            ${
                loading
                    ? "disabled"
                    : ""
            }
        >

            ${
                loading
                    ? "Enrolling..."
                    : "Enroll Free"
            }

        </button>

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


            <div
                class="student-course-progress-header"
            >

                <span>
                    Course progress
                </span>

                <strong>
                    ${value}%
                </strong>

            </div>


            <div
                class="student-course-progress-track"
            >

                <div
                    class="student-course-progress-bar"
                    style="width:${value}%;"
                ></div>

            </div>


        </div>

    `;


}


/* =========================================================
   COURSE ACTION LISTENERS
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


                        const course =
                            getCourseById(
                                courseId
                            );


                        if (!course) {


                            showMessage(
                                "CodeLab could not find that course.",
                                "error"
                            );


                            return;


                        }


                        /* =========================================
                           DETAILS
                        ========================================== */

                        if (
                            action ===
                            "details"
                        ) {


                            openCourseDetails(
                                course
                            );


                            return;


                        }


                        /* =========================================
                           ENROL
                        ========================================== */

                        if (
                            action ===
                            "enroll"
                        ) {


                            await enrolInFreeCourse(
                                course
                            );


                            return;


                        }


                        /* =========================================
                           CONTINUE / RESUME
                        ========================================== */

                        if (
                            action ===
                            "continue"
                        ) {


                            openLessonWorkspace(
                                course
                            );


                            return;


                        }


                        /* =========================================
                           PRO
                        ========================================== */

                        if (
                            action ===
                            "pro"
                        ) {


                            openCourseDetails(
                                course
                            );


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


    /* =====================================================
       AUTH CHECK
    ===================================================== */

    if (
        !state.user?.uid
    ) {


        window.location.replace(
            LOGIN_URL
        );


        return;


    }


    /* =====================================================
       STATUS
    ===================================================== */

    if (
        isComingSoon(
            course
        )
    ) {


        showMessage(
            "This course is not available yet.",
            "info"
        );


        return;


    }


    /* =====================================================
       FREE ONLY

       Never allow frontend code to grant Pro access.
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
            "This course requires CodeLab Pro.",
            "error"
        );


        return;


    }


    /* =====================================================
       ALREADY ENROLLED
    ===================================================== */

    if (
        isCourseEnrolled(
            course.id
        )
    ) {


        openLessonWorkspace(
            course
        );


        return;


    }


    /* =====================================================
       LOADING
    ===================================================== */

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

                lastActiveCourseId:
                    course.id,

                updatedAt:
                    serverTimestamp()

            }
        );


        /* =================================================
           LOCAL STATE
        ================================================= */

        const enrolments =
            getEnrolledCourses();


        if (
            !enrolments.includes(
                course.id
            )
        ) {


            enrolments.push(
                course.id
            );


        }


        state.profile.enrolledCourses =
            enrolments;


        state.profile.lastActiveCourseId =
            course.id;


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
   ENROLLED COURSES
========================================================= */

function getEnrolledCourses() {


    return Array.isArray(
        state.profile
            .enrolledCourses
    )

        ? [
            ...state.profile
                .enrolledCourses
        ]

        : [];


}


/* =========================================================
   IS ENROLLED
========================================================= */

function isCourseEnrolled(
    courseId
) {


    return getEnrolledCourses()
        .includes(
            courseId
        );


}


/* =========================================================
   COURSE PROGRESS OBJECT
========================================================= */

function getCourseProgressData(
    courseId
) {


    const progressMap =
        state.profile
            .courseProgress;


    if (
        !progressMap ||
        typeof progressMap !==
            "object"
    ) {


        return null;


    }


    const value =
        progressMap[
            courseId
        ];


    if (
        value &&
        typeof value ===
            "object"
    ) {


        return value;


    }


    return null;


}


/* =========================================================
   COURSE PERCENTAGE
========================================================= */

function getCourseProgress(
    courseId
) {


    const progressMap =
        state.profile
            .courseProgress;


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
       OLD NUMBER FORMAT
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
       NEW OBJECT FORMAT
    ===================================================== */

    if (
        value &&
        typeof value ===
            "object"
    ) {


        return clamp(
            safeNumber(
                value.percentage ??
                value.progress ??
                0
            ),
            0,
            100
        );


    }


    return 0;


}


/* =========================================================
   OPEN LESSON WORKSPACE
========================================================= */

function openLessonWorkspace(
    course
) {


    if (
        !isCourseEnrolled(
            course.id
        )
    ) {


        showMessage(
            "Enrol in this course before opening lessons.",
            "error"
        );


        return;


    }


    const progress =
        getCourseProgressData(
            course.id
        );


    const url =
        new URL(
            LESSON_URL
        );


    url.searchParams.set(
        "course",
        course.id
    );


    /* =====================================================
       RESUME LAST LESSON
    ===================================================== */

    if (
        progress?.currentLessonId
    ) {


        url.searchParams.set(
            "lesson",
            progress.currentLessonId
        );


    }


    window.location.href =
        url.href;


}


/* =========================================================
   STATISTICS
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


    if (
        elements.resultCount
    ) {


        elements.resultCount
            .textContent =
                count === 1

                    ? "1 course"

                    : `${count} courses`;


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


    if (
        elements.sectionTitle
    ) {


        elements.sectionTitle
            .textContent =
                titles[
                    state.activeFilter
                ] ||
                "Courses";


    }


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


    if (
        elements.searchInput
    ) {


        elements.searchInput.value =
            "";


    }


    if (
        elements.categoryFilter
    ) {


        elements.categoryFilter.value =
            "all";


    }


    updateActiveFilterTab();


    updateURLFilter();


    renderCourses();


}


/* =========================================================
   COURSE DETAIL DIALOG
========================================================= */

function initialiseCourseDialog() {


    elements.courseDialogClose
        ?.addEventListener(
            "click",
            closeCourseDetails
        );


    elements.courseDialog
        ?.addEventListener(
            "click",
            event => {


                if (
                    event.target ===
                    elements.courseDialog
                ) {


                    closeCourseDetails();


                }


            }
        );


}


/* =========================================================
   OPEN COURSE DETAILS
========================================================= */

function openCourseDetails(
    course
) {


    if (
        !elements.courseDialog
    ) {


        /* =================================================
           FALLBACK
        ================================================= */

        if (
            isCourseEnrolled(
                course.id
            )
        ) {


            openLessonWorkspace(
                course
            );


        }


        return;


    }


    state.selectedCourseId =
        course.id;


    const enrolled =
        isCourseEnrolled(
            course.id
        );


    const progress =
        getCourseProgress(
            course.id
        );


    /* =====================================================
       HEADER
    ===================================================== */

    setText(
        "course-detail-kicker",
        `${course.category || "Course"} · ${course.level || "Beginner"}`
    );


    setText(
        "course-detail-title",
        course.title ||
        "CodeLab Course"
    );


    setText(
        "course-detail-description",
        course.description ||
        ""
    );


    /* =====================================================
       OUTCOME
    ===================================================== */

    setText(
        "course-detail-outcome",
        course.outcome ||
        "Build practical software-development skills through structured learning."
    );


    /* =====================================================
       CONTENT
    ===================================================== */

    renderCourseDetailBadges(
        course,
        enrolled
    );


    renderCourseDetailMeta(
        course,
        progress
    );


    renderCourseDetailSkills(
        course
    );


    renderCourseDetailPrerequisites(
        course
    );


    renderCourseCurriculum(
        course
    );


    renderCourseDialogAction(
        course,
        enrolled,
        progress
    );


    /* =====================================================
       SHOW
    ===================================================== */

    if (
        typeof elements.courseDialog
            .showModal ===
        "function"
    ) {


        elements.courseDialog
            .showModal();


    } else {


        elements.courseDialog
            .setAttribute(
                "open",
                ""
            );


    }


}


/* =========================================================
   CLOSE COURSE DETAILS
========================================================= */

function closeCourseDetails() {


    if (
        elements.courseDialog
    ) {


        if (
            typeof elements.courseDialog
                .close ===
            "function" &&
            elements.courseDialog.open
        ) {


            elements.courseDialog
                .close();


        } else {


            elements.courseDialog
                .removeAttribute(
                    "open"
                );


        }


    }


    state.selectedCourseId =
        null;


}


/* =========================================================
   DETAIL BADGES
========================================================= */

function renderCourseDetailBadges(
    course,
    enrolled
) {


    const container =
        document.getElementById(
            "course-detail-badges"
        );


    if (!container) {

        return;


    }


    container.innerHTML = `

        ${createAccessBadge(
            course
        )}

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

        ${
            enrolled &&
            getCourseProgress(
                course.id
            ) >= 100

                ? `

                    <span
                        class="student-course-badge enrolled"
                    >
                        Completed
                    </span>

                `

                : ""
        }

    `;


}


/* =========================================================
   DETAIL META
========================================================= */

function renderCourseDetailMeta(
    course,
    progress
) {


    const container =
        document.getElementById(
            "course-detail-meta"
        );


    if (!container) {

        return;


    }


    container.innerHTML = `

        <div>

            <strong>
                ${escapeHtml(
                    course.duration ||
                    "Self-paced"
                )}
            </strong>

            <span>
                Duration
            </span>

        </div>


        <div>

            <strong>
                ${safeNumber(
                    course.hours
                )}
            </strong>

            <span>
                Hours
            </span>

        </div>


        <div>

            <strong>
                ${getModuleCount(
                    course
                )}
            </strong>

            <span>
                Modules
            </span>

        </div>


        <div>

            <strong>
                ${safeNumber(
                    course.projects
                )}
            </strong>

            <span>
                Projects
            </span>

        </div>


        <div>

            <strong>
                ${safeNumber(
                    course.assessments
                )}
            </strong>

            <span>
                Assessments
            </span>

        </div>


        <div>

            <strong>
                ${progress}%
            </strong>

            <span>
                Progress
            </span>

        </div>

    `;


}


/* =========================================================
   DETAIL SKILLS
========================================================= */

function renderCourseDetailSkills(
    course
) {


    const container =
        document.getElementById(
            "course-detail-skills"
        );


    if (!container) {

        return;


    }


    const skills =
        Array.isArray(
            course.skills
        )

            ? course.skills

            : [];


    container.innerHTML =
        skills.length > 0

            ? skills
                .map(
                    skill => `

                        <span>
                            ${escapeHtml(
                                skill
                            )}
                        </span>

                    `
                )
                .join("")

            : `

                <span>
                    Course Fundamentals
                </span>

            `;


}


/* =========================================================
   DETAIL PREREQUISITES
========================================================= */

function renderCourseDetailPrerequisites(
    course
) {


    const container =
        document.getElementById(
            "course-detail-prerequisites"
        );


    if (!container) {

        return;


    }


    const prerequisites =
        Array.isArray(
            course.prerequisites
        )

            ? course.prerequisites

            : [];


    container.innerHTML =
        prerequisites.length > 0

            ? prerequisites
                .map(
                    requirement => `

                        <li>

                            ${escapeHtml(
                                requirement
                            )}

                        </li>

                    `
                )
                .join("")

            : `

                <li>
                    No prerequisites required.
                </li>

            `;


}


/* =========================================================
   COURSE CURRICULUM
========================================================= */

function renderCourseCurriculum(
    course
) {


    const container =
        document.getElementById(
            "course-detail-curriculum"
        );


    const countElement =
        document.getElementById(
            "course-detail-module-count"
        );


    if (!container) {

        return;


    }


    const curriculum =
        Array.isArray(
            course.curriculum
        )

            ? course.curriculum

            : [];


    /* =====================================================
       COUNT
    ===================================================== */

    if (
        countElement
    ) {


        countElement.textContent =
            `${curriculum.length} ${
                curriculum.length === 1
                    ? "module"
                    : "modules"
            }`;


    }


    /* =====================================================
       NO CURRICULUM
    ===================================================== */

    if (
        curriculum.length ===
        0
    ) {


        container.innerHTML = `

            <div
                class="course-detail-empty-curriculum"
            >

                Curriculum will be published
                when this course becomes available.

            </div>

        `;


        return;


    }


    /* =====================================================
       MODULES
    ===================================================== */

    container.innerHTML =
        curriculum
            .map(
                (
                    courseModule,
                    moduleIndex
                ) => {


                    const lessons =
                        Array.isArray(
                            courseModule.lessons
                        )

                            ? courseModule.lessons

                            : [];


                    return `

                        <details
                            class="course-detail-module"
                            ${
                                moduleIndex === 0
                                    ? "open"
                                    : ""
                            }
                        >


                            <summary>


                                <span>

                                    Module ${
                                        moduleIndex + 1
                                    }

                                </span>


                                <strong>

                                    ${escapeHtml(
                                        courseModule.title ||
                                        `Module ${
                                            moduleIndex + 1
                                        }`
                                    )}

                                </strong>


                                <small>

                                    ${lessons.length}

                                    ${
                                        lessons.length === 1
                                            ? "lesson"
                                            : "lessons"
                                    }

                                </small>


                            </summary>


                            ${
                                courseModule.description

                                    ? `

                                        <p
                                            class="course-detail-module-description"
                                        >

                                            ${escapeHtml(
                                                courseModule.description
                                            )}

                                        </p>

                                    `

                                    : ""
                            }


                            <div
                                class="course-detail-lessons"
                            >


                                ${lessons
                                    .map(
                                        (
                                            lesson,
                                            lessonIndex
                                        ) => `

                                            <div
                                                class="course-detail-lesson"
                                            >


                                                <span>

                                                    ${
                                                        lessonIndex + 1
                                                    }

                                                </span>


                                                <div>


                                                    <strong>

                                                        ${escapeHtml(
                                                            lesson.title ||
                                                            "Lesson"
                                                        )}

                                                    </strong>


                                                    <small>

                                                        ${escapeHtml(
                                                            formatLessonType(
                                                                lesson.type
                                                            )
                                                        )}

                                                        ·

                                                        ${escapeHtml(
                                                            lesson.duration ||
                                                            "20 min"
                                                        )}

                                                        ${
                                                            lesson.preview

                                                                ? " · Preview"

                                                                : ""
                                                        }

                                                    </small>


                                                </div>


                                            </div>

                                        `
                                    )
                                    .join("")}


                            </div>


                        </details>

                    `;


                }
            )
            .join("");


}


/* =========================================================
   COURSE DIALOG ACTION
========================================================= */

function renderCourseDialogAction(
    course,
    enrolled,
    progress
) {


    const container =
        document.getElementById(
            "course-detail-action"
        );


    if (!container) {

        return;


    }


    /* =====================================================
       COMING SOON
    ===================================================== */

    if (
        isComingSoon(
            course
        )
    ) {


        container.innerHTML = `

            <button
                type="button"
                class="student-course-action"
                disabled
            >
                Course Coming Soon
            </button>

        `;


        return;


    }


    /* =====================================================
       ENROLLED
    ===================================================== */

    if (enrolled) {


        const label =
            progress >= 100

                ? "Review Course →"

                : progress > 0

                    ? "Continue Course →"

                    : "Start Course →";


        container.innerHTML = `

            <button
                type="button"
                class="student-course-action primary"
                id="course-detail-continue"
            >
                ${label}
            </button>

        `;


        document
            .getElementById(
                "course-detail-continue"
            )
            ?.addEventListener(
                "click",
                () => {


                    openLessonWorkspace(
                        course
                    );


                }
            );


        return;


    }


    /* =====================================================
       PRO COURSE
    ===================================================== */

    if (
        String(
            course.access ||
            ""
        )
            .toLowerCase() ===
        "pro"
    ) {


        container.innerHTML = `

            <a
                href="${PRICING_URL}"
                class="student-course-action pro"
            >
                View CodeLab Pro
            </a>

        `;


        return;


    }


    /* =====================================================
       FREE ENROLMENT
    ===================================================== */

    container.innerHTML = `

        <button
            type="button"
            class="student-course-action primary"
            id="course-detail-enroll"
        >
            Enroll Free
        </button>

    `;


    document
        .getElementById(
            "course-detail-enroll"
        )
        ?.addEventListener(
            "click",
            async () => {


                closeCourseDetails();


                await enrolInFreeCourse(
                    course
                );


            }
        );


}


/* =========================================================
   GET COURSE
========================================================= */

function getCourseById(
    courseId
) {


    return state.courses.find(
        course =>
            course.id ===
            courseId
    ) || null;


}


/* =========================================================
   MODULE COUNT
========================================================= */

function getModuleCount(
    course
) {


    if (
        Array.isArray(
            course.curriculum
        ) &&
        course.curriculum.length > 0
    ) {


        return course.curriculum
            .length;


    }


    return safeNumber(
        course.modules
    );


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
            .split(
                /\s+/
            )
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
   LESSON TYPE
========================================================= */

function formatLessonType(
    value
) {


    return String(
        value ||
        "lesson"
    )
        .replaceAll(
            "-",
            " "
        )
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


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


    /* =====================================================
       OPEN
    ===================================================== */

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


        document.body.classList.add(
            "student-nav-open"
        );


    }


    /* =====================================================
       CLOSE
    ===================================================== */

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


        document.body.classList.remove(
            "student-nav-open"
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


                if (
                    elements.courseDialog?.open
                ) {


                    closeCourseDetails();


                }


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
                    event => {


                        event.preventDefault();


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
                            )} will be connected as we continue building the CodeLab student portal.`,
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
   COURSE LIBRARY SCROLL
========================================================= */

function scrollToCourseLibrary() {


    document
        .getElementById(
            "course-library"
        )
        ?.scrollIntoView(
            {

                behavior:
                    "smooth",

                block:
                    "start"

            }
        );


}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "info"
) {


    const element =
        elements.message;


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
        String(
            message ||
            ""
        );


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


    if (
        elements.loadingScreen
    ) {


        elements.loadingScreen.hidden =
            !loading;


    }


}


/* =========================================================
   ERRORS
========================================================= */

function getErrorMessage(
    error
) {


    const code =
        String(
            error?.code ||
            error?.message ||
            ""
        );


    if (
        code.includes(
            "permission-denied"
        )
    ) {


        return "CodeLab could not access your course information. Check the Firestore security rules.";


    }


    if (
        code.includes(
            "student-profile-not-found"
        )
    ) {


        return "Your Firebase account exists, but your CodeLab student profile could not be found.";


    }


    if (
        code.includes(
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


    const name =
        String(
            value ||
            ""
        )
            .trim()
            .replace(
                /\s+/g,
                " "
            );


    return name ||
        "Student";


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
   NUMBER
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
   CLAMP
========================================================= */

function clamp(
    number,
    minimum,
    maximum
) {


    const value =
        Number(
            number
        );


    if (
        !Number.isFinite(
            value
        )
    ) {


        return minimum;


    }


    return Math.min(
        maximum,
        Math.max(
            minimum,
            value
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
            value ??
            ""
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
   HTML ESCAPE
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


    getCourses() {


        return [
            ...state.courses
        ];


    },


    getEnrolledCourses,


    getCourseProgress,


    openCourse(
        courseId
    ) {


        const course =
            getCourseById(
                courseId
            );


        if (
            course
        ) {


            openCourseDetails(
                course
            );


        }


    },


    continueCourse(
        courseId
    ) {


        const course =
            getCourseById(
                courseId
            );


        if (
            course
        ) {


            openLessonWorkspace(
                course
            );


        }


    },


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


/* =========================================================
   DEBUG
========================================================= */

console.log(
    "CWS CodeLab student-courses.js loaded."
);
