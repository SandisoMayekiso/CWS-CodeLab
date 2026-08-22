# CWS CodeLab — Phase 2

**Learn. Build. Ship.**

Phase 2 converts the original concept homepage into the beginning of a data-driven course platform.

## Current structure

```text
CWS-CodeLab-Phase2/
├── index.html
├── README.md
│
├── pages/
│   └── courses.html
│
├── data/
│   └── courses.js
│
├── css/
│   ├── style.css
│   ├── courses.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   └── courses.js
│
└── assets/
    ├── images/
    └── icons/
```

## Phase 2 features

- Central `data/courses.js` catalogue
- Stable course IDs
- Course metadata for levels, access, modules, hours, projects and assessments
- Front-End, Python and Full-Stack learning-path relationships
- Searchable course catalogue
- Category filtering
- Free / Pro filtering
- Level filtering
- Dynamic course-card rendering
- Dynamic learning-path rendering
- Course URLs prepared as:
  `pages/course-details.html?course=COURSE_ID`
- Homepage navigation updated to use the new Courses page

## Current course IDs

- `programming-fundamentals`
- `html-css`
- `javascript-fundamentals`
- `git-github`
- `python-programming`
- `sql-databases`

## Important architectural rule

From this point forward, pages such as the dashboard, student courses, course details,
progress and learning paths should **read course information from `data/courses.js`**
instead of copying course names and descriptions into each page.

## Recommended Phase 3

Build:

- `pages/course-details.html`
- `js/course-details.js`
- detailed module structures inside `data/courses.js`

The course details page should resolve the `?course=` query parameter against the central
course data. This prevents the hardcoded-course problem and gives every course one
consistent source of truth.
