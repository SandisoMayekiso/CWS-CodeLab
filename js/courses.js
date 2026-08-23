/* =========================================================
   CWS CODELAB
   Public Course Catalogue
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =================================================
           ELEMENTS
        ================================================= */

        const catalogueGrid =
            document.getElementById(
                "catalogue-grid"
            );


        const searchInput =
            document.getElementById(
                "course-search"
            );


        const levelFilter =
            document.getElementById(
                "level-filter"
            );


        const accessFilter =
            document.getElementById(
                "access-filter"
            );


        const categoryButtons =
            document.querySelectorAll(
                ".category-filter"
            );


        const resultsStatus =
            document.getElementById(
                "results-status"
            );


        const emptyState =
            document.getElementById(
                "course-empty-state"
            );


        const resetButton =
            document.getElementById(
                "reset-course-filters"
            );


        const totalCourseCount =
            document.getElementById(
                "total-course-count"
            );


        /* =================================================
           FALLBACK AVAILABLE COURSES
        ================================================= */

        const fallbackCurrentCourses = [


            /* =============================================
               PROGRAMMING FUNDAMENTALS
            ============================================== */

            {

                id:
                    "programming-fundamentals",

                title:
                    "Programming Fundamentals",

                shortTitle:
                    "Programming Fundamentals",

                category:
                    "Foundation",

                level:
                    "Beginner",

                access:
                    "Free",

                status:
                    "available",

                duration:
                    "6 weeks",

                hours:
                    18,

                modules:
                    8,

                projects:
                    3,

                assessments:
                    5,

                icon:
                    "PF",

                accent:
                    "violet",

                description:
                    "Build strong programming foundations through variables, data types, operators, conditions, loops, functions, algorithms and debugging.",

                skills: [

                    "Programming Logic",
                    "Variables",
                    "Conditions",
                    "Loops",
                    "Functions"

                ]

            },


            /* =============================================
               HTML & CSS
            ============================================== */

            {

                id:
                    "html-css",

                title:
                    "HTML & CSS",

                shortTitle:
                    "HTML & CSS",

                category:
                    "Web Development",

                level:
                    "Beginner",

                access:
                    "Free",

                status:
                    "available",

                duration:
                    "6 weeks",

                hours:
                    20,

                modules:
                    9,

                projects:
                    4,

                assessments:
                    5,

                icon:
                    "HC",

                accent:
                    "orange",

                description:
                    "Learn HTML structure, semantic markup, CSS styling, Flexbox, Grid, responsive design, forms and accessibility.",

                skills: [

                    "HTML",
                    "CSS",
                    "Flexbox",
                    "CSS Grid",
                    "Responsive Design"

                ]

            },


            /* =============================================
               JAVASCRIPT
            ============================================== */

            {

                id:
                    "javascript-fundamentals",

                title:
                    "JavaScript Fundamentals",

                shortTitle:
                    "JavaScript",

                category:
                    "Web Development",

                level:
                    "Beginner",

                access:
                    "Free",

                status:
                    "available",

                duration:
                    "8 weeks",

                hours:
                    28,

                modules:
                    10,

                projects:
                    5,

                assessments:
                    6,

                icon:
                    "JS",

                accent:
                    "yellow",

                description:
                    "Learn JavaScript variables, logic, functions, arrays, objects, loops, DOM manipulation, events, APIs and asynchronous programming.",

                skills: [

                    "JavaScript",
                    "DOM",
                    "Functions",
                    "Events",
                    "APIs"

                ]

            },


            /* =============================================
               GIT & GITHUB
            ============================================== */

            {

                id:
                    "git-github",

                title:
                    "Git & GitHub",

                shortTitle:
                    "Git & GitHub",

                category:
                    "Developer Tools",

                level:
                    "Beginner",

                access:
                    "Free",

                status:
                    "available",

                duration:
                    "3 weeks",

                hours:
                    10,

                modules:
                    6,

                projects:
                    2,

                assessments:
                    3,

                icon:
                    "GT",

                accent:
                    "green",

                description:
                    "Learn version control with Git, repositories, commits, branches, GitHub collaboration and professional developer workflows.",

                skills: [

                    "Git",
                    "GitHub",
                    "Commits",
                    "Branches",
                    "Collaboration"

                ]

            },


            /* =============================================
               PYTHON
            ============================================== */

            {

                id:
                    "python-programming",

                title:
                    "Python Programming",

                shortTitle:
                    "Python",

                category:
                    "Programming",

                level:
                    "Beginner",

                access:
                    "Pro",

                status:
                    "available",

                duration:
                    "10 weeks",

                hours:
                    34,

                modules:
                    12,

                projects:
                    6,

                assessments:
                    7,

                icon:
                    "PY",

                accent:
                    "blue",

                description:
                    "Learn Python syntax, variables, conditions, loops, collections, functions, files, exceptions, OOP, modules, JSON and APIs.",

                skills: [

                    "Python",
                    "Functions",
                    "OOP",
                    "Files",
                    "APIs"

                ]

            },


            /* =============================================
               SQL
            ============================================== */

            {

                id:
                    "sql-databases",

                title:
                    "SQL & Databases",

                shortTitle:
                    "SQL",

                category:
                    "Databases",

                level:
                    "Beginner",

                access:
                    "Pro",

                status:
                    "available",

                duration:
                    "6 weeks",

                hours:
                    20,

                modules:
                    8,

                projects:
                    4,

                assessments:
                    5,

                icon:
                    "DB",

                accent:
                    "cyan",

                description:
                    "Learn relational database design, tables, CRUD operations, filtering, sorting, relationships, joins and aggregate queries.",

                skills: [

                    "SQL",
                    "Databases",
                    "CRUD",
                    "Joins",
                    "Data Modelling"

                ]

            }

        ];


        /* =================================================
           UPCOMING COURSES
        ================================================= */

        const upcomingCourses = [


            /* =============================================
               JAVA
            ============================================== */

            {

                id:
                    "java-programming",

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


            /* =============================================
               C#
            ============================================== */

            {

                id:
                    "csharp-dotnet",

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
                    "Learn C# syntax, object-oriented programming, collections, LINQ and the foundations of application development with .NET.",

                skills: [

                    "C#",
                    ".NET",
                    "OOP",
                    "LINQ",
                    "Collections"

                ]

            },


            /* =============================================
               C++
            ============================================== */

            {

                id:
                    "cpp-programming",

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
                    "Learn C++ fundamentals, functions, pointers, memory management, classes, object-oriented programming and the Standard Template Library.",

                skills: [

                    "C++",
                    "Pointers",
                    "Memory",
                    "OOP",
                    "STL"

                ]

            },


            /* =============================================
               REACT
            ============================================== */

            {

                id:
                    "react-development",

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
                    "Build modern front-end applications using reusable components, React Hooks, state, forms, routing and APIs.",

                skills: [

                    "React",
                    "Components",
                    "Hooks",
                    "State",
                    "APIs"

                ]

            },


            /* =============================================
               NODE.JS
            ============================================== */

            {

                id:
                    "nodejs-backend",

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
                    "Learn server-side JavaScript, Node.js, Express, REST APIs, middleware, authentication and backend development.",

                skills: [

                    "Node.js",
                    "Express",
                    "REST APIs",
                    "Authentication",
                    "Backend"

                ]

            }

        ];


        /* =================================================
           CENTRAL COURSE DATA
        ================================================= */

        const loadedCourses =
            Array.isArray(
                window.CWS_COURSES
            )

                ? window.CWS_COURSES

                : [];


        /* =================================================
           MERGE CURRENT COURSE DATA

           Fallback courses ensure the public catalogue
           still works if data/courses.js cannot load.

           Central data takes priority whenever available.
        ================================================= */

        const currentCourseMap =
            new Map();


        fallbackCurrentCourses
            .forEach(
                (course) => {

                    currentCourseMap.set(
                        course.id,
                        course
                    );

                }
            );


        loadedCourses
            .forEach(
                (course) => {

                    if (
                        !course ||
                        !course.id
                    ) {

                        return;

                    }


                    const fallbackCourse =
                        currentCourseMap.get(
                            course.id
                        ) || {};


                    currentCourseMap.set(
                        course.id,
                        {

                            ...fallbackCourse,
                            ...course

                        }
                    );

                }
            );


        const currentCourses =
            Array.from(
                currentCourseMap.values()
            );


        /* =================================================
           COMPLETE CATALOGUE
        ================================================= */

        const completeCourseMap =
            new Map();


        currentCourses
            .forEach(
                (course) => {

                    completeCourseMap.set(
                        course.id,
                        course
                    );

                }
            );


        upcomingCourses
            .forEach(
                (course) => {

                    /*
                     * If an upcoming course is later added to
                     * data/courses.js, do not duplicate it.
                     */

                    if (
                        completeCourseMap.has(
                            course.id
                        )
                    ) {

                        return;

                    }


                    completeCourseMap.set(
                        course.id,
                        course
                    );

                }
            );


        const catalogueCourses =
            Array.from(
                completeCourseMap.values()
            );


        /* =================================================
           FILTER STATE
        ================================================= */

        let activeCategory =
            "all";


        /* =================================================
           NORMALIZE COURSE
        ================================================= */

        function normalizeCourse(
            course
        ) {


            const curriculum =
                Array.isArray(
                    course.curriculum
                )

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
                    Number(
                        course.hours
                    ) || 0,


                modules:
                    curriculum.length > 0

                        ? curriculum.length

                        : Number(
                            course.modules
                        ) || 0,


                projects:
                    Number(
                        course.projects
                    ) || 0,


                assessments:
                    Number(
                        course.assessments
                    ) || 0,


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
                    Array.isArray(
                        course.skills
                    )

                        ? course.skills

                        : []


            };

        }


        /* =================================================
           FILTER COURSE
        ================================================= */

        function courseMatchesFilters(
            course
        ) {


            const query =
                searchInput?.value
                    .trim()
                    .toLowerCase() ||
                "";


            const selectedLevel =
                levelFilter?.value ||
                "all";


            const selectedAccess =
                accessFilter?.value ||
                "all";


            /* SEARCH */

            const searchableText =
                [

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
                searchableText.includes(
                    query
                );


            /* CATEGORY */

            const normalizedCategory =
                course.category
                    .trim()
                    .toLowerCase();


            const matchesCategory =
                activeCategory === "all" ||

                normalizedCategory ===
                    activeCategory;


            /* LEVEL */

            const normalizedLevel =
                course.level
                    .trim()
                    .toLowerCase();


            const matchesLevel =
                selectedLevel === "all" ||

                normalizedLevel ===
                    selectedLevel;


            /* ACCESS */

            const normalizedAccess =
                course.status ===
                    "coming-soon"

                    ? "coming-soon"

                    : course.access
                        .trim()
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

        }


        /* =================================================
           RENDER
        ================================================= */

        function renderCourses() {


            if (!catalogueGrid) {

                console.error(
                    "CWS CodeLab: #catalogue-grid not found."
                );

                return;

            }


            const filteredCourses =
                catalogueCourses

                    .map(
                        normalizeCourse
                    )

                    .filter(
                        courseMatchesFilters
                    );


            catalogueGrid.innerHTML =
                filteredCourses

                    .map(
                        createCourseCard
                    )

                    .join("");


            /* RESULT COUNT */

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


            /* EMPTY STATE */

            if (emptyState) {

                emptyState.hidden =
                    filteredCourses.length !== 0;

            }


            catalogueGrid.hidden =
                filteredCourses.length === 0;

        }


        /* =================================================
           CREATE COURSE CARD
        ================================================= */

        function createCourseCard(
            course
        ) {


            const isComingSoon =
                course.status ===
                "coming-soon";


            /* =============================================
               ACCESS
            ============================================== */

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


            /* =============================================
               SKILLS
            ============================================== */

            const skills =
                course.skills

                    .slice(
                        0,
                        5
                    )

                    .map(
                        (skill) => `

                            <span>
                                ${escapeHtml(skill)}
                            </span>

                        `
                    )

                    .join("");


            /* =============================================
               ACTION

               There is currently no public
               course-details.html page.

               Available courses therefore go to
               registration until the authenticated
               course flow is built.
            ============================================== */

            let action;


            if (isComingSoon) {


                action = `

                    <span
                        class="course-action course-coming-soon"
                        aria-label="${escapeHtml(
                            course.title
                        )} is coming soon"
                    >
                        Coming Soon
                    </span>

                `;

            }


            else {


                action = `

                    <a
                        href="register.html"
                        class="course-action"
                        aria-label="Start learning ${escapeHtml(
                            course.title
                        )}"
                    >
                        Start Learning →
                    </a>

                `;

            }


            /* =============================================
               CARD
            ============================================== */

            return `

                <article
                    class="catalogue-card"
                    data-course-id="${escapeHtml(
                        course.id
                    )}"
                    data-course-status="${escapeHtml(
                        course.status
                    )}"
                >


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


        /* =================================================
           CATEGORY FILTERS
        ================================================= */

        categoryButtons
            .forEach(
                (button) => {


                    button.addEventListener(
                        "click",
                        () => {


                            activeCategory =
                                (
                                    button.dataset.category ||
                                    "all"
                                )
                                    .trim()
                                    .toLowerCase();


                            categoryButtons
                                .forEach(
                                    (item) => {

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

                }
            );


        /* =================================================
           SEARCH
        ================================================= */

        searchInput?.addEventListener(
            "input",
            renderCourses
        );


        /* =================================================
           LEVEL
        ================================================= */

        levelFilter?.addEventListener(
            "change",
            renderCourses
        );


        /* =================================================
           ACCESS
        ================================================= */

        accessFilter?.addEventListener(
            "change",
            renderCourses
        );


        /* =================================================
           RESET
        ================================================= */

        resetButton?.addEventListener(
            "click",
            () => {


                if (searchInput) {

                    searchInput.value =
                        "";

                }


                if (levelFilter) {

                    levelFilter.value =
                        "all";

                }


                if (accessFilter) {

                    accessFilter.value =
                        "all";

                }


                activeCategory =
                    "all";


                categoryButtons
                    .forEach(
                        (button) => {

                            button.classList.toggle(
                                "active",
                                button.dataset.category ===
                                    "all"
                            );

                        }
                    );


                renderCourses();

            }
        );


        /* =================================================
           TOTAL COURSE COUNT
        ================================================= */

        if (totalCourseCount) {

            totalCourseCount.textContent =
                String(
                    catalogueCourses.length
                );

        }


        /* =================================================
           HTML ESCAPING
        ================================================= */

        function escapeHtml(
            value
        ) {

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


        /* =================================================
           INITIAL RENDER
        ================================================= */

        renderCourses();


        console.log(
            "CWS CodeLab catalogue initialized."
        );


        console.log(
            `Available courses: ${currentCourses.length}`
        );


        console.log(
            `Upcoming courses: ${upcomingCourses.length}`
        );


        console.log(
            `Total courses: ${catalogueCourses.length}`
        );


        if (
            loadedCourses.length === 0
        ) {

            console.warn(
                "CWS CodeLab: central course data was unavailable. Catalogue fallback data is being used."
            );

        }


    }
);
