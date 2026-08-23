/* =========================================================
   CWS CODELAB
   Public Course Catalogue
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
       EXISTING COURSES

       These come from:
       data/courses.js
    ===================================================== */

    const existingCourses =
        Array.isArray(window.CWS_COURSES)
            ? window.CWS_COURSES
            : [];


    /* =====================================================
       UPCOMING COURSES

       These are visible in the public catalogue but are not
       yet linked to course-details.html until full curricula
       are created in data/courses.js.
    ===================================================== */

    const upcomingCourses = [

        /* -------------------------------------------------
           JAVA
        ------------------------------------------------- */

        {
            id: "java-programming",

            title:
                "Java Programming",

            shortTitle:
                "Java",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                32,

            modules:
                10,

            projects:
                5,

            icon:
                "JV",

            accent:
                "orange",

            description:
                "Learn Java syntax, object-oriented programming, collections, exceptions, file handling and practical application development.",

            skills: [
                "Java",
                "OOP",
                "Collections",
                "Exceptions",
                "Files"
            ]

        },


        /* -------------------------------------------------
           C#
        ------------------------------------------------- */

        {
            id: "csharp-dotnet",

            title:
                "C# & .NET Fundamentals",

            shortTitle:
                "C#",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                32,

            modules:
                10,

            projects:
                5,

            icon:
                "C#",

            accent:
                "violet",

            description:
                "Learn C# syntax, object-oriented programming, collections, LINQ and the foundations of building modern applications with .NET.",

            skills: [
                "C#",
                ".NET",
                "OOP",
                "LINQ",
                "Collections"
            ]

        },


        /* -------------------------------------------------
           C++
        ------------------------------------------------- */

        {
            id: "cpp-programming",

            title:
                "C++ Programming",

            shortTitle:
                "C++",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                34,

            modules:
                11,

            projects:
                5,

            icon:
                "C++",

            accent:
                "blue",

            description:
                "Learn C++ fundamentals, control flow, functions, pointers, memory management, classes, object-oriented programming and the Standard Template Library.",

            skills: [
                "C++",
                "Pointers",
                "Memory",
                "OOP",
                "STL"
            ]

        },


        /* -------------------------------------------------
           REACT
        ------------------------------------------------- */

        {
            id: "react-development",

            title:
                "React Development",

            shortTitle:
                "React",

            category:
                "Web Development",

            level:
                "Intermediate",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "8 weeks",

            hours:
                28,

            modules:
                9,

            projects:
                5,

            icon:
                "RE",

            accent:
                "cyan",

            description:
                "Build modern front-end applications using reusable components, React Hooks, state management, forms, routing and APIs.",

            skills: [
                "React",
                "Components",
                "Hooks",
                "State",
                "APIs"
            ]

        },


        /* -------------------------------------------------
           NODE.JS
        ------------------------------------------------- */

        {
            id: "nodejs-backend",

            title:
                "Node.js Backend Development",

            shortTitle:
                "Node.js",

            category:
                "Web Development",

            level:
                "Intermediate",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "8 weeks",

            hours:
                30,

            modules:
                9,

            projects:
                5,

            icon:
                "ND",

            accent:
                "green",

            description:
                "Learn server-side JavaScript, Node.js, Express, REST APIs, middleware, authentication and backend application development.",

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
       COMBINE CATALOGUE
    ===================================================== */

    const catalogueCourses = [
        ...existingCourses,
        ...upcomingCourses
    ];


    /* =====================================================
       FILTER STATE
    ===================================================== */

    let activeCategory =
        "all";


    /* =====================================================
       NORMALIZE COURSE

       Existing courses contain richer curriculum data.
       Upcoming courses currently contain catalogue metadata.

       This function gives both the same structure for the
       catalogue renderer.
    ===================================================== */

    function normalizeCourse(course) {

        const curriculum =
            Array.isArray(course.curriculum)
                ? course.curriculum
                : [];


        return {

            id:
                course.id || "",


            title:
                course.title ||
                "Untitled Course",


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
                curriculum.length > 0
                    ? curriculum.length
                    : Number(course.modules) || 0,


            projects:
                Number(course.projects) || 0,


            assessments:
                Number(course.assessments) || 0,


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
       RENDER COURSES
    ===================================================== */

    function renderCourses() {

        if (!catalogueGrid) {

            return;

        }


        /* -------------------------------------------------
           SEARCH
        ------------------------------------------------- */

        const query =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        /* -------------------------------------------------
           LEVEL
        ------------------------------------------------- */

        const selectedLevel =
            levelFilter?.value ||
            "all";


        /* -------------------------------------------------
           ACCESS
        ------------------------------------------------- */

        const selectedAccess =
            accessFilter?.value ||
            "all";


        /* -------------------------------------------------
           FILTER COURSES
        ------------------------------------------------- */

        const filteredCourses =
            catalogueCourses

                .map(
                    normalizeCourse
                )

                .filter(course => {


                    /* ================================
                       SEARCH TEXT
                    ================================ */

                    const searchText = [

                        course.title,

                        course.shortTitle,

                        course.category,

                        course.level,

                        course.description,

                        ...course.skills

                    ]
                        .join(" ")
                        .toLowerCase();


                    const matchesSearch =
                        !query ||
                        searchText.includes(
                            query
                        );


                    /* ================================
                       CATEGORY
                    ================================ */

                    const normalizedCategory =
                        course.category
                            .toLowerCase();


                    const matchesCategory =
                        activeCategory === "all" ||

                        normalizedCategory ===
                            activeCategory;


                    /* ================================
                       LEVEL
                    ================================ */

                    const matchesLevel =
                        selectedLevel === "all" ||

                        course.level
                            .toLowerCase() ===
                            selectedLevel;


                    /* ================================
                       ACCESS
                    ================================ */

                    const normalizedAccess =
                        course.status === "coming-soon"

                            ? "coming-soon"

                            : course.access
                                .toLowerCase();


                    const matchesAccess =
                        selectedAccess === "all" ||

                        normalizedAccess ===
                            selectedAccess;


                    return (

                        matchesSearch &&

                        matchesCategory &&

                        matchesLevel &&

                        matchesAccess

                    );

                });


        /* -------------------------------------------------
           HTML
        ------------------------------------------------- */

        catalogueGrid.innerHTML =
            filteredCourses
                .map(
                    createCourseCard
                )
                .join("");


        /* -------------------------------------------------
           STATUS
        ------------------------------------------------- */

        if (resultsStatus) {

            const count =
                filteredCourses.length;


            resultsStatus.textContent =
                `${count} ${
                    count === 1
                        ? "course"
                        : "courses"
                } found`;

        }


        /* -------------------------------------------------
           EMPTY STATE
        ------------------------------------------------- */

        if (emptyState) {

            emptyState.hidden =
                filteredCourses.length !== 0;

        }


        catalogueGrid.hidden =
            filteredCourses.length === 0;

    }


    /* =====================================================
       CREATE COURSE CARD
    ===================================================== */

    function createCourseCard(course) {

        const isComingSoon =
            course.status ===
            "coming-soon";


        /* -------------------------------------------------
           ACCESS BADGE
        ------------------------------------------------- */

        let accessClass =
            "free";


        let accessLabel =
            course.access;


        if (isComingSoon) {

            accessClass =
                "coming-soon";

            accessLabel =
                "Coming Soon";

        }

        else if (
            course.access
                .toLowerCase() ===
            "pro"
        ) {

            accessClass =
                "pro";

        }


        /* -------------------------------------------------
           SKILLS
        ------------------------------------------------- */

        const skills =
            course.skills

                .slice(
                    0,
                    5
                )

                .map(skill => `

                    <span>
                        ${escapeHtml(skill)}
                    </span>

                `)

                .join("");


        /* -------------------------------------------------
           ACTION
        ------------------------------------------------- */

        let action;


        if (isComingSoon) {

            action = `

                <span
                    class="course-action course-coming-soon"
                >
                    Coming Soon
                </span>

            `;

        }

        else {

            action = `

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

        }


        /* -------------------------------------------------
           CARD
        ------------------------------------------------- */

        return `

            <article
                class="catalogue-card"
                data-course-id="${escapeHtml(
                    course.id
                )}"
            >


                <!-- TOP -->

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


                <!-- CATEGORY -->

                <p class="catalogue-card-kicker">

                    ${escapeHtml(
                        course.category
                    )}

                    ·

                    ${escapeHtml(
                        course.level
                    )}

                </p>


                <!-- TITLE -->

                <h3>

                    ${escapeHtml(
                        course.title
                    )}

                </h3>


                <!-- DESCRIPTION -->

                <p class="catalogue-card-description">

                    ${escapeHtml(
                        course.description
                    )}

                </p>


                <!-- SKILLS -->

                <div class="catalogue-skills">

                    ${skills}

                </div>


                <!-- STATS -->

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


                <!-- FOOTER -->

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
                    (
                        button.dataset.category ||
                        "all"
                    )
                        .toLowerCase();


                /* -----------------------------------------
                   ACTIVE BUTTON
                ----------------------------------------- */

                categoryButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


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
       LEVEL FILTER
    ===================================================== */

    levelFilter?.addEventListener(
        "change",
        renderCourses
    );


    /* =====================================================
       ACCESS FILTER
    ===================================================== */

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


            /* SEARCH */

            if (searchInput) {

                searchInput.value =
                    "";

            }


            /* LEVEL */

            if (levelFilter) {

                levelFilter.value =
                    "all";

            }


            /* ACCESS */

            if (accessFilter) {

                accessFilter.value =
                    "all";

            }


            /* CATEGORY */

            activeCategory =
                "all";


            categoryButtons.forEach(
                button => {

                    const isAll =
                        button.dataset.category ===
                        "all";


                    button.classList.toggle(
                        "active",
                        isAll
                    );

                }
            );


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

        return String(
            value ?? ""
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


    /* =====================================================
       INITIAL RENDER
    ===================================================== */

    renderCourses();


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "CWS CodeLab public catalogue initialized."
    );


    console.log(
        `Existing courses: ${existingCourses.length}`
    );


    console.log(
        `Upcoming courses: ${upcomingCourses.length}`
    );


    console.log(
        `Total catalogue courses: ${catalogueCourses.length}`
    );

});
