/* =========================================================
   CWS CODELAB
   VIDEO LESSON REGISTRY

   Video metadata can be linked to lesson IDs without placing
   video details inside every course file.
========================================================= */

(() => {

    "use strict";


    const videoLessons = [

        /*
        Example:

        {
            courseId: "programming-fundamentals",
            lessonId: "pf-l01",
            provider: "youtube",
            title: "What Is Programming?",
            url: "",
            duration: "8 min",
            access: "free"
        }
        */

    ];


    function getVideoForLesson(
        courseId,
        lessonId
    ) {

        return videoLessons.find(
            video =>
                video.courseId ===
                    courseId &&
                video.lessonId ===
                    lessonId
        ) || null;

    }


    window.CWS_VIDEO_LESSONS =
        videoLessons;


    window.CWS_VIDEO_LESSON_UTILS = {

        getVideoForLesson

    };


})();
