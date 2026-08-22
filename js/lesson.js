/* =========================================================
   CWS CODELAB
   Dynamic Lesson Engine
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           ELEMENTS
        ===================================================== */

        const loadingSection =
            document.getElementById(
                "lesson-loading"
            );


        const notFoundSection =
            document.getElementById(
                "lesson-not-found"
            );


        const lessonMain =
            document.getElementById(
                "lesson-main"
            );


        /* =====================================================
           URL PARAMETERS
        ===================================================== */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const courseId =
            params.get(
                "course"
            );


        const lessonId =
            params.get(
                "lesson"
            );


        /* =====================================================
           VALIDATE
        ===================================================== */

        if (
            !courseId ||
            !lessonId ||
            !window.CWS_COURSE_UTILS
        ) {

            showNotFound();

            return;

        }


        /* =====================================================
           FIND LESSON
        ===================================================== */

        const lessonResult =
            window.CWS_COURSE_UTILS
                .getLessonById(
                    courseId,
                    lessonId
                );


        if (!lessonResult) {

            showNotFound();

            return;

        }


        const {
            course,
            module,
            lesson
        } = lessonResult;


        /* =====================================================
           RENDER
        ===================================================== */

        renderLesson();


        if (loadingSection) {

            loadingSection.hidden =
                true;

        }


        if (lessonMain) {

            lessonMain.hidden =
                false;

        }


        /* =====================================================
           RENDER LESSON
        ===================================================== */

        function renderLesson() {


            /* =================================================
               TITLE
            ================================================= */

            document.title =
                `${lesson.title} | ${course.title} | CWS CodeLab`;


            /* =================================================
               COURSE INFORMATION
            ================================================= */

            setText(
                "sidebar-course-title",
                course.title
            );


            setText(
                "lesson-course-name",
                course.title
            );


            setText(
                "breadcrumb-course-link",
                course.title
            );


            setText(
                "breadcrumb-module",
                module.title
            );


            const courseURL =
                `../pages/course-details.html?course=${encodeURIComponent(
                    course.id
                )}`;


            setHref(
                "lesson-course-link",
                courseURL
            );


            setHref(
                "breadcrumb-course-link",
                courseURL
            );


            /* =================================================
               LESSON INFORMATION
            ================================================= */

            setText(
                "lesson-title",
                lesson.title
            );


            setText(
                "lesson-duration",
                lesson.duration || ""
            );


            setText(
                "lesson-type",
                getLessonTypeLabel(
                    lesson.type
                )
            );


            setText(
                "lesson-module-label",
                `Module ${module.order}`
            );


            setText(
                "lesson-module-description",
                module.description
            );


            setText(
                "lesson-content-heading",
                lesson.title
            );


            setText(
                "lesson-introduction-text",
                createLessonIntroduction()
            );


            /* =================================================
               SIDEBAR
            ================================================= */

            renderSidebar();


            /* =================================================
               PREVIOUS / NEXT
            ================================================= */

            renderLessonNavigation();


            /* =================================================
               LESSON POSITION
            ================================================= */

            renderLessonPosition();


            /* =================================================
               LOCAL COMPLETION STATE
            ================================================= */

            initialiseCompletionButton();

        }


        /* =====================================================
           LESSON INTRODUCTION
        ===================================================== */

        function createLessonIntroduction() {

            const type =
                getLessonTypeLabel(
                    lesson.type
                ).toLowerCase();


            return (
                `This ${type} is part of "${module.title}" ` +
                `in the ${course.title} course. ` +
                `${module.description}`
            );

        }


        /* =====================================================
           SIDEBAR CURRICULUM
        ===================================================== */

        function renderSidebar() {

            const container =
                document.getElementById(
                    "sidebar-curriculum"
                );


            if (!container) {

                return;

            }


            container.innerHTML =
                course.curriculum.map(
                    courseModule => {


                        const moduleLessons =
                            courseModule.lessons || [];


                        return `
                            <section
                                class="sidebar-module
                                ${
                                    courseModule.id === module.id
                                        ? "active-module"
                                        : ""
                                }"
                            >

                                <div class="sidebar-module-heading">

                                    <span>
                                        ${String(
                                            courseModule.order
                                        ).padStart(
                                            2,
                                            "0"
                                        )}
                                    </span>

                                    <strong>
                                        ${escapeHtml(
                                            courseModule.title
                                        )}
                                    </strong>

                                </div>


                                <div class="sidebar-module-lessons">

                                    ${moduleLessons.map(
                                        moduleLesson =>
                                            createSidebarLesson(
                                                courseModule,
                                                moduleLesson
                                            )
                                    ).join("")}

                                </div>

                            </section>
                        `;

                    }

                ).join("");

        }


        /* =====================================================
           SIDEBAR LESSON
        ===================================================== */

        function createSidebarLesson(
            courseModule,
            moduleLesson
        ) {

            const active =
                moduleLesson.id ===
                lesson.id;


            const url =
                createLessonURL(
                    moduleLesson.id
                );


            return `
                <a
                    href="${url}"
                    class="sidebar-lesson
                    ${active ? "active" : ""}"
                    ${active ? 'aria-current="page"' : ""}
                >

                    <span class="sidebar-lesson-icon">

                        ${getLessonIcon(
                            moduleLesson.type
                        )}

                    </span>


                    <span class="sidebar-lesson-copy">

                        <strong>
                            ${escapeHtml(
                                moduleLesson.title
                            )}
                        </strong>

                        <small>

                            ${escapeHtml(
                                moduleLesson.duration || ""
                            )}

                        </small>

                    </span>

                </a>
            `;

        }


        /* =====================================================
           FLATTEN COURSE LESSONS
        ===================================================== */

        function getAllCourseLessons() {

            const flattened =
                [];


            course.curriculum.forEach(
                courseModule => {

                    (
                        courseModule.lessons ||
                        []
                    ).forEach(
                        moduleLesson => {

                            flattened.push({

                                module:
                                    courseModule,

                                lesson:
                                    moduleLesson

                            });

                        }
                    );

                }
            );


            return flattened;

        }


        /* =====================================================
           LESSON POSITION
        ===================================================== */

        function renderLessonPosition() {

            const lessons =
                getAllCourseLessons();


            const currentIndex =
                lessons.findIndex(
                    item =>
                        item.lesson.id ===
                        lesson.id
                );


            if (
                currentIndex === -1
            ) {

                return;

            }


            setText(
                "lesson-position",
                `Lesson ${
                    currentIndex + 1
                } of ${
                    lessons.length
                }`
            );

        }


        /* =====================================================
           PREVIOUS / NEXT
        ===================================================== */

        function renderLessonNavigation() {

            const lessons =
                getAllCourseLessons();


            const currentIndex =
                lessons.findIndex(
                    item =>
                        item.lesson.id ===
                        lesson.id
                );


            if (
                currentIndex === -1
            ) {

                return;

            }


            const previous =
                lessons[
                    currentIndex - 1
                ];


            const next =
                lessons[
                    currentIndex + 1
                ];


            /* PREVIOUS */

            if (previous) {

                const previousButton =
                    document.getElementById(
                        "previous-lesson"
                    );


                if (previousButton) {

                    previousButton.hidden =
                        false;


                    previousButton.href =
                        createLessonURL(
                            previous.lesson.id
                        );

                }


                setText(
                    "previous-lesson-title",
                    previous.lesson.title
                );

            }


            /* NEXT */

            if (next) {

                const nextButton =
                    document.getElementById(
                        "next-lesson"
                    );


                if (nextButton) {

                    nextButton.hidden =
                        false;


                    nextButton.href =
                        createLessonURL(
                            next.lesson.id
                        );

                }


                setText(
                    "next-lesson-title",
                    next.lesson.title
                );

            }

        }


        /* =====================================================
           CREATE LESSON URL
        ===================================================== */

        function createLessonURL(
            targetLessonId
        ) {

            return (
                `lesson.html?course=${encodeURIComponent(
                    course.id
                )}` +
                `&lesson=${encodeURIComponent(
                    targetLessonId
                )}`
            );

        }


        /* =====================================================
           COMPLETION BUTTON
           Temporary localStorage implementation
        ===================================================== */

        function initialiseCompletionButton() {

            const button =
                document.getElementById(
                    "complete-lesson-button"
                );


            if (!button) {

                return;

            }


            const storageKey =
                `cws-codelab-complete-${course.id}-${lesson.id}`;


            const completed =
                localStorage.getItem(
                    storageKey
                ) === "true";


            updateCompletionButton(
                completed
            );


            button.addEventListener(
                "click",
                () => {

                    const currentlyCompleted =
                        localStorage.getItem(
                            storageKey
                        ) === "true";


                    const newState =
                        !currentlyCompleted;


                    localStorage.setItem(
                        storageKey,
                        String(newState)
                    );


                    updateCompletionButton(
                        newState
                    );

                }
            );


            function updateCompletionButton(
                complete
            ) {

                button.classList.toggle(
                    "completed",
                    complete
                );


                const strong =
                    button.querySelector(
                        "strong"
                    );


                if (strong) {

                    strong.textContent =
                        complete
                            ? "Lesson Completed"
                            : "Mark Lesson Complete";

                }

            }

        }


        /* =====================================================
           LESSON TYPE
        ===================================================== */

        function getLessonTypeLabel(
            type
        ) {

            const labels = {

                lesson:
                    "Lesson",

                exercise:
                    "Coding Exercise",

                project:
                    "Project",

                assessment:
                    "Assessment"

            };


            return (
                labels[type] ||
                "Lesson"
            );

        }


        /* =====================================================
           LESSON ICON
        ===================================================== */

        function getLessonIcon(
            type
        ) {

            const icons = {

                lesson:
                    "▶",

                exercise:
                    "&lt;/&gt;",

                project:
                    "◆",

                assessment:
                    "✓"

            };


            return (
                icons[type] ||
                "▶"
            );

        }


        /* =====================================================
           NOT FOUND
        ===================================================== */

        function showNotFound() {

            if (loadingSection) {

                loadingSection.hidden =
                    true;

            }


            if (lessonMain) {

                lessonMain.hidden =
                    true;

            }


            if (notFoundSection) {

                notFoundSection.hidden =
                    false;

            }


            document.title =
                "Lesson Not Found | CWS CodeLab";

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


            if (element) {

                element.textContent =
                    value ?? "";

            }

        }


        function setHref(
            id,
            href
        ) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.href =
                    href;

            }

        }


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


        console.log(
            `CWS CodeLab lesson loaded: ${lesson.title}`
        );

    }
);
