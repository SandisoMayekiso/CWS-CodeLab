/* =========================================================
   CWS CODELAB
   LESSON WORKSPACE

   Handles:
   - Firebase authentication
   - Firestore student profile
   - Course enrolment/access checks
   - Lesson rendering
   - Curriculum navigation
   - Previous / Next lesson
   - Lesson completion
   - Firestore course progress
========================================================= */


import {
    auth,
    db
} from "./firebase-config.js";


import {
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";


import {
    doc,
    getDoc,
    updateDoc,
    FieldPath,
    serverTimestamp
} from
    "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


/* =========================================================
   URLS
========================================================= */

const LOGIN_URL =
    new URL(
        "../pages/login.html",
        import.meta.url
    ).href;


const COURSES_URL =
    new URL(
        "../student/student-courses.html",
        import.meta.url
    ).href;


/* =========================================================
   URL PARAMETERS
========================================================= */

const params =
    new URLSearchParams(
        window.location.search
    );


const requestedCourseId =
    params.get(
        "course"
    );


const requestedLessonId =
    params.get(
        "lesson"
    );


/* =========================================================
   STATE
========================================================= */

const state = {

    user:
        null,

    profile:
        {},

    course:
        null,

    lessons:
        [],

    currentLesson:
        null,

    currentLessonIndex:
        -1,

    completedLessons:
        [],

    percentage:
        0

};


/* =========================================================
   ELEMENTS
========================================================= */

const loading =
    document.getElementById(
        "lesson-loading"
    );


const completeButton =
    document.getElementById(
        "mark-lesson-complete"
    );


const previousButton =
    document.getElementById(
        "previous-lesson-button"
    );


const nextButton =
    document.getElementById(
        "next-lesson-button"
    );


/* =========================================================
   BASIC PAGE SETUP
========================================================= */

setText(
    "lesson-year",
    new Date().getFullYear()
);


initialiseSidebar();


/* =========================================================
   AUTHENTICATION
========================================================= */

const unsubscribe =
    onAuthStateChanged(
        auth,

        async user => {


            if (!user) {


                window.location.replace(
                    LOGIN_URL
                );


                return;


            }


            state.user =
                user;


            try {


                await waitForCourseData();


                await loadStudentProfile(
                    user
                );


                resolveCourse();


                verifyCourseAccess();


                resolveLessons();


                resolveCurrentLesson();


                populateStudent();


                renderWorkspace();


                await saveCurrentLessonAccess();


                setLoading(
                    false
                );


            } catch (error) {


                console.error(
                    "CWS CodeLab lesson error:",
                    error
                );


                handleFatalError(
                    error
                );


            }


        }
    );


/* =========================================================
   COURSE DATA
========================================================= */

function waitForCourseData(
    timeout = 5000
) {


    return new Promise(
        (
            resolve,
            reject
        ) => {


            if (
                Array.isArray(
                    window.CWS_COURSES
                )
            ) {


                resolve();


                return;


            }


            const started =
                Date.now();


            const interval =
                window.setInterval(
                    () => {


                        if (
                            Array.isArray(
                                window.CWS_COURSES
                            )
                        ) {


                            window.clearInterval(
                                interval
                            );


                            resolve();


                            return;


                        }


                        if (
                            Date.now() -
                            started >=
                            timeout
                        ) {


                            window.clearInterval(
                                interval
                            );


                            reject(
                                new Error(
                                    "course-data-unavailable"
                                )
                            );


                        }


                    },
                    40
                );


        }
    );


}


/* =========================================================
   PROFILE
========================================================= */

async function loadStudentProfile(
    user
) {


    const reference =
        doc(
            db,
            "users",
            user.uid
        );


    const snapshot =
        await getDoc(
            reference
        );


    if (!snapshot.exists()) {


        throw new Error(
            "student-profile-not-found"
        );


    }


    state.profile = {

        id:
            snapshot.id,

        ...snapshot.data()

    };


}


/* =========================================================
   COURSE
========================================================= */

function resolveCourse() {


    if (!requestedCourseId) {


        throw new Error(
            "course-not-specified"
        );


    }


    state.course =
        window.CWS_COURSES
            .find(
                course =>
                    course.id ===
                    requestedCourseId
            ) ||
        null;


    if (!state.course) {


        throw new Error(
            "course-not-found"
        );


    }


}


/* =========================================================
   ACCESS
========================================================= */

function verifyCourseAccess() {


    if (
        state.course.status !==
        "available"
    ) {


        throw new Error(
            "course-not-available"
        );


    }


    const enrolled =
        Array.isArray(
            state.profile
                .enrolledCourses
        )
            ? state.profile
                .enrolledCourses
                .includes(
                    state.course.id
                )
            : false;


    if (!enrolled) {


        throw new Error(
            "not-enrolled"
        );


    }


    const access =
        String(
            state.course.access ||
            ""
        )
            .toLowerCase();


    const plan =
        String(
            state.profile.plan ||
            "free"
        )
            .toLowerCase();


    if (
        access === "pro" &&
        plan !== "pro"
    ) {


        throw new Error(
            "pro-required"
        );


    }


}


/* =========================================================
   FLATTEN LESSONS
========================================================= */

function resolveLessons() {


    const curriculum =
        Array.isArray(
            state.course.curriculum
        )
            ? state.course.curriculum
            : [];


    state.lessons = [];


    curriculum.forEach(
        (
            courseModule,
            moduleIndex
        ) => {


            const lessons =
                Array.isArray(
                    courseModule.lessons
                )
                    ? courseModule.lessons
                    : [];


            lessons.forEach(
                (
                    lesson,
                    lessonIndex
                ) => {


                    state.lessons.push(
                        {

                            ...lesson,

                            moduleId:
                                courseModule.id,

                            moduleTitle:
                                courseModule.title,

                            moduleDescription:
                                courseModule.description,

                            moduleIndex,

                            lessonIndex

                        }
                    );


                }
            );


        }
    );


    if (
        state.lessons.length ===
        0
    ) {


        throw new Error(
            "course-has-no-lessons"
        );


    }


}


/* =========================================================
   EXISTING PROGRESS
========================================================= */

function getStoredCourseProgress() {


    const progress =
        state.profile
            ?.courseProgress
            ?.[state.course.id];


    if (
        !progress ||
        typeof progress !==
            "object"
    ) {


        return {};


    }


    return progress;


}


/* =========================================================
   CURRENT LESSON
========================================================= */

function resolveCurrentLesson() {


    const progress =
        getStoredCourseProgress();


    state.completedLessons =
        Array.isArray(
            progress.completedLessons
        )
            ? [
                ...progress.completedLessons
            ]
            : [];


    let lessonId =
        requestedLessonId;


    /*
     * If no lesson was requested,
     * resume last accessed lesson.
     */

    if (
        !lessonId &&
        progress.currentLessonId
    ) {


        lessonId =
            progress.currentLessonId;


    }


    /*
     * Otherwise choose first incomplete.
     */

    if (!lessonId) {


        lessonId =
            state.lessons
                .find(
                    lesson =>
                        !state.completedLessons
                            .includes(
                                lesson.id
                            )
                )
                ?.id;


    }


    /*
     * If everything is completed,
     * use final lesson.
     */

    if (!lessonId) {


        lessonId =
            state.lessons[
                state.lessons.length - 1
            ].id;


    }


    const index =
        state.lessons
            .findIndex(
                lesson =>
                    lesson.id ===
                    lessonId
            );


    state.currentLessonIndex =
        index >= 0
            ? index
            : 0;


    state.currentLesson =
        state.lessons[
            state.currentLessonIndex
        ];


    calculateProgress();


}


/* =========================================================
   STUDENT
========================================================= */

function populateStudent() {


    const name =
        String(
            state.profile.displayName ||
            state.user.displayName ||
            deriveNameFromEmail(
                state.user.email
            ) ||
            "Student"
        )
            .trim();


    setText(
        "lesson-student-name",
        name
    );


    setText(
        "lesson-student-email",
        state.profile.email ||
        state.user.email ||
        ""
    );


    setText(
        "lesson-student-avatar",
        name.charAt(0)
            .toUpperCase() ||
        "S"
    );


}


/* =========================================================
   RENDER
========================================================= */

function renderWorkspace() {


    const course =
        state.course;


    const lesson =
        state.currentLesson;


    document.title =
        `${lesson.title} | ${course.title} | CWS CodeLab`;


    setText(
        "sidebar-course-title",
        course.title
    );


    setText(
        "lesson-course-name",
        course.title
    );


    setText(
        "lesson-course-kicker",
        `${course.category} · ${course.level}`
    );


    setText(
        "breadcrumb-course",
        course.title
    );


    setText(
        "breadcrumb-lesson",
        lesson.title
    );


    setText(
        "lesson-module-label",
        `Module ${
            lesson.moduleIndex + 1
        } · ${lesson.moduleTitle}`
    );


    setText(
        "lesson-title",
        lesson.title
    );


    setText(
        "lesson-description",
        lesson.description ||
        lesson.moduleDescription ||
        `Study ${lesson.title} as part of ${lesson.moduleTitle}.`
    );


    setText(
        "lesson-type",
        formatTitle(
            lesson.type ||
            "lesson"
        )
    );


    setText(
        "lesson-duration",
        lesson.duration ||
        "20 min"
    );


    renderLessonBody();

    renderObjectives();

    renderCurriculum();

    renderCompletion();

    renderNavigation();

    renderProgress();


}


/* =========================================================
   LESSON BODY
========================================================= */

function renderLessonBody() {


    const lesson =
        state.currentLesson;


    const container =
        document.getElementById(
            "lesson-content-text"
        );


    if (!container) {

        return;


    }


    /*
     * Future courses.js lessons can contain:
     *
     * content: [
     *   "Paragraph one",
     *   "Paragraph two"
     * ]
     */

    const content =
        Array.isArray(
            lesson.content
        )
            ? lesson.content
            : [];


    if (
        content.length > 0
    ) {


        container.innerHTML =
            content
                .map(
                    paragraph => `

                        <p>
                            ${escapeHtml(
                                paragraph
                            )}
                        </p>

                    `
                )
                .join("");


        return;


    }


    container.innerHTML = `

        <p>

            This lesson introduces
            <strong>
                ${escapeHtml(
                    lesson.title
                )}
            </strong>
            within the
            ${escapeHtml(
                lesson.moduleTitle
            )}
            module.

        </p>

        <p>

            The lesson workspace and progress tracking are active.
            Detailed teaching material, practical examples and
            exercises can now be added to this lesson through
            <code>data/courses.js</code>.

        </p>

    `;


}


/* =========================================================
   OBJECTIVES
========================================================= */

function renderObjectives() {


    const container =
        document.getElementById(
            "lesson-objectives"
        );


    if (!container) {

        return;


    }


    const objectives =
        Array.isArray(
            state.currentLesson.objectives
        )
            ? state.currentLesson.objectives
            : [

                `Understand the purpose of ${state.currentLesson.title}.`,

                `Connect this lesson to the ${state.currentLesson.moduleTitle} module.`,

                "Complete the lesson and record your learning progress."

            ];


    container.innerHTML =
        objectives
            .map(
                objective => `

                    <li>
                        ${escapeHtml(
                            objective
                        )}
                    </li>

                `
            )
            .join("");


}


/* =========================================================
   CURRICULUM SIDEBAR
========================================================= */

function renderCurriculum() {


    const container =
        document.getElementById(
            "lesson-curriculum"
        );


    if (!container) {

        return;


    }


    const curriculum =
        state.course.curriculum ||
        [];


    container.innerHTML =
        curriculum
            .map(
                (
                    courseModule,
                    moduleIndex
                ) => {


                    const lessons =
                        courseModule.lessons ||
                        [];


                    const containsCurrent =
                        lessons.some(
                            lesson =>
                                lesson.id ===
                                state.currentLesson.id
                        );


                    return `

                        <details
                            class="lesson-module"
                            ${containsCurrent
                                ? "open"
                                : ""
                            }
                        >

                            <summary>

                                <span>
                                    Module ${
                                        moduleIndex + 1
                                    }
                                </span>

                                ${escapeHtml(
                                    courseModule.title
                                )}

                            </summary>


                            <div class="lesson-module-lessons">

                                ${lessons
                                    .map(
                                        (
                                            lesson,
                                            lessonIndex
                                        ) => {


                                            const active =
                                                lesson.id ===
                                                state.currentLesson.id;


                                            const completed =
                                                state.completedLessons
                                                    .includes(
                                                        lesson.id
                                                    );


                                            return `

                                                <button
                                                    type="button"
                                                    class="
                                                        lesson-sidebar-lesson
                                                        ${active
                                                            ? "active"
                                                            : ""
                                                        }
                                                        ${completed
                                                            ? "completed"
                                                            : ""
                                                        }
                                                    "
                                                    data-lesson-id="${escapeHtml(
                                                        lesson.id
                                                    )}"
                                                >

                                                    <span
                                                        class="lesson-sidebar-number"
                                                    >
                                                        ${
                                                            lessonIndex + 1
                                                        }
                                                    </span>


                                                    <strong>
                                                        ${escapeHtml(
                                                            lesson.title
                                                        )}
                                                    </strong>


                                                    <span
                                                        class="lesson-sidebar-status"
                                                    >

                                                        ${completed
                                                            ? "✓"
                                                            : "○"
                                                        }

                                                    </span>

                                                </button>

                                            `;


                                        }
                                    )
                                    .join("")}

                            </div>


                        </details>

                    `;


                }
            )
            .join("");


    container
        .querySelectorAll(
            "[data-lesson-id]"
        )
        .forEach(
            button => {


                button.addEventListener(
                    "click",
                    () => {


                        navigateToLesson(
                            button.dataset
                                .lessonId
                        );


                    }
                );


            }
        );


}


/* =========================================================
   COMPLETION
========================================================= */

function renderCompletion() {


    const completed =
        state.completedLessons
            .includes(
                state.currentLesson.id
            );


    setText(
        "lesson-completion-status",
        completed
            ? "Completed"
            : "Not completed"
    );


    if (!completeButton) {

        return;


    }


    completeButton.disabled =
        completed;


    completeButton.classList.toggle(
        "completed",
        completed
    );


    completeButton.textContent =
        completed
            ? "Lesson Completed ✓"
            : "Mark Lesson Complete ✓";


}


/* =========================================================
   COMPLETE LESSON
========================================================= */

completeButton?.addEventListener(
    "click",
    async () => {


        if (
            !state.currentLesson ||
            !state.user
        ) {

            return;


        }


        if (
            state.completedLessons
                .includes(
                    state.currentLesson.id
                )
        ) {

            return;


        }


        completeButton.disabled =
            true;


        completeButton.textContent =
            "Saving progress...";


        try {


            state.completedLessons.push(
                state.currentLesson.id
            );


            calculateProgress();


            await saveCourseProgress();


            renderCompletion();

            renderCurriculum();

            renderProgress();


            showMessage(
                "Lesson completed. Your progress has been saved.",
                "success"
            );


        } catch (error) {


            console.error(
                "Could not save lesson completion:",
                error
            );


            state.completedLessons =
                state.completedLessons.filter(
                    id =>
                        id !==
                        state.currentLesson.id
                );


            calculateProgress();

            renderCompletion();


            showMessage(
                "CodeLab could not save your lesson progress.",
                "error"
            );


        }


    }
);


/* =========================================================
   CALCULATE PROGRESS
========================================================= */

function calculateProgress() {


    if (
        state.lessons.length ===
        0
    ) {


        state.percentage =
            0;


        return;


    }


    state.percentage =
        Math.round(
            (
                state.completedLessons.length /
                state.lessons.length
            ) *
            100
        );


}


/* =========================================================
   SAVE PROGRESS
========================================================= */

async function saveCourseProgress() {


    const userReference =
        doc(
            db,
            "users",
            state.user.uid
        );


    const existing =
        getStoredCourseProgress();


    const progressData = {

        completedLessons:
            [
                ...new Set(
                    state.completedLessons
                )
            ],

        completedCount:
            state.completedLessons.length,

        totalLessons:
            state.lessons.length,

        percentage:
            state.percentage,

        currentLessonId:
            state.currentLesson.id,

        completed:
            state.percentage >= 100,

        startedAt:
            existing.startedAt ||
            serverTimestamp(),

        lastAccessedAt:
            serverTimestamp()

    };


    /*
     * FieldPath is used because course IDs may contain
     * characters such as hyphens.
     */

    await updateDoc(

        userReference,

        new FieldPath(
            "courseProgress",
            state.course.id
        ),

        progressData,

        "lastActiveCourseId",

        state.course.id,

        "updatedAt",

        serverTimestamp()

    );


    state.profile.courseProgress = {

        ...state.profile.courseProgress,

        [state.course.id]:
            {

                ...progressData,

                lastAccessedAt:
                    new Date()

            }

    };


}


/* =========================================================
   SAVE CURRENT ACCESS
========================================================= */

async function saveCurrentLessonAccess() {


    try {


        const userReference =
            doc(
                db,
                "users",
                state.user.uid
            );


        const existing =
            getStoredCourseProgress();


        const progressData = {

            completedLessons:
                [
                    ...state.completedLessons
                ],

            completedCount:
                state.completedLessons.length,

            totalLessons:
                state.lessons.length,

            percentage:
                state.percentage,

            completed:
                state.percentage >= 100,

            currentLessonId:
                state.currentLesson.id,

            startedAt:
                existing.startedAt ||
                serverTimestamp(),

            lastAccessedAt:
                serverTimestamp()

        };


        await updateDoc(

            userReference,

            new FieldPath(
                "courseProgress",
                state.course.id
            ),

            progressData,

            "lastActiveCourseId",

            state.course.id,

            "updatedAt",

            serverTimestamp()

        );


    } catch (error) {


        console.warn(
            "Could not save lesson access:",
            error
        );


    }


}


/* =========================================================
   PROGRESS UI
========================================================= */

function renderProgress() {


    setText(
        "sidebar-course-progress",
        `${state.percentage}%`
    );


    const bar =
        document.getElementById(
            "sidebar-course-progress-bar"
        );


    if (bar) {


        bar.style.width =
            `${state.percentage}%`;


    }


}


/* =========================================================
   LESSON NAVIGATION
========================================================= */

function renderNavigation() {


    const previous =
        state.lessons[
            state.currentLessonIndex - 1
        ];


    const next =
        state.lessons[
            state.currentLessonIndex + 1
        ];


    if (previousButton) {


        previousButton.disabled =
            !previous;


        setText(
            "previous-lesson-title",
            previous
                ? previous.title
                : "Start of course"
        );


    }


    if (nextButton) {


        nextButton.disabled =
            !next;


        setText(
            "next-lesson-title",
            next
                ? next.title
                : "Course complete"
        );


    }


}


/* =========================================================
   PREVIOUS
========================================================= */

previousButton?.addEventListener(
    "click",
    () => {


        const previous =
            state.lessons[
                state.currentLessonIndex - 1
            ];


        if (previous) {


            navigateToLesson(
                previous.id
            );


        }


    }
);


/* =========================================================
   NEXT
========================================================= */

nextButton?.addEventListener(
    "click",
    () => {


        const next =
            state.lessons[
                state.currentLessonIndex + 1
            ];


        if (next) {


            navigateToLesson(
                next.id
            );


        }


    }
);


/* =========================================================
   NAVIGATE TO LESSON
========================================================= */

function navigateToLesson(
    lessonId
) {


    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "course",
        state.course.id
    );


    url.searchParams.set(
        "lesson",
        lessonId
    );


    window.location.href =
        url.href;


}


/* =========================================================
   SIDEBAR
========================================================= */

function initialiseSidebar() {


    const sidebar =
        document.getElementById(
            "lesson-sidebar"
        );


    const toggle =
        document.getElementById(
            "lesson-sidebar-toggle"
        );


    const close =
        document.getElementById(
            "lesson-sidebar-close"
        );


    const overlay =
        document.getElementById(
            "lesson-sidebar-overlay"
        );


    function openSidebar() {


        sidebar?.classList.add(
            "open"
        );


        overlay?.classList.add(
            "open"
        );


    }


    function closeSidebar() {


        sidebar?.classList.remove(
            "open"
        );


        overlay?.classList.remove(
            "open"
        );


    }


    toggle?.addEventListener(
        "click",
        openSidebar
    );


    close?.addEventListener(
        "click",
        closeSidebar
    );


    overlay?.addEventListener(
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


}


/* =========================================================
   FATAL ERROR
========================================================= */

function handleFatalError(
    error
) {


    const message =
        String(
            error?.message ||
            ""
        );


    let friendlyMessage =
        "CodeLab could not open this lesson.";


    if (
        message.includes(
            "not-enrolled"
        )
    ) {


        friendlyMessage =
            "You must enrol in this course before opening its lessons.";


    }


    else if (
        message.includes(
            "pro-required"
        )
    ) {


        friendlyMessage =
            "This lesson requires an active CodeLab Pro account.";


    }


    else if (
        message.includes(
            "course-not-available"
        )
    ) {


        friendlyMessage =
            "This course is not available yet.";


    }


    else if (
        message.includes(
            "course-not-found"
        ) ||
        message.includes(
            "course-not-specified"
        )
    ) {


        friendlyMessage =
            "The requested CodeLab course could not be found.";


    }


    setLoading(
        false
    );


    showMessage(
        friendlyMessage,
        "error"
    );


    window.setTimeout(
        () => {


            window.location.replace(
                COURSES_URL
            );


        },
        1800
    );


}


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(
    message,
    type = "info"
) {


    const element =
        document.getElementById(
            "lesson-message"
        );


    if (!element) {

        return;


    }


    element.textContent =
        message;


    element.className =
        `lesson-message ${type}`;


    element.hidden =
        false;


}


/* =========================================================
   LOADING
========================================================= */

function setLoading(
    value
) {


    if (loading) {


        loading.hidden =
            !value;


    }


}


/* =========================================================
   HELPERS
========================================================= */

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
            String(
                value ??
                ""
            );


    }


}


function deriveNameFromEmail(
    email
) {


    return String(
        email ||
        ""
    )
        .split("@")[0]
        .replace(
            /[._-]+/g,
            " "
        )
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


function formatTitle(
    value
) {


    return String(
        value ||
        ""
    )
        .replaceAll(
            "-",
            " "
        )
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );


}


function escapeHtml(
    value
) {


    return String(
        value ??
        ""
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


/* =========================================================
   CLEANUP
========================================================= */

window.addEventListener(
    "pagehide",
    () => {


        if (
            typeof unsubscribe ===
            "function"
        ) {


            unsubscribe();


        }


    }
);
