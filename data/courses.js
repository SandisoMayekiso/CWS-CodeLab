/* =========================================================
   CWS CODELAB
   COURSE CATALOGUE + COURSE DATA LOADER

   Purpose:
   - Public course catalogue metadata
   - Student course library metadata
   - Course-data file registry
   - Lazy loading of individual course curriculum files

   IMPORTANT:
   This file intentionally does NOT contain full lesson bodies.
   Free course lesson content lives in dedicated course files.
   Pro lesson bodies should ultimately be served from protected
   backend / Firestore sources rather than public GitHub code.
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       COURSE CATALOGUE
    ===================================================== */

    const courses = [

        {
            id: "programming-fundamentals",
            order: 1,
            title: "Programming Fundamentals",
            shortTitle: "Programming",
            category: "Foundation",
            level: "Beginner",
            access: "Free",
            status: "available",
            duration: "12 weeks",
            hours: 60,
            modules: 12,
            projects: 12,
            assessments: 13,
            icon: "PF",
            accent: "#6c7cff",
            featured: true,
            dataFile: "programming-fundamentals.js",
            description: "A complete beginner-to-advanced-foundation programming course covering computing, data, expressions, decisions, loops, functions, collections, algorithms, debugging, testing, program design, files, APIs, databases and a final capstone.",
            outcome: "Build, debug, test and explain complete programs and confidently move into language-specific JavaScript, Python or other development study.",
            prerequisites: [
                "No previous programming experience required",
                "Basic computer literacy"
            ],
            skills: [
                "Programming Logic",
                "Variables",
                "Data Types",
                "Conditions",
                "Loops",
                "Functions",
                "Problem Solving"
            ],
            learningPaths: [
                "frontend-developer",
                "python-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "html-css",
            order: 2,
            title: "HTML & CSS",
            shortTitle: "HTML & CSS",
            category: "Web Development",
            level: "Beginner",
            access: "Free",
            status: "available",
            duration: "6 weeks",
            hours: 20,
            modules: 9,
            projects: 4,
            assessments: 5,
            icon: "HC",
            accent: "#ef6c57",
            featured: true,
            dataFile: "html-css.js",
            description: "Learn to build modern responsive websites using semantic HTML, CSS layouts, Flexbox, Grid, forms and responsive design.",
            outcome: "Build responsive multi-page websites from scratch using clean HTML and modern CSS.",
            prerequisites: [
                "Basic computer skills",
                "No web-development experience required"
            ],
            skills: [
                "HTML",
                "CSS",
                "Semantic HTML",
                "Flexbox",
                "CSS Grid",
                "Responsive Design",
                "Forms"
            ],
            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "javascript-fundamentals",
            order: 3,
            title: "JavaScript Fundamentals",
            shortTitle: "JavaScript",
            category: "Programming",
            level: "Beginner",
            access: "Free",
            status: "available",
            duration: "8 weeks",
            hours: 28,
            modules: 10,
            projects: 5,
            assessments: 6,
            icon: "JS",
            accent: "#d4a72c",
            featured: true,
            dataFile: "javascript-fundamentals.js",
            description: "Learn JavaScript fundamentals, DOM manipulation, events, arrays, objects, functions, asynchronous programming and browser APIs.",
            outcome: "Build interactive browser applications using modern JavaScript.",
            prerequisites: [
                "Programming Fundamentals recommended",
                "Basic HTML and CSS recommended"
            ],
            skills: [
                "JavaScript",
                "DOM",
                "Functions",
                "Arrays",
                "Objects",
                "Events",
                "Async JavaScript",
                "APIs"
            ],
            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "git-github",
            order: 4,
            title: "Git & GitHub",
            shortTitle: "Git",
            category: "Developer Tools",
            level: "Beginner",
            access: "Free",
            status: "available",
            duration: "3 weeks",
            hours: 10,
            modules: 6,
            projects: 2,
            assessments: 3,
            icon: "GT",
            accent: "#3f4d67",
            featured: false,
            dataFile: "git-github.js",
            description: "Learn Git version control, GitHub repositories, commits, branches, merging, pull requests and practical collaboration workflows.",
            outcome: "Manage software projects with Git and publish professional repositories on GitHub.",
            prerequisites: [
                "Basic computer skills"
            ],
            skills: [
                "Git",
                "GitHub",
                "Version Control",
                "Branches",
                "Pull Requests",
                "Repositories"
            ],
            learningPaths: [
                "frontend-developer",
                "python-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "python-programming",
            order: 5,
            title: "Python Programming",
            shortTitle: "Python",
            category: "Programming",
            level: "Beginner",
            access: "Pro",
            status: "available",
            duration: "10 weeks",
            hours: 34,
            modules: 12,
            projects: 6,
            assessments: 7,
            icon: "PY",
            accent: "#3776ab",
            featured: true,
            dataFile: "python-programming.js",
            protectedContent: true,
            description: "Learn Python from the fundamentals through functions, collections, files, error handling, object-oriented programming and practical application development.",
            outcome: "Build practical Python applications and establish a foundation for backend development, automation and security scripting.",
            prerequisites: [
                "Programming Fundamentals recommended"
            ],
            skills: [
                "Python",
                "Functions",
                "Lists",
                "Dictionaries",
                "Files",
                "OOP",
                "Exceptions",
                "Modules"
            ],
            learningPaths: [
                "python-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "sql-databases",
            order: 6,
            title: "SQL & Databases",
            shortTitle: "SQL",
            category: "Databases",
            level: "Beginner",
            access: "Pro",
            status: "available",
            duration: "6 weeks",
            hours: 20,
            modules: 8,
            projects: 4,
            assessments: 5,
            icon: "SQL",
            accent: "#4a6fa5",
            featured: false,
            dataFile: "sql-databases.js",
            protectedContent: true,
            description: "Learn relational databases, SQL queries, filtering, joins, aggregation, data modelling and practical database design.",
            outcome: "Design relational databases and confidently query and manipulate structured data using SQL.",
            prerequisites: [
                "Programming fundamentals helpful but not required"
            ],
            skills: [
                "SQL",
                "Databases",
                "SELECT",
                "JOIN",
                "Aggregation",
                "Data Modelling",
                "CRUD"
            ],
            learningPaths: [
                "python-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "java-programming",
            order: 7,
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
            assessments: 0,
            icon: "JV",
            accent: "#e67e22",
            featured: false,
            dataFile: "java-programming.js",
            description: "Learn Java syntax, object-oriented programming, collections, exceptions, file handling and practical application development.",
            outcome: "Build structured Java applications using modern object-oriented programming concepts.",
            prerequisites: [
                "Programming Fundamentals recommended"
            ],
            skills: [
                "Java",
                "OOP",
                "Collections",
                "Exceptions",
                "Files"
            ],
            learningPaths: [
                "fullstack-developer"
            ]
        },

        {
            id: "csharp-dotnet",
            order: 8,
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
            assessments: 0,
            icon: "C#",
            accent: "#7b4ab5",
            featured: false,
            dataFile: "csharp-dotnet.js",
            description: "Learn C# syntax, object-oriented programming, collections, LINQ and the foundations of building modern applications with .NET.",
            outcome: "Develop a strong foundation for building applications using C# and the .NET ecosystem.",
            prerequisites: [
                "Programming Fundamentals recommended"
            ],
            skills: [
                "C#",
                ".NET",
                "OOP",
                "LINQ",
                "Collections"
            ],
            learningPaths: [
                "fullstack-developer"
            ]
        },

        {
            id: "cpp-programming",
            order: 9,
            title: "C++ Programming",
            shortTitle: "C++",
            category: "Programming",
            level: "Beginner",
            access: "Coming Soon",
            status: "coming-soon",
            duration: "10 weeks",
            hours: 34,
            modules: 11,
            projects: 5,
            assessments: 0,
            icon: "C++",
            accent: "#4169a1",
            featured: false,
            dataFile: "cpp-programming.js",
            description: "Learn C++ fundamentals, control flow, functions, pointers, memory management, classes, object-oriented programming and the Standard Template Library.",
            outcome: "Understand lower-level programming concepts and build structured C++ applications.",
            prerequisites: [
                "Programming Fundamentals recommended"
            ],
            skills: [
                "C++",
                "Pointers",
                "Memory",
                "OOP",
                "STL"
            ],
            learningPaths: []
        },

        {
            id: "react-development",
            order: 10,
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
            assessments: 0,
            icon: "RE",
            accent: "#32a9c4",
            featured: false,
            dataFile: "react-development.js",
            description: "Build modern front-end applications using reusable components, React Hooks, state management, forms, routing and APIs.",
            outcome: "Build modern component-based front-end applications with React.",
            prerequisites: [
                "HTML & CSS",
                "JavaScript Fundamentals"
            ],
            skills: [
                "React",
                "Components",
                "Hooks",
                "State",
                "Routing",
                "APIs"
            ],
            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ]
        },

        {
            id: "nodejs-backend",
            order: 11,
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
            assessments: 0,
            icon: "ND",
            accent: "#3d8b59",
            featured: false,
            dataFile: "nodejs-backend.js",
            description: "Learn server-side JavaScript, Node.js, Express, REST APIs, middleware, authentication and backend application development.",
            outcome: "Build backend applications and REST APIs using JavaScript and Node.js.",
            prerequisites: [
                "JavaScript Fundamentals",
                "Git & GitHub"
            ],
            skills: [
                "Node.js",
                "Express",
                "REST APIs",
                "Authentication",
                "Middleware",
                "Backend"
            ],
            learningPaths: [
                "fullstack-developer"
            ]
        }

    ];


    /* =====================================================
       COURSE DATA REGISTRY
    ===================================================== */

    const courseDataRegistry = new Map();
    const loadingPromises = new Map();


    /* =====================================================
       FIND COURSE
    ===================================================== */

    function getCourseById(courseId) {

        return courses.find(
            course =>
                course.id === courseId
        ) || null;

    }


    /* =====================================================
       REGISTER DEDICATED COURSE DATA

       Individual files call this:
       CWS_COURSE_UTILS.registerCourseData(courseData)
    ===================================================== */

    function registerCourseData(courseData) {

        if (
            !courseData ||
            typeof courseData !== "object" ||
            !courseData.id
        ) {

            throw new Error(
                "CWS CodeLab: invalid course data registration."
            );

        }


        const metadata =
            getCourseById(
                courseData.id
            );


        if (!metadata) {

            throw new Error(
                `CWS CodeLab: unknown course id "${courseData.id}".`
            );

        }


        const merged = {

            ...metadata,

            ...courseData,

            curriculum:
                Array.isArray(
                    courseData.curriculum
                )
                    ? courseData.curriculum
                    : []

        };


        courseDataRegistry.set(
            courseData.id,
            merged
        );


        return merged;

    }


    /* =====================================================
       GET LOADED COURSE DATA
    ===================================================== */

    function getLoadedCourseData(courseId) {

        return courseDataRegistry.get(
            courseId
        ) || null;

    }


    /* =====================================================
       DATA FILE URL
    ===================================================== */

    function getDataFileURL(course) {

        if (
            !course ||
            !course.dataFile
        ) {

            return null;

        }


        const currentScript =
            document.currentScript;


        /*
         * When called after this file has executed,
         * document.currentScript may be null.
         *
         * Use the URL captured below instead.
         */

        return new URL(
            course.dataFile,
            DATA_BASE_URL
        ).href;

    }


    const scriptURL =
        document.currentScript?.src ||
        window.location.href;


    const DATA_BASE_URL =
        new URL(
            "./",
            scriptURL
        );


    /* =====================================================
       LOAD COURSE DATA

       Free/public curriculum files can be lazy-loaded here.

       Protected Pro bodies should eventually be fetched from
       Firebase/backend after entitlement checks. Their public
       JS files should contain metadata only.
    ===================================================== */

    function loadCourseData(courseId) {

        const loaded =
            getLoadedCourseData(
                courseId
            );


        if (loaded) {

            return Promise.resolve(
                loaded
            );

        }


        const existingPromise =
            loadingPromises.get(
                courseId
            );


        if (existingPromise) {

            return existingPromise;

        }


        const course =
            getCourseById(
                courseId
            );


        if (!course) {

            return Promise.reject(
                new Error(
                    "course-not-found"
                )
            );

        }


        if (
            course.status !==
            "available"
        ) {

            return Promise.reject(
                new Error(
                    "course-not-available"
                )
            );

        }


        if (
            !course.dataFile
        ) {

            return Promise.reject(
                new Error(
                    "course-data-file-missing"
                )
            );

        }


        const source =
            getDataFileURL(
                course
            );


        const promise =
            new Promise(
                (
                    resolve,
                    reject
                ) => {


                    const script =
                        document.createElement(
                            "script"
                        );


                    script.src =
                        source;


                    script.async =
                        true;


                    script.dataset.cwsCourse =
                        courseId;


                    script.addEventListener(
                        "load",
                        () => {


                            const data =
                                getLoadedCourseData(
                                    courseId
                                );


                            if (!data) {

                                reject(
                                    new Error(
                                        "course-data-registration-missing"
                                    )
                                );


                                return;

                            }


                            resolve(
                                data
                            );


                        }
                    );


                    script.addEventListener(
                        "error",
                        () => {


                            reject(
                                new Error(
                                    "course-data-load-failed"
                                )
                            );


                        }
                    );


                    document.head.appendChild(
                        script
                    );


                }
            )
                .finally(
                    () => {


                        loadingPromises.delete(
                            courseId
                        );


                    }
                );


        loadingPromises.set(
            courseId,
            promise
        );


        return promise;

    }


    /* =====================================================
       FILTER HELPERS
    ===================================================== */

    function getAvailableCourses() {

        return courses.filter(
            course =>
                course.status ===
                "available"
        );

    }


    function getUpcomingCourses() {

        return courses.filter(
            course =>
                course.status ===
                "coming-soon"
        );

    }


    function getFreeCourses() {

        return courses.filter(
            course =>
                course.status ===
                    "available" &&
                String(
                    course.access
                ).toLowerCase() ===
                    "free"
        );

    }


    function getProCourses() {

        return courses.filter(
            course =>
                course.status ===
                    "available" &&
                String(
                    course.access
                ).toLowerCase() ===
                    "pro"
        );

    }


    /* =====================================================
       COURSE STRUCTURE HELPERS
    ===================================================== */

    function getModuleById(
        courseId,
        moduleId
    ) {

        const course =
            getLoadedCourseData(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return null;

        }


        return course.curriculum.find(
            courseModule =>
                courseModule.id ===
                moduleId
        ) || null;

    }


    function getLessonById(
        courseId,
        lessonId
    ) {

        const course =
            getLoadedCourseData(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return null;

        }


        for (
            const courseModule
            of course.curriculum
        ) {

            const lessonItem =
                courseModule.lessons?.find(
                    item =>
                        item.id ===
                        lessonId
                );


            if (lessonItem) {

                return {

                    ...lessonItem,

                    moduleId:
                        courseModule.id,

                    moduleTitle:
                        courseModule.title,

                    moduleDescription:
                        courseModule.description

                };

            }

        }


        return null;

    }


    function getCourseLessonCount(
        courseId
    ) {

        const course =
            getLoadedCourseData(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return 0;

        }


        return course.curriculum.reduce(
            (
                total,
                courseModule
            ) =>
                total +
                (
                    Array.isArray(
                        courseModule.lessons
                    )
                        ? courseModule
                            .lessons
                            .length
                        : 0
                ),
            0
        );

    }


    /* =====================================================
       EXPOSE
    ===================================================== */

    window.CWS_COURSES =
        courses;


    window.CWS_COURSE_UTILS = {

        getCourseById,

        registerCourseData,

        getLoadedCourseData,

        loadCourseData,

        getAvailableCourses,

        getUpcomingCourses,

        getFreeCourses,

        getProCourses,

        getModuleById,

        getLessonById,

        getCourseLessonCount

    };


    console.log(
        "CWS CodeLab course catalogue loaded."
    );


    console.log(
        `Courses: ${courses.length}`
    );


})();
