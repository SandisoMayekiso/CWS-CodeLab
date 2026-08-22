const coursesGrid = document.querySelector("#courses-grid");
const categoryFilters = document.querySelector("#category-filters");
const searchInput = document.querySelector("#course-search");
const levelFilter = document.querySelector("#level-filter");
const accessFilter = document.querySelector("#access-filter");
const resultsStatus = document.querySelector("#results-status");
const emptyState = document.querySelector("#empty-state");
const clearFiltersButton = document.querySelector("#clear-filters");
const pathSelectorGrid = document.querySelector("#path-selector-grid");
const courseCountTarget = document.querySelector("#summary-course-count");
const projectCountTarget = document.querySelector("#summary-project-count");

const courseState = {
  query: "",
  category: "all",
  level: "all",
  access: "all"
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCategoryFilters() {
  if (!categoryFilters) return;

  const categories = [...new Set(window.CWS_COURSES.map((course) => course.category))]
    .sort((a, b) => a.localeCompare(b));

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-filter";
    button.dataset.category = category;
    button.textContent = category;
    categoryFilters.appendChild(button);
  });

  categoryFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    courseState.category = button.dataset.category;

    categoryFilters.querySelectorAll(".category-filter").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    renderCourses();
  });
}

function getFilteredCourses() {
  return window.CWS_COURSES.filter((course) => {
    const searchableText = [
      course.title,
      course.category,
      course.description,
      course.outcome,
      ...course.skills
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      !courseState.query || searchableText.includes(courseState.query.toLowerCase());

    const matchesCategory =
      courseState.category === "all" || course.category === courseState.category;

    const matchesLevel =
      courseState.level === "all" || course.level === courseState.level;

    const matchesAccess =
      courseState.access === "all" || course.access === courseState.access;

    return matchesQuery && matchesCategory && matchesLevel && matchesAccess;
  }).sort((a, b) => a.order - b.order);
}

function createCourseCard(course) {
  const skillTags = course.skills
    .slice(0, 4)
    .map((skill) => `<span>${escapeHtml(skill)}</span>`)
    .join("");

  return `
    <article class="catalogue-card">
      <div class="catalogue-card-top">
        <div class="catalogue-icon" data-accent="${escapeHtml(course.accent)}">
          ${escapeHtml(course.icon)}
        </div>
        <span class="access-badge ${course.access === "Pro" ? "pro" : ""}">
          ${escapeHtml(course.access)}
        </span>
      </div>

      <p class="catalogue-card-kicker">
        ${String(course.order).padStart(2, "0")} · ${escapeHtml(course.category)} · ${escapeHtml(course.level)}
      </p>

      <h3>${escapeHtml(course.title)}</h3>
      <p class="catalogue-card-description">${escapeHtml(course.description)}</p>

      <div class="catalogue-skills">
        ${skillTags}
      </div>

      <div class="course-stats">
        <div>
          <strong>${escapeHtml(course.modules)}</strong>
          <span>Modules</span>
        </div>
        <div>
          <strong>${escapeHtml(course.projects)}</strong>
          <span>Projects</span>
        </div>
        <div>
          <strong>${escapeHtml(course.assessments)}</strong>
          <span>Assessments</span>
        </div>
      </div>

      <div class="catalogue-card-footer">
        <span class="course-duration">${escapeHtml(course.duration)} · ${escapeHtml(course.hours)} hrs</span>
        <a
          class="course-action"
          href="course-details.html?course=${encodeURIComponent(course.id)}"
          aria-label="View ${escapeHtml(course.title)}"
        >
          View course →
        </a>
      </div>
    </article>
  `;
}

function renderCourses() {
  if (!coursesGrid) return;

  const filteredCourses = getFilteredCourses();
  coursesGrid.innerHTML = filteredCourses.map(createCourseCard).join("");

  if (resultsStatus) {
    const noun = filteredCourses.length === 1 ? "course" : "courses";
    resultsStatus.textContent = `Showing ${filteredCourses.length} ${noun}`;
  }

  if (emptyState) {
    emptyState.hidden = filteredCourses.length !== 0;
  }
}

function renderLearningPaths() {
  if (!pathSelectorGrid) return;

  pathSelectorGrid.innerHTML = window.CWS_LEARNING_PATHS.map((path) => {
    const courses = window.CWS_COURSE_UTILS.getCoursesByPath(path.id);

    const courseRows = courses
      .map(
        (course, index) => `
          <div>
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${escapeHtml(course.title)}</p>
          </div>
        `
      )
      .join("");

    return `
      <article class="path-selector-card">
        <h3>${escapeHtml(path.title)}</h3>
        <p>${escapeHtml(path.description)}</p>
        <div class="path-course-list">${courseRows}</div>
      </article>
    `;
  }).join("");
}

function updateSummary() {
  if (courseCountTarget) {
    courseCountTarget.textContent = window.CWS_COURSES.length;
  }

  if (projectCountTarget) {
    const projectTotal = window.CWS_COURSES.reduce(
      (total, course) => total + course.projects,
      0
    );
    projectCountTarget.textContent = projectTotal;
  }
}

searchInput?.addEventListener("input", (event) => {
  courseState.query = event.target.value.trim();
  renderCourses();
});

levelFilter?.addEventListener("change", (event) => {
  courseState.level = event.target.value;
  renderCourses();
});

accessFilter?.addEventListener("change", (event) => {
  courseState.access = event.target.value;
  renderCourses();
});

clearFiltersButton?.addEventListener("click", () => {
  courseState.query = "";
  courseState.category = "all";
  courseState.level = "all";
  courseState.access = "all";

  if (searchInput) searchInput.value = "";
  if (levelFilter) levelFilter.value = "all";
  if (accessFilter) accessFilter.value = "all";

  categoryFilters?.querySelectorAll(".category-filter").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === "all");
  });

  renderCourses();
});

renderCategoryFilters();
renderLearningPaths();
updateSummary();
renderCourses();
