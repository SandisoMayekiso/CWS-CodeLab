/* =========================================================
   CWS CODELAB
   STUDENT DASHBOARD UI

   Firebase responsibilities are handled by:
   js/auth-guard.js

   This file handles:
   - Mobile sidebar
   - Student UI rendering
   - Dashboard statistics
   - Continue-learning UI
   - Placeholder navigation for pages not built yet
   - Loading screen
   - Dashboard messages

   IMPORTANT:
   Real course navigation uses normal links.
   Real sign out is handled by auth-guard.js.
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const sidebar =
            document.getElementById(
                "dashboard-sidebar"
            );


        const sidebarToggle =
            document.getElementById(
                "sidebar-toggle"
            );


        const sidebarClose =
            document.getElementById(
                "sidebar-close"
            );


        const sidebarOverlay =
            document.getElementById(
                "sidebar-overlay"
            );


        const dashboardYear =
            document.getElementById(
                "dashboard-year"
            );


        const futurePageButtons =
            document.querySelectorAll(
                "[data-future-page]"
            );


        /* =====================================================
           YEAR
        ===================================================== */

        if (dashboardYear) {


            dashboardYear.textContent =
                new Date()
                    .getFullYear();


        }


        /* =====================================================
           SIDEBAR
        ===================================================== */

        function openSidebar() {


            if (!sidebar) {

                return;

            }


            sidebar.classList.add(
                "open"
            );


            sidebarOverlay?.classList.add(
                "open"
            );


            sidebarToggle?.setAttribute(
                "aria-expanded",
                "true"
            );


            document.body.classList.add(
                "dashboard-nav-open"
            );


        }


        function closeSidebar() {


            if (!sidebar) {

                return;

            }


            sidebar.classList.remove(
                "open"
            );


            sidebarOverlay?.classList.remove(
                "open"
            );


            sidebarToggle?.setAttribute(
                "aria-expanded",
                "false"
            );


            document.body.classList.remove(
                "dashboard-nav-open"
            );


        }


        sidebarToggle?.addEventListener(
            "click",
            () => {


                const open =
                    sidebar?.classList.contains(
                        "open"
                    );


                if (open) {

                    closeSidebar();

                } else {

                    openSidebar();

                }


            }
        );


        sidebarClose?.addEventListener(
            "click",
            closeSidebar
        );


        sidebarOverlay?.addEventListener(
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


        /* =====================================================
           FUTURE PAGE PLACEHOLDERS

           Only pages we genuinely haven't built yet should
           use data-future-page.

           Courses no longer use this system.
        ===================================================== */

        futurePageButtons.forEach(
            button => {


                button.addEventListener(
                    "click",
                    event => {


                        event.preventDefault();


                        const page =
                            button.dataset
                                .futurePage;


                        showDashboardMessage(
                            `${formatFuturePageName(
                                page
                            )} will be connected as we continue building the CodeLab student portal.`,
                            "info"
                        );


                        /*
                         * If opened through the mobile sidebar,
                         * close the sidebar afterwards.
                         */

                        closeSidebar();


                    }
                );


            }
        );


        /* =====================================================
           STUDENT

           Called by auth-guard.js after Firebase authentication
           and Firestore profile loading have completed.
        ===================================================== */

        function setStudent(
            student = {}
        ) {


            const name =
                normaliseName(
                    student.displayName ||
                    student.name ||
                    "Student"
                );


            const email =
                normaliseEmailDisplay(
                    student.email
                );


            const plan =
                normalisePlan(
                    student.plan
                );


            const accountStatus =
                normaliseAccountStatus(
                    student.accountStatus
                );


            const initial =
                getInitial(
                    name
                );


            /* =================================================
               TOPBAR
            ================================================= */

            setText(
                "student-name",
                name
            );


            setText(
                "student-email",
                email
            );


            setText(
                "topbar-student-avatar",
                initial
            );


            /* =================================================
               SIDEBAR
            ================================================= */

            setText(
                "sidebar-student-name",
                name
            );


            setText(
                "sidebar-student-plan",
                `${plan} Learner`
            );


            setText(
                "student-avatar",
                initial
            );


            /* =================================================
               WELCOME
            ================================================= */

            setText(
                "welcome-student-name",
                `${firstName(
                    name
                )}.`
            );


            /* =================================================
               PROFILE
            ================================================= */

            setText(
                "profile-student-name",
                name
            );


            setText(
                "profile-student-email",
                email
            );


            setText(
                "profile-student-avatar",
                initial
            );


            setText(
                "profile-account-status",
                plan
            );


            setText(
                "profile-learning-status",
                accountStatus
            );


            /* =================================================
               CREATED DATE
            ================================================= */

            if (
                student.createdAt
            ) {


                setText(
                    "profile-member-since",
                    formatDate(
                        student.createdAt
                    )
                );


            } else {


                setText(
                    "profile-member-since",
                    "—"
                );


            }


        }


        /* =====================================================
           DASHBOARD STATISTICS
        ===================================================== */

        function setDashboardStats(
            stats = {}
        ) {


            const courses =
                safeNumber(
                    stats.courses
                );


            const progress =
                clamp(
                    safeNumber(
                        stats.progress
                    ),
                    0,
                    100
                );


            const projects =
                safeNumber(
                    stats.projects
                );


            const certificates =
                safeNumber(
                    stats.certificates
                );


            setText(
                "dashboard-course-count",
                courses
            );


            setText(
                "dashboard-progress-value",
                `${progress}%`
            );


            setText(
                "dashboard-project-count",
                projects
            );


            setText(
                "dashboard-certificate-count",
                certificates
            );


            updateContinueLearningState(
                {

                    courseCount:
                        courses,

                    progress

                }
            );


        }


        /* =====================================================
           CONTINUE LEARNING

           This provides a better dashboard state before we build
           the full "recent course" Firestore functionality.
        ===================================================== */

        function updateContinueLearningState(
            data = {}
        ) {


            const courseCount =
                safeNumber(
                    data.courseCount
                );


            const progress =
                clamp(
                    safeNumber(
                        data.progress
                    ),
                    0,
                    100
                );


            const title =
                document.getElementById(
                    "continue-learning-title"
                );


            const description =
                document.getElementById(
                    "continue-learning-description"
                );


            if (
                courseCount <= 0
            ) {


                if (title) {


                    title.textContent =
                        "Choose your first course";


                }


                if (description) {


                    description.textContent =
                        "Browse all available CodeLab courses, enrol in a free course and begin your developer journey.";


                }


                return;

            }


            if (title) {


                title.textContent =
                    courseCount === 1

                        ? "1 course in your learning library"

                        : `${courseCount} courses in your learning library`;


            }


            if (description) {


                if (
                    progress > 0
                ) {


                    description.textContent =
                        `Your overall progress is currently ${progress}%. Open My Courses to continue where you left off.`;


                } else {


                    description.textContent =
                        "Your enrolled courses are ready. Open My Courses and begin your next lesson.";


                }


            }


        }


        /* =====================================================
           LOADING STATE

           auth-guard.js calls this when authentication/profile
           checks complete.
        ===================================================== */

        function setDashboardLoading(
            loading
        ) {


            const loadingScreen =
                document.getElementById(
                    "dashboard-loading"
                );


            if (!loadingScreen) {

                return;

            }


            loadingScreen.hidden =
                !loading;


        }


        /* =====================================================
           MESSAGE
        ===================================================== */

        function showDashboardMessage(
            message,
            type = "info"
        ) {


            const element =
                document.getElementById(
                    "dashboard-message"
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
                String(
                    message ||
                    ""
                );


            element.className =
                `dashboard-message ${safeType}`;


            element.hidden =
                false;


            window.clearTimeout(
                showDashboardMessage.timeout
            );


            showDashboardMessage.timeout =
                window.setTimeout(
                    () => {


                        element.hidden =
                            true;


                    },
                    5000
                );


        }


        /* =====================================================
           CLEAR MESSAGE
        ===================================================== */

        function clearDashboardMessage() {


            const element =
                document.getElementById(
                    "dashboard-message"
                );


            if (!element) {

                return;

            }


            window.clearTimeout(
                showDashboardMessage.timeout
            );


            element.hidden =
                true;


            element.textContent =
                "";


            element.className =
                "dashboard-message";


        }


        /* =====================================================
           SET TEXT
        ===================================================== */

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


        /* =====================================================
           NAME
        ===================================================== */

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


        function firstName(
            name
        ) {


            return normaliseName(
                name
            )
                .split(
                    /\s+/
                )[0];


        }


        function getInitial(
            name
        ) {


            return firstName(
                name
            )
                .charAt(0)
                .toUpperCase() ||
                "S";


        }


        /* =====================================================
           EMAIL DISPLAY
        ===================================================== */

        function normaliseEmailDisplay(
            value
        ) {


            const email =
                String(
                    value ||
                    ""
                )
                    .trim();


            return email ||
                "CodeLab Student";


        }


        /* =====================================================
           PLAN
        ===================================================== */

        function normalisePlan(
            value
        ) {


            const plan =
                String(
                    value ||
                    "Free"
                )
                    .trim();


            if (!plan) {

                return "Free";

            }


            return (
                plan.charAt(0)
                    .toUpperCase() +
                plan.slice(1)
                    .toLowerCase()
            );


        }


        /* =====================================================
           ACCOUNT STATUS
        ===================================================== */

        function normaliseAccountStatus(
            value
        ) {


            const status =
                String(
                    value ||
                    "Active"
                )
                    .trim();


            if (!status) {

                return "Active";

            }


            return (
                status.charAt(0)
                    .toUpperCase() +
                status.slice(1)
                    .toLowerCase()
            );


        }


        /* =====================================================
           DATE
        ===================================================== */

        function formatDate(
            dateValue
        ) {


            let date;


            if (
                dateValue instanceof
                Date
            ) {


                date =
                    dateValue;


            } else if (
                dateValue &&
                typeof dateValue.toDate ===
                    "function"
            ) {


                date =
                    dateValue.toDate();


            } else {


                date =
                    new Date(
                        dateValue
                    );


            }


            if (
                Number.isNaN(
                    date.getTime()
                )
            ) {


                return "—";


            }


            return new Intl.DateTimeFormat(
                "en-ZA",
                {

                    year:
                        "numeric",

                    month:
                        "short"

                }
            )
                .format(
                    date
                );


        }


        /* =====================================================
           NUMBER
        ===================================================== */

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


        /* =====================================================
           CLAMP
        ===================================================== */

        function clamp(
            number,
            minimum,
            maximum
        ) {


            return Math.min(
                maximum,
                Math.max(
                    minimum,
                    number
                )
            );


        }


        /* =====================================================
           FUTURE PAGE NAME
        ===================================================== */

        function formatFuturePageName(
            value
        ) {


            if (!value) {

                return "This section";

            }


            return String(
                value
            )
                .replaceAll(
                    "-",
                    " "
                )
                .replace(
                    /\b\w/g,
                    character =>
                        character
                            .toUpperCase()
                );


        }


        /* =====================================================
           PUBLIC DASHBOARD API

           auth-guard.js uses these functions.
        ===================================================== */

        window.CWSDashboard = {


            setStudent,


            setStats:
                setDashboardStats,


            setLoading:
                setDashboardLoading,


            showMessage:
                showDashboardMessage,


            clearMessage:
                clearDashboardMessage,


            updateContinueLearning:
                updateContinueLearningState


        };


        /* =====================================================
           INITIAL VISUAL STATE

           The Firebase loading overlay remains visible until
           auth-guard.js authenticates the learner.
        ===================================================== */

        setStudent(
            {

                displayName:
                    "Student",

                email:
                    "Loading account...",

                plan:
                    "Free",

                accountStatus:
                    "Active"

            }
        );


        setDashboardStats(
            {

                courses:
                    0,

                progress:
                    0,

                projects:
                    0,

                certificates:
                    0

            }
        );


        console.log(
            "CWS CodeLab student dashboard UI initialized."
        );


    }
);
