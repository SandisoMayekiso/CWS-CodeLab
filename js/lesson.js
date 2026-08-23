/* =========================================================
   CWS CODELAB
   LESSON WORKSPACE + KNOWLEDGE CHECKS
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


const LOGIN_URL =
    new URL("../pages/login.html", import.meta.url).href;

const COURSES_URL =
    new URL("../student/student-courses.html", import.meta.url).href;

const MODULE_ASSESSMENT_URL =
    new URL("../student/module-assessment.html", import.meta.url).href;

const FINAL_ASSESSMENT_URL =
    new URL("../student/final-assessment.html", import.meta.url).href;


const params =
    new URLSearchParams(window.location.search);

const requestedCourseId =
    params.get("course");

const requestedLessonId =
    params.get("lesson");


const state = {
    user: null,
    profile: {},
    metadata: null,
    course: null,
    lessons: [],
    currentLesson: null,
    currentLessonIndex: -1,
    completedLessons: [],
    percentage: 0,
    knowledgePassed: false,
    knowledgeSelected: null,
    knowledgeQuestion: null
};


const loadingScreen =
    document.getElementById("lesson-loading");

const completeButton =
    document.getElementById("mark-lesson-complete");

const previousButton =
    document.getElementById("previous-lesson-button");

const nextButton =
    document.getElementById("next-lesson-button");


setText(
    "lesson-year",
    new Date().getFullYear()
);

initialiseSidebar();


const unsubscribe =
    onAuthStateChanged(
        auth,

        async user => {

            if (!user) {
                window.location.replace(LOGIN_URL);
                return;
            }

            state.user = user;

            try {
                await waitForCatalogue();
                await loadProfile();
                resolveMetadata();
                verifyAccess();
                await loadCourse();
                flattenLessons();
                resolveCurrentLesson();
                resolveKnowledgeState();
                populateIdentity();
                renderWorkspace();
                await saveCurrentAccess();
                setLoading(false);

            } catch (error) {
                console.error(
                    "Lesson workspace error:",
                    error
                );
                handleFatalError(error);
            }
        },

        error => {
            console.error(
                "Lesson authentication failed:",
                error
            );
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

        const timer =
            window.setInterval(() => {

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
                    reject(
                        new Error(
                            "course-catalogue-unavailable"
                        )
                    );
                }

            }, 40);
    });
}


async function loadProfile() {

    const snapshot =
        await getDoc(
            doc(
                db,
                "users",
                state.user.uid
            )
        );

    if (!snapshot.exists()) {
        throw new Error(
            "student-profile-not-found"
        );
    }

    state.profile = {
        id: snapshot.id,
        ...snapshot.data()
    };
}


function resolveMetadata() {

    if (!requestedCourseId) {
        throw new Error(
            "course-not-specified"
        );
    }

    state.metadata =
        window.CWS_COURSE_UTILS.getCourseById(
            requestedCourseId
        );

    if (!state.metadata) {
        throw new Error(
            "course-not-found"
        );
    }
}


function verifyAccess() {

    if (state.metadata.status !== "available") {
        throw new Error(
            "course-not-available"
        );
    }

    const enrolled =
        Array.isArray(
            state.profile.enrolledCourses
        ) &&
        state.profile.enrolledCourses.includes(
            state.metadata.id
        );

    if (!enrolled) {
        throw new Error(
            "not-enrolled"
        );
    }

    if (
        String(
            state.metadata.access || ""
        ).toLowerCase() === "pro"
    ) {
        throw new Error(
            "protected-pro-loader-not-connected"
        );
    }
}


async function loadCourse() {

    state.course =
        await window.CWS_COURSE_UTILS.loadCourseData(
            state.metadata.id
        );

    if (
        !state.course ||
        !Array.isArray(
            state.course.curriculum
        )
    ) {
        throw new Error(
            "course-content-invalid"
        );
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
                        moduleId:
                            courseModule.id,
                        moduleTitle:
                            courseModule.title,
                        moduleDescription:
                            courseModule.description,
                        moduleIndex,
                        lessonIndex
                    });
                }
            );
        }
    );

    if (!state.lessons.length) {
        throw new Error(
            "course-has-no-lessons"
        );
    }
}


function getStoredProgress() {

    const value =
        state.profile
            ?.courseProgress
            ?.[state.course.id];

    return (
        value &&
        typeof value === "object"
    )
        ? value
        : {};
}


function resolveCurrentLesson() {

    const progress =
        getStoredProgress();

    state.completedLessons =
        Array.isArray(
            progress.completedLessons
        )
            ? [...progress.completedLessons]
            : [];

    let lessonId =
        requestedLessonId ||
        progress.currentLessonId;

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

    const index =
        state.lessons.findIndex(
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


function getLessonCheckRecord() {

    return state.profile
        ?.lessonKnowledgeChecks
        ?.[state.course.id]
        ?.[state.currentLesson.id] ||
        {};
}


function resolveKnowledgeState() {

    const checks =
        Array.isArray(
            state.currentLesson.knowledgeCheck
        )
            ? state.currentLesson.knowledgeCheck
            : [];

    const original =
        checks[0] || null;

    state.knowledgeQuestion =
        original
            ? shuffleQuestionOptions(
                original
            )
            : null;

    const record =
        getLessonCheckRecord();

    state.knowledgePassed =
        !state.knowledgeQuestion ||
        Boolean(
            record.passed
        );

    state.knowledgeSelected = null;
}


function shuffleQuestionOptions(question) {

    const items =
        question.options.map(
            (text, originalIndex) => ({
                text,
                originalIndex
            })
        );

    const correctOriginal =
        question.correctAnswer;

    for (
        let i = items.length - 1;
        i > 0;
        i -= 1
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            items[i],
            items[j]
        ] = [
            items[j],
            items[i]
        ];
    }

    return {
        ...question,
        options:
            items.map(
                item =>
                    item.text
            ),
        correctAnswer:
            items.findIndex(
                item =>
                    item.originalIndex ===
                    correctOriginal
            )
    };
}


function populateIdentity() {

    const name =
        String(
            state.profile.displayName ||
            state.user.displayName ||
            deriveNameFromEmail(
                state.user.email
            ) ||
            "Student"
        ).trim();

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
        name.charAt(0).toUpperCase() ||
        "S"
    );
}


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
        `${course.category || ""} · ${course.level || ""}`
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
        `Module ${lesson.moduleIndex + 1} · ${lesson.moduleTitle}`
    );

    setText(
        "lesson-title",
        lesson.title
    );

    setText(
        "lesson-description",
        lesson.description ||
        lesson.moduleDescription ||
        ""
    );

    setText(
        "lesson-type",
        formatTitle(
            lesson.type || "lesson"
        )
    );

    setText(
        "lesson-duration",
        lesson.duration || "25 min"
    );

    renderParagraph(
        "lesson-what",
        lesson.what
    );

    renderParagraph(
        "lesson-why",
        lesson.why
    );

    renderParagraph(
        "lesson-how",
        lesson.how
    );

    renderContext();
    renderContent();
    renderObjectives();
    renderTerminology();
    renderExamples();
    renderPractice();
    renderMistakes();
    renderAdvanced();
    renderKnowledgeCheck();
    renderCurriculum();
    renderCompletion();
    renderModuleActions();
    renderNavigation();
    renderProgress();
}


function renderContext() {

    const target =
        document.getElementById(
            "lesson-context"
        );

    if (!target) {
        return;
    }

    target.innerHTML = `
        ${contextList(
            "Who uses this?",
            state.currentLesson.who
        )}
        ${contextList(
            "When is it useful?",
            state.currentLesson.when
        )}
        ${contextList(
            "Where is it used?",
            state.currentLesson.where
        )}
        ${contextList(
            "When might you avoid it?",
            state.currentLesson.avoidWhen
        )}
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
                    item =>
                        `<li>${escapeHtml(item)}</li>`
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

    target.innerHTML =
        content.length
            ? content.map(
                paragraph =>
                    `<p>${escapeHtml(paragraph)}</p>`
            ).join("")
            : `<p>Detailed content for this lesson is being prepared.</p>`;
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

    target.innerHTML =
        items.map(
            item =>
                `<li>${escapeHtml(item)}</li>`
        ).join("");
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

    const items =
        Array.isArray(
            state.currentLesson.terminology
        )
            ? state.currentLesson.terminology
            : [];

    if (!target) {
        return;
    }

    if (!items.length) {
        if (card) {
            card.hidden = true;
        }
        return;
    }

    if (card) {
        card.hidden = false;
    }

    target.innerHTML =
        items.map(
            item => `
                <div class="lesson-term">
                    <strong>${escapeHtml(item.term || "")}</strong>
                    <p>${escapeHtml(item.definition || "")}</p>
                </div>
            `
        ).join("");
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

    const items =
        Array.isArray(
            state.currentLesson.examples
        )
            ? state.currentLesson.examples
            : [];

    if (!target) {
        return;
    }

    if (!items.length) {
        if (card) {
            card.hidden = true;
        }
        return;
    }

    if (card) {
        card.hidden = false;
    }

    target.innerHTML =
        items.map(
            (item, index) => `
                <section class="lesson-example">
                    <p class="lesson-section-kicker">
                        Example ${index + 1}
                    </p>
                    <h3>${escapeHtml(item.title || "Example")}</h3>
                    ${item.scenario
                        ? `<p>${escapeHtml(item.scenario)}</p>`
                        : ""}
                    ${item.code
                        ? `<pre><code>${escapeHtml(item.code)}</code></pre>`
                        : ""}
                    ${item.output
                        ? `<p><strong>Output:</strong> ${escapeHtml(item.output)}</p>`
                        : ""}
                    ${item.explanation
                        ? `<p>${escapeHtml(item.explanation)}</p>`
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

    const items =
        Array.isArray(
            state.currentLesson.practice
        )
            ? state.currentLesson.practice
            : [];

    if (!target) {
        return;
    }

    if (!items.length) {
        if (card) {
            card.hidden = true;
        }
        return;
    }

    if (card) {
        card.hidden = false;
    }

    target.innerHTML =
        items.map(
            (item, index) => `
                <section class="lesson-practice-block">
                    <p class="lesson-practice-label">
                        ${escapeHtml(item.difficulty || "practice")}
                    </p>
                    <h3>${index + 1}. ${escapeHtml(item.title || "Practice")}</h3>
                    <p>${escapeHtml(item.task || "")}</p>
                    ${item.hint
                        ? `
                            <details>
                                <summary>Show hint</summary>
                                <p>${escapeHtml(item.hint)}</p>
                            </details>
                        `
                        : ""}
                    ${item.solution
                        ? `
                            <details>
                                <summary>Show solution</summary>
                                <pre><code>${escapeHtml(item.solution)}</code></pre>
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

    if (!target) {
        return;
    }

    if (
        !mistakes.length &&
        !troubleshooting.length
    ) {
        if (card) {
            card.hidden = true;
        }
        return;
    }

    if (card) {
        card.hidden = false;
    }

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

    const advanced =
        state.currentLesson.advanced;

    if (!target) {
        return;
    }

    if (
        !advanced ||
        advanced.available === false
    ) {
        if (card) {
            card.hidden = true;
        }
        return;
    }

    if (card) {
        card.hidden = false;
    }

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

    target.innerHTML =
        content.map(
            paragraph =>
                `<p>${escapeHtml(paragraph)}</p>`
        ).join("");
}


function renderKnowledgeCheck() {

    const card =
        document.getElementById(
            "lesson-knowledge-card"
        );

    const questionTarget =
        document.getElementById(
            "lesson-knowledge-question"
        );

    const optionsTarget =
        document.getElementById(
            "lesson-knowledge-options"
        );

    const resultTarget =
        document.getElementById(
            "lesson-knowledge-result"
        );

    const submitButton =
        document.getElementById(
            "lesson-knowledge-submit"
        );

    const question =
        state.knowledgeQuestion;

    if (
        !card ||
        !question ||
        !questionTarget ||
        !optionsTarget
    ) {

        if (card) {
            card.hidden = true;
        }

        state.knowledgePassed = true;
        return;
    }

    card.hidden = false;
    questionTarget.textContent =
        question.question;

    optionsTarget.innerHTML =
        question.options.map(
            (option, index) => `
                <label
                    class="
                        lesson-knowledge-option
                        ${state.knowledgeSelected === index ? "selected" : ""}
                    "
                >
                    <input
                        type="radio"
                        name="lesson-knowledge-option"
                        value="${index}"
                        ${state.knowledgeSelected === index ? "checked" : ""}
                        ${state.knowledgePassed ? "disabled" : ""}
                    >
                    <span class="lesson-knowledge-option-index">
                        ${String.fromCharCode(65 + index)}
                    </span>
                    <span>${escapeHtml(option)}</span>
                </label>
            `
        ).join("");

    if (!state.knowledgePassed) {

        optionsTarget
            .querySelectorAll(
                'input[name="lesson-knowledge-option"]'
            )
            .forEach(input => {

                input.addEventListener(
                    "change",
                    () => {

                        state.knowledgeSelected =
                            Number(
                                input.value
                            );

                        renderKnowledgeCheck();
                    }
                );
            });
    }

    if (state.knowledgePassed) {

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent =
                "Knowledge Check Passed ✓";
        }

        if (resultTarget) {
            resultTarget.hidden = false;
            resultTarget.className =
                "lesson-knowledge-result success";
            resultTarget.textContent =
                "Passed. You can now mark this lesson complete.";
        }

    } else {

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent =
                "Check Answer";
        }

        if (resultTarget) {
            resultTarget.hidden = true;
        }
    }
}


document
    .getElementById(
        "lesson-knowledge-form"
    )
    ?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            if (
                state.knowledgePassed ||
                !state.knowledgeQuestion
            ) {
                return;
            }

            const resultTarget =
                document.getElementById(
                    "lesson-knowledge-result"
                );

            if (
                !Number.isInteger(
                    state.knowledgeSelected
                )
            ) {

                if (resultTarget) {
                    resultTarget.hidden = false;
                    resultTarget.className =
                        "lesson-knowledge-result error";
                    resultTarget.textContent =
                        "Choose an answer before checking.";
                }

                return;
            }

            const correct =
                state.knowledgeSelected ===
                state.knowledgeQuestion.correctAnswer;

            await saveKnowledgeAttempt(
                correct
            );

            if (!correct) {

                if (resultTarget) {
                    resultTarget.hidden = false;
                    resultTarget.className =
                        "lesson-knowledge-result error";
                    resultTarget.textContent =
                        state.knowledgeQuestion.explanation ||
                        "Review the lesson and try again.";
                }

                return;
            }

            state.knowledgePassed = true;

            renderKnowledgeCheck();
            renderCompletion();

            showMessage(
                "Knowledge check passed. You can mark the lesson complete.",
                "success"
            );
        }
    );


async function saveKnowledgeAttempt(passed) {

    const existing =
        getLessonCheckRecord();

    const data = {
        lessonId:
            state.currentLesson.id,
        questionId:
            state.knowledgeQuestion?.id || "",
        attempts:
            Number(
                existing.attempts || 0
            ) + 1,
        passed:
            Boolean(
                existing.passed ||
                passed
            ),
        lastCorrect:
            passed,
        updatedAt:
            serverTimestamp()
    };

    await updateDoc(
        doc(
            db,
            "users",
            state.user.uid
        ),
        new FieldPath(
            "lessonKnowledgeChecks",
            state.course.id,
            state.currentLesson.id
        ),
        data,
        "updatedAt",
        serverTimestamp()
    );

    state.profile.lessonKnowledgeChecks = {
        ...(
            state.profile.lessonKnowledgeChecks ||
            {}
        ),
        [state.course.id]: {
            ...(
                state.profile
                    ?.lessonKnowledgeChecks
                    ?.[state.course.id] ||
                {}
            ),
            [state.currentLesson.id]: {
                ...data,
                updatedAt: null
            }
        }
    };
}


function renderCurriculum() {

    const target =
        document.getElementById(
            "lesson-curriculum"
        );

    if (!target) {
        return;
    }

    target.innerHTML =
        state.course.curriculum.map(
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
                            <span>Module ${moduleIndex + 1}</span>
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
                                            <strong>${escapeHtml(lesson.title)}</strong>
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
            : state.knowledgePassed
                ? "Ready to complete"
                : "Pass the knowledge check first"
    );

    if (!completeButton) {
        return;
    }

    completeButton.disabled =
        completed ||
        !state.knowledgePassed;

    completeButton.classList.toggle(
        "completed",
        completed
    );

    completeButton.textContent =
        completed
            ? "Lesson Completed ✓"
            : !state.knowledgePassed
                ? "Complete Knowledge Check First"
                : "Mark Lesson Complete ✓";
}


completeButton
    ?.addEventListener(
        "click",
        async () => {

            if (
                !state.currentLesson ||
                !state.user ||
                !state.knowledgePassed ||
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
                renderModuleActions();

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
        ...(
            state.profile.courseProgress ||
            {}
        ),
        [state.course.id]: {
            ...progressData,
            startedAt: null,
            lastAccessedAt: null
        }
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


function getCurrentModule() {

    return state.course.curriculum[
        state.currentLesson.moduleIndex
    ] || null;
}


function renderModuleActions() {

    const callout =
        document.getElementById(
            "module-assessment-callout"
        );

    if (!callout) {
        return;
    }

    const module =
        getCurrentModule();

    if (
        !module ||
        !Array.isArray(
            module.lessons
        ) ||
        !module.lessons.length
    ) {
        callout.hidden = true;
        return;
    }

    const lastLesson =
        module.lessons[
            module.lessons.length - 1
        ];

    const everyLessonComplete =
        module.lessons.every(
            lesson =>
                state.completedLessons.includes(
                    lesson.id
                )
        );

    const show =
        state.currentLesson.id ===
            lastLesson.id &&
        everyLessonComplete;

    callout.hidden = !show;

    if (!show) {
        return;
    }

    setText(
        "module-assessment-title",
        `${module.title} complete`
    );

    setText(
        "module-assessment-copy",
        "Your lessons are complete. Test your understanding with a fresh module quiz, then complete the practical assessment."
    );

    const quizLink =
        document.getElementById(
            "module-quiz-link"
        );

    const practicalLink =
        document.getElementById(
            "module-practical-link"
        );


    const finalLink =
        document.getElementById(
            "module-final-link"
        );

    if (quizLink) {

        const url =
            new URL(
                MODULE_ASSESSMENT_URL
            );

        url.searchParams.set(
            "course",
            state.course.id
        );

        url.searchParams.set(
            "module",
            module.id
        );

        url.searchParams.set(
            "mode",
            "quiz"
        );

        quizLink.href = url.href;
    }

    if (practicalLink) {

        const url =
            new URL(
                MODULE_ASSESSMENT_URL
            );

        url.searchParams.set(
            "course",
            state.course.id
        );

        url.searchParams.set(
            "module",
            module.id
        );

        url.searchParams.set(
            "mode",
            "assessment"
        );

        practicalLink.href = url.href;
    }

    if (finalLink) {

        const isFinalModule =
            state.currentLesson.moduleIndex ===
            state.course.curriculum.length - 1;

        finalLink.hidden =
            !isFinalModule;

        if (isFinalModule) {

            const url =
                new URL(
                    FINAL_ASSESSMENT_URL
                );

            url.searchParams.set(
                "course",
                state.course.id
            );

            finalLink.href =
                url.href;
        }
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


previousButton
    ?.addEventListener(
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


nextButton
    ?.addEventListener(
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

        sidebar?.classList.remove(
            "open"
        );

        overlay?.classList.remove(
            "open"
        );
    }

    toggle?.addEventListener(
        "click",
        () => {

            sidebar?.classList.add(
                "open"
            );

            overlay?.classList.add(
                "open"
            );
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

    const value =
        String(
            error?.message ||
            error?.code ||
            ""
        );

    let message =
        "CodeLab could not open this lesson.";

    if (
        value.includes(
            "not-enrolled"
        )
    ) {
        message =
            "You must enrol in this course before opening its lessons.";
    } else if (
        value.includes(
            "protected-pro"
        )
    ) {
        message =
            "Protected Pro lesson delivery has not been connected yet.";
    }

    setLoading(false);

    showMessage(
        message,
        "error"
    );

    window.setTimeout(
        () => {
            window.location.replace(
                COURSES_URL
            );
        },
        2300
    );
}


function renderParagraph(id, value) {

    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }

    target.innerHTML =
        value
            ? `<p>${escapeHtml(value)}</p>`
            : `<p>Additional context for this lesson is being prepared.</p>`;
}


function setLoading(value) {

    if (loadingScreen) {
        loadingScreen.hidden =
            !value;
    }
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
        String(
            message || ""
        );

    target.className =
        `lesson-message ${type}`;

    target.hidden = false;

    window.clearTimeout(
        showMessage.timeout
    );

    showMessage.timeout =
        window.setTimeout(
            () => {
                target.hidden = true;
            },
            5000
        );
}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.textContent =
            String(
                value ?? ""
            );
    }
}


function deriveNameFromEmail(email) {

    return String(email || "")
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


function formatTitle(value) {

    return String(value || "")
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
            typeof unsubscribe === "function"
        ) {
            unsubscribe();
        }
    }
);
