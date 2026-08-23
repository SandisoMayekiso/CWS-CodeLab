/* =========================================================
   CWS CODELAB
   ASSESSMENT ENGINE
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

const LESSON_URL =
    new URL("../student/lesson.html", import.meta.url).href;


const params =
    new URLSearchParams(window.location.search);

const requestedCourseId =
    params.get("course");

const requestedModuleId =
    params.get("module");

const requestedMode =
    String(
        params.get("mode") ||
        document.body.dataset.defaultAssessmentMode ||
        "quiz"
    )
        .trim()
        .toLowerCase();


const state = {
    user: null,
    profile: {},
    metadata: null,
    course: null,
    module: null,
    mode: requestedMode,
    assessment: null,
    questions: [],
    answers: {},
    currentIndex: 0,
    submitted: false,
    score: 0,
    result: null,
    record: {}
};


const questionWorkspace =
    document.getElementById("assessment-question-workspace");

const practicalWorkspace =
    document.getElementById("assessment-practical-workspace");

const resultWorkspace =
    document.getElementById("assessment-result");

const loadingScreen =
    document.getElementById("assessment-loading");


setText(
    "assessment-year",
    new Date().getFullYear()
);


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
                resolveAssessment();
                loadExistingRecord();
                populateIdentity();
                renderAssessmentHeader();

                if (state.mode === "assessment") {
                    renderPracticalAssessment();
                } else {
                    prepareQuestions();
                    renderQuestionWorkspace();
                }

                setLoading(false);

            } catch (error) {
                console.error(
                    "Assessment initialization failed:",
                    error
                );
                handleFatalError(error);
            }
        },

        error => {
            console.error(
                "Assessment authentication failed:",
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

    const access =
        String(
            state.metadata.access || ""
        ).toLowerCase();

    const plan =
        String(
            state.profile.plan || "free"
        ).toLowerCase();

    if (
        access === "pro" &&
        plan !== "pro"
    ) {
        throw new Error(
            "pro-required"
        );
    }
}


async function loadCourse() {

    const access =
        String(
            state.metadata.access || ""
        ).toLowerCase();

    if (access === "pro") {
        throw new Error(
            "protected-pro-assessment-loader-not-connected"
        );
    }

    state.course =
        await window.CWS_COURSE_UTILS.loadCourseData(
            state.metadata.id
        );

    if (!state.course) {
        throw new Error(
            "course-content-unavailable"
        );
    }
}


function resolveAssessment() {

    if (state.mode === "final") {

        state.assessment =
            state.course.finalAssessment;

        if (!state.assessment) {
            throw new Error(
                "final-assessment-unavailable"
            );
        }

        return;
    }

    if (!requestedModuleId) {
        throw new Error(
            "module-not-specified"
        );
    }

    state.module =
        state.course.curriculum?.find(
            item =>
                item.id === requestedModuleId
        );

    if (!state.module) {
        throw new Error(
            "module-not-found"
        );
    }

    if (state.mode === "assessment") {
        state.assessment =
            state.module.assessment;
    } else {
        state.mode = "quiz";
        state.assessment =
            state.module.quiz;
    }

    if (!state.assessment) {
        throw new Error(
            "assessment-unavailable"
        );
    }
}


function getAssessmentId() {
    return state.assessment?.id || "assessment";
}


function loadExistingRecord() {

    state.record =
        state.profile
            ?.assessmentProgress
            ?.[state.course.id]
            ?.[getAssessmentId()] ||
        {};
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
        "assessment-student-name",
        name
    );

    setText(
        "assessment-student-email",
        state.profile.email ||
        state.user.email ||
        ""
    );

    setText(
        "assessment-student-avatar",
        name.charAt(0).toUpperCase() ||
        "S"
    );
}


function renderAssessmentHeader() {

    const title =
        state.assessment.title ||
        (
            state.mode === "final"
                ? "Final Assessment"
                : "Module Assessment"
        );

    const courseLink =
        document.getElementById(
            "assessment-course-link"
        );

    if (courseLink) {

        const url =
            new URL(LESSON_URL);

        url.searchParams.set(
            "course",
            state.course.id
        );

        courseLink.href = url.href;
        courseLink.textContent =
            state.course.title;
    }

    setText(
        "assessment-breadcrumb-title",
        title
    );

    setText(
        "assessment-title",
        title
    );

    setText(
        "assessment-attempt-count",
        Number(
            state.record.attempts || 0
        )
    );

    if (state.mode === "assessment") {

        setText(
            "assessment-kicker",
            `${state.module.title} · Practical Assessment`
        );

        setText(
            "assessment-description",
            "Apply the module in a new scenario and save your solution, testing evidence and reflection."
        );

        setText(
            "assessment-question-count",
            "Practical"
        );

        setText(
            "assessment-pass-mark",
            `${state.assessment.passingScore || 70}%`
        );

    } else {

        setText(
            "assessment-kicker",
            state.mode === "final"
                ? `${state.course.title} · Final Assessment`
                : `${state.module.title} · Module Quiz`
        );

        setText(
            "assessment-description",
            state.mode === "final"
                ? "Complete the final transfer assessment using fresh scenarios from across the course."
                : "Complete the module quiz. Questions are independent from the lesson knowledge-check wording."
        );

        setText(
            "assessment-question-count",
            Array.isArray(
                state.assessment.questions
            )
                ? state.assessment.questions.length
                : 0
        );

        setText(
            "assessment-pass-mark",
            `${state.assessment.passingScore || 70}%`
        );
    }

    const returnLink =
        document.getElementById(
            "assessment-return-course"
        );

    if (returnLink) {

        const url =
            new URL(LESSON_URL);

        url.searchParams.set(
            "course",
            state.course.id
        );

        if (
            state.module?.lessons?.length
        ) {
            url.searchParams.set(
                "lesson",
                state.module.lessons[
                    state.module.lessons.length - 1
                ].id
            );
        }

        returnLink.href = url.href;
    }
}


function prepareQuestions() {

    const source =
        Array.isArray(
            state.assessment.questions
        )
            ? state.assessment.questions
            : [];

    if (!source.length) {
        throw new Error(
            "question-bank-empty"
        );
    }

    if (
        window.CWS_ASSESSMENT_CONFIG
    ) {

        const validation =
            window.CWS_ASSESSMENT_CONFIG
                .validateQuestionBank(
                    source
                );

        if (validation.errors.length) {
            console.error(
                "Assessment question-bank errors:",
                validation.errors
            );
            throw new Error(
                "question-bank-invalid"
            );
        }
    }

    const questionLimit =
        Math.min(
            Number(
                state.assessment.questionCount ||
                source.length
            ) ||
            source.length,
            source.length
        );

    const previousIds =
        Array.isArray(
            state.record.lastQuestionIds
        )
            ? state.record.lastQuestionIds
            : [];

    const unused =
        source.filter(
            question =>
                !previousIds.includes(
                    question.id
                )
        );

    const pool =
        unused.length >= questionLimit
            ? unused
            : source;

    state.questions =
        shuffleArray(pool)
            .slice(
                0,
                questionLimit
            )
            .map(
                question =>
                    shuffleQuestionOptions(
                        question
                    )
            );

    state.answers = {};
    state.currentIndex = 0;
    state.submitted = false;
    state.result = null;
}


function shuffleQuestionOptions(question) {

    const options =
        Array.isArray(question.options)
            ? question.options
            : [];

    const correctEntry =
        options.map(
            (text, originalIndex) => ({
                text,
                originalIndex
            })
        )[question.correctAnswer];

    const shuffled =
        shuffleArray(
            options.map(
                (text, originalIndex) => ({
                    text,
                    originalIndex
                })
            )
        );

    return {
        ...question,
        options:
            shuffled.map(
                item =>
                    item.text
            ),
        correctAnswer:
            shuffled.findIndex(
                item =>
                    item.originalIndex ===
                    correctEntry?.originalIndex
            )
    };
}


function renderQuestionWorkspace() {

    if (questionWorkspace) {
        questionWorkspace.hidden = false;
    }

    if (practicalWorkspace) {
        practicalWorkspace.hidden = true;
    }

    if (resultWorkspace) {
        resultWorkspace.hidden = true;
    }

    renderCurrentQuestion();
    renderQuestionMap();
}


function renderCurrentQuestion() {

    const question =
        state.questions[
            state.currentIndex
        ];

    if (!question) {
        return;
    }

    const total =
        state.questions.length;

    const percent =
        Math.round(
            (
                (
                    state.currentIndex + 1
                ) /
                total
            ) *
            100
        );

    setText(
        "assessment-progress-label",
        `Question ${state.currentIndex + 1} of ${total}`
    );

    setText(
        "assessment-progress-percent",
        `${percent}%`
    );

    const progressBar =
        document.getElementById(
            "assessment-progress-bar"
        );

    if (progressBar) {
        progressBar.style.width =
            `${percent}%`;
    }

    setText(
        "assessment-question-type",
        formatTitle(
            question.type || "question"
        )
    );

    setText(
        "assessment-question-difficulty",
        formatTitle(
            question.difficulty || "beginner"
        )
    );

    setText(
        "assessment-question-text",
        question.question
    );

    renderOptions(question);
    renderQuestionFeedback(question);

    const previous =
        document.getElementById(
            "assessment-previous"
        );

    const next =
        document.getElementById(
            "assessment-next"
        );

    const submit =
        document.getElementById(
            "assessment-submit"
        );

    if (previous) {
        previous.disabled =
            state.currentIndex === 0;
    }

    const last =
        state.currentIndex ===
        total - 1;

    if (next) {
        next.hidden = last;
    }

    if (submit) {
        submit.hidden = !last;
    }

    renderQuestionMap();
}


function renderOptions(question) {

    const container =
        document.getElementById(
            "assessment-options"
        );

    if (!container) {
        return;
    }

    const selected =
        state.answers[
            question.id
        ];

    container.innerHTML =
        question.options
            .map(
                (option, index) => {

                    const selectedClass =
                        selected === index
                            ? "selected"
                            : "";

                    let resultClass = "";

                    if (state.submitted) {

                        if (
                            index ===
                            question.correctAnswer
                        ) {
                            resultClass =
                                "correct";
                        } else if (
                            selected === index
                        ) {
                            resultClass =
                                "incorrect";
                        }
                    }

                    return `
                        <label class="assessment-option ${selectedClass} ${resultClass}">
                            <input
                                type="radio"
                                name="assessment-option"
                                value="${index}"
                                ${selected === index ? "checked" : ""}
                                ${state.submitted ? "disabled" : ""}
                            >
                            <span class="assessment-option-index">
                                ${String.fromCharCode(65 + index)}
                            </span>
                            <span class="assessment-option-copy">
                                ${escapeHtml(option)}
                            </span>
                        </label>
                    `;
                }
            )
            .join("");

    if (!state.submitted) {

        container
            .querySelectorAll(
                'input[name="assessment-option"]'
            )
            .forEach(input => {

                input.addEventListener(
                    "change",
                    () => {

                        state.answers[
                            question.id
                        ] =
                            Number(
                                input.value
                            );

                        renderCurrentQuestion();
                    }
                );
            });
    }
}


function renderQuestionMap() {

    const container =
        document.getElementById(
            "assessment-question-map"
        );

    if (!container) {
        return;
    }

    container.innerHTML =
        state.questions
            .map(
                (question, index) => {

                    const answered =
                        Number.isInteger(
                            state.answers[
                                question.id
                            ]
                        );

                    return `
                        <button
                            type="button"
                            class="
                                assessment-map-button
                                ${index === state.currentIndex ? "active" : ""}
                                ${answered ? "answered" : ""}
                            "
                            data-question-index="${index}"
                        >
                            ${index + 1}
                        </button>
                    `;
                }
            )
            .join("");

    container
        .querySelectorAll(
            "[data-question-index]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    state.currentIndex =
                        Number(
                            button.dataset.questionIndex
                        );

                    renderCurrentQuestion();
                }
            );
        });
}


function renderQuestionFeedback(question) {

    const feedback =
        document.getElementById(
            "assessment-question-feedback"
        );

    if (!feedback) {
        return;
    }

    if (!state.submitted) {
        feedback.hidden = true;
        return;
    }

    const selected =
        state.answers[
            question.id
        ];

    const correct =
        selected ===
        question.correctAnswer;

    feedback.hidden = false;

    feedback.className =
        `assessment-question-feedback ${
            correct
                ? "success"
                : "error"
        }`;

    feedback.innerHTML = `
        <strong>
            ${correct
                ? "Correct."
                : "Review this concept."}
        </strong>
        ${escapeHtml(
            question.explanation || ""
        )}
    `;
}


document
    .getElementById(
        "assessment-previous"
    )
    ?.addEventListener(
        "click",
        () => {

            if (
                state.currentIndex > 0
            ) {
                state.currentIndex -= 1;
                renderCurrentQuestion();
            }
        }
    );


document
    .getElementById(
        "assessment-next"
    )
    ?.addEventListener(
        "click",
        () => {

            if (
                state.currentIndex <
                state.questions.length - 1
            ) {
                state.currentIndex += 1;
                renderCurrentQuestion();
            }
        }
    );


document
    .getElementById(
        "assessment-submit"
    )
    ?.addEventListener(
        "click",
        submitMultipleChoice
    );


async function submitMultipleChoice() {

    const unanswered =
        state.questions.filter(
            question =>
                !Number.isInteger(
                    state.answers[
                        question.id
                    ]
                )
        );

    if (unanswered.length) {

        showMessage(
            `Answer all questions before submitting. ${unanswered.length} ${
                unanswered.length === 1
                    ? "question is"
                    : "questions are"
            } still unanswered.`,
            "error"
        );

        const firstIndex =
            state.questions.findIndex(
                question =>
                    question.id ===
                    unanswered[0].id
            );

        if (firstIndex >= 0) {
            state.currentIndex =
                firstIndex;
            renderCurrentQuestion();
        }

        return;
    }

    state.submitted = true;

    const correct =
        state.questions.filter(
            question =>
                state.answers[
                    question.id
                ] ===
                question.correctAnswer
        ).length;

    state.score =
        Math.round(
            (
                correct /
                state.questions.length
            ) *
            100
        );

    const passed =
        state.score >=
        Number(
            state.assessment.passingScore ||
            70
        );

    state.result = {
        correct,
        total:
            state.questions.length,
        score:
            state.score,
        passed
    };

    try {
        await saveQuizAttempt(
            state.result
        );
    } catch (error) {
        console.error(
            "Assessment result save failed:",
            error
        );

        showMessage(
            "Your score was calculated, but CodeLab could not save the attempt.",
            "error"
        );
    }

    renderResult();
}


async function saveQuizAttempt(result) {

    const existing =
        state.record || {};

    const attempts =
        Number(
            existing.attempts || 0
        ) + 1;

    const bestScore =
        Math.max(
            Number(
                existing.bestScore || 0
            ),
            result.score
        );

    const history =
        Array.isArray(
            existing.history
        )
            ? existing.history.slice(-4)
            : [];

    history.push({
        attempt:
            attempts,
        score:
            result.score,
        passed:
            result.passed,
        questionIds:
            state.questions.map(
                question =>
                    question.id
            ),
        answers:
            state.questions.map(
                question => ({
                    questionId:
                        question.id,
                    selected:
                        state.answers[
                            question.id
                        ],
                    correct:
                        state.answers[
                            question.id
                        ] ===
                        question.correctAnswer
                })
            )
    });

    const data = {
        id:
            getAssessmentId(),
        type:
            state.mode,
        courseId:
            state.course.id,
        moduleId:
            state.module?.id || "",
        attempts,
        lastScore:
            result.score,
        bestScore,
        lastPassed:
            result.passed,
        passed:
            Boolean(
                existing.passed ||
                result.passed
            ),
        lastQuestionIds:
            state.questions.map(
                question =>
                    question.id
            ),
        history,
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
            "assessmentProgress",
            state.course.id,
            getAssessmentId()
        ),
        data,
        "updatedAt",
        serverTimestamp()
    );

    state.record = {
        ...data,
        updatedAt: null
    };

    setText(
        "assessment-attempt-count",
        attempts
    );
}


function renderResult() {

    if (questionWorkspace) {
        questionWorkspace.hidden = true;
    }

    if (practicalWorkspace) {
        practicalWorkspace.hidden = true;
    }

    if (!resultWorkspace) {
        return;
    }

    resultWorkspace.hidden = false;

    const passed =
        Boolean(
            state.result?.passed
        );

    resultWorkspace.classList.toggle(
        "failed",
        !passed
    );

    setText(
        "assessment-result-kicker",
        passed
            ? "Assessment Passed"
            : "Assessment Complete"
    );

    setText(
        "assessment-result-title",
        passed
            ? "Strong work — you passed."
            : "Keep practising and try again."
    );

    setText(
        "assessment-result-copy",
        passed
            ? `You answered ${state.result.correct} of ${state.result.total} questions correctly.`
            : `You answered ${state.result.correct} of ${state.result.total} questions correctly. Review the explanations before your next attempt.`
    );

    setText(
        "assessment-result-score",
        `${state.result.score}%`
    );
}


document
    .getElementById(
        "assessment-review"
    )
    ?.addEventListener(
        "click",
        () => {

            state.currentIndex = 0;

            if (resultWorkspace) {
                resultWorkspace.hidden = true;
            }

            if (questionWorkspace) {
                questionWorkspace.hidden = false;
            }

            renderCurrentQuestion();
        }
    );


document
    .getElementById(
        "assessment-retry"
    )
    ?.addEventListener(
        "click",
        () => {

            prepareQuestions();
            renderQuestionWorkspace();
        }
    );


function renderPracticalAssessment() {

    if (questionWorkspace) {
        questionWorkspace.hidden = true;
    }

    if (resultWorkspace) {
        resultWorkspace.hidden = true;
    }

    if (!practicalWorkspace) {
        return;
    }

    practicalWorkspace.hidden = false;

    setText(
        "assessment-practical-scenario",
        state.assessment.scenario ||
        "Complete the practical scenario using the module concepts."
    );

    const instructions =
        document.getElementById(
            "assessment-practical-instructions"
        );

    if (instructions) {

        const items =
            Array.isArray(
                state.assessment.instructions
            )
                ? state.assessment.instructions
                : [];

        instructions.innerHTML =
            items.map(
                item => `
                    <li>
                        ${escapeHtml(item)}
                    </li>
                `
            )
                .join("");
    }

    const draft =
        state.record?.draft || {};

    setValue(
        "assessment-practical-solution",
        draft.solution || ""
    );

    setValue(
        "assessment-practical-testing",
        draft.testing || ""
    );

    setValue(
        "assessment-practical-reflection",
        draft.reflection || ""
    );
}


document
    .getElementById(
        "assessment-save-draft"
    )
    ?.addEventListener(
        "click",
        async () => {

            try {
                await savePractical(
                    "draft"
                );

                showMessage(
                    "Practical assessment draft saved.",
                    "success"
                );

            } catch (error) {

                console.error(
                    "Practical draft save failed:",
                    error
                );

                showMessage(
                    "CodeLab could not save your draft.",
                    "error"
                );
            }
        }
    );


document
    .getElementById(
        "assessment-submit-practical"
    )
    ?.addEventListener(
        "click",
        async () => {

            const solution =
                getValue(
                    "assessment-practical-solution"
                );

            const testing =
                getValue(
                    "assessment-practical-testing"
                );

            if (
                solution.length < 40 ||
                testing.length < 20
            ) {

                showMessage(
                    "Add more solution detail and testing evidence before submitting the practical assessment.",
                    "error"
                );

                return;
            }

            try {

                await savePractical(
                    "submitted"
                );

                showMessage(
                    "Practical learning evidence submitted.",
                    "success"
                );

                setText(
                    "assessment-title",
                    `${state.assessment.title} · Submitted`
                );

            } catch (error) {

                console.error(
                    "Practical submission failed:",
                    error
                );

                showMessage(
                    "CodeLab could not submit your practical evidence.",
                    "error"
                );
            }
        }
    );


async function savePractical(status) {

    const existing =
        state.record || {};

    const attempts =
        status === "submitted"
            ? Number(
                existing.attempts || 0
            ) + 1
            : Number(
                existing.attempts || 0
            );

    const data = {
        id:
            getAssessmentId(),
        type:
            "practical",
        courseId:
            state.course.id,
        moduleId:
            state.module?.id || "",
        status,
        attempts,
        authoritative:
            false,
        draft: {
            solution:
                getValue(
                    "assessment-practical-solution"
                ),
            testing:
                getValue(
                    "assessment-practical-testing"
                ),
            reflection:
                getValue(
                    "assessment-practical-reflection"
                )
        },
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
            "assessmentProgress",
            state.course.id,
            getAssessmentId()
        ),
        data,
        "updatedAt",
        serverTimestamp()
    );

    state.record = {
        ...data,
        updatedAt: null
    };

    setText(
        "assessment-attempt-count",
        attempts
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
        "CodeLab could not open this assessment.";

    if (
        value.includes(
            "not-enrolled"
        )
    ) {
        message =
            "You must enrol in this course before taking its assessments.";
    } else if (
        value.includes(
            "pro-required"
        )
    ) {
        message =
            "This assessment requires CodeLab Pro access.";
    } else if (
        value.includes(
            "protected-pro-assessment-loader-not-connected"
        )
    ) {
        message =
            "Protected Pro assessment delivery has not been connected yet.";
    } else if (
        value.includes(
            "question-bank"
        )
    ) {
        message =
            "The assessment question bank could not be prepared safely.";
    } else if (
        value.includes(
            "module"
        )
    ) {
        message =
            "The requested module assessment could not be found.";
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
        2400
    );
}


function shuffleArray(input) {

    const array = [
        ...input
    ];

    for (
        let i =
            array.length - 1;
        i > 0;
        i -= 1
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];
    }

    return array;
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
            "assessment-message"
        );

    if (!target) {
        return;
    }

    target.textContent =
        String(
            message || ""
        );

    target.className =
        `assessment-message ${type}`;

    target.hidden = false;

    window.clearTimeout(
        showMessage.timeout
    );

    showMessage.timeout =
        window.setTimeout(
            () => {
                target.hidden = true;
            },
            6000
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


function getValue(id) {

    return String(
        document
            .getElementById(id)
            ?.value ||
        ""
    ).trim();
}


function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            String(
                value || ""
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
            typeof unsubscribe ===
            "function"
        ) {
            unsubscribe();
        }
    }
);
