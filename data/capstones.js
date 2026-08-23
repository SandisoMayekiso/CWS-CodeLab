/* =========================================================
   CWS CODELAB
   CAPSTONE REGISTRY

   Shared capstone metadata only.
   Large Pro solutions / marking guides should not be exposed
   in public GitHub JavaScript.
========================================================= */

(() => {

    "use strict";


    const capstones = [

        {
            id: "programming-fundamentals-capstone",
            courseId: "programming-fundamentals",
            access: "free",
            status: "planned",
            title: "Programming Logic Challenge",
            description: "Plan and build a small program that combines variables, conditions, loops, functions and structured problem solving.",
            requiredModules: [
                "pf-m01",
                "pf-m02",
                "pf-m03",
                "pf-m04",
                "pf-m05",
                "pf-m06",
                "pf-m07"
            ],
            assessmentMode: "project",
            certificateRequired: true
        }

    ];


    window.CWS_CAPSTONES =
        capstones;


})();
