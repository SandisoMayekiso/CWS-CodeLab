/* =========================================================
   CWS CODELAB
   LEARNING PATHS
========================================================= */

(() => {

    "use strict";


    const learningPaths = [

        {
            id: "frontend-developer",
            title: "Front-End Developer",
            description: "Learn how to build responsive and interactive browser applications.",
            icon: "FE",
            courses: [
                "programming-fundamentals",
                "html-css",
                "javascript-fundamentals",
                "git-github",
                "react-development"
            ]
        },

        {
            id: "python-developer",
            title: "Python Developer",
            description: "Build programming, Python, database and developer-tool skills.",
            icon: "PY",
            courses: [
                "programming-fundamentals",
                "git-github",
                "python-programming",
                "sql-databases"
            ]
        },

        {
            id: "fullstack-developer",
            title: "Full-Stack Developer",
            description: "Develop front-end, backend, database and deployment skills.",
            icon: "FS",
            courses: [
                "programming-fundamentals",
                "html-css",
                "javascript-fundamentals",
                "git-github",
                "sql-databases",
                "react-development",
                "nodejs-backend"
            ]
        }

    ];


    function getLearningPathById(
        pathId
    ) {

        return learningPaths.find(
            path =>
                path.id === pathId
        ) || null;

    }


    function getCoursesForPath(
        pathId
    ) {

        const path =
            getLearningPathById(
                pathId
            );


        if (!path) {

            return [];

        }


        const catalogue =
            Array.isArray(
                window.CWS_COURSES
            )
                ? window.CWS_COURSES
                : [];


        return path.courses
            .map(
                courseId =>
                    catalogue.find(
                        course =>
                            course.id ===
                            courseId
                    )
            )
            .filter(
                Boolean
            );

    }


    window.CWS_LEARNING_PATHS =
        learningPaths;


    window.CWS_LEARNING_PATH_UTILS = {

        getLearningPathById,

        getCoursesForPath

    };


})();
