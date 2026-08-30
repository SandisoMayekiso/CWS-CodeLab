/* CWS CodeLab student dashboard presentation controller.
 * Authentication and trusted Firestore reads are owned by auth-guard.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("dashboard-sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarClose = document.getElementById("sidebar-close");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const mobileQuery = window.matchMedia("(max-width: 980px)");
  let lastSidebarTrigger = null;
  let messageTimer = null;

  document.getElementById("dashboard-year")?.replaceChildren(
    String(new Date().getFullYear())
  );

  function openSidebar(trigger = sidebarToggle) {
    if (!sidebar || !mobileQuery.matches) return;
    lastSidebarTrigger = trigger;
    sidebar.classList.add("open");
    sidebarOverlay?.classList.add("visible");
    sidebarOverlay?.setAttribute("aria-hidden", "false");
    sidebarToggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("dashboard-nav-open");
    sidebarClose?.focus();
  }

  function closeSidebar({ restoreFocus = false } = {}) {
    sidebar?.classList.remove("open");
    sidebarOverlay?.classList.remove("visible");
    sidebarOverlay?.setAttribute("aria-hidden", "true");
    sidebarToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("dashboard-nav-open");

    if (restoreFocus) {
      lastSidebarTrigger?.focus();
    }
  }

  sidebarToggle?.addEventListener("click", event => openSidebar(event.currentTarget));
  sidebarClose?.addEventListener("click", () => closeSidebar({ restoreFocus: true }));
  sidebarOverlay?.addEventListener("click", () => closeSidebar({ restoreFocus: true }));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && sidebar?.classList.contains("open")) {
      closeSidebar({ restoreFocus: true });
    }
  });

  mobileQuery.addEventListener?.("change", event => {
    if (!event.matches) closeSidebar();
  });

  sidebar?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => closeSidebar());
  });

  document.querySelectorAll("[data-future-page]").forEach(button => {
    button.addEventListener("click", () => {
      const label = String(button.dataset.futurePage || "This feature");
      showDashboardMessage(`${sentenceCase(label)} is not available yet. Current learning records will remain unchanged.`, "info");
      closeSidebar();
    });
  });

  function setStudent(student = {}) {
    const name = normaliseName(student.displayName || student.name);
    const email = normaliseEmail(student.email);
    const plan = titleCase(student.plan || "free");
    const status = titleCase(student.accountStatus || "active");
    const initial = firstName(name).charAt(0).toUpperCase() || "S";
    const verified = student.emailVerified === true;

    setText("student-name", name);
    setText("student-email", email);
    setText("topbar-student-avatar", initial);
    setText("sidebar-student-name", name);
    setText("sidebar-student-plan", `${plan} learner`);
    setText("student-avatar", initial);
    setText("welcome-student-name", `${firstName(name)}.`);
    setText("profile-student-name", name);
    setText("profile-student-email", email);
    setText("profile-student-avatar", initial);
    setText("profile-account-status", plan);
    setText("profile-learning-status", status);
    setText("profile-verification-status", verified ? "Verified" : "Pending");
    setText("dashboard-plan-badge", `${plan} plan`);
    setText("dashboard-verification-badge", verified ? "Verified email" : "Verification pending");
    setText("profile-member-since", formatDate(student.createdAt));

    document.getElementById("dashboard-verification-badge")
      ?.classList.toggle("verified", verified);
  }

  function setDashboardStats(stats = {}) {
    const courses = nonNegativeInteger(stats.courses);
    const progress = clamp(nonNegativeInteger(stats.progress), 0, 100);
    const projects = nonNegativeInteger(stats.projects);
    const certificates = nonNegativeInteger(stats.certificates);

    setText("dashboard-course-count", courses);
    setText("dashboard-progress-value", `${progress}%`);
    setText("dashboard-project-count", projects);
    setText("dashboard-certificate-count", certificates);

    updateContinueLearning({
      courseCount: courses,
      progress,
      recentCourse: isPlainObject(stats.recentCourse) ? stats.recentCourse : null
    });
  }

  function updateContinueLearning(data = {}) {
    const courseCount = nonNegativeInteger(data.courseCount);
    const overallProgress = clamp(nonNegativeInteger(data.progress), 0, 100);
    const recent = isPlainObject(data.recentCourse) ? data.recentCourse : null;
    const action = document.getElementById("continue-learning-action");
    const progress = document.getElementById("continue-progress");
    const courseProgress = clamp(
      nonNegativeInteger(recent?.progress ?? overallProgress),
      0,
      100
    );

    if (!recent || courseCount === 0) {
      setText("continue-learning-label", "COURSE LIBRARY");
      setText("continue-learning-title", "Choose your first course");
      setText("continue-learning-description", "Browse the CodeLab library, enrol in an available course and begin building your learning record.");
      setAction(action, "../pages/courses.html", "Browse course library");
      if (progress) progress.hidden = true;
      return;
    }

    setText("continue-learning-label", String(recent.label || "CONTINUE COURSE").toUpperCase());
    setText("continue-learning-title", recent.title || "Continue your current course");
    setText("continue-learning-description", recent.description || `Your overall course progress is ${courseProgress}%. Return to the next incomplete lesson.`);
    setAction(action, safeInternalHref(recent.href), "Continue course");
    setText("continue-progress-label", `${courseProgress}% complete`);

    const bar = document.getElementById("continue-progress-bar");
    if (bar) bar.style.width = `${courseProgress}%`;
    if (progress) progress.hidden = false;
  }

  function setDashboardLoading(loading) {
    const loadingScreen = document.getElementById("dashboard-loading");
    if (loadingScreen) loadingScreen.hidden = !Boolean(loading);
  }

  function setVerificationState({ required = false, message = "" } = {}) {
    const loader = document.getElementById("dashboard-loader");
    const actions = document.getElementById("dashboard-loading-actions");

    loader?.toggleAttribute("hidden", required);
    if (actions) actions.hidden = !required;
    setText("dashboard-loading-title", required ? "Verify your email to continue" : "Loading your CodeLab account…");
    setText("dashboard-loading-description", message || (required
      ? "Use the link sent to your inbox, then refresh your account status."
      : "Checking authentication and learner access"));
  }

  function showDashboardMessage(message, type = "info", timeout = 6000) {
    const element = document.getElementById("dashboard-message");
    if (!element) return;

    const safeType = ["info", "success", "error"].includes(type) ? type : "info";
    element.textContent = String(message || "");
    element.className = `dashboard-message ${safeType}`;
    element.hidden = false;
    window.clearTimeout(messageTimer);

    if (timeout > 0) {
      messageTimer = window.setTimeout(clearDashboardMessage, timeout);
    }
  }

  function clearDashboardMessage() {
    const element = document.getElementById("dashboard-message");
    window.clearTimeout(messageTimer);
    if (!element) return;
    element.hidden = true;
    element.textContent = "";
    element.className = "dashboard-message";
  }

  function setAction(element, href, label) {
    if (!element) return;
    element.href = href;
    element.innerHTML = `${escapeHtml(label)} <span aria-hidden="true">→</span>`;
  }

  function safeInternalHref(value) {
    const fallback = "../pages/courses.html";
    const raw = String(value || "").trim();

    if (!raw || raw.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(raw)) {
      return fallback;
    }

    try {
      const resolved = new URL(raw, window.location.href);
      return resolved.origin === window.location.origin
        ? `${resolved.pathname}${resolved.search}${resolved.hash}`
        : fallback;
    } catch {
      return fallback;
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value ?? "");
  }

  function normaliseName(value) {
    return String(value || "Student").trim().replace(/\s+/g, " ") || "Student";
  }

  function normaliseEmail(value) {
    return String(value || "CodeLab learner").trim() || "CodeLab learner";
  }

  function firstName(value) {
    return normaliseName(value).split(/\s+/)[0];
  }

  function titleCase(value) {
    const normalised = String(value || "").trim().toLowerCase();
    return normalised ? normalised.charAt(0).toUpperCase() + normalised.slice(1) : "—";
  }

  function sentenceCase(value) {
    const normalised = String(value || "").trim();
    return normalised ? normalised.charAt(0).toUpperCase() + normalised.slice(1) : "This feature";
  }

  function formatDate(value) {
    let date = null;

    if (value instanceof Date) date = value;
    else if (value && typeof value.toDate === "function") date = value.toDate();
    else if (value) date = new Date(value);

    if (!date || Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-ZA", {
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function nonNegativeInteger(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.round(number)) : 0;
  }

  function clamp(number, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, number));
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.CWSDashboard = Object.freeze({
    setStudent,
    setStats: setDashboardStats,
    setLoading: setDashboardLoading,
    setVerificationState,
    showMessage: showDashboardMessage,
    clearMessage: clearDashboardMessage,
    updateContinueLearning
  });

  setStudent({
    displayName: "Student",
    email: "Loading account…",
    plan: "free",
    accountStatus: "active",
    emailVerified: false
  });
  setDashboardStats({ courses: 0, progress: 0, projects: 0, certificates: 0 });

  window.dispatchEvent(new CustomEvent("cws:dashboard-ready"));
});
