/* =========================================================
   CWS CODELAB
   CENTRAL COURSE DATA

   Single source of truth for:
   - Public course catalogue
   - Student course library
   - Course details
   - Lessons
   - Learning paths
   - Enrolments
   - Progress
========================================================= */


(() => {

    "use strict";


    /* =====================================================
       HELPERS
    ===================================================== */

    function lesson(
        id,
        title,
        options = {}
    ) {

        return {

            id,

            title,

            type:
                options.type ||
                "lesson",

            duration:
                options.duration ||
                "20 min",

            preview:
                Boolean(
                    options.preview
                ),

            description:
                options.description ||
                "",

            objectives:
                Array.isArray(
                    options.objectives
                )
                    ? options.objectives
                    : [],

            content:
                Array.isArray(
                    options.content
                )
                    ? options.content
                    : [],

            practice:
                Array.isArray(
                    options.practice
                )
                    ? options.practice
                    : [],

            codeExample:
                options.codeExample ||
                "",

            codeLanguage:
                options.codeLanguage ||
                "javascript"

        };

    }


    function module(
        id,
        title,
        description,
        lessons = []
    ) {

        return {

            id,

            title,

            description,

            lessons

        };

    }


    /* =====================================================
       COURSES
    ===================================================== */

    const courses = [

        /* =================================================
           1. PROGRAMMING FUNDAMENTALS
        ================================================= */

        {

            id:
                "programming-fundamentals",

            order:
                1,

            title:
                "Programming Fundamentals",

            shortTitle:
                "Programming",

            category:
                "Foundation",

            level:
                "Beginner",

            access:
                "Free",

            status:
                "available",

            duration:
                "6 weeks",

            hours:
                18,

            modules:
                8,

            projects:
                3,

            assessments:
                5,

            icon:
                "PF",

            accent:
                "#6c7cff",

            featured:
                true,

            description:
                "Build a strong programming foundation by learning variables, data types, logic, control flow, functions, problem solving and core programming concepts.",

            outcome:
                "Understand how programs work and confidently solve beginner programming problems before moving into a specific language.",

            prerequisites: [
                "No previous programming experience required",
                "Basic computer literacy"
            ],

            skills: [
                "Programming Logic",
                "Variables",
                "Data Types",
                "Conditions",
                "Loops",
                "Functions",
                "Problem Solving"
            ],

            learningPaths: [
                "frontend-developer",
                "python-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(

                    "pf-m01",

                    "Introduction to Programming",

                    "Understand what programming is, how software instructions are executed and how developers use programming languages and tools.",

                    [

                        /* =================================================
                           LESSON 1
                           WHAT IS PROGRAMMING?
                        ================================================= */

                        lesson(

                            "pf-l01",

                            "What Is Programming?",

                            {

                                preview:
                                    true,

                                duration:
                                    "20 min",

                                description:
                                    "Learn what programming means, what programs are and how programmers turn problems into instructions a computer can execute.",

                                objectives: [

                                    "Explain what programming is in simple terms.",

                                    "Describe the relationship between a programmer, source code and a computer.",

                                    "Identify examples of software created through programming.",

                                    "Understand why programming is fundamentally about problem solving."

                                ],

                                content: [

                                    "Programming is the process of creating instructions that tell a computer what to do. Those instructions are written using a programming language such as JavaScript, Python, Java, C# or C++.",

                                    "A computer is extremely fast at following instructions, but it does not understand a problem the way a human does. A programmer must break a problem into smaller, clear and logical steps that the computer can execute.",

                                    "The instructions written by a programmer are commonly called source code. Source code is stored in files and interpreted or compiled into instructions that the computer's processor can ultimately execute.",

                                    "Almost every digital system you use depends on programming. Websites, mobile applications, banking systems, games, operating systems, cloud platforms, cybersecurity tools and embedded devices are all built using software.",

                                    "Programming is therefore not simply about memorising syntax. Good programmers learn how to analyse a problem, design a solution, express that solution logically and test whether the solution behaves correctly.",

                                    "For example, imagine you are building a banking application. Before writing code, you might identify a requirement such as: a customer may withdraw money only when the requested amount does not exceed the available balance. Programming allows us to turn that rule into precise computer instructions."

                                ],

                                practice: [

                                    "Write down three applications or digital services you use every day that depend on programming.",

                                    "Choose one everyday activity, such as making tea or withdrawing money from an ATM, and write the activity as a sequence of clear steps.",

                                    "Explain in your own words why a computer needs precise instructions."

                                ],

                                codeLanguage:
                                    "javascript",

                                codeExample:
`// A very small program

const learnerName = "Student";

console.log("Welcome to CWS CodeLab!");
console.log("Hello " + learnerName);

// The computer executes these
// instructions in sequence.`

                            }

                        ),


                        /* =================================================
                           LESSON 2
                           HOW PROGRAMS WORK
                        ================================================= */

                        lesson(

                            "pf-l02",

                            "How Programs Work",

                            {

                                preview:
                                    true,

                                duration:
                                    "25 min",

                                description:
                                    "Follow the journey from source code to execution and understand input, processing, output and program flow.",

                                objectives: [

                                    "Describe the basic input-process-output model.",

                                    "Explain what source code is.",

                                    "Understand the difference between compiled and interpreted execution at a beginner level.",

                                    "Describe how instructions execute in a logical sequence.",

                                    "Understand why program errors and debugging occur."

                                ],

                                content: [

                                    "A program normally accepts some form of input, processes that information and produces an output. This simple model is known as Input → Processing → Output and appears in almost every software system.",

                                    "Input is information supplied to the program. It may come from a keyboard, mouse, touchscreen, file, database, network request, sensor or another application.",

                                    "Processing is the work performed by the program. This may include calculations, comparisons, searching, sorting, authentication, validation or changing stored information.",

                                    "Output is the result produced by the program. Output might appear on a screen, be saved to a database, written to a file, sent across a network or passed to another program.",

                                    "The code that developers write is called source code. Computers eventually need machine-level instructions, so programming languages use translators such as compilers, interpreters or runtime environments to execute developer-written code.",

                                    "A compiled language commonly converts source code into another executable representation before the program runs. An interpreted or runtime-based environment generally processes instructions through another program while the application executes. Modern languages often use combinations of these techniques.",

                                    "Programs also have a flow of execution. Unless a condition, loop, function or other control mechanism changes that flow, instructions generally execute in a defined order.",

                                    "When instructions are invalid or the logic does not behave as expected, the program contains an error or bug. Debugging is the process of investigating the program, finding the cause and correcting it."

                                ],

                                practice: [

                                    "For a calculator application, identify one example of input, processing and output.",

                                    "For a login form, identify what information is input and what output the user might receive.",

                                    "Read the example program and predict its output before running it."

                                ],

                                codeLanguage:
                                    "javascript",

                                codeExample:
`// INPUT
const price = 250;
const quantity = 3;

// PROCESSING
const total = price * quantity;

// OUTPUT
console.log("Total: R" + total);

// Expected output:
// Total: R750`

                            }

                        ),


                        /* =================================================
                           LESSON 3
                           LANGUAGES AND TOOLS
                        ================================================= */

                        lesson(

                            "pf-l03",

                            "Programming Languages and Tools",

                            {

                                duration:
                                    "25 min",

                                description:
                                    "Explore common programming languages and the essential tools developers use to create, test and manage software.",

                                objectives: [

                                    "Explain why different programming languages exist.",

                                    "Recognise common uses for JavaScript, Python, Java, C#, C++ and SQL.",

                                    "Understand the purpose of a code editor or IDE.",

                                    "Describe the roles of a terminal, debugger and version-control system.",

                                    "Understand why Git and GitHub are important developer tools."

                                ],

                                content: [

                                    "There is no single programming language used for every type of software. Different languages were designed with different goals, ecosystems, platforms and development styles in mind.",

                                    "JavaScript is heavily used for interactive websites and web applications. With environments such as Node.js, JavaScript can also run on servers and be used for backend development.",

                                    "Python is known for its readable syntax and broad ecosystem. It is widely used for automation, backend development, data analysis, artificial intelligence, scripting and cybersecurity.",

                                    "Java is widely used in enterprise applications and large software systems. C# is strongly associated with the .NET ecosystem and is used for web applications, desktop applications, cloud systems and games.",

                                    "C++ provides developers with significant control over system resources and performance. It is commonly used in systems programming, game engines, embedded applications and performance-sensitive software.",

                                    "SQL is different from general-purpose programming languages. It is designed primarily for working with relational databases, including storing, retrieving, filtering and modifying structured data.",

                                    "Developers also rely on tools. A code editor such as Visual Studio Code provides an environment for writing and organising source files. A more comprehensive Integrated Development Environment, or IDE, may include building, debugging and project-management capabilities.",

                                    "The terminal or command line allows developers to interact with the operating system and development tools using text commands. As you progress through CodeLab, you will regularly use terminal commands.",

                                    "A debugger helps developers inspect a running program and investigate problems. Developers can examine values, pause execution and follow program behaviour step by step.",

                                    "Git is a version-control system used to track changes to source code. GitHub is an online platform commonly used to host Git repositories, collaborate with other developers and showcase projects."

                                ],

                                practice: [

                                    "Match JavaScript, Python, SQL and C++ with one common use case for each.",

                                    "Identify the code editor or IDE installed on your computer.",

                                    "Open a terminal or command prompt and identify which operating system shell you are using.",

                                    "Explain the difference between Git and GitHub in one or two sentences."

                                ],

                                codeLanguage:
                                    "javascript",

                                codeExample:
`// Different languages can solve
// similar problems.

// JavaScript example:

const language = "JavaScript";

console.log(
    language + " can build interactive web applications."
);

// Later in CodeLab you will also work with:
// Python
// SQL
// Java
// C#
// C++`

                            }

                        )

                    ]

                ),


                module(
                    "pf-m02",
                    "Variables and Data",
                    "Learn how programs store and work with information.",
                    [

                        lesson(
                            "pf-l04",
                            "Variables"
                        ),

                        lesson(
                            "pf-l05",
                            "Primitive Data Types"
                        ),

                        lesson(
                            "pf-l06",
                            "Working With Values"
                        )

                    ]
                ),


                module(
                    "pf-m03",
                    "Operators and Expressions",
                    "Use arithmetic, comparison and logical operators.",
                    [

                        lesson(
                            "pf-l07",
                            "Arithmetic Operators"
                        ),

                        lesson(
                            "pf-l08",
                            "Comparison Operators"
                        ),

                        lesson(
                            "pf-l09",
                            "Logical Operators"
                        )

                    ]
                ),


                module(
                    "pf-m04",
                    "Decision Making",
                    "Control how a program responds to different conditions.",
                    [

                        lesson(
                            "pf-l10",
                            "Boolean Logic"
                        ),

                        lesson(
                            "pf-l11",
                            "If and Else"
                        ),

                        lesson(
                            "pf-l12",
                            "Nested Decisions"
                        )

                    ]
                ),


                module(
                    "pf-m05",
                    "Loops",
                    "Repeat instructions efficiently.",
                    [

                        lesson(
                            "pf-l13",
                            "Why Loops Matter"
                        ),

                        lesson(
                            "pf-l14",
                            "While Loops"
                        ),

                        lesson(
                            "pf-l15",
                            "For Loops"
                        )

                    ]
                ),


                module(
                    "pf-m06",
                    "Functions",
                    "Break programs into reusable pieces.",
                    [

                        lesson(
                            "pf-l16",
                            "Function Fundamentals"
                        ),

                        lesson(
                            "pf-l17",
                            "Parameters and Arguments"
                        ),

                        lesson(
                            "pf-l18",
                            "Return Values"
                        )

                    ]
                ),


                module(
                    "pf-m07",
                    "Problem Solving",
                    "Learn structured approaches to solving programming problems.",
                    [

                        lesson(
                            "pf-l19",
                            "Breaking Problems Down"
                        ),

                        lesson(
                            "pf-l20",
                            "Pseudocode"
                        ),

                        lesson(
                            "pf-l21",
                            "Debugging Logic"
                        )

                    ]
                ),


                module(
                    "pf-m08",
                    "Programming Fundamentals Project",
                    "Combine the concepts from the course in practical exercises.",
                    [

                        lesson(
                            "pf-l22",
                            "Project Planning",
                            {
                                type: "project"
                            }
                        ),

                        lesson(
                            "pf-l23",
                            "Build the Project",
                            {
                                type: "project",
                                duration: "90 min"
                            }
                        ),

                        lesson(
                            "pf-l24",
                            "Course Review",
                            {
                                type: "assessment"
                            }
                        )

                    ]
                )

            ]

        },


        /* =================================================
           2. HTML & CSS
        ================================================= */

        {

            id:
                "html-css",

            order:
                2,

            title:
                "HTML & CSS",

            shortTitle:
                "HTML & CSS",

            category:
                "Web Development",

            level:
                "Beginner",

            access:
                "Free",

            status:
                "available",

            duration:
                "6 weeks",

            hours:
                20,

            modules:
                9,

            projects:
                4,

            assessments:
                5,

            icon:
                "HC",

            accent:
                "#ef6c57",

            featured:
                true,

            description:
                "Learn to build modern responsive websites using semantic HTML, CSS layouts, Flexbox, Grid, forms and responsive design.",

            outcome:
                "Build responsive multi-page websites from scratch using clean HTML and modern CSS.",

            prerequisites: [
                "Basic computer skills",
                "No web-development experience required"
            ],

            skills: [
                "HTML",
                "CSS",
                "Semantic HTML",
                "Flexbox",
                "CSS Grid",
                "Responsive Design",
                "Forms"
            ],

            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(
                    "hc-m01",
                    "Web Fundamentals",
                    "Understand how websites and browsers work.",
                    [

                        lesson(
                            "hc-l01",
                            "How the Web Works",
                            {
                                preview: true
                            }
                        ),

                        lesson(
                            "hc-l02",
                            "HTML, CSS and JavaScript",
                            {
                                preview: true
                            }
                        )

                    ]
                ),


                module(
                    "hc-m02",
                    "HTML Foundations",
                    "Build correctly structured HTML documents.",
                    [

                        lesson(
                            "hc-l03",
                            "HTML Document Structure"
                        ),

                        lesson(
                            "hc-l04",
                            "Headings, Paragraphs and Links"
                        ),

                        lesson(
                            "hc-l05",
                            "Lists and Images"
                        )

                    ]
                ),


                module(
                    "hc-m03",
                    "Semantic HTML",
                    "Create meaningful and accessible page structures.",
                    [

                        lesson(
                            "hc-l06",
                            "Semantic Elements"
                        ),

                        lesson(
                            "hc-l07",
                            "Page Structure"
                        )

                    ]
                ),


                module(
                    "hc-m04",
                    "CSS Foundations",
                    "Style HTML elements using CSS.",
                    [

                        lesson(
                            "hc-l08",
                            "CSS Selectors"
                        ),

                        lesson(
                            "hc-l09",
                            "Colours and Typography"
                        ),

                        lesson(
                            "hc-l10",
                            "The Box Model"
                        )

                    ]
                ),


                module(
                    "hc-m05",
                    "Flexbox",
                    "Build flexible one-dimensional layouts.",
                    [

                        lesson(
                            "hc-l11",
                            "Flex Containers"
                        ),

                        lesson(
                            "hc-l12",
                            "Alignment and Spacing"
                        )

                    ]
                ),


                module(
                    "hc-m06",
                    "CSS Grid",
                    "Build powerful two-dimensional layouts.",
                    [

                        lesson(
                            "hc-l13",
                            "Grid Fundamentals"
                        ),

                        lesson(
                            "hc-l14",
                            "Responsive Grid Layouts"
                        )

                    ]
                ),


                module(
                    "hc-m07",
                    "Responsive Design",
                    "Make websites work across different screen sizes.",
                    [

                        lesson(
                            "hc-l15",
                            "Responsive Design Principles"
                        ),

                        lesson(
                            "hc-l16",
                            "Media Queries"
                        ),

                        lesson(
                            "hc-l17",
                            "Mobile-First Design"
                        )

                    ]
                ),


                module(
                    "hc-m08",
                    "Forms and UI",
                    "Create usable forms and interface components.",
                    [

                        lesson(
                            "hc-l18",
                            "HTML Forms"
                        ),

                        lesson(
                            "hc-l19",
                            "Styling Form Controls"
                        )

                    ]
                ),


                module(
                    "hc-m09",
                    "Responsive Website Project",
                    "Build and refine a complete responsive website.",
                    [

                        lesson(
                            "hc-l20",
                            "Project Planning",
                            {
                                type: "project"
                            }
                        ),

                        lesson(
                            "hc-l21",
                            "Build and Test",
                            {
                                type: "project",
                                duration: "120 min"
                            }
                        )

                    ]
                )

            ]

        },


        /* =================================================
           3. JAVASCRIPT
        ================================================= */

        {

            id:
                "javascript-fundamentals",

            order:
                3,

            title:
                "JavaScript Fundamentals",

            shortTitle:
                "JavaScript",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Free",

            status:
                "available",

            duration:
                "8 weeks",

            hours:
                28,

            modules:
                10,

            projects:
                5,

            assessments:
                6,

            icon:
                "JS",

            accent:
                "#d4a72c",

            featured:
                true,

            description:
                "Learn JavaScript fundamentals, DOM manipulation, events, arrays, objects, functions, asynchronous programming and browser APIs.",

            outcome:
                "Build interactive browser applications using modern JavaScript.",

            prerequisites: [
                "Programming Fundamentals recommended",
                "Basic HTML and CSS recommended"
            ],

            skills: [
                "JavaScript",
                "DOM",
                "Functions",
                "Arrays",
                "Objects",
                "Events",
                "Async JavaScript",
                "APIs"
            ],

            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(
                    "js-m01",
                    "JavaScript Introduction",
                    "Understand JavaScript and how it runs in the browser.",
                    [

                        lesson(
                            "js-l01",
                            "What Is JavaScript?",
                            {
                                preview: true
                            }
                        ),

                        lesson(
                            "js-l02",
                            "Using the Browser Console",
                            {
                                preview: true
                            }
                        )

                    ]
                ),


                module(
                    "js-m02",
                    "Variables and Types",
                    "Work with values and JavaScript data types.",
                    [

                        lesson(
                            "js-l03",
                            "let and const"
                        ),

                        lesson(
                            "js-l04",
                            "Strings, Numbers and Booleans"
                        ),

                        lesson(
                            "js-l05",
                            "Type Conversion"
                        )

                    ]
                ),


                module(
                    "js-m03",
                    "Control Flow",
                    "Control program execution with conditions and loops.",
                    [

                        lesson(
                            "js-l06",
                            "Conditions"
                        ),

                        lesson(
                            "js-l07",
                            "Loops"
                        )

                    ]
                ),


                module(
                    "js-m04",
                    "Functions",
                    "Write reusable JavaScript behaviour.",
                    [

                        lesson(
                            "js-l08",
                            "Function Declarations"
                        ),

                        lesson(
                            "js-l09",
                            "Arrow Functions"
                        ),

                        lesson(
                            "js-l10",
                            "Scope"
                        )

                    ]
                ),


                module(
                    "js-m05",
                    "Arrays",
                    "Store and manipulate collections.",
                    [

                        lesson(
                            "js-l11",
                            "Array Fundamentals"
                        ),

                        lesson(
                            "js-l12",
                            "Array Methods"
                        )

                    ]
                ),


                module(
                    "js-m06",
                    "Objects",
                    "Model structured data using objects.",
                    [

                        lesson(
                            "js-l13",
                            "Object Fundamentals"
                        ),

                        lesson(
                            "js-l14",
                            "Methods and Properties"
                        )

                    ]
                ),


                module(
                    "js-m07",
                    "The DOM",
                    "Use JavaScript to interact with web pages.",
                    [

                        lesson(
                            "js-l15",
                            "Selecting Elements"
                        ),

                        lesson(
                            "js-l16",
                            "Changing the DOM"
                        )

                    ]
                ),


                module(
                    "js-m08",
                    "Events",
                    "Respond to user interaction.",
                    [

                        lesson(
                            "js-l17",
                            "Event Listeners"
                        ),

                        lesson(
                            "js-l18",
                            "Forms and Events"
                        )

                    ]
                ),


                module(
                    "js-m09",
                    "Asynchronous JavaScript",
                    "Work with promises and APIs.",
                    [

                        lesson(
                            "js-l19",
                            "Promises"
                        ),

                        lesson(
                            "js-l20",
                            "Async and Await"
                        ),

                        lesson(
                            "js-l21",
                            "Fetch API"
                        )

                    ]
                ),


                module(
                    "js-m10",
                    "JavaScript Application Project",
                    "Build a complete interactive application.",
                    [

                        lesson(
                            "js-l22",
                            "Application Planning",
                            {
                                type: "project"
                            }
                        ),

                        lesson(
                            "js-l23",
                            "Build the Application",
                            {
                                type: "project",
                                duration: "150 min"
                            }
                        )

                    ]
                )

            ]

        },


        /* =================================================
           4. GIT & GITHUB
        ================================================= */

        {

            id:
                "git-github",

            order:
                4,

            title:
                "Git & GitHub",

            shortTitle:
                "Git",

            category:
                "Developer Tools",

            level:
                "Beginner",

            access:
                "Free",

            status:
                "available",

            duration:
                "3 weeks",

            hours:
                10,

            modules:
                6,

            projects:
                2,

            assessments:
                3,

            icon:
                "GT",

            accent:
                "#3f4d67",

            featured:
                false,

            description:
                "Learn Git version control, GitHub repositories, commits, branches, merging, pull requests and practical collaboration workflows.",

            outcome:
                "Manage software projects with Git and publish professional repositories on GitHub.",

            prerequisites: [
                "Basic computer skills"
            ],

            skills: [
                "Git",
                "GitHub",
                "Version Control",
                "Branches",
                "Pull Requests",
                "Repositories"
            ],

            learningPaths: [
                "frontend-developer",
                "python-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(
                    "git-m01",
                    "Version Control",
                    "Understand why developers use version control.",
                    [

                        lesson(
                            "git-l01",
                            "What Is Version Control?",
                            {
                                preview: true
                            }
                        ),

                        lesson(
                            "git-l02",
                            "Git and GitHub"
                        )

                    ]
                ),


                module(
                    "git-m02",
                    "Git Fundamentals",
                    "Start tracking local projects.",
                    [

                        lesson(
                            "git-l03",
                            "Installing Git"
                        ),

                        lesson(
                            "git-l04",
                            "git init, add and commit"
                        )

                    ]
                ),


                module(
                    "git-m03",
                    "Repositories",
                    "Connect local projects with GitHub.",
                    [

                        lesson(
                            "git-l05",
                            "Creating a GitHub Repository"
                        ),

                        lesson(
                            "git-l06",
                            "Push and Pull"
                        )

                    ]
                ),


                module(
                    "git-m04",
                    "Branches",
                    "Develop features safely using branches.",
                    [

                        lesson(
                            "git-l07",
                            "Creating Branches"
                        ),

                        lesson(
                            "git-l08",
                            "Merging Branches"
                        )

                    ]
                ),


                module(
                    "git-m05",
                    "Collaboration",
                    "Work with other developers.",
                    [

                        lesson(
                            "git-l09",
                            "Pull Requests"
                        ),

                        lesson(
                            "git-l10",
                            "Resolving Conflicts"
                        )

                    ]
                ),


                module(
                    "git-m06",
                    "GitHub Portfolio Project",
                    "Publish a clean project repository.",
                    [

                        lesson(
                            "git-l11",
                            "Repository Project",
                            {
                                type: "project"
                            }
                        ),

                        lesson(
                            "git-l12",
                            "README and Documentation"
                        )

                    ]
                )

            ]

        },


        /* =================================================
           5. PYTHON
        ================================================= */

        {

            id:
                "python-programming",

            order:
                5,

            title:
                "Python Programming",

            shortTitle:
                "Python",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Pro",

            status:
                "available",

            duration:
                "10 weeks",

            hours:
                34,

            modules:
                12,

            projects:
                6,

            assessments:
                7,

            icon:
                "PY",

            accent:
                "#3776ab",

            featured:
                true,

            description:
                "Learn Python from the fundamentals through functions, collections, files, error handling, object-oriented programming and practical application development.",

            outcome:
                "Build practical Python applications and establish a foundation for backend development, automation and security scripting.",

            prerequisites: [
                "Programming Fundamentals recommended"
            ],

            skills: [
                "Python",
                "Functions",
                "Lists",
                "Dictionaries",
                "Files",
                "OOP",
                "Exceptions",
                "Modules"
            ],

            learningPaths: [
                "python-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(
                    "py-m01",
                    "Python Introduction",
                    "Set up Python and write your first programs.",
                    [

                        lesson(
                            "py-l01",
                            "Python Overview",
                            {
                                preview: true
                            }
                        ),

                        lesson(
                            "py-l02",
                            "Your First Python Program",
                            {
                                preview: true
                            }
                        )

                    ]
                ),


                module(
                    "py-m02",
                    "Variables and Data Types",
                    "Work with Python data.",
                    [
                        lesson("py-l03", "Variables"),
                        lesson("py-l04", "Strings and Numbers")
                    ]
                ),


                module(
                    "py-m03",
                    "Conditions",
                    "Control Python program flow.",
                    [
                        lesson("py-l05", "If Statements"),
                        lesson("py-l06", "Boolean Logic")
                    ]
                ),


                module(
                    "py-m04",
                    "Loops",
                    "Repeat Python operations.",
                    [
                        lesson("py-l07", "For Loops"),
                        lesson("py-l08", "While Loops")
                    ]
                ),


                module(
                    "py-m05",
                    "Functions",
                    "Create reusable Python code.",
                    [
                        lesson("py-l09", "Functions"),
                        lesson("py-l10", "Arguments and Return Values")
                    ]
                ),


                module(
                    "py-m06",
                    "Lists and Tuples",
                    "Manage ordered collections.",
                    [
                        lesson("py-l11", "Lists"),
                        lesson("py-l12", "Tuples")
                    ]
                ),


                module(
                    "py-m07",
                    "Dictionaries and Sets",
                    "Work with structured collections.",
                    [
                        lesson("py-l13", "Dictionaries"),
                        lesson("py-l14", "Sets")
                    ]
                ),


                module(
                    "py-m08",
                    "Files",
                    "Read and write files.",
                    [
                        lesson("py-l15", "Reading Files"),
                        lesson("py-l16", "Writing Files")
                    ]
                ),


                module(
                    "py-m09",
                    "Exceptions",
                    "Handle errors safely.",
                    [
                        lesson("py-l17", "Exceptions"),
                        lesson("py-l18", "Try and Except")
                    ]
                ),


                module(
                    "py-m10",
                    "Object-Oriented Programming",
                    "Create classes and objects.",
                    [
                        lesson("py-l19", "Classes and Objects"),
                        lesson("py-l20", "Methods and Inheritance")
                    ]
                ),


                module(
                    "py-m11",
                    "Modules and Packages",
                    "Organise larger Python applications.",
                    [
                        lesson("py-l21", "Modules"),
                        lesson("py-l22", "Packages")
                    ]
                ),


                module(
                    "py-m12",
                    "Python Application Project",
                    "Build a complete Python application.",
                    [

                        lesson(
                            "py-l23",
                            "Project Planning",
                            {
                                type: "project"
                            }
                        ),

                        lesson(
                            "py-l24",
                            "Build Your Application",
                            {
                                type: "project",
                                duration: "180 min"
                            }
                        )

                    ]
                )

            ]

        },


        /* =================================================
           6. SQL & DATABASES
        ================================================= */

        {

            id:
                "sql-databases",

            order:
                6,

            title:
                "SQL & Databases",

            shortTitle:
                "SQL",

            category:
                "Databases",

            level:
                "Beginner",

            access:
                "Pro",

            status:
                "available",

            duration:
                "6 weeks",

            hours:
                20,

            modules:
                8,

            projects:
                4,

            assessments:
                5,

            icon:
                "SQL",

            accent:
                "#4a6fa5",

            featured:
                false,

            description:
                "Learn relational databases, SQL queries, filtering, joins, aggregation, data modelling and practical database design.",

            outcome:
                "Design relational databases and confidently query and manipulate structured data using SQL.",

            prerequisites: [
                "Programming fundamentals helpful but not required"
            ],

            skills: [
                "SQL",
                "Databases",
                "SELECT",
                "JOIN",
                "Aggregation",
                "Data Modelling",
                "CRUD"
            ],

            learningPaths: [
                "python-developer",
                "fullstack-developer"
            ],

            curriculum: [

                module(
                    "sql-m01",
                    "Database Fundamentals",
                    "Understand relational databases.",
                    [
                        lesson("sql-l01", "What Is a Database?", { preview: true }),
                        lesson("sql-l02", "Relational Databases")
                    ]
                ),


                module(
                    "sql-m02",
                    "SQL Fundamentals",
                    "Start querying data.",
                    [
                        lesson("sql-l03", "SELECT"),
                        lesson("sql-l04", "WHERE and Filtering")
                    ]
                ),


                module(
                    "sql-m03",
                    "Sorting and Functions",
                    "Organise and transform results.",
                    [
                        lesson("sql-l05", "ORDER BY"),
                        lesson("sql-l06", "SQL Functions")
                    ]
                ),


                module(
                    "sql-m04",
                    "Data Modification",
                    "Create and modify data.",
                    [
                        lesson("sql-l07", "INSERT"),
                        lesson("sql-l08", "UPDATE and DELETE")
                    ]
                ),


                module(
                    "sql-m05",
                    "Joins",
                    "Query related tables.",
                    [
                        lesson("sql-l09", "INNER JOIN"),
                        lesson("sql-l10", "LEFT JOIN")
                    ]
                ),


                module(
                    "sql-m06",
                    "Aggregation",
                    "Summarise database information.",
                    [
                        lesson("sql-l11", "COUNT, SUM and AVG"),
                        lesson("sql-l12", "GROUP BY")
                    ]
                ),


                module(
                    "sql-m07",
                    "Database Design",
                    "Design effective relational data models.",
                    [
                        lesson("sql-l13", "Primary and Foreign Keys"),
                        lesson("sql-l14", "Normalization")
                    ]
                ),


                module(
                    "sql-m08",
                    "Database Project",
                    "Design and query a practical database.",
                    [
                        lesson("sql-l15", "Database Design Project", { type: "project" }),
                        lesson("sql-l16", "SQL Query Challenge", { type: "assessment" })
                    ]
                )

            ]

        },


        /* =================================================
           7. JAVA — COMING SOON
        ================================================= */

        {

            id:
                "java-programming",

            order:
                7,

            title:
                "Java Programming",

            shortTitle:
                "Java",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                32,

            modules:
                10,

            projects:
                5,

            assessments:
                0,

            icon:
                "JV",

            accent:
                "#e67e22",

            featured:
                false,

            description:
                "Learn Java syntax, object-oriented programming, collections, exceptions, file handling and practical application development.",

            outcome:
                "Build structured Java applications using modern object-oriented programming concepts.",

            prerequisites: [
                "Programming Fundamentals recommended"
            ],

            skills: [
                "Java",
                "OOP",
                "Collections",
                "Exceptions",
                "Files"
            ],

            learningPaths: [
                "fullstack-developer"
            ],

            curriculum:
                []

        },


        /* =================================================
           8. C# & .NET — COMING SOON
        ================================================= */

        {

            id:
                "csharp-dotnet",

            order:
                8,

            title:
                "C# & .NET Fundamentals",

            shortTitle:
                "C#",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                32,

            modules:
                10,

            projects:
                5,

            assessments:
                0,

            icon:
                "C#",

            accent:
                "#7b4ab5",

            featured:
                false,

            description:
                "Learn C# syntax, object-oriented programming, collections, LINQ and the foundations of building modern applications with .NET.",

            outcome:
                "Develop a strong foundation for building applications using C# and the .NET ecosystem.",

            prerequisites: [
                "Programming Fundamentals recommended"
            ],

            skills: [
                "C#",
                ".NET",
                "OOP",
                "LINQ",
                "Collections"
            ],

            learningPaths: [
                "fullstack-developer"
            ],

            curriculum:
                []

        },


        /* =================================================
           9. C++ — COMING SOON
        ================================================= */

        {

            id:
                "cpp-programming",

            order:
                9,

            title:
                "C++ Programming",

            shortTitle:
                "C++",

            category:
                "Programming",

            level:
                "Beginner",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "10 weeks",

            hours:
                34,

            modules:
                11,

            projects:
                5,

            assessments:
                0,

            icon:
                "C++",

            accent:
                "#4169a1",

            featured:
                false,

            description:
                "Learn C++ fundamentals, control flow, functions, pointers, memory management, classes, object-oriented programming and the Standard Template Library.",

            outcome:
                "Understand lower-level programming concepts and build structured C++ applications.",

            prerequisites: [
                "Programming Fundamentals recommended"
            ],

            skills: [
                "C++",
                "Pointers",
                "Memory",
                "OOP",
                "STL"
            ],

            learningPaths:
                [],

            curriculum:
                []

        },


        /* =================================================
           10. REACT — COMING SOON
        ================================================= */

        {

            id:
                "react-development",

            order:
                10,

            title:
                "React Development",

            shortTitle:
                "React",

            category:
                "Web Development",

            level:
                "Intermediate",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "8 weeks",

            hours:
                28,

            modules:
                9,

            projects:
                5,

            assessments:
                0,

            icon:
                "RE",

            accent:
                "#32a9c4",

            featured:
                false,

            description:
                "Build modern front-end applications using reusable components, React Hooks, state management, forms, routing and APIs.",

            outcome:
                "Build modern component-based front-end applications with React.",

            prerequisites: [
                "HTML & CSS",
                "JavaScript Fundamentals"
            ],

            skills: [
                "React",
                "Components",
                "Hooks",
                "State",
                "Routing",
                "APIs"
            ],

            learningPaths: [
                "frontend-developer",
                "fullstack-developer"
            ],

            curriculum:
                []

        },


        /* =================================================
           11. NODE.JS — COMING SOON
        ================================================= */

        {

            id:
                "nodejs-backend",

            order:
                11,

            title:
                "Node.js Backend Development",

            shortTitle:
                "Node.js",

            category:
                "Web Development",

            level:
                "Intermediate",

            access:
                "Coming Soon",

            status:
                "coming-soon",

            duration:
                "8 weeks",

            hours:
                30,

            modules:
                9,

            projects:
                5,

            assessments:
                0,

            icon:
                "ND",

            accent:
                "#3d8b59",

            featured:
                false,

            description:
                "Learn server-side JavaScript, Node.js, Express, REST APIs, middleware, authentication and backend application development.",

            outcome:
                "Build backend applications and REST APIs using JavaScript and Node.js.",

            prerequisites: [
                "JavaScript Fundamentals",
                "Git & GitHub"
            ],

            skills: [
                "Node.js",
                "Express",
                "REST APIs",
                "Authentication",
                "Middleware",
                "Backend"
            ],

            learningPaths: [
                "fullstack-developer"
            ],

            curriculum:
                []

        }

    ];


    /* =====================================================
       LEARNING PATHS
    ===================================================== */

    const learningPaths = [

        {

            id:
                "frontend-developer",

            title:
                "Front-End Developer",

            description:
                "Learn how to build responsive and interactive browser applications.",

            courses: [
                "programming-fundamentals",
                "html-css",
                "javascript-fundamentals",
                "git-github",
                "react-development"
            ],

            icon:
                "FE"

        },


        {

            id:
                "python-developer",

            title:
                "Python Developer",

            description:
                "Build programming, Python, database and developer-tool skills.",

            courses: [
                "programming-fundamentals",
                "git-github",
                "python-programming",
                "sql-databases"
            ],

            icon:
                "PY"

        },


        {

            id:
                "fullstack-developer",

            title:
                "Full-Stack Developer",

            description:
                "Develop front-end, backend, database and deployment skills.",

            courses: [
                "programming-fundamentals",
                "html-css",
                "javascript-fundamentals",
                "git-github",
                "sql-databases",
                "react-development",
                "nodejs-backend"
            ],

            icon:
                "FS"

        }

    ];


    /* =====================================================
       UTILITIES
    ===================================================== */

    function getCourseById(
        courseId
    ) {

        return courses.find(
            course =>
                course.id === courseId
        ) || null;

    }


    function getLearningPathById(
        pathId
    ) {

        return learningPaths.find(
            path =>
                path.id === pathId
        ) || null;

    }


    function getCoursesByPath(
        pathId
    ) {

        const path =
            getLearningPathById(
                pathId
            );


        if (!path) {

            return [];

        }


        return path.courses
            .map(
                getCourseById
            )
            .filter(
                Boolean
            );

    }


    function getAvailableCourses() {

        return courses.filter(
            course =>
                course.status ===
                "available"
        );

    }


    function getUpcomingCourses() {

        return courses.filter(
            course =>
                course.status ===
                "coming-soon"
        );

    }


    function getFreeCourses() {

        return courses.filter(
            course =>
                course.status ===
                    "available" &&
                course.access
                    .toLowerCase() ===
                    "free"
        );

    }


    function getProCourses() {

        return courses.filter(
            course =>
                course.status ===
                    "available" &&
                course.access
                    .toLowerCase() ===
                    "pro"
        );

    }


    function getModuleById(
        courseId,
        moduleId
    ) {

        const course =
            getCourseById(
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


        return course.curriculum.find(
            courseModule =>
                courseModule.id ===
                moduleId
        ) || null;

    }


    function getLessonById(
        courseId,
        lessonId
    ) {

        const course =
            getCourseById(
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
            const courseModule
            of course.curriculum
        ) {

            const lessonItem =
                courseModule.lessons?.find(
                    item =>
                        item.id ===
                        lessonId
                );


            if (lessonItem) {

                return {

                    ...lessonItem,

                    moduleId:
                        courseModule.id,

                    moduleTitle:
                        courseModule.title

                };

            }

        }


        return null;

    }


    function getCourseLessonCount(
        courseId
    ) {

        const course =
            getCourseById(
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
                courseModule
            ) => {

                return (
                    total +
                    (
                        Array.isArray(
                            courseModule.lessons
                        )
                            ? courseModule
                                .lessons
                                .length
                            : 0
                    )
                );

            },
            0
        );

    }


    function getFreePreviewLessons(
        courseId
    ) {

        const course =
            getCourseById(
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


        return course.curriculum
            .flatMap(
                courseModule =>
                    courseModule.lessons || []
            )
            .filter(
                lessonItem =>
                    lessonItem.preview ===
                    true
            );

    }


    function isCourseAvailable(
        courseId
    ) {

        const course =
            getCourseById(
                courseId
            );


        return Boolean(
            course &&
            course.status ===
            "available"
        );

    }


    function isCourseComingSoon(
        courseId
    ) {

        const course =
            getCourseById(
                courseId
            );


        return Boolean(
            course &&
            course.status ===
            "coming-soon"
        );

    }


    /* =====================================================
       EXPOSE DATA
    ===================================================== */

    window.CWS_COURSES =
        courses;


    window.CWS_LEARNING_PATHS =
        learningPaths;


    window.CWS_COURSE_UTILS = {

        getCourseById,

        getLearningPathById,

        getCoursesByPath,

        getAvailableCourses,

        getUpcomingCourses,

        getFreeCourses,

        getProCourses,

        getModuleById,

        getLessonById,

        getCourseLessonCount,

        getFreePreviewLessons,

        isCourseAvailable,

        isCourseComingSoon

    };


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "CWS CodeLab central course data loaded."
    );


    console.log(
        `Courses: ${courses.length}`
    );


    console.log(
        `Available: ${getAvailableCourses().length}`
    );


    console.log(
        `Coming soon: ${getUpcomingCourses().length}`
    );


})();
