window.CWS_COURSES = [
  {
    id: "programming-fundamentals",
    order: 1,
    title: "Programming Fundamentals",
    shortTitle: "Programming Fundamentals",
    category: "Programming",
    level: "Beginner",
    access: "Free",
    status: "available",
    duration: "6 weeks",
    hours: 18,
    modules: 8,
    projects: 3,
    assessments: 5,
    icon: "PF",
    accent: "violet",
    description:
      "Build the thinking skills every developer needs: variables, logic, conditions, loops, functions, algorithms, debugging, and structured problem solving.",
    outcome:
      "By the end of this course, you will be able to break problems into logical steps and write small programs with confidence.",
    prerequisites: ["None"],
    skills: [
      "Variables and data types",
      "Conditional logic",
      "Loops and iteration",
      "Functions",
      "Algorithms",
      "Debugging fundamentals"
    ],
    learningPaths: ["python-developer", "full-stack-developer"],
    featured: true
  },
  {
    id: "html-css",
    order: 2,
    title: "HTML & CSS",
    shortTitle: "HTML & CSS",
    category: "Web Development",
    level: "Beginner",
    access: "Free",
    status: "available",
    duration: "6 weeks",
    hours: 20,
    modules: 9,
    projects: 4,
    assessments: 5,
    icon: "HC",
    accent: "blue",
    description:
      "Learn how modern websites are structured and styled, from semantic HTML to layouts, responsive design, forms, accessibility, and polished interfaces.",
    outcome:
      "Build responsive multi-page websites that work across desktop, tablet, and mobile devices.",
    prerequisites: ["None"],
    skills: [
      "Semantic HTML",
      "CSS fundamentals",
      "Flexbox",
      "CSS Grid",
      "Responsive design",
      "Accessible interfaces"
    ],
    learningPaths: ["front-end-developer", "full-stack-developer"],
    featured: true
  },
  {
    id: "javascript-fundamentals",
    order: 3,
    title: "JavaScript Fundamentals",
    shortTitle: "JavaScript",
    category: "Web Development",
    level: "Beginner",
    access: "Free",
    status: "available",
    duration: "8 weeks",
    hours: 28,
    modules: 10,
    projects: 5,
    assessments: 6,
    icon: "JS",
    accent: "yellow",
    description:
      "Turn static pages into interactive applications using JavaScript fundamentals, DOM manipulation, events, arrays, objects, functions, and asynchronous code.",
    outcome:
      "Build browser-based applications with dynamic user interactions and data-driven behaviour.",
    prerequisites: ["HTML & CSS recommended"],
    skills: [
      "JavaScript syntax",
      "Functions",
      "Arrays and objects",
      "DOM manipulation",
      "Events",
      "Async JavaScript"
    ],
    learningPaths: ["front-end-developer", "full-stack-developer"],
    featured: true
  },
  {
    id: "git-github",
    order: 4,
    title: "Git & GitHub",
    shortTitle: "Git & GitHub",
    category: "Developer Tools",
    level: "Beginner",
    access: "Free",
    status: "available",
    duration: "3 weeks",
    hours: 10,
    modules: 6,
    projects: 2,
    assessments: 3,
    icon: "GT",
    accent: "orange",
    description:
      "Learn professional version-control workflows, repositories, commits, branches, merging, remote collaboration, and how developers safely manage code changes.",
    outcome:
      "Track and publish your projects confidently using Git and GitHub workflows.",
    prerequisites: ["Basic computer skills"],
    skills: [
      "Repositories",
      "Commits",
      "Branches",
      "Merging",
      "Remote repositories",
      "Collaboration workflows"
    ],
    learningPaths: ["front-end-developer", "python-developer", "full-stack-developer"],
    featured: false
  },
  {
    id: "python-programming",
    order: 5,
    title: "Python Programming",
    shortTitle: "Python Programming",
    category: "Programming",
    level: "Beginner",
    access: "Pro",
    status: "available",
    duration: "10 weeks",
    hours: 34,
    modules: 12,
    projects: 6,
    assessments: 7,
    icon: "PY",
    accent: "green",
    description:
      "Develop practical Python skills through scripting, data structures, functions, files, exceptions, modules, object-oriented programming, JSON, and API work.",
    outcome:
      "Create useful Python applications and establish the foundation needed for backend development.",
    prerequisites: ["Programming Fundamentals recommended"],
    skills: [
      "Python syntax",
      "Data structures",
      "Functions",
      "File handling",
      "Object-oriented programming",
      "JSON and APIs"
    ],
    learningPaths: ["python-developer", "full-stack-developer"],
    featured: true
  },
  {
    id: "sql-databases",
    order: 6,
    title: "SQL & Databases",
    shortTitle: "SQL & Databases",
    category: "Databases",
    level: "Beginner",
    access: "Pro",
    status: "available",
    duration: "6 weeks",
    hours: 20,
    modules: 8,
    projects: 4,
    assessments: 5,
    icon: "DB",
    accent: "cyan",
    description:
      "Understand relational databases, data modelling, SQL queries, joins, constraints, CRUD operations, and how applications interact with persistent data.",
    outcome:
      "Design and query relational databases for real software applications.",
    prerequisites: ["Programming Fundamentals recommended"],
    skills: [
      "Relational database concepts",
      "Data modelling",
      "SELECT queries",
      "CRUD operations",
      "Joins",
      "Constraints"
    ],
    learningPaths: ["python-developer", "full-stack-developer"],
    featured: false
  }
];

window.CWS_LEARNING_PATHS = [
  {
    id: "front-end-developer",
    title: "Front-End Developer",
    description: "Build responsive, interactive websites and modern user interfaces.",
    courseIds: [
      "html-css",
      "javascript-fundamentals",
      "git-github"
    ]
  },
  {
    id: "python-developer",
    title: "Python Developer",
    description: "Build programming fundamentals and progress toward backend applications.",
    courseIds: [
      "programming-fundamentals",
      "git-github",
      "python-programming",
      "sql-databases"
    ]
  },
  {
    id: "full-stack-developer",
    title: "Full-Stack Developer",
    description: "Combine front-end, backend, databases, APIs, authentication, and deployment.",
    courseIds: [
      "programming-fundamentals",
      "html-css",
      "javascript-fundamentals",
      "git-github",
      "python-programming",
      "sql-databases"
    ]
  }
];

window.CWS_COURSE_UTILS = {
  getCourseById(courseId) {
    return window.CWS_COURSES.find((course) => course.id === courseId) || null;
  },

  getCoursesByPath(pathId) {
    const path = window.CWS_LEARNING_PATHS.find((item) => item.id === pathId);
    if (!path) return [];

    return path.courseIds
      .map((courseId) => this.getCourseById(courseId))
      .filter(Boolean);
  },

  getAvailableCourses() {
    return window.CWS_COURSES.filter((course) => course.status === "available");
  }
};
