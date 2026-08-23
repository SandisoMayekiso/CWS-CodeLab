# CWS CodeLab

**Learn. Build. Ship.**


## Current structure

```text
CWS-CodeLab/
│
├── index.html
│
├── pages/                 ← PUBLIC / OUTER WEBSITE
│   ├── about.html
│   ├── contact.html
│   ├── courses.html
│   ├── course-details.html
│   ├── learning-paths.html
│   ├── pricing.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── privacy-policy.html
│   ├── cookie-policy.html
│   └── verify-certificate.html
│
├── student/               ← AUTHENTICATED STUDENT PORTAL
│   ├── dashboard.html
│   ├── student-courses.html
│   ├── course-details.html
│   ├── lesson.html
│   ├── projects.html
│   ├── assessments.html
│   ├── learning-paths.html
│   ├── progress.html
│   ├── certificates.html
│   ├── certificate.html
│   ├── profile.html
│   └── subscription.html
│
├── data/
├── css/
├── js/
└── assets/
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
