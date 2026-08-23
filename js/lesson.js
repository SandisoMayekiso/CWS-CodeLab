/* =========================================================
   CWS CODELAB
   LESSON WORKSPACE
   Academy-style dedicated course-file loader
========================================================= */

import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc,
    FieldPath,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const LOGIN_URL = new URL("../pages/login.html", import.meta.url).href;
const COURSES_URL = new URL("../student/student-courses.html", import.meta.url).href;
const PRICING_URL = new URL("../pages/pricing.html", import.meta.url).href;

const params = new URLSearchParams(window.location.search);

const requestedCourseId = params.get("course");
const requestedLessonId = params.get("lesson");

const state = {
    user: null,
    profile: {},
    metadata: null,
    course: null,
    lessons: [],
    currentLesson: null,
    currentLessonIndex: -1,
    completedLessons: [],
    percentage: 0
};

const loadingScreen = document.getElementById("lesson-loading");
const completeButton = document.getElementById("mark-lesson-complete");
const previousButton = document.getElementById("previous-lesson-button");
const nextButton = document.getElementById("next-lesson-button");

setText("lesson-year", new Date().getFullYear());
initialiseSidebar();


const unsubscribe = onAuthStateChanged(
    auth,

    async user => {

        if (!user) {
            window.location.replace(LOGIN_URL);
            return;
        }

        state.user = user;

        try {

            await waitForCatalogue();
            await loadProfile(user);

            resolveMetadata();
            verifyAccess();

            await loadCourseContent();

            flattenLessons();
            resolveCurrentLesson();
            populateIdentity();
            renderWorkspace();

            await saveCurrentAccess();

            setLoading(false);

        } catch (error) {

            console.error("Lesson workspace error:", error);
            handleFatalError(error);
        }
    },

    error => {
        console.error("Auth observer error:", error);
        window.location.replace(LOGIN_URL);
    }
);


function waitForCatalogue(timeout = 6000) {

    return new Promise((resolve, reject) => {

        if (
            Array.isArray(window.CWS_COURSES) &&
            window.CWS_COURSE_UTILS
        ) {
            resolve();
            return;
        }

        const started = Date.now();

        const timer = window.setInterval(() => {

            if (
                Array.isArray(window.CWS_COURSES) &&
                window.CWS_COURSE_UTILS
            ) {
                window.clearInterval(timer);
                resolve();
                return;
            }

            if (Date.now() - started >= timeout) {
                window.clearInterval(timer);
                reject(new Error("course-catalogue-unavailable"));
            }

        }, 40);
    });
}


async function loadProfile(user) {

    const snapshot = await getDoc(
        doc(db, "users", user.uid)
    );

    if (!snapshot.exists()) {
        throw new Error("student-profile-not-found");
    }

    state.profile = {
        id: snapshot.id,
        ...snapshot.data()
    };
}


function resolveMetadata() {

    if (!requestedCourseId) {
        throw new Error("course-not-specified");
    }

    state.metadata =
        window.CWS_COURSE_UTILS.getCourseById(
            requestedCourseId
        );

    if (!state.metadata) {
        throw new Error("course-not-found");
    }
}


function verifyAccess() {

    if (state.metadata.status !== "available") {
        throw new Error("course-not-available");
    }

    const enrolled =
        Array.isArray(state.profile.enrolledCourses) &&
        state.profile.enrolledCourses.includes(
            state.metadata.id
        );

    if (!enrolled) {
        throw new Error("not-enrolled");
    }

    const access = String(
        state.metadata.access ||
        ""
    ).toLowerCase();

    const plan = String(
        state.profile.plan ||
        "free"
    ).toLowerCase();

    if (
        access === "pro" &&
        plan !== "pro"
    ) {
        throw new Error("pro-required");
    }
}


async function loadCourseContent() {

    const access = String(
        state.metadata.access ||
        ""
    ).toLowerCase();

    /*
     * SECURITY:
     * Free course bodies may come from public dedicated JS files.
     * Pro bodies must later come from protected Firebase/backend delivery.
     */
    if (access === "pro") {
        throw new Error("protected-pro-loader-not-connected");
    }

    const loader =
        window.CWS_COURSE_UTILS?.loadCourseData;

    if (typeof loader !== "function") {
        throw new Error("course-loader-unavailable");
    }

    state.course = await loader(
        state.metadata.id
    );

    if (
        !state.course ||
        !Array.isArray(state.course.curriculum)
    ) {
        throw new Error("course-content-invalid");
    }
}


function flattenLessons() {

    state.lessons = [];

    state.course.curriculum.forEach(
        (courseModule, moduleIndex) => {

            const lessons =
                Array.isArray(courseModule.lessons)
                    ? courseModule.lessons
                    : [];

            lessons.forEach(
                (lesson, lessonIndex) => {

                    state.lessons.push({
                        ...lesson,
                        moduleId: courseModule.id,
                        moduleTitle: courseModule.title,
                        moduleDescription: courseModule.description,
                        moduleIndex,
                        lessonIndex
                    });
                }
            );
        }
    );

    if (!state.lessons.length) {
        throw new Error("course-has-no-lessons");
    }
}


function getStoredProgress() {

    const value =
        state.profile?.courseProgress?.[
            state.course.id
        ];

    return (
        value &&
        typeof value === "object"
    )
        ? value
        : {};
}


function resolveCurrentLesson() {

    const progress = getStoredProgress();

    state.completedLessons =
        Array.isArray(progress.completedLessons)
            ? [...progress.completedLessons]
            : [];

    let lessonId = requestedLessonId;

    if (
        !lessonId &&
        progress.currentLessonId
    ) {
        lessonId = progress.currentLessonId;
    }

    if (!lessonId) {

        lessonId =
            state.lessons.find(
                lesson =>
                    !state.completedLessons.includes(
                        lesson.id
                    )
            )?.id;
    }

    if (!lessonId) {
        lessonId =
            state.lessons[
                state.lessons.length - 1
            ].id;
    }

    const index = state.lessons.findIndex(
        lesson =>
            lesson.id === lessonId
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


function populateIdentity() {

    const name = String(
        state.profile.displayName ||
        state.user.displayName ||
        deriveNameFromEmail(
            state.user.email
        ) ||
        "Student"
    ).trim();

    setText("lesson-student-name", name);
    setText(
        "lesson-student-email",
        state.profile.email ||
        state.user.email ||
        ""
    );

    setText(
        "lesson-student-avatar",
        name.charAt(0).toUpperCase() ||
        "S"
    );
}


function renderWorkspace() {

    const course = state.course;
    const lesson = state.currentLesson;

    document.title =
        `${lesson.title} | ${course.title} | CWS CodeLab`;

    setText("sidebar-course-title", course.title);
    setText("lesson-course-name", course.title);
    setText(
        "lesson-course-kicker",
        `${course.category} · ${course.level}`
    );

    setText("breadcrumb-course", course.title);
    setText("breadcrumb-lesson", lesson.title);

    setText(
        "lesson-module-label",
        `Module ${lesson.moduleIndex + 1} · ${lesson.moduleTitle}`
    );

    setText("lesson-title", lesson.title);
    setText(
        "lesson-description",
        lesson.description ||
        lesson.moduleDescription ||
        ""
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
        "25 min"
    );

    renderDeepContext();
    renderContent();
    renderObjectives();
    renderTerminology();
    renderExamples();
    renderPractice();
    renderMistakes();
    renderAdvanced();
    renderCurriculum();
    renderCompletion();
    renderNavigation();
    renderProgress();
}


function renderDeepContext() {

    const lesson = state.currentLesson;

    renderParagraph("lesson-what", lesson.what);
    renderParagraph("lesson-why", lesson.why);
    renderParagraph("lesson-how", lesson.how);

    const context =
        document.getElementById(
            "lesson-context"
        );

    if (!context) {
        return;
    }

    context.innerHTML = `
        ${contextList("Who uses this?", lesson.who)}
        ${contextList("When is it useful?", lesson.when)}
        ${contextList("Where is it used?", lesson.where)}
        ${contextList("When might you avoid it?", lesson.avoidWhen)}
    `;
}


function contextList(title, values) {

    if (
        !Array.isArray(values) ||
        !values.length
    ) {
        return "";
    }

    return `
        <section class="lesson-context-list">
            <h3>${escapeHtml(title)}</h3>
            <ul>
                ${values.map(
                    value =>
                        `<li>${escapeHtml(value)}</li>`
                ).join("")}
            </ul>
        </section>
    `;
}


function renderContent() {

    const target =
        document.getElementById(
            "lesson-content-text"
        );

    if (!target) {
        return;
    }

    const content =
        Array.isArray(
            state.currentLesson.content
        )
            ? state.currentLesson.content
            : [];

    target.innerHTML = content.length
        ? content.map(
            paragraph =>
                `<p>${escapeHtml(paragraph)}</p>`
        ).join("")
        : `
            <p>
                Detailed content for this lesson is being prepared.
            </p>
        `;
}


function renderObjectives() {

    const target =
        document.getElementById(
            "lesson-objectives"
        );

    if (!target) {
        return;
    }

    const items =
        Array.isArray(
            state.currentLesson.objectives
        )
            ? state.currentLesson.objectives
            : [];

    target.innerHTML = items.length
        ? items.map(
            item =>
                `<li>${escapeHtml(item)}</li>`
        ).join("")
        : `
            <li>
                Understand and apply the concepts in this lesson.
            </li>
        `;
}


function renderTerminology() {

    const card =
        document.getElementById(
            "lesson-terminology-card"
        );

    const target =
        document.getElementById(
            "lesson-terminology"
        );

    if (!target) {
        return;
    }

    const items =
        Array.isArray(
            state.currentLesson.terminology
        )
            ? state.currentLesson.terminology
            : [];

    if (!items.length) {
        if (card) card.hidden = true;
        return;
    }

    if (card) card.hidden = false;

    target.innerHTML = items.map(item => `
        <div class="lesson-term">
            <strong>${escapeHtml(item.term || "")}</strong>
            <p>${escapeHtml(item.definition || "")}</p>
        </div>
    `).join("");
}


function renderExamples() {

    const card =
        document.getElementById(
            "lesson-examples-card"
        );

    const target =
        document.getElementById(
            "lesson-examples"
        );

    if (!target) {
        return;
    }

    const examples =
        Array.isArray(
            state.currentLesson.examples
        )
            ? state.currentLesson.examples
            : [];

    if (!examples.length) {
        if (card) card.hidden = true;
        return;
    }

    if (card) card.hidden = false;

    target.innerHTML = examples.map(
        (example, index) => `
            <section class="lesson-example">
                <p class="lesson-section-kicker">
                    Example ${index + 1}
                </p>

                <h3>
                    ${escapeHtml(
                        example.title ||
                        "Example"
                    )}
                </h3>

                ${example.scenario
                    ? `<p>${escapeHtml(example.scenario)}</p>`
                    : ""}

                ${example.code
                    ? `<pre><code>${escapeHtml(example.code)}</code></pre>`
                    : ""}

                ${example.output
                    ? `
                        <p>
                            <strong>Output:</strong>
                            ${escapeHtml(example.output)}
                        </p>
                    `
                    : ""}

                ${example.explanation
                    ? `<p>${escapeHtml(example.explanation)}</p>`
                    : ""}
            </section>
        `
    ).join("");
}


function renderPractice() {

    const card =
        document.getElementById(
            "lesson-practice-card"
        );

    const target =
        document.getElementById(
            "lesson-practice"
        );

    if (!target) {
        return;
    }

    const tasks =
        Array.isArray(
            state.currentLesson.practice
        )
            ? state.currentLesson.practice
            : [];

    if (!tasks.length) {
        if (card) card.hidden = true;
        return;
    }

    if (card) card.hidden = false;

    target.innerHTML = tasks.map(
        (task, index) => `
            <section class="lesson-practice-block">
                <p class="lesson-practice-label">
                    ${escapeHtml(task.difficulty || "practice")}
                </p>

                <h3>
                    ${index + 1}. ${escapeHtml(task.title || "Practice")}
                </h3>

                <p>
                    ${escapeHtml(task.task || "")}
                </p>

                ${task.hint
                    ? `
                        <details>
                            <summary>Show hint</summary>
                            <p>${escapeHtml(task.hint)}</p>
                        </details>
                    `
                    : ""}

                ${task.solution
                    ? `
                        <details>
                            <summary>Show solution</summary>
                            <pre><code>${escapeHtml(task.solution)}</code></pre>
                        </details>
                    `
                    : ""}
            </section>
        `
    ).join("");
}


function renderMistakes() {

    const card =
        document.getElementById(
            "lesson-mistakes-card"
        );

    const target =
        document.getElementById(
            "lesson-mistakes"
        );

    if (!target) {
        return;
    }

    const mistakes =
        Array.isArray(
            state.currentLesson.commonMistakes
        )
            ? state.currentLesson.commonMistakes
            : [];

    const troubleshooting =
        Array.isArray(
            state.currentLesson.troubleshooting
        )
            ? state.currentLesson.troubleshooting
            : [];

    if (
        !mistakes.length &&
        !troubleshooting.length
    ) {
        if (card) card.hidden = true;
        return;
    }

    if (card) card.hidden = false;

    target.innerHTML = `
        ${mistakes.length
            ? `
                <h3>Common mistakes</h3>
                <ul>
                    ${mistakes.map(
                        item =>
                            `<li>${escapeHtml(item)}</li>`
                    ).join("")}
                </ul>
            `
            : ""}

        ${troubleshooting.length
            ? `
                <h3>Troubleshooting</h3>
                <ul>
                    ${troubleshooting.map(
                        item =>
                            `<li>${escapeHtml(item)}</li>`
                    ).join("")}
                </ul>
            `
            : ""}
    `;
}


function renderAdvanced() {

    const card =
        document.getElementById(
            "lesson-advanced-card"
        );

    const target =
        document.getElementById(
            "lesson-advanced"
        );

    const title =
        document.getElementById(
            "lesson-advanced-title"
        );

    if (!target) {
        return;
    }

    const advanced =
        state.currentLesson.advanced;

    if (
        !advanced ||
        advanced.available === false
    ) {
        if (card) card.hidden = true;
        return;
    }

    if (card) card.hidden = false;

    if (
        title &&
        advanced.title
    ) {
        title.textContent =
            advanced.title;
    }

    const content =
        Array.isArray(
            advanced.content
        )
            ? advanced.content
            : [];

    target.innerHTML = content.map(
        paragraph =>
            `<p>${escapeHtml(paragraph)}</p>`
    ).join("");
}


function renderCurriculum() {

    const target =
        document.getElementById(
            "lesson-curriculum"
        );

    if (!target) {
        return;
    }

    target.innerHTML = state.course.curriculum.map(
        (courseModule, moduleIndex) => {

            const lessons =
                Array.isArray(
                    courseModule.lessons
                )
                    ? courseModule.lessons
                    : [];

            const open =
                lessons.some(
                    lesson =>
                        lesson.id ===
                        state.currentLesson.id
                );

            return `
                <details
                    class="lesson-module"
                    ${open ? "open" : ""}
                >
                    <summary>
                        <span>
                            Module ${moduleIndex + 1}
                        </span>
                        ${escapeHtml(courseModule.title)}
                    </summary>

                    <div class="lesson-module-lessons">
                        ${lessons.map(
                            (lesson, lessonIndex) => {

                                const active =
                                    lesson.id ===
                                    state.currentLesson.id;

                                const completed =
                                    state.completedLessons.includes(
                                        lesson.id
                                    );

                                return `
                                    <button
                                        type="button"
                                        class="
                                            lesson-sidebar-lesson
                                            ${active ? "active" : ""}
                                            ${completed ? "completed" : ""}
                                        "
                                        data-lesson-id="${escapeHtml(lesson.id)}"
                                    >
                                        <span class="lesson-sidebar-number">
                                            ${lessonIndex + 1}
                                        </span>

                                        <strong>
                                            ${escapeHtml(lesson.title)}
                                        </strong>

                                        <span class="lesson-sidebar-status">
                                            ${completed ? "✓" : "○"}
                                        </span>
                                    </button>
                                `;
                            }
                        ).join("")}
                    </div>
                </details>
            `;
        }
    ).join("");

    target
        .querySelectorAll(
            "[data-lesson-id]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {
                    navigateToLesson(
                        button.dataset.lessonId
                    );
                }
            );
        });
}


function renderCompletion() {

    const completed =
        state.completedLessons.includes(
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

    completeButton.disabled = completed;

    completeButton.classList.toggle(
        "completed",
        completed
    );

    completeButton.textContent =
        completed
            ? "Lesson Completed ✓"
            : "Mark Lesson Complete ✓";
}


completeButton?.addEventListener(
    "click",
    async () => {

        if (
            !state.currentLesson ||
            !state.user ||
            state.completedLessons.includes(
                state.currentLesson.id
            )
        ) {
            return;
        }

        completeButton.disabled = true;
        completeButton.textContent =
            "Saving progress...";

        try {

            state.completedLessons.push(
                state.currentLesson.id
            );

            calculateProgress();

            await saveProgress();

            renderCompletion();
            renderCurriculum();
            renderProgress();

            showMessage(
                "Lesson completed. Your progress has been saved.",
                "success"
            );

        } catch (error) {

            console.error(
                "Progress save failed:",
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
                "CodeLab could not save your progress.",
                "error"
            );
        }
    }
);


function calculateProgress() {

    state.completedLessons = [
        ...new Set(
            state.completedLessons
        )
    ];

    state.percentage =
        state.lessons.length
            ? Math.round(
                (
                    state.completedLessons.length /
                    state.lessons.length
                ) *
                100
            )
            : 0;
}


async function saveProgress() {

    const existing =
        getStoredProgress();

    const progressData = {
        completedLessons:
            [...state.completedLessons],
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

    await updateDoc(
        doc(
            db,
            "users",
            state.user.uid
        ),

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
        ...(state.profile.courseProgress || {}),
        [state.course.id]:
            progressData
    };
}


async function saveCurrentAccess() {

    try {
        await saveProgress();
    } catch (error) {
        console.warn(
            "Current lesson position could not be saved:",
            error
        );
    }
}


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


function navigateToLesson(lessonId) {

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

    function closeSidebar() {
        sidebar?.classList.remove("open");
        overlay?.classList.remove("open");
    }

    toggle?.addEventListener(
        "click",
        () => {
            sidebar?.classList.add("open");
            overlay?.classList.add("open");
        }
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
            if (event.key === "Escape") {
                closeSidebar();
            }
        }
    );
}


function handleFatalError(error) {

    const value = String(
        error?.message ||
        error?.code ||
        ""
    );

    let message =
        "CodeLab could not open this lesson.";

    if (value.includes("not-enrolled")) {
        message =
            "You must enrol in this course before opening its lessons.";
    }

    else if (value.includes("pro-required")) {
        message =
            "This course requires active CodeLab Pro access.";
    }

    else if (
        value.includes(
            "protected-pro-loader-not-connected"
        )
    ) {
        message =
            "Protected Pro lesson delivery has not been connected yet.";
    }

    else if (
        value.includes(
            "course-not-available"
        )
    ) {
        message =
            "This course is not available yet.";
    }

    else if (
        value.includes("course-not-found") ||
        value.includes("course-not-specified")
    ) {
        message =
            "The requested CodeLab course could not be found.";
    }

    else if (
        value.includes("course-data-load-failed") ||
        value.includes(
            "course-data-registration-missing"
        )
    ) {
        message =
            "CodeLab could not load this course curriculum file.";
    }

    setLoading(false);
    showMessage(message, "error");

    window.setTimeout(
        () => {

            if (
                value.includes(
                    "protected-pro-loader-not-connected"
                )
            ) {
                window.location.replace(
                    PRICING_URL
                );
            } else {
                window.location.replace(
                    COURSES_URL
                );
            }
        },
        2200
    );
}


function showMessage(
    message,
    type = "info"
) {

    const target =
        document.getElementById(
            "lesson-message"
        );

    if (!target) {
        return;
    }

    target.textContent =
        String(message || "");

    target.className =
        `lesson-message ${type}`;

    target.hidden = false;
}


function renderParagraph(id, value) {

    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }

    target.innerHTML = value
        ? `<p>${escapeHtml(value)}</p>`
        : `<p>Additional context for this lesson is being prepared.</p>`;
}


function setLoading(value) {

    if (loadingScreen) {
        loadingScreen.hidden =
            !value;
    }
}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            String(value ?? "");
    }
}


function deriveNameFromEmail(email) {

    return String(email || "")
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );
}


function formatTitle(value) {

    return String(value || "")
        .replaceAll("-", " ")
        .replace(
            /\b\w/g,
            character =>
                character.toUpperCase()
        );
}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


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
