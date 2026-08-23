/* =========================================================
   CWS CODELAB
   PROGRAMMING FUNDAMENTALS

   ACCESS: FREE

   This dedicated course file contains:
   - Course orientation
   - Deep curriculum structure
   - Lessons
   - Practical examples
   - Practice activities
   - Knowledge checks
   - Module labs / quizzes / assessments
   - Course projects

   FREE DOES NOT MEAN SHALLOW.
   This course is intended to move from true beginner concepts
   into practical and advanced-foundation programming skills.
========================================================= */

(() => {

    "use strict";


    if (
        !window.CWS_COURSE_UTILS
    ) {

        throw new Error(
            "CWS CodeLab: courses.js must load before programming-fundamentals.js."
        );

    }


    const experience =
        window.CWS_COURSE_EXPERIENCE;


    /*
     * Use shared factories when course-experience.js is loaded.
     * Fall back to local object construction for compatibility.
     */

    const makeLesson =
        experience?.makeLesson ||
        (
            (
                id,
                title,
                options = {}
            ) => ({

                id,

                title,

                ...options

            })
        );


    const makeModule =
        experience?.makeModule ||
        (
            (
                id,
                title,
                options = {}
            ) => ({

                id,

                title,

                ...options

            })
        );


    const makeExample =
        experience?.makeExample ||
        (
            (
                options = {}
            ) => ({

                ...options

            })
        );


    const makePractice =
        experience?.makePractice ||
        (
            (
                options = {}
            ) => ({

                ...options

            })
        );


    const makeQuestion =
        experience?.makeQuestion ||
        (
            (
                options = {}
            ) => ({

                ...options

            })
        );


    const COURSE_ID =
        "programming-fundamentals";


    const course = {

        id:
            COURSE_ID,

        version:
            "1.0.0",

        access:
            "Free",

        depth:
            "beginner-to-advanced-foundation",

        orientation: {

            what:
                "Programming Fundamentals teaches the transferable ideas behind programming before a learner specialises in a language.",

            why:
                "Programming languages change, but core ideas such as data, decisions, repetition, functions, decomposition and debugging remain useful across languages and software careers.",

            who: [
                "Complete beginners",
                "Aspiring web developers",
                "Aspiring Python developers",
                "Future full-stack developers",
                "Automation learners",
                "Technical learners who need stronger programming logic"
            ],

            when: [
                "Before specialising deeply in JavaScript, Python, Java, C#, C++ or another language",
                "When programming syntax feels confusing because the underlying logic is not yet clear",
                "When a learner wants to strengthen problem-solving before building larger applications"
            ],

            where: [
                "Web applications",
                "Mobile applications",
                "Banking and financial systems",
                "Automation scripts",
                "Backend services",
                "Games",
                "Data systems",
                "Cybersecurity tooling"
            ],

            how:
                "The course moves from explanation to code reading, guided examples, independent practice, debugging, module challenges and a final programming project.",

            learningOutcomes: [
                "Explain how programs receive, process and produce information.",
                "Work confidently with variables and common data types.",
                "Use arithmetic, comparison and logical expressions.",
                "Design decisions with Boolean logic and conditions.",
                "Use loops to solve repetitive problems.",
                "Design reusable behaviour with functions.",
                "Break larger problems into smaller programmable steps.",
                "Read simple code and predict behaviour.",
                "Debug beginner logic errors.",
                "Plan and build a small complete program."
            ]

        },


        curriculum: [

            /* =================================================
               MODULE 1
               INTRODUCTION TO PROGRAMMING
            ================================================= */

            makeModule(
                "pf-m01",
                "Introduction to Programming",
                {

                    order:
                        1,

                    access:
                        "free",

                    description:
                        "Understand what programming is, why it matters, how software executes instructions and which tools developers use.",

                    why:
                        "Learners need a mental model of programming before syntax becomes useful. This module builds that model.",

                    outcomes: [
                        "Explain programming in plain language.",
                        "Describe input, processing and output.",
                        "Explain source code and program execution at a beginner level.",
                        "Recognise common programming languages and development tools."
                    ],

                    lessons: [

                        makeLesson(
                            "pf-l01",
                            "What Is Programming?",
                            {

                                access:
                                    "free",

                                difficulty:
                                    "foundation",

                                preview:
                                    true,

                                duration:
                                    "30 min",

                                description:
                                    "Learn what programming is, why software needs precise instructions and how programming connects human problem solving to computer execution.",

                                what:
                                    "Programming is the process of designing and writing instructions that a computer can execute to solve problems or perform tasks.",

                                why:
                                    "Computers can process instructions extremely quickly, but they need those instructions to be expressed precisely. Programming allows people to turn rules, decisions and processes into repeatable digital behaviour.",

                                who: [
                                    "Front-end developers",
                                    "Back-end developers",
                                    "Mobile developers",
                                    "Game developers",
                                    "Data engineers",
                                    "Automation engineers",
                                    "Security engineers",
                                    "Embedded-systems developers"
                                ],

                                when: [
                                    "When a repeated process should be automated",
                                    "When an application must respond to users or data",
                                    "When business rules must be executed consistently",
                                    "When information must be processed, validated, stored or transformed"
                                ],

                                where: [
                                    "Websites",
                                    "Mobile apps",
                                    "ATMs and banking platforms",
                                    "Cars and embedded devices",
                                    "Cloud services",
                                    "Games",
                                    "Cybersecurity tools",
                                    "Business automation"
                                ],

                                avoidWhen: [
                                    "When a simple existing tool already solves the problem better than custom software",
                                    "When requirements are not yet understood well enough to define correct behaviour"
                                ],

                                how:
                                    "A developer analyses a problem, breaks it into smaller steps, represents those steps using a programming language, runs the program and tests whether the result matches the intended behaviour.",

                                terminology: [
                                    {
                                        term: "Program",
                                        definition: "A set of instructions designed to perform a task."
                                    },
                                    {
                                        term: "Source code",
                                        definition: "Human-readable programming instructions written by developers."
                                    },
                                    {
                                        term: "Algorithm",
                                        definition: "A defined sequence of steps for solving a problem."
                                    },
                                    {
                                        term: "Bug",
                                        definition: "A defect that causes incorrect or unexpected program behaviour."
                                    },
                                    {
                                        term: "Debugging",
                                        definition: "The process of finding, understanding and correcting program defects."
                                    }
                                ],

                                objectives: [
                                    "Explain programming in your own words.",
                                    "Describe the relationship between source code and program behaviour.",
                                    "Identify real-world systems that rely on programming.",
                                    "Explain why programming is primarily a problem-solving discipline."
                                ],

                                concepts: [
                                    {
                                        title: "Instructions",
                                        explanation: "Programs consist of instructions that describe actions the computer should perform."
                                    },
                                    {
                                        title: "Sequence",
                                        explanation: "Many instructions execute in a defined order."
                                    },
                                    {
                                        title: "Logic",
                                        explanation: "Programs use rules and decisions to determine what should happen."
                                    },
                                    {
                                        title: "Problem decomposition",
                                        explanation: "Large problems become easier when broken into smaller programmable steps."
                                    }
                                ],

                                content: [
                                    "Programming is the process of creating instructions that tell a computer what to do. Those instructions are written using a programming language such as JavaScript, Python, Java, C# or C++.",
                                    "A computer is extremely fast at following instructions, but it does not understand a problem the way a human does. A programmer must break a problem into smaller, clear and logical steps that the computer can execute.",
                                    "The instructions written by a programmer are commonly called source code. Source code is stored in files and translated or interpreted by software so that the computer can perform the requested operations.",
                                    "Almost every digital system you use depends on programming. Websites, mobile applications, banking systems, games, operating systems, cloud platforms, cybersecurity tools and embedded devices are all built using software.",
                                    "Programming is therefore not simply about memorising syntax. Good programmers analyse problems, design solutions, express those solutions logically, test assumptions and improve the result when something behaves incorrectly.",
                                    "A useful beginner mental model is: problem → rules → algorithm → code → execution → result → testing."
                                ],

                                examples: [

                                    makeExample({
                                        id: "pf-l01-ex01",
                                        title: "Greeting program",
                                        scenario: "A learning platform wants to welcome a signed-in learner.",
                                        language: "javascript",
                                        code:
`const learnerName = "Student";

console.log("Welcome to CWS CodeLab!");
console.log("Hello " + learnerName);`,
                                        output:
`Welcome to CWS CodeLab!
Hello Student`,
                                        explanation: "The program stores a value, then executes two output instructions in sequence."
                                    }),

                                    makeExample({
                                        id: "pf-l01-ex02",
                                        title: "Bank withdrawal rule",
                                        scenario: "A banking application should approve a withdrawal only when the account contains enough money.",
                                        language: "pseudocode",
                                        code:
`IF requestedAmount <= availableBalance
    APPROVE withdrawal
ELSE
    DECLINE withdrawal`,
                                        output: "A decision based on the account balance.",
                                        explanation: "Programming turns a business rule into an explicit sequence a computer can evaluate consistently."
                                    })

                                ],

                                practice: [

                                    makePractice({
                                        id: "pf-l01-pr01",
                                        title: "Find programming around you",
                                        difficulty: "foundation",
                                        task: "List five digital systems you used today and describe one task each system performs through software.",
                                        hint: "Think about your phone, browser, banking, transport, work systems or entertainment.",
                                        expectedOutcome: "The learner can connect programming to real systems."
                                    }),

                                    makePractice({
                                        id: "pf-l01-pr02",
                                        title: "Write an everyday algorithm",
                                        difficulty: "beginner",
                                        task: "Write precise numbered steps for withdrawing money from an ATM. Include at least one decision.",
                                        hint: "What happens when the PIN is wrong or the balance is too low?",
                                        expectedOutcome: "The learner practises sequence and decision thinking before writing code."
                                    }),

                                    makePractice({
                                        id: "pf-l01-pr03",
                                        title: "Explain programming without jargon",
                                        difficulty: "intermediate",
                                        task: "Explain programming to someone who has never used a computer professionally. Your explanation must include problem solving, instructions and testing.",
                                        expectedOutcome: "The learner demonstrates conceptual understanding rather than memorised terminology."
                                    })

                                ],

                                commonMistakes: [
                                    "Thinking programming is mainly memorising language syntax.",
                                    "Writing code before understanding the problem.",
                                    "Assuming a computer will infer missing instructions.",
                                    "Testing only the expected success path."
                                ],

                                troubleshooting: [
                                    "If code behaves unexpectedly, first confirm what you expected to happen.",
                                    "Reduce the problem into the smallest reproducible set of instructions.",
                                    "Inspect input values before assuming the calculation or condition is wrong.",
                                    "Read error messages rather than immediately rewriting large sections of code."
                                ],

                                advanced: {
                                    available: true,
                                    access: "free",
                                    title: "Programming beyond syntax",
                                    content: [
                                        "Professional programming also involves requirements, design decisions, testing, maintainability, security and collaboration.",
                                        "The same business problem can often be solved with many different algorithms. Developers compare correctness, clarity, performance and maintainability.",
                                        "Programming languages are tools; problem-solving skills transfer between them."
                                    ]
                                },

                                realWorld: [
                                    "A payment platform validates amounts, account state and transaction rules before processing a payment.",
                                    "An online store calculates totals, stock availability, discounts and delivery rules using program logic.",
                                    "A cybersecurity scanner automates repeated checks and records findings consistently."
                                ],

                                knowledgeCheck: [

                                    makeQuestion({
                                        id: "pf-m01-l01-kc01",
                                        courseId: COURSE_ID,
                                        moduleId: "pf-m01",
                                        lessonId: "pf-l01",
                                        topic: "programming-purpose",
                                        objective: "understand-programming",
                                        difficulty: "foundation",
                                        cognitiveLevel: "understand",
                                        type: "concept",
                                        question: "Which description best explains programming?",
                                        options: [
                                            "Designing precise instructions that computers can execute to solve problems",
                                            "Installing applications on a computer",
                                            "Using only mathematical formulas to control hardware",
                                            "Memorising programming-language keywords"
                                        ],
                                        correctAnswer: 0,
                                        explanation: "Programming combines problem solving with instructions expressed in a form software can execute.",
                                        questionFingerprint: "programming-purpose-definition-001"
                                    }),

                                    makeQuestion({
                                        id: "pf-m01-l01-kc02",
                                        courseId: COURSE_ID,
                                        moduleId: "pf-m01",
                                        lessonId: "pf-l01",
                                        topic: "problem-decomposition",
                                        objective: "apply-problem-decomposition",
                                        difficulty: "beginner",
                                        cognitiveLevel: "apply",
                                        type: "scenario",
                                        question: "A developer is asked to automate a complex staff-onboarding process. What should the developer do before writing the full program?",
                                        options: [
                                            "Choose random code examples and combine them",
                                            "Break the process into smaller rules, inputs, decisions and actions",
                                            "Write the longest possible function first",
                                            "Ignore unusual cases until users report them"
                                        ],
                                        correctAnswer: 1,
                                        explanation: "Decomposing the problem creates smaller, testable pieces that can be implemented correctly.",
                                        questionFingerprint: "programming-decomposition-onboarding-001"
                                    })

                                ]

                            }
                        ),


                        makeLesson(
                            "pf-l02",
                            "How Programs Work",
                            {

                                access: "free",
                                difficulty: "beginner",
                                preview: true,
                                duration: "35 min",

                                description:
                                    "Follow the journey from input through processing to output and build a clear beginner model of program execution.",

                                what:
                                    "A running program receives or contains data, executes instructions against that data and produces effects or output.",

                                why:
                                    "Understanding execution helps developers predict behaviour, debug problems and design programs systematically.",

                                who: [
                                    "Every software developer",
                                    "Testers and QA engineers",
                                    "Automation engineers",
                                    "Technical support engineers",
                                    "Security practitioners who analyse program behaviour"
                                ],

                                when: [
                                    "When predicting what code will do",
                                    "When debugging incorrect output",
                                    "When designing data-processing workflows",
                                    "When tracing how user input reaches application logic"
                                ],

                                where: [
                                    "User interfaces",
                                    "APIs",
                                    "Databases",
                                    "Command-line applications",
                                    "Automated workflows",
                                    "Background services"
                                ],

                                how:
                                    "At a high level, programs obtain input, execute instructions in a defined flow, modify or calculate values and produce output or side effects.",

                                objectives: [
                                    "Describe the input-process-output model.",
                                    "Explain source code at a beginner level.",
                                    "Describe sequential execution.",
                                    "Recognise the role of runtimes, compilers or interpreters.",
                                    "Explain why debugging requires tracing program state."
                                ],

                                content: [
                                    "A program normally accepts some form of input, processes that information and produces an output. This model is often described as Input → Processing → Output.",
                                    "Input can come from a keyboard, mouse, file, database, API, sensor or another program.",
                                    "Processing includes calculations, comparisons, validation, searching, sorting, authentication and state changes.",
                                    "Output may be displayed on screen, stored in a database, written to a file, transmitted across a network or passed to another component.",
                                    "The source code developers write must ultimately be executed by a runtime environment or translated into instructions the computer can process.",
                                    "Unless control flow changes the order, many beginner programs can be understood by tracing instructions from top to bottom.",
                                    "Debugging becomes easier when you track how input values change as each instruction executes."
                                ],

                                examples: [

                                    makeExample({
                                        id: "pf-l02-ex01",
                                        title: "Calculate an order total",
                                        scenario: "A store calculates the total cost of several identical products.",
                                        language: "javascript",
                                        code:
`const price = 250;
const quantity = 3;

const total = price * quantity;

console.log("Total: R" + total);`,
                                        output: "Total: R750",
                                        explanation: "price and quantity are input values, multiplication is processing, and the console message is output."
                                    }),

                                    makeExample({
                                        id: "pf-l02-ex02",
                                        title: "Login decision flow",
                                        scenario: "A login process compares submitted details to stored account information.",
                                        language: "pseudocode",
                                        code:
`INPUT email
INPUT password

CHECK credentials

IF credentialsAreValid
    OUTPUT "Login successful"
ELSE
    OUTPUT "Login failed"`,
                                        output: "A success or failure response.",
                                        explanation: "The same input-process-output model applies even when processing contains decisions."
                                    })

                                ],

                                practice: [
                                    makePractice({
                                        id: "pf-l02-pr01",
                                        title: "Identify IPO",
                                        difficulty: "foundation",
                                        task: "For a calculator, identify two inputs, the processing step and the output.",
                                        expectedOutcome: "Learner correctly separates values from operations and results."
                                    }),
                                    makePractice({
                                        id: "pf-l02-pr02",
                                        title: "Trace execution",
                                        difficulty: "intermediate",
                                        task: "Predict the final value of total without running the code: let total = 10; total = total + 5; total = total * 2;",
                                        solution: "30",
                                        expectedOutcome: "Learner traces sequential state changes."
                                    })
                                ],

                                commonMistakes: [
                                    "Confusing input with processing.",
                                    "Assuming all languages execute source code in exactly the same way.",
                                    "Skipping intermediate values when debugging.",
                                    "Reading code non-sequentially when no control-flow statement changes execution."
                                ],

                                advanced: {
                                    available: true,
                                    access: "free",
                                    title: "Execution models",
                                    content: [
                                        "Modern environments may compile, interpret, optimise or transform code in several stages.",
                                        "Developers do not need processor-level expertise to start programming, but understanding layers of execution becomes valuable when diagnosing performance and runtime behaviour."
                                    ]
                                },

                                knowledgeCheck: [
                                    makeQuestion({
                                        id: "pf-m01-l02-kc01",
                                        courseId: COURSE_ID,
                                        moduleId: "pf-m01",
                                        lessonId: "pf-l02",
                                        topic: "input-process-output",
                                        objective: "apply-ipo",
                                        difficulty: "beginner",
                                        cognitiveLevel: "apply",
                                        type: "scenario",
                                        question: "A temperature application reads 30°C, converts it to Fahrenheit and displays 86°F. Which step is processing?",
                                        options: [
                                            "Reading 30°C",
                                            "Displaying 86°F",
                                            "Converting the temperature",
                                            "Opening the application"
                                        ],
                                        correctAnswer: 2,
                                        explanation: "The conversion transforms the input into the resulting value.",
                                        questionFingerprint: "ipo-temperature-processing-001"
                                    })
                                ]

                            }
                        ),


                        makeLesson(
                            "pf-l03",
                            "Programming Languages and Tools",
                            {

                                access: "free",
                                difficulty: "beginner",
                                duration: "35 min",

                                description:
                                    "Understand why different programming languages exist and how editors, terminals, debuggers, Git and GitHub fit into a developer workflow.",

                                what:
                                    "Programming languages provide structured ways to express instructions, while development tools help developers write, run, test, debug and manage those instructions.",

                                why:
                                    "Developers choose tools and languages based on the platform, ecosystem, performance requirements, team and problem being solved.",

                                who: [
                                    "Software developers",
                                    "DevOps engineers",
                                    "Data engineers",
                                    "Security engineers",
                                    "QA automation engineers"
                                ],

                                when: [
                                    "When choosing a technology for a new project",
                                    "When setting up a development environment",
                                    "When collaborating with other developers",
                                    "When debugging or versioning code"
                                ],

                                where: [
                                    "Local development computers",
                                    "Cloud development environments",
                                    "Continuous integration systems",
                                    "Git repositories",
                                    "Production build pipelines"
                                ],

                                how:
                                    "A developer writes source code in an editor or IDE, runs commands through a terminal or tooling interface, debugs problems, and uses version control such as Git to track changes.",

                                objectives: [
                                    "Explain why multiple programming languages exist.",
                                    "Recognise common uses for JavaScript, Python, Java, C#, C++ and SQL.",
                                    "Explain the purpose of an editor or IDE.",
                                    "Explain what a terminal and debugger are used for.",
                                    "Describe the difference between Git and GitHub."
                                ],

                                content: [
                                    "There is no single programming language used for every type of software. Languages differ in syntax, execution model, ecosystem, platform support and design goals.",
                                    "JavaScript is central to interactive web development and can also run on servers through environments such as Node.js.",
                                    "Python is popular for automation, backend development, data analysis, artificial intelligence and security scripting.",
                                    "Java and C# are widely used in enterprise and application development.",
                                    "C++ is often chosen when low-level control or high performance matters.",
                                    "SQL is designed for working with relational data rather than serving as a general-purpose application language.",
                                    "Visual Studio Code is an example of a code editor. IDEs may provide deeper integrated build, debugging and project features.",
                                    "The terminal lets developers interact with tools and the operating system through commands.",
                                    "Git tracks source-code history. GitHub hosts Git repositories and supports collaboration workflows such as pull requests."
                                ],

                                examples: [
                                    makeExample({
                                        id: "pf-l03-ex01",
                                        title: "Choose a language by problem",
                                        scenario: "A team needs an interactive web interface, an automation script and relational database queries.",
                                        language: "text",
                                        code:
`Interactive browser UI → JavaScript
Automation script       → Python
Relational queries      → SQL`,
                                        explanation: "Language choice depends on the problem and environment rather than one language being universally best."
                                    })
                                ],

                                practice: [
                                    makePractice({
                                        id: "pf-l03-pr01",
                                        title: "Map tools to jobs",
                                        difficulty: "beginner",
                                        task: "Match VS Code, terminal, debugger, Git and GitHub to the main role each plays in development.",
                                        expectedOutcome: "Learner distinguishes writing, command execution, debugging, version control and repository hosting."
                                    }),
                                    makePractice({
                                        id: "pf-l03-pr02",
                                        title: "Inspect your environment",
                                        difficulty: "intermediate",
                                        task: "Open your preferred editor and terminal. Identify the editor name, terminal shell and one version-control command available on your computer.",
                                        expectedOutcome: "Learner connects theory to an actual development environment."
                                    })
                                ],

                                commonMistakes: [
                                    "Treating Git and GitHub as the same product.",
                                    "Choosing a language only because it is popular rather than because it fits the task.",
                                    "Avoiding the terminal completely.",
                                    "Installing many tools before understanding why they are needed."
                                ],

                                advanced: {
                                    available: true,
                                    access: "free",
                                    title: "Toolchains and ecosystems",
                                    content: [
                                        "Professional development usually combines a language, runtime, package manager, build tooling, tests, version control and deployment tooling.",
                                        "The strength of a language often includes its libraries, community, documentation and surrounding ecosystem."
                                    ]
                                },

                                knowledgeCheck: [
                                    makeQuestion({
                                        id: "pf-m01-l03-kc01",
                                        courseId: COURSE_ID,
                                        moduleId: "pf-m01",
                                        lessonId: "pf-l03",
                                        topic: "git-github-distinction",
                                        objective: "understand-developer-tools",
                                        difficulty: "beginner",
                                        cognitiveLevel: "understand",
                                        type: "concept",
                                        question: "Which statement correctly distinguishes Git from GitHub?",
                                        options: [
                                            "Git is a programming language and GitHub is its compiler.",
                                            "Git tracks versions of code; GitHub can host Git repositories and collaboration workflows.",
                                            "GitHub replaces the need for version control.",
                                            "Git is used only for websites while GitHub is used only for Python."
                                        ],
                                        correctAnswer: 1,
                                        explanation: "Git is the version-control system; GitHub is a platform that hosts Git repositories and collaboration features.",
                                        questionFingerprint: "git-github-distinction-001"
                                    })
                                ]

                            }
                        )

                    ],

                    lab: {
                        id: "pf-m01-lab",
                        access: "free",
                        title: "Trace a Simple Program",
                        type: "guided-lab",
                        description: "Read a short program, identify its inputs, processing and outputs, then explain its execution order.",
                        estimatedTime: "30 min"
                    },

                    quiz: {
                        id: "pf-m01-quiz",
                        access: "free",
                        questionCount: 8,
                        passingScore: 70,
                        randomiseQuestions: true,
                        randomiseOptions: true,
                        uniqueQuestionFingerprintsRequired: true,
                        status: "planned"
                    },

                    assessment: {
                        id: "pf-m01-assessment",
                        access: "free",
                        title: "Programming Foundations Assessment",
                        questionCount: 10,
                        passingScore: 70,
                        attempts: 3,
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 2
            ================================================= */

            makeModule(
                "pf-m02",
                "Variables and Data",
                {

                    order: 2,
                    access: "free",
                    description: "Learn how programs store, name, update and reason about information.",
                    why: "Nearly every useful program needs to represent changing information.",
                    outcomes: [
                        "Declare and assign values.",
                        "Differentiate common primitive data types.",
                        "Choose appropriate names and constants.",
                        "Trace how values change during execution."
                    ],
                    lessons: [
                        makeLesson("pf-l04", "Variables", {
                            access: "free",
                            difficulty: "beginner",
                            duration: "35 min",
                            description: "Learn declaration, assignment, reassignment, constants and meaningful naming."
                        }),
                        makeLesson("pf-l05", "Primitive Data Types", {
                            access: "free",
                            difficulty: "beginner",
                            duration: "35 min",
                            description: "Understand strings, numbers, booleans, null-like values and why type matters."
                        }),
                        makeLesson("pf-l06", "Working With Values", {
                            access: "free",
                            difficulty: "intermediate",
                            duration: "40 min",
                            description: "Combine, convert, inspect and safely manipulate values."
                        })
                    ],
                    lab: {
                        id: "pf-m02-lab",
                        access: "free",
                        title: "Build a Personal Profile Data Model",
                        status: "planned"
                    },
                    quiz: {
                        id: "pf-m02-quiz",
                        access: "free",
                        status: "planned"
                    },
                    assessment: {
                        id: "pf-m02-assessment",
                        access: "free",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 3
            ================================================= */

            makeModule(
                "pf-m03",
                "Operators and Expressions",
                {

                    order: 3,
                    access: "free",
                    description: "Use arithmetic, comparison and logical operators to transform values and build expressions.",
                    why: "Programs need operations to calculate results and compare information.",
                    lessons: [
                        makeLesson("pf-l07", "Arithmetic Operators", {
                            access: "free",
                            difficulty: "beginner"
                        }),
                        makeLesson("pf-l08", "Comparison Operators", {
                            access: "free",
                            difficulty: "beginner"
                        }),
                        makeLesson("pf-l09", "Logical Operators", {
                            access: "free",
                            difficulty: "intermediate"
                        })
                    ],
                    lab: {
                        id: "pf-m03-lab",
                        access: "free",
                        title: "Price and Eligibility Calculator",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 4
            ================================================= */

            makeModule(
                "pf-m04",
                "Decision Making",
                {

                    order: 4,
                    access: "free",
                    description: "Control program behaviour with Boolean logic and conditional decisions.",
                    why: "Real applications behave differently depending on users, data and rules.",
                    lessons: [
                        makeLesson("pf-l10", "Boolean Logic", {
                            access: "free",
                            difficulty: "beginner"
                        }),
                        makeLesson("pf-l11", "If and Else", {
                            access: "free",
                            difficulty: "intermediate"
                        }),
                        makeLesson("pf-l12", "Nested and Compound Decisions", {
                            access: "free",
                            difficulty: "advanced"
                        })
                    ],
                    lab: {
                        id: "pf-m04-lab",
                        access: "free",
                        title: "Bank Withdrawal Decision Engine",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 5
            ================================================= */

            makeModule(
                "pf-m05",
                "Loops and Repetition",
                {

                    order: 5,
                    access: "free",
                    description: "Repeat work safely and efficiently using iteration.",
                    why: "Programs frequently process collections or repeat tasks until a condition changes.",
                    lessons: [
                        makeLesson("pf-l13", "Why Loops Matter", {
                            access: "free",
                            difficulty: "beginner"
                        }),
                        makeLesson("pf-l14", "While Loops", {
                            access: "free",
                            difficulty: "intermediate"
                        }),
                        makeLesson("pf-l15", "For Loops and Iteration Patterns", {
                            access: "free",
                            difficulty: "advanced"
                        })
                    ],
                    lab: {
                        id: "pf-m05-lab",
                        access: "free",
                        title: "Process a Set of Transactions",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 6
            ================================================= */

            makeModule(
                "pf-m06",
                "Functions and Reusable Logic",
                {

                    order: 6,
                    access: "free",
                    description: "Break programs into named, reusable units of behaviour.",
                    why: "Functions reduce duplication and make larger programs easier to understand and test.",
                    lessons: [
                        makeLesson("pf-l16", "Function Fundamentals", {
                            access: "free",
                            difficulty: "beginner"
                        }),
                        makeLesson("pf-l17", "Parameters and Arguments", {
                            access: "free",
                            difficulty: "intermediate"
                        }),
                        makeLesson("pf-l18", "Return Values, Scope and Composition", {
                            access: "free",
                            difficulty: "advanced"
                        })
                    ],
                    lab: {
                        id: "pf-m06-lab",
                        access: "free",
                        title: "Refactor a Calculator Into Functions",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 7
            ================================================= */

            makeModule(
                "pf-m07",
                "Problem Solving and Debugging",
                {

                    order: 7,
                    access: "free",
                    description: "Use decomposition, pseudocode, tracing and debugging to solve programming problems systematically.",
                    why: "Developers spend substantial time understanding problems and diagnosing behaviour, not only typing code.",
                    lessons: [
                        makeLesson("pf-l19", "Breaking Problems Down", {
                            access: "free",
                            difficulty: "intermediate"
                        }),
                        makeLesson("pf-l20", "Algorithms and Pseudocode", {
                            access: "free",
                            difficulty: "intermediate"
                        }),
                        makeLesson("pf-l21", "Debugging Logic and Edge Cases", {
                            access: "free",
                            difficulty: "advanced"
                        })
                    ],
                    lab: {
                        id: "pf-m07-lab",
                        access: "free",
                        title: "Debug a Broken Eligibility Program",
                        status: "planned"
                    }

                }
            ),


            /* =================================================
               MODULE 8
            ================================================= */

            makeModule(
                "pf-m08",
                "Programming Fundamentals Project",
                {

                    order: 8,
                    access: "free",
                    description: "Plan, build, test and review a small complete program using concepts from the course.",
                    why: "A complete project requires learners to combine concepts instead of answering isolated questions.",
                    lessons: [
                        makeLesson("pf-l22", "Project Planning and Requirements", {
                            access: "free",
                            difficulty: "intermediate",
                            type: "project",
                            duration: "45 min"
                        }),
                        makeLesson("pf-l23", "Build, Test and Debug the Project", {
                            access: "free",
                            difficulty: "advanced",
                            type: "project",
                            duration: "120 min"
                        }),
                        makeLesson("pf-l24", "Course Review and Final Readiness", {
                            access: "free",
                            difficulty: "advanced",
                            type: "assessment",
                            duration: "45 min"
                        })
                    ],
                    project: {
                        id: "pf-final-project",
                        access: "free",
                        title: "Programming Logic Application",
                        status: "planned"
                    },
                    assessment: {
                        id: "pf-final-assessment",
                        access: "free",
                        title: "Programming Fundamentals Final Assessment",
                        passingScore: 75,
                        status: "planned"
                    }

                }
            )

        ]


    };


    /* =====================================================
       ASSESSMENT QUALITY CHECK
    ===================================================== */

    const allQuestions =
        course.curriculum
            .flatMap(
                courseModule =>
                    courseModule.lessons ||
                    []
            )
            .flatMap(
                lesson =>
                    lesson.knowledgeCheck ||
                    []
            );


    if (
        window.CWS_ASSESSMENT_CONFIG
    ) {

        const result =
            window.CWS_ASSESSMENT_CONFIG
                .validateQuestionBank(
                    allQuestions
                );


        if (
            result.errors.length
        ) {

            console.error(
                "Programming Fundamentals question-bank errors:",
                result.errors
            );

        }


        if (
            result.warnings.length
        ) {

            console.warn(
                "Programming Fundamentals question-bank warnings:",
                result.warnings
            );

        }

    }


    /* =====================================================
       REGISTER
    ===================================================== */

    window.CWS_COURSE_UTILS
        .registerCourseData(
            course
        );


    console.log(
        "CWS CodeLab Programming Fundamentals loaded."
    );


})();
