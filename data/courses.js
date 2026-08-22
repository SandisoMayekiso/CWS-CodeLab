/* =========================================================
   CWS CODELAB
   Central Course Catalogue + Curriculum Data
========================================================= */

window.CWS_COURSES = [

    /* =====================================================
       01. PROGRAMMING FUNDAMENTALS
    ===================================================== */

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

        featured: true,

        description:
            "Build the thinking skills every developer needs: variables, logic, conditions, loops, functions, algorithms, debugging, and structured problem solving.",

        outcome:
            "By the end of this course, you will be able to break problems into logical steps and write small programs with confidence.",

        prerequisites: [
            "None"
        ],

        skills: [
            "Variables and data types",
            "Conditional logic",
            "Loops and iteration",
            "Functions",
            "Algorithms",
            "Debugging fundamentals"
        ],

        learningPaths: [
            "python-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "pf-module-1",

                order: 1,

                title: "Introduction to Programming",

                description:
                    "Understand what programming is, how software works, and how developers approach problems.",

                lessons: [

                    {
                        id: "pf-1-1",
                        order: 1,
                        title: "What Is Programming?",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "pf-1-2",
                        order: 2,
                        title: "How Computer Programs Work",
                        type: "lesson",
                        duration: "14 min",
                        freePreview: true
                    },

                    {
                        id: "pf-1-3",
                        order: 3,
                        title: "Programming Languages Explained",
                        type: "lesson",
                        duration: "12 min"
                    },

                    {
                        id: "pf-1-4",
                        order: 4,
                        title: "Writing Your First Algorithm",
                        type: "exercise",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "pf-module-2",

                order: 2,

                title: "Variables and Data",

                description:
                    "Learn how programs store, identify, and manipulate information.",

                lessons: [

                    {
                        id: "pf-2-1",
                        order: 1,
                        title: "Variables and Values",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "pf-2-2",
                        order: 2,
                        title: "Strings, Numbers and Booleans",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "pf-2-3",
                        order: 3,
                        title: "Naming Variables Clearly",
                        type: "lesson",
                        duration: "10 min"
                    },

                    {
                        id: "pf-2-4",
                        order: 4,
                        title: "Working With User Input",
                        type: "exercise",
                        duration: "25 min"
                    }

                ]
            },


            {
                id: "pf-module-3",

                order: 3,

                title: "Operators and Expressions",

                description:
                    "Use operators to perform calculations, compare values, and build logical expressions.",

                lessons: [

                    {
                        id: "pf-3-1",
                        order: 1,
                        title: "Arithmetic Operators",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "pf-3-2",
                        order: 2,
                        title: "Comparison Operators",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "pf-3-3",
                        order: 3,
                        title: "Logical Operators",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "pf-3-4",
                        order: 4,
                        title: "Expression Practice",
                        type: "exercise",
                        duration: "25 min"
                    }

                ]
            },


            {
                id: "pf-module-4",

                order: 4,

                title: "Decision Making",

                description:
                    "Make programs respond differently depending on conditions.",

                lessons: [

                    {
                        id: "pf-4-1",
                        order: 1,
                        title: "Understanding Conditions",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "pf-4-2",
                        order: 2,
                        title: "If Statements",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "pf-4-3",
                        order: 3,
                        title: "Else and Else If Logic",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "pf-4-4",
                        order: 4,
                        title: "Build a Grade Calculator",
                        type: "project",
                        duration: "45 min"
                    }

                ]
            },


            {
                id: "pf-module-5",

                order: 5,

                title: "Loops and Repetition",

                description:
                    "Learn how programs repeat tasks efficiently.",

                lessons: [

                    {
                        id: "pf-5-1",
                        order: 1,
                        title: "Why Loops Matter",
                        type: "lesson",
                        duration: "12 min"
                    },

                    {
                        id: "pf-5-2",
                        order: 2,
                        title: "For Loops",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "pf-5-3",
                        order: 3,
                        title: "While Loops",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "pf-5-4",
                        order: 4,
                        title: "Loop Challenges",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "pf-module-6",

                order: 6,

                title: "Functions",

                description:
                    "Organise reusable pieces of logic into functions.",

                lessons: [

                    {
                        id: "pf-6-1",
                        order: 1,
                        title: "What Are Functions?",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "pf-6-2",
                        order: 2,
                        title: "Parameters and Arguments",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "pf-6-3",
                        order: 3,
                        title: "Return Values",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "pf-6-4",
                        order: 4,
                        title: "Reusable Calculator Functions",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "pf-module-7",

                order: 7,

                title: "Algorithms and Problem Solving",

                description:
                    "Develop a structured approach to solving programming problems.",

                lessons: [

                    {
                        id: "pf-7-1",
                        order: 1,
                        title: "Breaking Problems Into Steps",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "pf-7-2",
                        order: 2,
                        title: "Pseudocode",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "pf-7-3",
                        order: 3,
                        title: "Flowcharts",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "pf-7-4",
                        order: 4,
                        title: "Algorithm Challenge",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "pf-module-8",

                order: 8,

                title: "Debugging and Final Project",

                description:
                    "Learn how to identify bugs and combine your fundamentals in a practical project.",

                lessons: [

                    {
                        id: "pf-8-1",
                        order: 1,
                        title: "Understanding Programming Errors",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "pf-8-2",
                        order: 2,
                        title: "Reading Error Messages",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "pf-8-3",
                        order: 3,
                        title: "Debugging Strategies",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "pf-8-4",
                        order: 4,
                        title: "Final Project: Interactive Console App",
                        type: "project",
                        duration: "90 min"
                    },

                    {
                        id: "pf-final-assessment",
                        order: 5,
                        title: "Programming Fundamentals Final Assessment",
                        type: "assessment",
                        duration: "45 min"
                    }

                ]
            }

        ]
    },


    /* =====================================================
       02. HTML & CSS
    ===================================================== */

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

        featured: true,

        description:
            "Learn how modern websites are structured and styled, from semantic HTML to layouts, responsive design, forms, accessibility, and polished interfaces.",

        outcome:
            "Build responsive multi-page websites that work across desktop, tablet, and mobile devices.",

        prerequisites: [
            "None"
        ],

        skills: [
            "Semantic HTML",
            "CSS fundamentals",
            "Flexbox",
            "CSS Grid",
            "Responsive design",
            "Accessible interfaces"
        ],

        learningPaths: [
            "front-end-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "hc-module-1",

                order: 1,

                title: "How the Web Works",

                description:
                    "Understand browsers, websites, servers, URLs, HTML, CSS, and the foundations of the web.",

                lessons: [

                    {
                        id: "hc-1-1",
                        order: 1,
                        title: "How Websites Work",
                        type: "lesson",
                        duration: "14 min",
                        freePreview: true
                    },

                    {
                        id: "hc-1-2",
                        order: 2,
                        title: "HTML, CSS and JavaScript",
                        type: "lesson",
                        duration: "14 min",
                        freePreview: true
                    },

                    {
                        id: "hc-1-3",
                        order: 3,
                        title: "Setting Up Your Code Editor",
                        type: "lesson",
                        duration: "12 min"
                    }

                ]
            },


            {
                id: "hc-module-2",

                order: 2,

                title: "HTML Fundamentals",

                description:
                    "Create the structure of a webpage using HTML.",

                lessons: [

                    {
                        id: "hc-2-1",
                        order: 1,
                        title: "HTML Document Structure",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-2-2",
                        order: 2,
                        title: "Headings and Paragraphs",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "hc-2-3",
                        order: 3,
                        title: "Links and Images",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "hc-2-4",
                        order: 4,
                        title: "Lists and Containers",
                        type: "lesson",
                        duration: "15 min"
                    }

                ]
            },


            {
                id: "hc-module-3",

                order: 3,

                title: "Semantic HTML",

                description:
                    "Use meaningful HTML elements to build organised and accessible pages.",

                lessons: [

                    {
                        id: "hc-3-1",
                        order: 1,
                        title: "Semantic HTML Explained",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "hc-3-2",
                        order: 2,
                        title: "Header, Nav, Main and Footer",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-3-3",
                        order: 3,
                        title: "Sections and Articles",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "hc-3-4",
                        order: 4,
                        title: "Build a Semantic Page",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "hc-module-4",

                order: 4,

                title: "CSS Fundamentals",

                description:
                    "Style webpages using selectors, properties, colours, typography, spacing, and the box model.",

                lessons: [

                    {
                        id: "hc-4-1",
                        order: 1,
                        title: "Introduction to CSS",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "hc-4-2",
                        order: 2,
                        title: "Selectors and Specificity",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "hc-4-3",
                        order: 3,
                        title: "Colours and Typography",
                        type: "lesson",
                        duration: "17 min"
                    },

                    {
                        id: "hc-4-4",
                        order: 4,
                        title: "The CSS Box Model",
                        type: "lesson",
                        duration: "18 min"
                    }

                ]
            },


            {
                id: "hc-module-5",

                order: 5,

                title: "Flexbox",

                description:
                    "Create flexible one-dimensional layouts using CSS Flexbox.",

                lessons: [

                    {
                        id: "hc-5-1",
                        order: 1,
                        title: "Understanding Flex Containers",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-5-2",
                        order: 2,
                        title: "Alignment and Spacing",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-5-3",
                        order: 3,
                        title: "Building a Navbar With Flexbox",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "hc-module-6",

                order: 6,

                title: "CSS Grid",

                description:
                    "Build powerful two-dimensional webpage layouts.",

                lessons: [

                    {
                        id: "hc-6-1",
                        order: 1,
                        title: "Introduction to CSS Grid",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-6-2",
                        order: 2,
                        title: "Rows, Columns and Gaps",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-6-3",
                        order: 3,
                        title: "Build a Card Grid",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "hc-module-7",

                order: 7,

                title: "Responsive Web Design",

                description:
                    "Make websites adapt to desktop, tablet, and mobile screen sizes.",

                lessons: [

                    {
                        id: "hc-7-1",
                        order: 1,
                        title: "Responsive Design Principles",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "hc-7-2",
                        order: 2,
                        title: "Media Queries",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "hc-7-3",
                        order: 3,
                        title: "Responsive Images and Typography",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-7-4",
                        order: 4,
                        title: "Responsive Landing Page",
                        type: "project",
                        duration: "90 min"
                    }

                ]
            },


            {
                id: "hc-module-8",

                order: 8,

                title: "Forms and Accessibility",

                description:
                    "Build usable forms and learn accessibility foundations.",

                lessons: [

                    {
                        id: "hc-8-1",
                        order: 1,
                        title: "HTML Forms",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "hc-8-2",
                        order: 2,
                        title: "Labels and Input Types",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "hc-8-3",
                        order: 3,
                        title: "Accessibility Fundamentals",
                        type: "lesson",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "hc-module-9",

                order: 9,

                title: "Final Website Project",

                description:
                    "Combine your HTML and CSS skills into a complete multi-page website.",

                lessons: [

                    {
                        id: "hc-9-1",
                        order: 1,
                        title: "Project Planning",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "hc-9-2",
                        order: 2,
                        title: "Build a Multi-Page Portfolio Website",
                        type: "project",
                        duration: "120 min"
                    },

                    {
                        id: "hc-9-3",
                        order: 3,
                        title: "Responsive Testing and Refinement",
                        type: "exercise",
                        duration: "45 min"
                    },

                    {
                        id: "hc-final-assessment",
                        order: 4,
                        title: "HTML & CSS Final Assessment",
                        type: "assessment",
                        duration: "45 min"
                    }

                ]
            }

        ]
    },


    /* =====================================================
       03. JAVASCRIPT FUNDAMENTALS
    ===================================================== */

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

        featured: true,

        description:
            "Turn static pages into interactive applications using JavaScript fundamentals, DOM manipulation, events, arrays, objects, functions, and asynchronous code.",

        outcome:
            "Build browser-based applications with dynamic user interactions and data-driven behaviour.",

        prerequisites: [
            "HTML & CSS recommended"
        ],

        skills: [
            "JavaScript syntax",
            "Functions",
            "Arrays and objects",
            "DOM manipulation",
            "Events",
            "Async JavaScript"
        ],

        learningPaths: [
            "front-end-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "js-module-1",

                order: 1,

                title: "Introduction to JavaScript",

                description:
                    "Understand JavaScript's role in modern web development.",

                lessons: [

                    {
                        id: "js-1-1",
                        order: 1,
                        title: "What Is JavaScript?",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "js-1-2",
                        order: 2,
                        title: "Running JavaScript in the Browser",
                        type: "lesson",
                        duration: "15 min",
                        freePreview: true
                    },

                    {
                        id: "js-1-3",
                        order: 3,
                        title: "Using the Browser Console",
                        type: "exercise",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "js-module-2",

                order: 2,

                title: "Variables and Data Types",

                description:
                    "Store and manipulate information using JavaScript variables.",

                lessons: [

                    {
                        id: "js-2-1",
                        order: 1,
                        title: "let, const and Variables",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-2-2",
                        order: 2,
                        title: "Strings, Numbers and Booleans",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-2-3",
                        order: 3,
                        title: "Template Literals",
                        type: "lesson",
                        duration: "14 min"
                    }

                ]
            },


            {
                id: "js-module-3",

                order: 3,

                title: "Conditions and Logic",

                description:
                    "Control application behaviour using conditional statements.",

                lessons: [

                    {
                        id: "js-3-1",
                        order: 1,
                        title: "Comparison Operators",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "js-3-2",
                        order: 2,
                        title: "if, else and else if",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "js-3-3",
                        order: 3,
                        title: "Logical Operators",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "js-3-4",
                        order: 4,
                        title: "Build an Age Eligibility Checker",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "js-module-4",

                order: 4,

                title: "Functions",

                description:
                    "Create reusable JavaScript logic.",

                lessons: [

                    {
                        id: "js-4-1",
                        order: 1,
                        title: "Function Declarations",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-4-2",
                        order: 2,
                        title: "Parameters and Return Values",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-4-3",
                        order: 3,
                        title: "Arrow Functions",
                        type: "lesson",
                        duration: "16 min"
                    }

                ]
            },


            {
                id: "js-module-5",

                order: 5,

                title: "Arrays and Objects",

                description:
                    "Organise collections and structured data.",

                lessons: [

                    {
                        id: "js-5-1",
                        order: 1,
                        title: "JavaScript Arrays",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "js-5-2",
                        order: 2,
                        title: "Array Methods",
                        type: "lesson",
                        duration: "22 min"
                    },

                    {
                        id: "js-5-3",
                        order: 3,
                        title: "JavaScript Objects",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "js-5-4",
                        order: 4,
                        title: "Student Records Challenge",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "js-module-6",

                order: 6,

                title: "Loops",

                description:
                    "Iterate through data and repeat logic efficiently.",

                lessons: [

                    {
                        id: "js-6-1",
                        order: 1,
                        title: "for Loops",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-6-2",
                        order: 2,
                        title: "while Loops",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "js-6-3",
                        order: 3,
                        title: "Looping Through Arrays",
                        type: "exercise",
                        duration: "30 min"
                    }

                ]
            },


            {
                id: "js-module-7",

                order: 7,

                title: "The DOM",

                description:
                    "Use JavaScript to read and change webpage content.",

                lessons: [

                    {
                        id: "js-7-1",
                        order: 1,
                        title: "Understanding the DOM",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-7-2",
                        order: 2,
                        title: "Selecting Elements",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-7-3",
                        order: 3,
                        title: "Changing Content and Styles",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "js-7-4",
                        order: 4,
                        title: "Interactive Theme Switcher",
                        type: "project",
                        duration: "60 min"
                    }

                ]
            },


            {
                id: "js-module-8",

                order: 8,

                title: "Events and Forms",

                description:
                    "Respond to user interaction in the browser.",

                lessons: [

                    {
                        id: "js-8-1",
                        order: 1,
                        title: "JavaScript Events",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-8-2",
                        order: 2,
                        title: "Event Listeners",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "js-8-3",
                        order: 3,
                        title: "Working With Forms",
                        type: "lesson",
                        duration: "22 min"
                    },

                    {
                        id: "js-8-4",
                        order: 4,
                        title: "Client-Side Form Validation",
                        type: "project",
                        duration: "60 min"
                    }

                ]
            },


            {
                id: "js-module-9",

                order: 9,

                title: "APIs and Asynchronous JavaScript",

                description:
                    "Retrieve external data and work with asynchronous operations.",

                lessons: [

                    {
                        id: "js-9-1",
                        order: 1,
                        title: "What Is an API?",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "js-9-2",
                        order: 2,
                        title: "Promises",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "js-9-3",
                        order: 3,
                        title: "async and await",
                        type: "lesson",
                        duration: "22 min"
                    },

                    {
                        id: "js-9-4",
                        order: 4,
                        title: "Fetch API",
                        type: "lesson",
                        duration: "22 min"
                    },

                    {
                        id: "js-9-5",
                        order: 5,
                        title: "Build a Public API App",
                        type: "project",
                        duration: "90 min"
                    }

                ]
            },


            {
                id: "js-module-10",

                order: 10,

                title: "JavaScript Capstone",

                description:
                    "Combine your skills into a complete interactive browser application.",

                lessons: [

                    {
                        id: "js-10-1",
                        order: 1,
                        title: "Application Planning",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "js-10-2",
                        order: 2,
                        title: "Build a Task Manager Application",
                        type: "project",
                        duration: "120 min"
                    },

                    {
                        id: "js-10-3",
                        order: 3,
                        title: "Debugging and Refactoring",
                        type: "exercise",
                        duration: "45 min"
                    },

                    {
                        id: "js-final-assessment",
                        order: 4,
                        title: "JavaScript Fundamentals Final Assessment",
                        type: "assessment",
                        duration: "60 min"
                    }

                ]
            }

        ]
    },


    /* =====================================================
       04. GIT & GITHUB
    ===================================================== */

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

        featured: false,

        description:
            "Learn professional version-control workflows, repositories, commits, branches, merging, remote collaboration, and how developers safely manage code changes.",

        outcome:
            "Track and publish your projects confidently using Git and GitHub workflows.",

        prerequisites: [
            "Basic computer skills"
        ],

        skills: [
            "Repositories",
            "Commits",
            "Branches",
            "Merging",
            "Remote repositories",
            "Collaboration workflows"
        ],

        learningPaths: [
            "front-end-developer",
            "python-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "git-module-1",

                order: 1,

                title: "Introduction to Version Control",

                description:
                    "Understand why developers use Git and version-control systems.",

                lessons: [

                    {
                        id: "git-1-1",
                        order: 1,
                        title: "What Is Version Control?",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "git-1-2",
                        order: 2,
                        title: "Git vs GitHub",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "git-1-3",
                        order: 3,
                        title: "Installing and Configuring Git",
                        type: "lesson",
                        duration: "15 min"
                    }

                ]
            },


            {
                id: "git-module-2",

                order: 2,

                title: "Repositories and Commits",

                description:
                    "Create repositories and track code changes.",

                lessons: [

                    {
                        id: "git-2-1",
                        order: 1,
                        title: "Creating a Repository",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "git-2-2",
                        order: 2,
                        title: "git status and git add",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "git-2-3",
                        order: 3,
                        title: "Creating Commits",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "git-2-4",
                        order: 4,
                        title: "Commit Message Best Practices",
                        type: "lesson",
                        duration: "12 min"
                    }

                ]
            },


            {
                id: "git-module-3",

                order: 3,

                title: "Branches",

                description:
                    "Use branches to develop features safely.",

                lessons: [

                    {
                        id: "git-3-1",
                        order: 1,
                        title: "Understanding Branches",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "git-3-2",
                        order: 2,
                        title: "Creating and Switching Branches",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "git-3-3",
                        order: 3,
                        title: "Merging Branches",
                        type: "lesson",
                        duration: "18 min"
                    }

                ]
            },


            {
                id: "git-module-4",

                order: 4,

                title: "GitHub",

                description:
                    "Publish local repositories and work with remote repositories.",

                lessons: [

                    {
                        id: "git-4-1",
                        order: 1,
                        title: "Creating a GitHub Repository",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "git-4-2",
                        order: 2,
                        title: "git push and git pull",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "git-4-3",
                        order: 3,
                        title: "Cloning Repositories",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "git-4-4",
                        order: 4,
                        title: "Publish Your First Project",
                        type: "project",
                        duration: "45 min"
                    }

                ]
            },


            {
                id: "git-module-5",

                order: 5,

                title: "Collaboration",

                description:
                    "Understand team workflows and pull requests.",

                lessons: [

                    {
                        id: "git-5-1",
                        order: 1,
                        title: "Forking Repositories",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "git-5-2",
                        order: 2,
                        title: "Pull Requests",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "git-5-3",
                        order: 3,
                        title: "Merge Conflicts",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "git-5-4",
                        order: 4,
                        title: "Resolve a Merge Conflict",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "git-module-6",

                order: 6,

                title: "Professional Git Workflow",

                description:
                    "Combine Git and GitHub into a practical development workflow.",

                lessons: [

                    {
                        id: "git-6-1",
                        order: 1,
                        title: "Feature Branch Workflow",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "git-6-2",
                        order: 2,
                        title: ".gitignore",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "git-6-3",
                        order: 3,
                        title: "README Documentation",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "git-6-4",
                        order: 4,
                        title: "Final Repository Project",
                        type: "project",
                        duration: "60 min"
                    },

                    {
                        id: "git-final-assessment",
                        order: 5,
                        title: "Git & GitHub Final Assessment",
                        type: "assessment",
                        duration: "35 min"
                    }

                ]
            }

        ]
    },


    /* =====================================================
       05. PYTHON PROGRAMMING
    ===================================================== */

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

        featured: true,

        description:
            "Develop practical Python skills through scripting, data structures, functions, files, exceptions, modules, object-oriented programming, JSON, and API work.",

        outcome:
            "Create useful Python applications and establish the foundation needed for backend development.",

        prerequisites: [
            "Programming Fundamentals recommended"
        ],

        skills: [
            "Python syntax",
            "Data structures",
            "Functions",
            "File handling",
            "Object-oriented programming",
            "JSON and APIs"
        ],

        learningPaths: [
            "python-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "py-module-1",

                order: 1,

                title: "Introduction to Python",

                description:
                    "Understand Python, install the development environment, and write your first programs.",

                lessons: [

                    {
                        id: "py-1-1",
                        order: 1,
                        title: "What Is Python?",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "py-1-2",
                        order: 2,
                        title: "Installing Python",
                        type: "lesson",
                        duration: "14 min",
                        freePreview: true
                    },

                    {
                        id: "py-1-3",
                        order: 3,
                        title: "Your First Python Program",
                        type: "exercise",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "py-module-2",

                order: 2,

                title: "Variables and Data Types",

                description:
                    "Store and work with different types of data.",

                lessons: [

                    {
                        id: "py-2-1",
                        order: 1,
                        title: "Python Variables",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-2-2",
                        order: 2,
                        title: "Strings",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-2-3",
                        order: 3,
                        title: "Integers and Floats",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-2-4",
                        order: 4,
                        title: "Booleans",
                        type: "lesson",
                        duration: "12 min"
                    }

                ]
            },


            {
                id: "py-module-3",

                order: 3,

                title: "Conditions and Logic",

                description:
                    "Control program behaviour with conditional logic.",

                lessons: [

                    {
                        id: "py-3-1",
                        order: 1,
                        title: "Comparison Operators",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "py-3-2",
                        order: 2,
                        title: "if Statements",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-3-3",
                        order: 3,
                        title: "elif and else",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-3-4",
                        order: 4,
                        title: "Login Logic Challenge",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "py-module-4",

                order: 4,

                title: "Loops",

                description:
                    "Repeat tasks using Python loops.",

                lessons: [

                    {
                        id: "py-4-1",
                        order: 1,
                        title: "for Loops",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-4-2",
                        order: 2,
                        title: "while Loops",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-4-3",
                        order: 3,
                        title: "break and continue",
                        type: "lesson",
                        duration: "15 min"
                    }

                ]
            },


            {
                id: "py-module-5",

                order: 5,

                title: "Python Collections",

                description:
                    "Work with lists, tuples, sets, and dictionaries.",

                lessons: [

                    {
                        id: "py-5-1",
                        order: 1,
                        title: "Lists",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "py-5-2",
                        order: 2,
                        title: "Tuples",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "py-5-3",
                        order: 3,
                        title: "Sets",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "py-5-4",
                        order: 4,
                        title: "Dictionaries",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "py-5-5",
                        order: 5,
                        title: "Student Records Project",
                        type: "project",
                        duration: "60 min"
                    }

                ]
            },


            {
                id: "py-module-6",

                order: 6,

                title: "Functions",

                description:
                    "Create reusable Python code using functions.",

                lessons: [

                    {
                        id: "py-6-1",
                        order: 1,
                        title: "Defining Functions",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-6-2",
                        order: 2,
                        title: "Parameters",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-6-3",
                        order: 3,
                        title: "Return Values",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-6-4",
                        order: 4,
                        title: "Function Challenge",
                        type: "exercise",
                        duration: "35 min"
                    }

                ]
            },


            {
                id: "py-module-7",

                order: 7,

                title: "Files",

                description:
                    "Read from and write to files.",

                lessons: [

                    {
                        id: "py-7-1",
                        order: 1,
                        title: "Opening Files",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-7-2",
                        order: 2,
                        title: "Reading Files",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-7-3",
                        order: 3,
                        title: "Writing Files",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-7-4",
                        order: 4,
                        title: "Build a Notes Application",
                        type: "project",
                        duration: "60 min"
                    }

                ]
            },


            {
                id: "py-module-8",

                order: 8,

                title: "Exceptions and Debugging",

                description:
                    "Handle errors safely and troubleshoot Python applications.",

                lessons: [

                    {
                        id: "py-8-1",
                        order: 1,
                        title: "Understanding Exceptions",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-8-2",
                        order: 2,
                        title: "try and except",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-8-3",
                        order: 3,
                        title: "Debugging Python",
                        type: "lesson",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "py-module-9",

                order: 9,

                title: "Modules and Packages",

                description:
                    "Organise Python code into reusable modules.",

                lessons: [

                    {
                        id: "py-9-1",
                        order: 1,
                        title: "Importing Modules",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "py-9-2",
                        order: 2,
                        title: "Creating Your Own Modules",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-9-3",
                        order: 3,
                        title: "Using pip",
                        type: "lesson",
                        duration: "15 min"
                    }

                ]
            },


            {
                id: "py-module-10",

                order: 10,

                title: "Object-Oriented Programming",

                description:
                    "Model programs using classes and objects.",

                lessons: [

                    {
                        id: "py-10-1",
                        order: 1,
                        title: "Classes and Objects",
                        type: "lesson",
                        duration: "22 min"
                    },

                    {
                        id: "py-10-2",
                        order: 2,
                        title: "Constructors",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-10-3",
                        order: 3,
                        title: "Methods and Attributes",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "py-10-4",
                        order: 4,
                        title: "Build a Bank Account Class",
                        type: "project",
                        duration: "75 min"
                    }

                ]
            },


            {
                id: "py-module-11",

                order: 11,

                title: "JSON and APIs",

                description:
                    "Work with structured data and external APIs.",

                lessons: [

                    {
                        id: "py-11-1",
                        order: 1,
                        title: "Understanding JSON",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "py-11-2",
                        order: 2,
                        title: "Reading and Writing JSON",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "py-11-3",
                        order: 3,
                        title: "HTTP Requests",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "py-11-4",
                        order: 4,
                        title: "Consume a Public API",
                        type: "project",
                        duration: "75 min"
                    }

                ]
            },


            {
                id: "py-module-12",

                order: 12,

                title: "Python Capstone",

                description:
                    "Combine your Python skills into a complete application.",

                lessons: [

                    {
                        id: "py-12-1",
                        order: 1,
                        title: "Planning a Python Application",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "py-12-2",
                        order: 2,
                        title: "Build a Personal Expense Tracker",
                        type: "project",
                        duration: "150 min"
                    },

                    {
                        id: "py-12-3",
                        order: 3,
                        title: "Refactoring and Documentation",
                        type: "exercise",
                        duration: "45 min"
                    },

                    {
                        id: "py-final-assessment",
                        order: 4,
                        title: "Python Programming Final Assessment",
                        type: "assessment",
                        duration: "60 min"
                    }

                ]
            }

        ]
    },


    /* =====================================================
       06. SQL & DATABASES
    ===================================================== */

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

        featured: false,

        description:
            "Understand relational databases, data modelling, SQL queries, joins, constraints, CRUD operations, and how applications interact with persistent data.",

        outcome:
            "Design and query relational databases for real software applications.",

        prerequisites: [
            "Programming Fundamentals recommended"
        ],

        skills: [
            "Relational database concepts",
            "Data modelling",
            "SELECT queries",
            "CRUD operations",
            "Joins",
            "Constraints"
        ],

        learningPaths: [
            "python-developer",
            "full-stack-developer"
        ],

        curriculum: [

            {
                id: "sql-module-1",

                order: 1,

                title: "Introduction to Databases",

                description:
                    "Understand why applications need databases and how relational databases work.",

                lessons: [

                    {
                        id: "sql-1-1",
                        order: 1,
                        title: "What Is a Database?",
                        type: "lesson",
                        duration: "12 min",
                        freePreview: true
                    },

                    {
                        id: "sql-1-2",
                        order: 2,
                        title: "Relational Databases",
                        type: "lesson",
                        duration: "16 min",
                        freePreview: true
                    },

                    {
                        id: "sql-1-3",
                        order: 3,
                        title: "Tables, Rows and Columns",
                        type: "lesson",
                        duration: "14 min"
                    }

                ]
            },


            {
                id: "sql-module-2",

                order: 2,

                title: "Database Design",

                description:
                    "Model application data before creating tables.",

                lessons: [

                    {
                        id: "sql-2-1",
                        order: 1,
                        title: "Entities and Attributes",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-2-2",
                        order: 2,
                        title: "Primary Keys",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "sql-2-3",
                        order: 3,
                        title: "Foreign Keys",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-2-4",
                        order: 4,
                        title: "Design a Student Database",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "sql-module-3",

                order: 3,

                title: "Creating Tables",

                description:
                    "Create relational database structures using SQL.",

                lessons: [

                    {
                        id: "sql-3-1",
                        order: 1,
                        title: "CREATE TABLE",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-3-2",
                        order: 2,
                        title: "SQL Data Types",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-3-3",
                        order: 3,
                        title: "Constraints",
                        type: "lesson",
                        duration: "20 min"
                    }

                ]
            },


            {
                id: "sql-module-4",

                order: 4,

                title: "CRUD Operations",

                description:
                    "Create, read, update, and delete database records.",

                lessons: [

                    {
                        id: "sql-4-1",
                        order: 1,
                        title: "INSERT",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "sql-4-2",
                        order: 2,
                        title: "SELECT",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-4-3",
                        order: 3,
                        title: "UPDATE",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "sql-4-4",
                        order: 4,
                        title: "DELETE",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "sql-4-5",
                        order: 5,
                        title: "CRUD Practice Challenge",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "sql-module-5",

                order: 5,

                title: "Filtering and Sorting",

                description:
                    "Retrieve specific database records efficiently.",

                lessons: [

                    {
                        id: "sql-5-1",
                        order: 1,
                        title: "WHERE",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "sql-5-2",
                        order: 2,
                        title: "ORDER BY",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "sql-5-3",
                        order: 3,
                        title: "LIMIT",
                        type: "lesson",
                        duration: "12 min"
                    },

                    {
                        id: "sql-5-4",
                        order: 4,
                        title: "LIKE and Pattern Matching",
                        type: "lesson",
                        duration: "18 min"
                    }

                ]
            },


            {
                id: "sql-module-6",

                order: 6,

                title: "Relationships and Joins",

                description:
                    "Combine information from multiple related tables.",

                lessons: [

                    {
                        id: "sql-6-1",
                        order: 1,
                        title: "Table Relationships",
                        type: "lesson",
                        duration: "18 min"
                    },

                    {
                        id: "sql-6-2",
                        order: 2,
                        title: "INNER JOIN",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "sql-6-3",
                        order: 3,
                        title: "LEFT JOIN",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "sql-6-4",
                        order: 4,
                        title: "Join Challenge",
                        type: "exercise",
                        duration: "40 min"
                    }

                ]
            },


            {
                id: "sql-module-7",

                order: 7,

                title: "Aggregate Queries",

                description:
                    "Summarise and analyse database information.",

                lessons: [

                    {
                        id: "sql-7-1",
                        order: 1,
                        title: "COUNT",
                        type: "lesson",
                        duration: "14 min"
                    },

                    {
                        id: "sql-7-2",
                        order: 2,
                        title: "SUM and AVG",
                        type: "lesson",
                        duration: "16 min"
                    },

                    {
                        id: "sql-7-3",
                        order: 3,
                        title: "GROUP BY",
                        type: "lesson",
                        duration: "20 min"
                    },

                    {
                        id: "sql-7-4",
                        order: 4,
                        title: "HAVING",
                        type: "lesson",
                        duration: "18 min"
                    }

                ]
            },


            {
                id: "sql-module-8",

                order: 8,

                title: "Database Project",

                description:
                    "Design and build a complete relational database.",

                lessons: [

                    {
                        id: "sql-8-1",
                        order: 1,
                        title: "Planning a Database",
                        type: "lesson",
                        duration: "15 min"
                    },

                    {
                        id: "sql-8-2",
                        order: 2,
                        title: "Build a Task Management Database",
                        type: "project",
                        duration: "90 min"
                    },

                    {
                        id: "sql-8-3",
                        order: 3,
                        title: "Query and Test Your Database",
                        type: "exercise",
                        duration: "45 min"
                    },

                    {
                        id: "sql-final-assessment",
                        order: 4,
                        title: "SQL & Databases Final Assessment",
                        type: "assessment",
                        duration: "45 min"
                    }

                ]
            }

        ]
    }

];


/* =========================================================
   CWS CODELAB
   LEARNING PATHS
========================================================= */

window.CWS_LEARNING_PATHS = [

    {
        id: "front-end-developer",

        title: "Front-End Developer",

        description:
            "Build responsive, interactive websites and modern user interfaces.",

        courseIds: [
            "html-css",
            "javascript-fundamentals",
            "git-github"
        ]
    },


    {
        id: "python-developer",

        title: "Python Developer",

        description:
            "Build programming fundamentals and progress toward backend applications.",

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

        description:
            "Combine front-end, backend, databases, APIs, authentication, and deployment.",

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


/* =========================================================
   CWS CODELAB
   COURSE UTILITIES
========================================================= */

window.CWS_COURSE_UTILS = {

    /* =====================================================
       GET COURSE BY ID
    ===================================================== */

    getCourseById(courseId) {

        return (
            window.CWS_COURSES.find(
                course =>
                    course.id === courseId
            ) || null
        );

    },


    /* =====================================================
       GET LEARNING PATH BY ID
    ===================================================== */

    getLearningPathById(pathId) {

        return (
            window.CWS_LEARNING_PATHS.find(
                path =>
                    path.id === pathId
            ) || null
        );

    },


    /* =====================================================
       GET COURSES BY LEARNING PATH
    ===================================================== */

    getCoursesByPath(pathId) {

        const path =
            this.getLearningPathById(
                pathId
            );


        if (!path) {

            return [];

        }


        return path.courseIds

            .map(courseId =>

                this.getCourseById(
                    courseId
                )

            )

            .filter(Boolean);

    },


    /* =====================================================
       GET AVAILABLE COURSES
    ===================================================== */

    getAvailableCourses() {

        return window.CWS_COURSES.filter(

            course =>
                course.status ===
                "available"

        );

    },


    /* =====================================================
       GET COURSE MODULE
    ===================================================== */

    getModuleById(
        courseId,
        moduleId
    ) {

        const course =
            this.getCourseById(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return null;

        }


        return (
            course.curriculum.find(

                module =>
                    module.id === moduleId

            ) || null
        );

    },


    /* =====================================================
       GET LESSON
    ===================================================== */

    getLessonById(
        courseId,
        lessonId
    ) {

        const course =
            this.getCourseById(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return null;

        }


        for (
            const module
            of course.curriculum
        ) {

            const lesson =
                module.lessons?.find(

                    lesson =>
                        lesson.id ===
                        lessonId

                );


            if (lesson) {

                return {

                    course,
                    module,
                    lesson

                };

            }

        }


        return null;

    },


    /* =====================================================
       GET TOTAL LESSON COUNT
    ===================================================== */

    getCourseLessonCount(courseId) {

        const course =
            this.getCourseById(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return 0;

        }


        return course.curriculum.reduce(

            (
                total,
                module
            ) => {

                return (
                    total +
                    (
                        module.lessons
                            ?.length || 0
                    )
                );

            },

            0

        );

    },


    /* =====================================================
       GET FREE PREVIEW LESSONS
    ===================================================== */

    getFreePreviewLessons(courseId) {

        const course =
            this.getCourseById(
                courseId
            );


        if (
            !course ||
            !Array.isArray(
                course.curriculum
            )
        ) {

            return [];

        }


        const previews = [];


        course.curriculum.forEach(
            module => {

                module.lessons
                    ?.filter(
                        lesson =>
                            lesson.freePreview
                    )
                    .forEach(
                        lesson => {

                            previews.push({

                                courseId:
                                    course.id,

                                moduleId:
                                    module.id,

                                lesson

                            });

                        }
                    );

            }
        );


        return previews;

    }

};


/* =========================================================
   DATA INITIALIZATION
========================================================= */

console.log(
    "CWS CodeLab course catalogue loaded successfully."
);

console.log(
    `${window.CWS_COURSES.length} CWS CodeLab courses available.`
);
