/* =========================================================
   CWS CODELAB
   CAPSTONES
========================================================= */

(() => {

    "use strict";

    const capstones = [

        {
            id: "programming-fundamentals-capstone",
            courseId: "programming-fundamentals",
            access: "free",
            status: "available",
            title: "Programming Logic Application",
            description: "Design, build, test, debug and explain a complete beginner-to-advanced-foundation application.",
            estimatedTime: "8-12 hours",
            chooseOne: [
                "Task Manager",
                "Personal Expense Tracker",
                "Inventory Tracker",
                "Quiz Engine",
                "Booking Simulator"
            ],
            requiredModules: [
                "pf-m01", "pf-m02", "pf-m03", "pf-m04",
                "pf-m05", "pf-m06", "pf-m07", "pf-m08",
                "pf-m09", "pf-m10", "pf-m11", "pf-m12"
            ],
            requiredEvidence: [
                "Requirements and acceptance criteria",
                "Pseudocode or algorithm design",
                "Structured data model",
                "Functions and modular design",
                "Validation and failure handling",
                "Loops and collection processing",
                "Persistent storage",
                "Normal, boundary and invalid tests",
                "At least one documented bug and regression test",
                "README with design decisions, limitations and next improvements"
            ],
            rubric: {
                requirements: 10,
                logic: 20,
                dataModelling: 10,
                functionsAndStructure: 15,
                validationAndErrors: 10,
                testing: 15,
                debuggingEvidence: 10,
                documentationAndReflection: 10
            },
            passingScore: 75,
            certificateRequired: true
        }

    ];


    window.CWS_CAPSTONES =
        capstones;


    window.CWS_CAPSTONE_UTILS = {

        getCapstoneById(capstoneId) {

            return capstones.find(
                item =>
                    item.id === capstoneId
            ) || null;

        },


        getCapstonesByCourse(courseId) {

            return capstones.filter(
                item =>
                    item.courseId === courseId
            );

        }

    };


})();
