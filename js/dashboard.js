/* =========================================================
   CWS CODELAB
   STUDENT DASHBOARD

   Firebase Authentication will be connected next.

   This file currently handles:
   - Dashboard mobile navigation
   - Student UI rendering
   - Dashboard statistics rendering
   - Loading state
   - Dashboard messages
   - Temporary pre-Firebase sign-out behaviour
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


        const signOutButton =
            document.getElementById(
                "sign-out-button"
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
                new Date().getFullYear();

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
        ===================================================== */

        futurePageButtons.forEach(
            button => {


                button.addEventListener(
                    "click",
                    () => {


                        const page =
                            button.dataset
                                .futurePage;


                        showDashboardMessage(
                            `${formatFuturePageName(
                                page
                            )} will be connected as we build the student portal.`,
                            "info"
                        );


                    }
                );


            }
        );


        /* =====================================================
           SIGN OUT

           Firebase signOut() will replace this behaviour.
        ===================================================== */

        signOutButton?.addEventListener(
            "click",
            () => {


                showDashboardMessage(
                    "Sign out will become active when Firebase Authentication is connected.",
                    "info"
                );


            }
        );


        /* =====================================================
           SET STUDENT

           Firebase auth will call this after onAuthStateChanged().
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
                student.email ||
                "student@codelab.local";


            const initial =
                getInitial(
                    name
                );


            setText(
                "student-name",
                name
            );


            setText(
                "sidebar-student-name",
                name
            );


            setText(
                "profile-student-name",
                name
            );


            setText(
                "welcome-student-name",
                `${firstName(name)}.`
            );


            setText(
                "student-email",
                email
            );


            setText(
                "profile-student-email",
                email
            );


            setText(
                "student-avatar",
                initial
            );


            setText(
                "topbar-student-avatar",
                initial
            );


            setText(
                "profile-student-avatar",
                initial
            );


            if (
                student.createdAt
            ) {


                setText(
                    "profile-member-since",
                    formatDate(
                        student.createdAt
                    )
                );


            }


            if (
                student.plan
            ) {


                setText(
                    "profile-account-status",
                    student.plan
                );


            }


        }


        /* =====================================================
           SET DASHBOARD STATISTICS
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


        }


        /* =====================================================
           LOADING STATE

           Firebase auth guard will use this while checking
           whether a user is logged in.
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


            const allowedTypes =
                [
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


            element.hidden =
                true;


            element.textContent =
                "";


            element.className =
                "dashboard-message";


        }


        /* =====================================================
           HELPERS
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
                    value ?? ""
                );


        }


        function normaliseName(
            value
        ) {


            const name =
                String(
                    value || ""
                )
                    .trim();


            return name ||
                "Student";


        }


        function firstName(
            name
        ) {


            return normaliseName(
                name
            )
                .split(/\s+/)[0];


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


        function formatDate(
            dateValue
        ) {


            const date =
                dateValue instanceof Date

                    ? dateValue

                    : new Date(
                        dateValue
                    );


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

           Firebase files can use these functions without
           duplicating dashboard UI logic.
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
                clearDashboardMessage


        };


        /* =====================================================
           INITIAL PLACEHOLDER STATE
        ===================================================== */

        setStudent(
            {

                displayName:
                    "Student",

                email:
                    "student@codelab.local",

                plan:
                    "Free"

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
            "CWS CodeLab student dashboard initialized."
        );


    }
);
