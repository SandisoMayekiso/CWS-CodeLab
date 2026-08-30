/* CWS CodeLab public catalogue controller.
 * Course metadata has one source of truth: data/courses.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalogue-grid");

  if (!grid) {
    return;
  }

  const courses = Array.isArray(window.CWS_COURSES)
    ? [...window.CWS_COURSES].sort(
        (a, b) => Number(a.order || 0) - Number(b.order || 0)
      )
    : [];

  const searchInput = document.getElementById("course-search");
  const levelFilter = document.getElementById("level-filter");
  const accessFilter = document.getElementById("access-filter");
  const categoryButtons = [
    ...document.querySelectorAll(".category-filter")
  ];
  const resultsStatus = document.getElementById("results-status");
  const emptyState = document.getElementById("course-empty-state");
  const resetButtons = [
    document.getElementById("reset-course-filters"),
    document.getElementById("reset-course-filters-empty")
  ].filter(Boolean);
  const totalCourseCount = document.getElementById("total-course-count");

  const state = {
    search: "",
    level: "all",
    access: "all",
    category: "all",
    path: "all"
  };

  if (totalCourseCount) {
    totalCourseCount.textContent = String(courses.length);
  }

  applyInitialQuery();
  bindEvents();
  render();

  function bindEvents() {
    searchInput?.addEventListener("input", event => {
      state.search = normalise(event.currentTarget.value);
      state.path = "all";
      render();
    });

    levelFilter?.addEventListener("change", event => {
      state.level = normalise(event.currentTarget.value) || "all";
      render();
    });

    accessFilter?.addEventListener("change", event => {
      state.access = normalise(event.currentTarget.value) || "all";
      render();
    });

    categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
        state.category = normalise(button.dataset.category) || "all";
        categoryButtons.forEach(item => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        render();
      });
    });

    resetButtons.forEach(button => {
      button.addEventListener("click", resetFilters);
    });

    document.querySelectorAll("[data-path-filter]").forEach(button => {
      button.addEventListener("click", () => {
        resetFilters(false);
        state.path = normalise(button.dataset.pathFilter) || "all";
        render();
        document.getElementById("course-catalogue")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth"
        });
      });
    });
  }

  function applyInitialQuery() {
    const params = new URLSearchParams(window.location.search);
    const path = normalise(params.get("path"));
    const courseId = normalise(params.get("course"));

    if (path) {
      state.path = path;
    }

    if (courseId) {
      const selected = courses.find(course => course.id === courseId);
      if (selected && searchInput) {
        searchInput.value = selected.title;
        state.search = normalise(selected.title);
      }
    }
  }

  function resetFilters(shouldRender = true) {
    state.search = "";
    state.level = "all";
    state.access = "all";
    state.category = "all";
    state.path = "all";

    if (searchInput) searchInput.value = "";
    if (levelFilter) levelFilter.value = "all";
    if (accessFilter) accessFilter.value = "all";

    categoryButtons.forEach(button => {
      const active = normalise(button.dataset.category) === "all";
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (shouldRender) {
      render();
    }
  }

  function render() {
    const filtered = courses.filter(matchesFilters);
    grid.setAttribute("aria-busy", "false");
    grid.hidden = filtered.length === 0;

    if (emptyState) {
      emptyState.hidden = filtered.length !== 0;
    }

    if (resultsStatus) {
      const context = state.path !== "all" ? " in this learning path" : "";
      resultsStatus.textContent = `${filtered.length} ${
        filtered.length === 1 ? "course" : "courses"
      } found${context}`;
    }

    grid.innerHTML = filtered.map(createCourseCard).join("");
  }

  function matchesFilters(course) {
    const searchable = normalise([
      course.title,
      course.shortTitle,
      course.category,
      course.level,
      course.description,
      course.outcome,
      ...(Array.isArray(course.skills) ? course.skills : [])
    ].join(" "));

    const access = course.status === "coming-soon"
      ? "coming soon"
      : normalise(course.access);

    const paths = Array.isArray(course.learningPaths)
      ? course.learningPaths.map(normalise)
      : [];

    return (
      (!state.search || searchable.includes(state.search)) &&
      (state.level === "all" || normalise(course.level) === state.level) &&
      (state.access === "all" || access === state.access) &&
      (state.category === "all" || normalise(course.category) === state.category) &&
      (state.path === "all" || paths.includes(state.path))
    );
  }

  function createCourseCard(course) {
    const isComingSoon = course.status === "coming-soon";
    const accessLabel = isComingSoon ? "Coming soon" : String(course.access || "Free");
    const accessClass = isComingSoon
      ? "coming-soon"
      : normalise(accessLabel) === "pro" ? "pro" : "free";
    const skills = Array.isArray(course.skills)
      ? course.skills.slice(0, 5)
      : [];

    return `
      <article class="catalogue-card" data-course-id="${escapeHtml(course.id)}" style="--course-accent:${sanitiseCssColour(course.accent)}">
        <div class="catalogue-card-top">
          <span class="catalogue-icon">${escapeHtml(course.icon || "CWS")}</span>
          <span class="access-badge ${accessClass}">${escapeHtml(accessLabel)}</span>
        </div>
        <p class="catalogue-card-kicker">${escapeHtml(course.category)} · ${escapeHtml(course.level)}</p>
        <h3>${escapeHtml(course.title)}</h3>
        <p class="catalogue-card-description">${escapeHtml(course.description)}</p>
        <p class="catalogue-outcome"><strong>Outcome:</strong> ${escapeHtml(course.outcome)}</p>
        <div class="catalogue-skills">${skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
        <div class="course-stats">
          <div><strong>${number(course.modules)}</strong><span>Modules</span></div>
          <div><strong>${number(course.hours)}</strong><span>Hours</span></div>
          <div><strong>${number(course.projects)}</strong><span>Projects</span></div>
        </div>
        <div class="catalogue-card-footer">
          <span class="course-duration">${escapeHtml(course.duration || "Self-paced")}</span>
          ${createAction(course, isComingSoon)}
        </div>
      </article>
    `;
  }

  function createAction(course, isComingSoon) {
    if (isComingSoon) {
      return `<span class="course-action course-coming-soon" aria-label="${escapeHtml(course.title)} is coming soon">Preview only</span>`;
    }

    if (normalise(course.access) === "pro") {
      return `<a class="course-action" href="pricing.html" aria-label="Review Pro access for ${escapeHtml(course.title)}">Review Pro access →</a>`;
    }

    return `<a class="course-action" href="register.html?course=${encodeURIComponent(course.id)}" aria-label="Start ${escapeHtml(course.title)}">Start free →</a>`;
  }

  function normalise(value) {
    return String(value || "").trim().toLowerCase();
  }

  function number(value) {
    const parsed = Number(value || 0);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function sanitiseCssColour(value) {
    const colour = String(value || "").trim();
    return /^#[\da-f]{3,8}$/i.test(colour) ? colour : "#8b7cff";
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
});
