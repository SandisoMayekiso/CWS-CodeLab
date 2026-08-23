/* =========================================================
   CWS CODELAB
   STUDENT COURSES
   Academy-style dedicated course-file loader
========================================================= */

import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";

import {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const LOGIN_URL = new URL("../pages/login.html", import.meta.url).href;
const PRICING_URL = new URL("../pages/pricing.html", import.meta.url).href;
const LESSON_URL = new URL("../student/lesson.html", import.meta.url).href;

const VALID_FILTERS = [
    "all",
    "enrolled",
    "free",
    "pro",
    "coming-soon"
];

const state = {
    user: null,
    profile: {},
    courses: [],
    activeFilter: getRequestedFilter(),
    category: "all",
    search: "",
    enrollingCourseId: null
};

const grid = document.getElementById("student-course-grid");
const emptyState = document.getElementById("student-course-empty");
const resultCount = document.getElementById("student-course-result-count");
const sectionTitle = document.getElementById("student-course-section-title");
const searchInput = document.getElementById("student-course-search");
const categoryFilter = document.getElementById("student-category-filter");
const filterButtons = document.querySelectorAll("[data-course-filter]");
const resetButton = document.getElementById("student-reset-filters");
const loadingScreen = document.getElementById("student-courses-loading");
const dialog = document.getElementById("course-detail-dialog");


setText("student-courses-year", new Date().getFullYear());

initialiseSidebar();
initialiseFuturePages();
initialiseFilters();
initialiseDialog();
setLoading(true);

await waitForCatalogue();

state.courses = [
    ...window.CWS_COURSES
];

populateCategoryFilter();
updateActiveFilterTab();


const unsubscribe = onAuthStateChanged(
    auth,

    async user => {

        if (!user) {
            window.location.replace(LOGIN_URL);
            return;
        }

        state.user = user;

        try {
            await loadProfile(user);
            populateIdentity();
        } catch (error) {
            console.error("Profile loading failed:", error);
            populateFirebaseIdentity(user);
            showMessage(getErrorMessage(error), "error");
        }

        renderCourses();
        setLoading(false);

        if (state.activeFilter !== "all") {
            document.getElementById("course-library")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }
    },

    error => {
        console.error("Auth observer failed:", error);
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


function populateIdentity() {

    const name = normaliseName(
        state.profile.displayName ||
        state.user?.displayName ||
        deriveNameFromEmail(state.user?.email) ||
        "Student"
    );

    const email =
        state.profile.email ||
        state.user?.email ||
        "";

    const plan = formatPlan(
        state.profile.plan ||
        "free"
    );

    const initial = name.charAt(0).toUpperCase() || "S";

    setText("student-name", name);
    setText("student-email", email);
    setText("sidebar-student-name", name);
    setText("sidebar-account-plan", `${plan} Learner`);
    setText("sidebar-student-avatar", initial);
    setText("student-topbar-avatar", initial);
}


function populateFirebaseIdentity(user) {

    const name = normaliseName(
        user.displayName ||
        deriveNameFromEmail(user.email) ||
        "Student"
    );

    const initial = name.charAt(0).toUpperCase() || "S";

    setText("student-name", name);
    setText("student-email", user.email || "");
    setText("sidebar-student-name", name);
    setText("sidebar-account-plan", "Free Learner");
    setText("sidebar-student-avatar", initial);
    setText("student-topbar-avatar", initial);
}


function initialiseFilters() {

    searchInput?.addEventListener("input", () => {
        state.search = searchInput.value.trim().toLowerCase();
        renderCourses();
    });

    categoryFilter?.addEventListener("change", () => {
        state.category = categoryFilter.value;
        renderCourses();
    });

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.courseFilter || "all";

            if (!VALID_FILTERS.includes(filter)) {
                return;
            }

            state.activeFilter = filter;
            updateActiveFilterTab();
            updateURLFilter();
            renderCourses();
        });
    });

    resetButton?.addEventListener("click", resetFilters);
}


function populateCategoryFilter() {

    if (!categoryFilter) {
        return;
    }

    const categories = [
        ...new Set(
            state.courses
                .map(course => String(course.category || "").trim())
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b));

    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
        ${categories.map(category => `
            <option value="${escapeHtml(category.toLowerCase())}">
                ${escapeHtml(category)}
            </option>
        `).join("")}
    `;
}


function renderCourses() {

    if (!grid) {
        return;
    }

    const courses = getFilteredCourses();

    grid.innerHTML = courses
        .map(createCourseCard)
        .join("");

    bindCourseActions();
    updateStatistics();
    updateResultInformation(courses.length);

    if (emptyState) {
        emptyState.hidden = courses.length !== 0;
    }

    grid.hidden = courses.length === 0;
}


function getFilteredCourses() {

    return state.courses
        .filter(course => {

            const enrolled = isEnrolled(course.id);
            const access = String(course.access || "").toLowerCase();

            if (state.activeFilter === "enrolled" && !enrolled) {
                return false;
            }

            if (state.activeFilter === "free" && access !== "free") {
                return false;
            }

            if (state.activeFilter === "pro" && access !== "pro") {
                return false;
            }

            if (
                state.activeFilter === "coming-soon" &&
                !isComingSoon(course)
            ) {
                return false;
            }

            if (
                state.category !== "all" &&
                String(course.category || "").toLowerCase() !== state.category
            ) {
                return false;
            }

            if (state.search) {

                const searchable = [
                    course.title,
                    course.shortTitle,
                    course.category,
                    course.level,
                    course.description,
                    course.outcome,
                    ...(Array.isArray(course.skills) ? course.skills : []),
                    ...(Array.isArray(course.prerequisites)
                        ? course.prerequisites
                        : [])
                ].join(" ").toLowerCase();

                if (!searchable.includes(state.search)) {
                    return false;
                }
            }

            return true;
        })
        .sort((a, b) => {

            const aEnrolled = isEnrolled(a.id);
            const bEnrolled = isEnrolled(b.id);

            if (aEnrolled !== bEnrolled) {
                return aEnrolled ? -1 : 1;
            }

            return Number(a.order || 999) - Number(b.order || 999);
        });
}


function createCourseCard(course) {

    const enrolled = isEnrolled(course.id);
    const comingSoon = isComingSoon(course);
    const progress = getProgress(course.id);
    const accent = sanitiseAccent(course.accent);

    return `
        <article
            class="student-course-card"
            data-course-id="${escapeHtml(course.id)}"
            style="--course-accent:${accent};"
        >
            <div class="student-course-card-accent"></div>

            <div class="student-course-card-body">

                <div class="student-course-badges">
                    ${createAccessBadge(course)}
                    ${enrolled
                        ? `<span class="student-course-badge enrolled">Enrolled</span>`
                        : ""}
                </div>

                <div class="student-course-card-header">
                    <div class="student-course-icon">
                        ${escapeHtml(getCourseIcon(course))}
                    </div>

                    <div>
                        <h3>${escapeHtml(course.title)}</h3>
                        <span class="student-course-category">
                            ${escapeHtml(course.category || "")}
                        </span>
                    </div>
                </div>

                <p class="student-course-description">
                    ${escapeHtml(course.description || "")}
                </p>

                <div class="student-course-meta">
                    <div>
                        <strong>${escapeHtml(course.duration || "—")}</strong>
                        <span>Duration</span>
                    </div>

                    <div>
                        <strong>${safeNumber(course.modules)}</strong>
                        <span>Modules</span>
                    </div>

                    <div>
                        <strong>${safeNumber(course.projects)}</strong>
                        <span>Projects</span>
                    </div>
                </div>

                ${enrolled && !comingSoon
                    ? createProgressMarkup(progress)
                    : ""}

                <div class="student-course-card-footer">

                    <span class="student-course-level">
                        ${escapeHtml(course.level || "Beginner")}
                    </span>

                    <div class="student-course-actions">

                        <button
                            type="button"
                            class="student-course-action"
                            data-course-action="details"
                            data-course-id="${escapeHtml(course.id)}"
                        >
                            Details
                        </button>

                        ${createPrimaryAction(
                            course,
                            enrolled,
                            comingSoon,
                            progress
                        )}
                    </div>
                </div>
            </div>
        </article>
    `;
}


function createAccessBadge(course) {

    if (isComingSoon(course)) {
        return `<span class="student-course-badge coming-soon">Coming Soon</span>`;
    }

    const access = String(course.access || "Free");
    const cssClass = access.toLowerCase() === "pro" ? "pro" : "free";

    return `
        <span class="student-course-badge ${cssClass}">
            ${escapeHtml(access)}
        </span>
    `;
}


function createPrimaryAction(course, enrolled, comingSoon, progress) {

    if (comingSoon) {
        return `
            <button type="button" class="student-course-action" disabled>
                Coming Soon
            </button>
        `;
    }

    if (enrolled) {

        const label =
            progress >= 100
                ? "Review Course"
                : progress > 0
                    ? "Continue"
                    : "Start Course";

        return `
            <button
                type="button"
                class="student-course-action primary"
                data-course-action="continue"
                data-course-id="${escapeHtml(course.id)}"
            >
                ${label} <span aria-hidden="true">→</span>
            </button>
        `;
    }

    if (String(course.access || "").toLowerCase() === "pro") {
        return `
            <button
                type="button"
                class="student-course-action pro"
                data-course-action="pro"
                data-course-id="${escapeHtml(course.id)}"
            >
                View Pro
            </button>
        `;
    }

    const busy = state.enrollingCourseId === course.id;

    return `
        <button
            type="button"
            class="student-course-action primary"
            data-course-action="enroll"
            data-course-id="${escapeHtml(course.id)}"
            ${busy ? "disabled" : ""}
        >
            ${busy ? "Enrolling..." : "Enroll Free"}
        </button>
    `;
}


function createProgressMarkup(progress) {

    const value = clamp(progress, 0, 100);

    return `
        <div class="student-course-progress">
            <div class="student-course-progress-header">
                <span>Course progress</span>
                <strong>${value}%</strong>
            </div>

            <div class="student-course-progress-track">
                <div
                    class="student-course-progress-bar"
                    style="width:${value}%"
                ></div>
            </div>
        </div>
    `;
}


function bindCourseActions() {

    document
        .querySelectorAll("[data-course-action]")
        .forEach(button => {

            button.addEventListener("click", async () => {

                const action = button.dataset.courseAction;
                const course = getCourse(button.dataset.courseId);

                if (!course) {
                    return;
                }

                if (action === "details") {
                    await openDetails(course);
                    return;
                }

                if (action === "enroll") {
                    await enrol(course);
                    return;
                }

                if (action === "continue") {
                    openLessonWorkspace(course);
                    return;
                }

                if (action === "pro") {
                    await openDetails(course);
                }
            });
        });
}


async function enrol(course) {

    if (!state.user?.uid) {
        window.location.replace(LOGIN_URL);
        return;
    }

    if (
        isComingSoon(course) ||
        String(course.access || "").toLowerCase() !== "free"
    ) {
        showMessage("This course is not available for free enrolment.", "error");
        return;
    }

    if (isEnrolled(course.id)) {
        openLessonWorkspace(course);
        return;
    }

    state.enrollingCourseId = course.id;
    renderCourses();

    try {

        await updateDoc(
            doc(db, "users", state.user.uid),
            {
                enrolledCourses: arrayUnion(course.id),
                lastActiveCourseId: course.id,
                updatedAt: serverTimestamp()
            }
        );

        const enrolments = getEnrolledCourses();

        if (!enrolments.includes(course.id)) {
            enrolments.push(course.id);
        }

        state.profile.enrolledCourses = enrolments;
        state.profile.lastActiveCourseId = course.id;

        showMessage(`You are now enrolled in ${course.title}.`, "success");

    } catch (error) {

        console.error("Enrolment failed:", error);
        showMessage(getErrorMessage(error), "error");

    } finally {

        state.enrollingCourseId = null;
        renderCourses();
    }
}


async function openDetails(catalogueCourse) {

    if (!dialog) {
        return;
    }

    let course = catalogueCourse;

    /*
     * Free course bodies may be loaded from dedicated public data files.
     * Pro course bodies intentionally remain protected.
     */
    if (
        !isComingSoon(catalogueCourse) &&
        String(catalogueCourse.access || "").toLowerCase() === "free"
    ) {
        try {
            course = await window.CWS_COURSE_UTILS.loadCourseData(
                catalogueCourse.id
            );
        } catch (error) {
            console.error("Detailed course load failed:", error);
            showMessage(
                "The catalogue is available, but detailed curriculum could not be loaded.",
                "error"
            );
        }
    }

    const enrolled = isEnrolled(course.id);
    const progress = getProgress(course.id);

    setText(
        "course-detail-kicker",
        `${course.category || "Course"} · ${course.level || "Beginner"}`
    );

    setText("course-detail-title", course.title || "CodeLab Course");
    setText("course-detail-description", course.description || "");
    setText("course-detail-outcome", course.outcome || "");

    renderDetailBadges(course, enrolled);
    renderDetailMeta(course, progress);
    renderDetailSkills(course);
    renderDetailPrerequisites(course);
    renderDetailCurriculum(course);
    renderDetailAction(course, enrolled, progress);

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        dialog.setAttribute("open", "");
    }
}


function initialiseDialog() {

    document
        .getElementById("course-detail-close")
        ?.addEventListener("click", closeDialog);

    dialog?.addEventListener("click", event => {
        if (event.target === dialog) {
            closeDialog();
        }
    });
}


function closeDialog() {

    if (dialog?.open && typeof dialog.close === "function") {
        dialog.close();
    } else {
        dialog?.removeAttribute("open");
    }
}


function renderDetailBadges(course, enrolled) {

    const target = document.getElementById("course-detail-badges");

    if (!target) return;

    target.innerHTML = `
        ${createAccessBadge(course)}
        ${enrolled
            ? `<span class="student-course-badge enrolled">Enrolled</span>`
            : ""}
    `;
}


function renderDetailMeta(course, progress) {

    const target = document.getElementById("course-detail-meta");

    if (!target) return;

    const moduleCount =
        Array.isArray(course.curriculum) && course.curriculum.length
            ? course.curriculum.length
            : safeNumber(course.modules);

    target.innerHTML = `
        <div><strong>${escapeHtml(course.duration || "Self-paced")}</strong><span>Duration</span></div>
        <div><strong>${safeNumber(course.hours)}</strong><span>Hours</span></div>
        <div><strong>${moduleCount}</strong><span>Modules</span></div>
        <div><strong>${safeNumber(course.projects)}</strong><span>Projects</span></div>
        <div><strong>${safeNumber(course.assessments)}</strong><span>Assessments</span></div>
        <div><strong>${progress}%</strong><span>Progress</span></div>
    `;
}


function renderDetailSkills(course) {

    const target = document.getElementById("course-detail-skills");

    if (!target) return;

    const skills = Array.isArray(course.skills) ? course.skills : [];

    target.innerHTML = skills.length
        ? skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("")
        : "<span>Course Fundamentals</span>";
}


function renderDetailPrerequisites(course) {

    const target = document.getElementById("course-detail-prerequisites");

    if (!target) return;

    const items = Array.isArray(course.prerequisites)
        ? course.prerequisites
        : [];

    target.innerHTML = items.length
        ? items.map(item => `<li>${escapeHtml(item)}</li>`).join("")
        : "<li>No prerequisites required.</li>";
}


function renderDetailCurriculum(course) {

    const target = document.getElementById("course-detail-curriculum");
    const count = document.getElementById("course-detail-module-count");

    if (!target) return;

    const curriculum = Array.isArray(course.curriculum)
        ? course.curriculum
        : [];

    const moduleCount = curriculum.length || safeNumber(course.modules);

    if (count) {
        count.textContent =
            `${moduleCount} ${moduleCount === 1 ? "module" : "modules"}`;
    }

    if (
        String(course.access || "").toLowerCase() === "pro" &&
        curriculum.length === 0
    ) {
        target.innerHTML = `
            <div class="course-detail-empty-curriculum">
                Detailed Pro lesson content is protected and will load only after verified Pro access.
            </div>
        `;
        return;
    }

    if (!curriculum.length) {
        target.innerHTML = `
            <div class="course-detail-empty-curriculum">
                Curriculum details are not available yet.
            </div>
        `;
        return;
    }

    target.innerHTML = curriculum.map((module, moduleIndex) => {

        const lessons = Array.isArray(module.lessons)
            ? module.lessons
            : [];

        return `
            <details
                class="course-detail-module"
                ${moduleIndex === 0 ? "open" : ""}
            >
                <summary>
                    <span>Module ${moduleIndex + 1}</span>
                    <strong>${escapeHtml(module.title || "")}</strong>
                    <small>${lessons.length} ${lessons.length === 1 ? "lesson" : "lessons"}</small>
                </summary>

                ${module.description
                    ? `<p class="course-detail-module-description">${escapeHtml(module.description)}</p>`
                    : ""}

                <div class="course-detail-lessons">
                    ${lessons.map((lesson, lessonIndex) => `
                        <div class="course-detail-lesson">
                            <span>${lessonIndex + 1}</span>
                            <div>
                                <strong>${escapeHtml(lesson.title || "Lesson")}</strong>
                                <small>
                                    ${escapeHtml(formatTitle(lesson.type || "lesson"))}
                                    ·
                                    ${escapeHtml(lesson.duration || "25 min")}
                                </small>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </details>
        `;
    }).join("");
}


function renderDetailAction(course, enrolled, progress) {

    const target = document.getElementById("course-detail-action");

    if (!target) return;

    if (isComingSoon(course)) {
        target.innerHTML = `
            <button type="button" class="student-course-action" disabled>
                Course Coming Soon
            </button>
        `;
        return;
    }

    if (enrolled) {

        const label =
            progress >= 100
                ? "Review Course →"
                : progress > 0
                    ? "Continue Course →"
                    : "Start Course →";

        target.innerHTML = `
            <button
                type="button"
                class="student-course-action primary"
                id="course-detail-continue"
            >
                ${label}
            </button>
        `;

        document
            .getElementById("course-detail-continue")
            ?.addEventListener("click", () => {
                openLessonWorkspace(course);
            });

        return;
    }

    if (String(course.access || "").toLowerCase() === "pro") {
        target.innerHTML = `
            <a href="${PRICING_URL}" class="student-course-action pro">
                View CodeLab Pro
            </a>
        `;
        return;
    }

    target.innerHTML = `
        <button
            type="button"
            class="student-course-action primary"
            id="course-detail-enroll"
        >
            Enroll Free
        </button>
    `;

    document
        .getElementById("course-detail-enroll")
        ?.addEventListener("click", async () => {
            closeDialog();
            await enrol(course);
        });
}


function openLessonWorkspace(course) {

    if (!isEnrolled(course.id)) {
        showMessage(
            "Enrol in this course before opening lessons.",
            "error"
        );
        return;
    }

    const url = new URL(LESSON_URL);
    url.searchParams.set("course", course.id);

    const progressData = getProgressData(course.id);

    if (progressData?.currentLessonId) {
        url.searchParams.set(
            "lesson",
            progressData.currentLessonId
        );
    }

    window.location.href = url.href;
}


function getEnrolledCourses() {

    return Array.isArray(state.profile.enrolledCourses)
        ? [...state.profile.enrolledCourses]
        : [];
}


function isEnrolled(courseId) {
    return getEnrolledCourses().includes(courseId);
}


function getProgressData(courseId) {

    const value = state.profile?.courseProgress?.[courseId];

    return (
        value &&
        typeof value === "object"
    )
        ? value
        : null;
}


function getProgress(courseId) {

    const value = state.profile?.courseProgress?.[courseId];

    if (typeof value === "number") {
        return clamp(Math.round(value), 0, 100);
    }

    if (
        value &&
        typeof value === "object"
    ) {
        return clamp(
            Number(value.percentage ?? value.progress ?? 0),
            0,
            100
        );
    }

    return 0;
}


function updateStatistics() {

    const enrolled = state.courses.filter(course => isEnrolled(course.id));

    const completed = enrolled.filter(
        course => getProgress(course.id) >= 100
    );

    const inProgress = enrolled.filter(course => {
        const progress = getProgress(course.id);
        return progress > 0 && progress < 100;
    });

    const available = state.courses.filter(
        course => !isComingSoon(course)
    );

    setText("enrolled-course-count", enrolled.length);
    setText("in-progress-course-count", inProgress.length);
    setText("completed-course-count", completed.length);
    setText("available-course-count", available.length);
}


function updateResultInformation(count) {

    if (resultCount) {
        resultCount.textContent =
            count === 1 ? "1 course" : `${count} courses`;
    }

    const titles = {
        all: "All Courses",
        enrolled: "My Enrolled Courses",
        free: "Free Courses",
        pro: "Pro Courses",
        "coming-soon": "Coming Soon"
    };

    if (sectionTitle) {
        sectionTitle.textContent =
            titles[state.activeFilter] || "Courses";
    }
}


function resetFilters() {

    state.search = "";
    state.category = "all";
    state.activeFilter = "all";

    if (searchInput) searchInput.value = "";
    if (categoryFilter) categoryFilter.value = "all";

    updateActiveFilterTab();
    updateURLFilter();
    renderCourses();
}


function getRequestedFilter() {

    const value = String(
        new URLSearchParams(window.location.search)
            .get("filter") ||
        "all"
    ).toLowerCase();

    return VALID_FILTERS.includes(value)
        ? value
        : "all";
}


function updateActiveFilterTab() {

    filterButtons.forEach(button => {
        button.classList.toggle(
            "active",
            (button.dataset.courseFilter || "all") ===
                state.activeFilter
        );
    });
}


function updateURLFilter() {

    const url = new URL(window.location.href);

    if (state.activeFilter === "all") {
        url.searchParams.delete("filter");
    } else {
        url.searchParams.set(
            "filter",
            state.activeFilter
        );
    }

    window.history.replaceState({}, "", url.href);
}


function getCourse(courseId) {
    return state.courses.find(course => course.id === courseId) || null;
}


function isComingSoon(course) {

    const status = String(course.status || "").toLowerCase();

    return (
        status.includes("coming") ||
        status.includes("soon") ||
        status.includes("upcoming")
    );
}


function getCourseIcon(course) {

    if (
        course.icon &&
        String(course.icon).length <= 5
    ) {
        return String(course.icon);
    }

    return String(
        course.shortTitle ||
        course.title ||
        "CR"
    ).slice(0, 2).toUpperCase();
}


function sanitiseAccent(value) {

    const accent = String(value || "").trim();

    return /^#[0-9a-f]{3,8}$/i.test(accent)
        ? accent
        : "#6c7cff";
}


function initialiseSidebar() {

    const sidebar = document.getElementById("student-sidebar");
    const toggle = document.getElementById("student-sidebar-toggle");
    const close = document.getElementById("student-sidebar-close");
    const overlay = document.getElementById("student-sidebar-overlay");

    function closeSidebar() {
        sidebar?.classList.remove("open");
        overlay?.classList.remove("open");
        toggle?.setAttribute("aria-expanded", "false");
    }

    toggle?.addEventListener("click", () => {

        if (sidebar?.classList.contains("open")) {
            closeSidebar();
            return;
        }

        sidebar?.classList.add("open");
        overlay?.classList.add("open");
        toggle?.setAttribute("aria-expanded", "true");
    });

    close?.addEventListener("click", closeSidebar);
    overlay?.addEventListener("click", closeSidebar);

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeSidebar();
            closeDialog();
        }
    });
}


function initialiseFuturePages() {

    document
        .querySelectorAll("[data-future-page]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const label = formatTitle(
                    button.dataset.futurePage ||
                    "section"
                );

                showMessage(
                    `${label} will be connected as we continue building the student portal.`,
                    "info"
                );
            });
        });
}


const signOutButton = document.getElementById("student-sign-out-button");

signOutButton?.addEventListener("click", async () => {

    const original = signOutButton.innerHTML;

    signOutButton.disabled = true;
    signOutButton.textContent = "Signing out...";

    try {

        await signOut(auth);
        window.location.replace(LOGIN_URL);

    } catch (error) {

        console.error("Sign out failed:", error);

        signOutButton.disabled = false;
        signOutButton.innerHTML = original;

        showMessage(
            "CodeLab could not sign you out. Please try again.",
            "error"
        );
    }
});


function showMessage(message, type = "info") {

    const element = document.getElementById("student-courses-message");

    if (!element) return;

    element.textContent = String(message || "");
    element.className = `student-courses-message ${type}`;
    element.hidden = false;

    window.clearTimeout(showMessage.timeout);

    showMessage.timeout = window.setTimeout(() => {
        element.hidden = true;
    }, 5000);
}


function setLoading(value) {

    if (loadingScreen) {
        loadingScreen.hidden = !value;
    }
}


function getErrorMessage(error) {

    const value = String(
        error?.code ||
        error?.message ||
        ""
    );

    if (value.includes("permission-denied")) {
        return "CodeLab could not access your course information. Check Firestore rules.";
    }

    if (value.includes("student-profile-not-found")) {
        return "Your CodeLab student profile could not be found.";
    }

    if (value.includes("network")) {
        return "CodeLab could not reach Firebase.";
    }

    return "CodeLab could not complete the request. Please try again.";
}


function normaliseName(value) {
    return String(value || "Student")
        .trim()
        .replace(/\s+/g, " ");
}


function deriveNameFromEmail(email) {

    return String(email || "")
        .split("@")[0]
        .replace(/[._-]+/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


function formatPlan(value) {

    const plan = String(value || "free").toLowerCase();

    return plan.charAt(0).toUpperCase() + plan.slice(1);
}


function formatTitle(value) {

    return String(value || "")
        .replaceAll("-", " ")
        .replace(/\b\w/g, c => c.toUpperCase());
}


function safeNumber(value) {

    const number = Number(value);

    return Number.isFinite(number)
        ? Math.max(0, Math.round(number))
        : 0;
}


function clamp(number, min, max) {

    const value = Number(number);

    if (!Number.isFinite(value)) {
        return min;
    }

    return Math.min(max, Math.max(min, value));
}


function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = String(value ?? "");
    }
}


function escapeHtml(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


window.CWSStudentCourses = {
    getUser: () => state.user,
    getProfile: () => state.profile,
    getCourses: () => [...state.courses],
    getEnrolledCourses,
    getCourseProgress: getProgress,
    refresh: renderCourses
};


window.addEventListener("pagehide", () => {
    if (typeof unsubscribe === "function") {
        unsubscribe();
    }
});
