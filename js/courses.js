/* =========================================================
   CWS CODELAB
   PUBLIC COURSE CATALOGUE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const catalogueGrid =
        document.getElementById("catalogue-grid");

    const searchInput =
        document.getElementById("course-search");

    const levelFilter =
        document.getElementById("level-filter");

    const accessFilter =
        document.getElementById("access-filter");

    const categoryButtons =
        document.querySelectorAll(".category-filter");

    const resultsStatus =
        document.getElementById("results-status");

    const emptyState =
        document.getElementById("course-empty-state");

    const resetButton =
        document.getElementById("reset-course-filters");

    const totalCourseCount =
        document.getElementById("total-course-count");


    /* =====================================================
       CURRENT COURSE DATA
    ===================================================== */

    const existingCourses =
        Array.isArray(window.CWS_COURSES)
            ? window.CWS_COURSES
            : [];


    /* =====================================================
       FUTURE / EXPANDED CODELAB COURSES

       These appear in the public catalogue but do not yet
       link to lesson content until their curricula are built.
    ===================================================== */

    const upcomingCourses = [

        {
            id: "java-programming",
            title: "Java Programming",
            shortTitle: "Java",
            category: "Programming",
            level: "Beginner",
            access: "Coming Soon",
            status: "coming-soon",
            duration: "10 weeks",
            hours: 32,
            modules: 10,
            projects: 5,
            icon: "JV",
            accent: "orange",

            description:
                "Learn Java syntax, object-oriented programming, collections, exceptions, file handling and application development.",

            skills: [
                "Java",
                "OOP",
                "Collections",
                "Exceptions",
                "Files"
            ]
        },


        {
            id: "csharp-dotnet",
            title: "C# & .NET Fundamentals",
            shortTitle: "C#",
            category: "Programming",
            level: "Beginner",
            access: "Coming Soon",
            status: "coming-soon",
            duration: "10 weeks",
            hours: 32,
            modules: 10,
            projects: 5,
            icon: "C#",
            accent: "violet",

            description:
                "Learn C# syntax, object-oriented programming, collections, LINQ and the foundations of building applications with .NET.",

            skills: [
                "C#",
                ".NET",
                "OOP",
                "LINQ",
                "Collections"
            ]
        },


        {
            id: "react-development",
            title: "React Development",
            shortTitle: "React",
            category: "Web Development",
            level: "Intermediate",
            access: "Coming Soon",
            status: "coming-soon",
            duration: "8 weeks",
            hours: 28,
            modules: 9,
            projects: 5,
            icon: "RE",
            accent: "cyan",

            description:
                "Build reusable components, manage application state, work with APIs and create modern front-end applications with React.",

            skills: [
                "React",
                "Components",
                "Hooks",
                "State",
                "APIs"
            ]
        },


        {
            id: "nodejs-backend",
            title: "Node.js Backend Development",
            shortTitle: "Node.js",
            category: "Web Development",
            level: "Intermediate",
            access: "Coming Soon",
            status: "coming-soon",
            duration: "8 weeks",
            hours: 30,
            modules: 9,
            projects: 5,
            icon: "ND",
            accent: "green",

            description:
                "Learn server-side JavaScript, REST APIs, Express, middleware, authentication and backend application development.",

            skills: [
                "Node.js",
                "Express",
                "REST APIs",
                "Authentication",
                "Backend"
            ]
        }

    ];


    /* =====================================================
       COMPLETE PUBLIC CATALOGUE
    ===================================================== */

    const catalogueCourses = [
        ...existingCourses,
        ...upcomingCourses
    ];


    /* =====================================================
       FILTER STATE
    ===================================================== */

    let activeCategory = "all";


    /* =====================================================
       NORMALIZE EXISTING DATA
    ===================================================== */

    function normalizeCourse(course) {

        return {

            id:
                course.id || "",

            title:
                course.title || "Untitled Course",

            shortTitle:
                course.shortTitle ||
                course.title ||
                "Course",

            category:
                course.category ||
                "Programming",

            level:
                course.level ||
                "Beginner",

            access:
                course.access ||
                "Free",

            status:
                course.status ||
                "available",

            duration:
                course.duration ||
                "Self-paced",

            hours:
                Number(course.hours) || 0,

            modules:
                Array.isArray(course.curriculum)
                    ? course.curriculum.length
                    : Number(course.modules) || 0,

            projects:
                Number(course.projects) || 0,

            icon:
                course.icon ||
                "CD",

            accent:
                course.accent ||
                "violet",

            description:
                course.description ||
                "",

            skills:
                Array.isArray(course.skills)
                    ? course.skills
                    : []

        };

    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderCourses() {

        if (!catalogueGrid) {
            return;
        }


        const query =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        const selectedLevel =
            levelFilter?.value || "all";


        const selectedAccess =
            accessFilter?.value || "all";


        const filteredCourses =
            catalogueCourses

                .map(normalizeCourse)

                .filter(course => {


                    /* SEARCH */

                    const searchText = [
                        course.title,
                        course.category,
                        course.level,
                        course.description,
                        ...course.skills
                    ]
                        .join(" ")
                        .toLowerCase();


                    const matchesSearch =
                        !query ||
                        searchText.includes(query);


                    /* CATEGORY */

                    const matchesCategory =
                        activeCategory === "all" ||

                        course.category
                            .toLowerCase() ===
                            activeCategory;


                    /* LEVEL */

                    const matchesLevel =
                        selectedLevel === "all" ||

                        course.level
                            .toLowerCase() ===
                            selectedLevel;


                    /* ACCESS */

                    const accessValue =
                        course.status === "coming-soon"
                            ? "coming-soon"
                            : course.access.toLowerCase();


                    const matchesAccess =
                        selectedAccess === "all" ||
                        accessValue === selectedAccess;


                    return (
                        matchesSearch &&
                        matchesCategory &&
                        matchesLevel &&
                        matchesAccess
                    );

                });


        catalogueGrid.innerHTML =
            filteredCourses
                .map(createCourseCard)
                .join("");


        if (resultsStatus) {

            resultsStatus.textContent =
                `${filteredCourses.length} ${
                    filteredCourses.length === 1
                        ? "course"
                        : "courses"
                } found`;

        }


        if (emptyState) {

            emptyState.hidden =
                filteredCourses.length !== 0;

        }


        catalogueGrid.hidden =
            filteredCourses.length === 0;

    }


    /* =====================================================
       COURSE CARD
    ===================================================== */

    function createCourseCard(course) {

        const isComingSoon =
            course.status === "coming-soon";


        const accessClass =
            isComingSoon
                ? "pro"
                : course.access
                    .toLowerCase() === "pro"
                    ? "pro"
                    : "free";


        const accessLabel =
            isComingSoon
                ? "Coming Soon"
                : course.access;


        const skills =
            course.skills
                .slice(0, 4)
                .map(skill => `
                    <span>
                        ${escapeHtml(skill)}
                    </span>
                `)
                .join("");


        const action =
            isComingSoon
                ? `
                    <span class="course-action">
                        Coming Soon
                    </span>
                `
                : `
                    <a
                        href="course-details.html?course=${encodeURIComponent(
                            course.id
                        )}"
                        class="course-action"
                        aria-label="View ${escapeHtml(
                            course.title
                        )}"
                    >
                        View Course →
                    </a>
                `;


        return `
            <article class="catalogue-card">

                <div class="catalogue-card-top">

                    <div
                        class="catalogue-icon"
                        data-accent="${escapeHtml(
                            course.accent
                        )}"
                    >
                        ${escapeHtml(
                            course.icon
                        )}
                    </div>


                    <span
                        class="access-badge ${accessClass}"
                    >
                        ${escapeHtml(
                            accessLabel
                        )}
                    </span>

                </div>


                <p class="catalogue-card-kicker">

                    ${escapeHtml(
                        course.category
                    )}
                    ·
                    ${escapeHtml(
                        course.level
                    )}

                </p>


                <h3>
                    ${escapeHtml(
                        course.title
                    )}
                </h3>


                <p class="catalogue-card-description">

                    ${escapeHtml(
                        course.description
                    )}

                </p>


                <div class="catalogue-skills">

                    ${skills}

                </div>


                <div class="course-stats">


                    <div>

                        <strong>
                            ${course.modules}
                        </strong>

                        <span>
                            Modules
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${course.hours}
                        </strong>

                        <span>
                            Hours
                        </span>

                    </div>


                    <div>

                        <strong>
                            ${course.projects}
                        </strong>

                        <span>
                            Projects
                        </span>

                    </div>


                </div>


                <div class="catalogue-card-footer">

                    <span class="course-duration">
                        ${escapeHtml(
                            course.duration
                        )}
                    </span>

                    ${action}

                </div>

            </article>
        `;

    }


    /* =====================================================
       CATEGORY FILTERS
    ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                activeCategory =
                    button.dataset.category ||
                    "all";


                categoryButtons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                renderCourses();

            }
        );

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    searchInput?.addEventListener(
        "input",
        renderCourses
    );


    /* =====================================================
       SELECT FILTERS
    ===================================================== */

    levelFilter?.addEventListener(
        "change",
        renderCourses
    );


    accessFilter?.addEventListener(
        "change",
        renderCourses
    );


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    resetButton?.addEventListener(
        "click",
        () => {

            if (searchInput) {
                searchInput.value = "";
            }


            if (levelFilter) {
                levelFilter.value = "all";
            }


            if (accessFilter) {
                accessFilter.value = "all";
            }


            activeCategory = "all";


            categoryButtons.forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.category === "all"
                );

            });


            renderCourses();

        }
    );


    /* =====================================================
       TOTAL COURSE COUNT
    ===================================================== */

    if (totalCourseCount) {

        totalCourseCount.textContent =
            `${catalogueCourses.length}+`;

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(value) {

        return String(value ?? "")

            .replaceAll("&", "&amp;")

            .replaceAll("<", "&lt;")

            .replaceAll(">", "&gt;")

            .replaceAll('"', "&quot;")

            .replaceAll("'", "&#039;");

    }


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderCourses();


    console.log(
        `CWS CodeLab catalogue loaded: ${catalogueCourses.length} courses.`
    );

});
