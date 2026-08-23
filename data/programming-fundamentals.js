/* =========================================================
   CWS CODELAB
   PROGRAMMING FUNDAMENTALS — FULL FREE COURSE

   12 modules
   36 deep lessons
   Advanced free learning
   12 module labs
   12 unique module quizzes
   12 practical module assessments
   15-question final assessment
   Required final capstone
========================================================= */

(() => {

    "use strict";

    if (!window.CWS_COURSE_UTILS) {
        throw new Error(
            "CWS CodeLab: courses.js must load before programming-fundamentals.js."
        );
    }

    const course = {
    "id": "programming-fundamentals",
    "version": "2.0.0",
    "access": "Free",
    "status": "available",
    "depth": "beginner-to-advanced-foundation",
    "duration": "12 weeks",
    "estimatedHours": 60,
    "moduleCount": 12,
    "lessonCount": 36,
    "orientation": {
        "what": "CWS CodeLab Programming Fundamentals is a full free foundation course designed to build transferable programming understanding before language specialisation.",
        "why": "Languages and frameworks change, but data, control flow, functions, collections, algorithms, debugging, testing, state and interfaces remain core.",
        "who": [
            "Complete beginners",
            "Aspiring front-end developers",
            "Aspiring Python developers",
            "Future full-stack developers",
            "Automation learners"
        ],
        "when": [
            "Before deep JavaScript/Python/Java/C#/C++ study",
            "When syntax is easier than reasoning",
            "When stronger problem-solving and debugging are needed"
        ],
        "where": [
            "Web applications",
            "Backend services",
            "Mobile software",
            "Automation",
            "Business systems",
            "Data systems",
            "Cybersecurity tooling"
        ],
        "how": "Each module combines deep lessons, advanced free sections, practical examples, transfer exercises, a unique quiz and a practical assessment.",
        "learningOutcomes": [
            "Explain how programs model problems and execute instructions.",
            "Represent data safely with variables, types and structured collections.",
            "Build calculations, comparisons, Boolean logic, decisions and loops.",
            "Design reusable functions and control scope/state.",
            "Use arrays, objects, sets and maps appropriately.",
            "Design algorithms and reason about efficiency.",
            "Debug systematically, validate external data and write meaningful tests.",
            "Organise programs into modules with clear interfaces and data flow.",
            "Understand persistence, APIs and databases at foundation level.",
            "Plan, build, test, refactor and explain a complete capstone."
        ]
    },
    "completionRequirements": {
        "minimumModuleQuizScore": 70,
        "minimumModuleAssessmentScore": 70,
        "minimumFinalAssessmentScore": 75,
        "allCoreLessonsRequired": true,
        "capstoneRequired": true,
        "assessmentRule": "Lesson checks, module quizzes and final questions use separate IDs and fingerprints; quizzes should not reuse the same question/answer scenario."
    },
    "curriculum": [
        {
            "id": "pf-m01",
            "title": "Introduction to Programming and Computing",
            "order": 1,
            "access": "free",
            "description": "Build a correct mental model of programming, program execution and the developer workflow before focusing on syntax.",
            "why": "Build a correct mental model of programming, program execution and the developer workflow before focusing on syntax.",
            "outcomes": [
                "Explain the core ideas in Introduction to Programming and Computing.",
                "Apply Introduction to Programming and Computing to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l01",
                    "title": "Programming, Problems, and Instructions",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "foundation",
                    "duration": "55 min",
                    "preview": true,
                    "description": "Programming is the disciplined process of turning a requirement into precise instructions a computer can execute.",
                    "what": "Programming is the disciplined process of turning a requirement into precise instructions a computer can execute.",
                    "why": "Code is only useful when it represents a correct understanding of the problem. Requirements, logic and testing come before syntax.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Identify the goal, inputs, rules, outputs and failure cases; decompose the problem; design steps; implement; test; improve.",
                    "terminology": [
                        {
                            "term": "Program",
                            "definition": "A key concept in Programming, Problems, and Instructions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Source code",
                            "definition": "A key concept in Programming, Problems, and Instructions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Algorithm",
                            "definition": "A key concept in Programming, Problems, and Instructions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Requirement",
                            "definition": "A key concept in Programming, Problems, and Instructions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Bug",
                            "definition": "A key concept in Programming, Problems, and Instructions that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain programming, problems, and instructions in your own words.",
                        "Apply programming, problems, and instructions to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Programming is the disciplined process of turning a requirement into precise instructions a computer can execute.",
                        "Code is only useful when it represents a correct understanding of the problem. Requirements, logic and testing come before syntax.",
                        "Identify the goal, inputs, rules, outputs and failure cases; decompose the problem; design steps; implement; test; improve.",
                        "Practical perspective: An ATM withdrawal is first a business rule: approve only when the requested amount is valid and the available balance is sufficient.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Professional programming is domain modelling: software represents people, money, orders, permissions, devices, events and rules."
                    ],
                    "examples": [
                        {
                            "id": "pf-l01-ex01",
                            "title": "Practical example",
                            "scenario": "An ATM withdrawal is first a business rule: approve only when the requested amount is valid and the available balance is sufficient.",
                            "language": "text",
                            "code": "An ATM withdrawal is first a business rule: approve only when the requested amount is valid and the available balance is sufficient.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l01-pr01",
                            "title": "Guided practice",
                            "difficulty": "foundation",
                            "task": "Write a step-by-step ATM withdrawal algorithm with at least two failure paths.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l01-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Programming, Problems, and Instructions to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying programming, problems, and instructions without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Programming, Problems, and Instructions",
                        "content": [
                            "Professional programming is domain modelling: software represents people, money, orders, permissions, devices, events and rules.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "An ATM withdrawal is first a business rule: approve only when the requested amount is valid and the available balance is sufficient."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l01-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m01",
                            "lessonId": "pf-l01",
                            "topic": "pf-l01",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Which activity should happen before writing a solution?",
                            "options": [
                                "Clarify the problem, rules, inputs and expected result",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Clarify the problem, rules, inputs and expected result",
                            "questionFingerprint": "pf-l01-knowledge-01"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l02",
                    "title": "How Computers Execute Programs",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "55 min",
                    "preview": true,
                    "description": "Program execution is the process through which instructions and data are interpreted, translated and carried out by a computing system.",
                    "what": "Program execution is the process through which instructions and data are interpreted, translated and carried out by a computing system.",
                    "why": "Understanding execution helps you predict behaviour, trace state and debug programs systematically.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Follow input through processing and state changes to output or side effects, while tracking execution order.",
                    "terminology": [
                        {
                            "term": "Input",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Processing",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Output",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Runtime",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Compiler",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Interpreter",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        },
                        {
                            "term": "State",
                            "definition": "A key concept in How Computers Execute Programs that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain how computers execute programs in your own words.",
                        "Apply how computers execute programs to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Program execution is the process through which instructions and data are interpreted, translated and carried out by a computing system.",
                        "Understanding execution helps you predict behaviour, trace state and debug programs systematically.",
                        "Follow input through processing and state changes to output or side effects, while tracking execution order.",
                        "Practical perspective: A price and quantity are input; multiplication is processing; the displayed total is output.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Modern runtimes may parse, compile and optimise code in several stages while the source language remains the same."
                    ],
                    "examples": [
                        {
                            "id": "pf-l02-ex01",
                            "title": "Practical example",
                            "scenario": "A price and quantity are input; multiplication is processing; the displayed total is output.",
                            "language": "text",
                            "code": "A price and quantity are input; multiplication is processing; the displayed total is output.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l02-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Trace let total = 5; total = total + 7; total = total * 2; and explain every state change.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l02-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply How Computers Execute Programs to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying how computers execute programs without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: How Computers Execute Programs",
                        "content": [
                            "Modern runtimes may parse, compile and optimise code in several stages while the source language remains the same.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A price and quantity are input; multiplication is processing; the displayed total is output."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l02-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m01",
                            "lessonId": "pf-l02",
                            "topic": "pf-l02",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "In a total calculator, which step is processing?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "Multiplying price by quantity",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "Multiplying price by quantity",
                            "questionFingerprint": "pf-l02-knowledge-02"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l03",
                    "title": "Languages, Runtimes, and Developer Tools",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "60 min",
                    "preview": false,
                    "description": "Programming languages express behaviour; runtimes and developer tools help write, execute, debug, test, version and distribute software.",
                    "what": "Programming languages express behaviour; runtimes and developer tools help write, execute, debug, test, version and distribute software.",
                    "why": "Professional developers work with an ecosystem, not a language alone. Tool choice should follow the problem and environment.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Use an editor or IDE to write code, a terminal to run tools, a debugger to inspect execution and Git to track change history.",
                    "terminology": [
                        {
                            "term": "IDE",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        },
                        {
                            "term": "Terminal",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        },
                        {
                            "term": "Debugger",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        },
                        {
                            "term": "Version control",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        },
                        {
                            "term": "Repository",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        },
                        {
                            "term": "Package manager",
                            "definition": "A key concept in Languages, Runtimes, and Developer Tools that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain languages, runtimes, and developer tools in your own words.",
                        "Apply languages, runtimes, and developer tools to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Programming languages express behaviour; runtimes and developer tools help write, execute, debug, test, version and distribute software.",
                        "Professional developers work with an ecosystem, not a language alone. Tool choice should follow the problem and environment.",
                        "Use an editor or IDE to write code, a terminal to run tools, a debugger to inspect execution and Git to track change history.",
                        "Practical perspective: JavaScript commonly fits browser interfaces, Python automation, SQL relational queries and Git version history.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Toolchains may include formatters, linters, test runners, package managers, CI systems and deployment tooling."
                    ],
                    "examples": [
                        {
                            "id": "pf-l03-ex01",
                            "title": "Practical example",
                            "scenario": "JavaScript commonly fits browser interfaces, Python automation, SQL relational queries and Git version history.",
                            "language": "text",
                            "code": "JavaScript commonly fits browser interfaces, Python automation, SQL relational queries and Git version history.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l03-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Identify your editor, terminal shell, browser developer tools and installed Git version.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l03-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Languages, Runtimes, and Developer Tools to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying languages, runtimes, and developer tools without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Languages, Runtimes, and Developer Tools",
                        "content": [
                            "Toolchains may include formatters, linters, test runners, package managers, CI systems and deployment tooling.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "JavaScript commonly fits browser interfaces, Python automation, SQL relational queries and Git version history."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l03-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m01",
                            "lessonId": "pf-l03",
                            "topic": "pf-l03",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "What does Git primarily provide?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Version control and change history",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Version control and change history",
                            "questionFingerprint": "pf-l03-knowledge-03"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m01-lab",
                "access": "free",
                "title": "Introduction to Programming and Computing Practical Lab",
                "type": "guided-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Introduction to Programming and Computing in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m01-quiz",
                "access": "free",
                "title": "Introduction to Programming and Computing Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m01-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m01",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on programming, problems, and instructions. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply programming, problems, and instructions, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply programming, problems, and instructions, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m01-module-quiz-01"
                    },
                    {
                        "id": "pf-m01-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m01",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on how computers execute programs. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply how computers execute programs, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply how computers execute programs, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m01-module-quiz-02"
                    },
                    {
                        "id": "pf-m01-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m01",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on languages, runtimes, and developer tools. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply languages, runtimes, and developer tools, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply languages, runtimes, and developer tools, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m01-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m01-assessment",
                "access": "free",
                "title": "Introduction to Programming and Computing Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Introduction to Programming and Computing. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m02",
            "title": "Variables, Data Types, and Memory",
            "order": 2,
            "access": "free",
            "description": "Programs need precise representations of changing information before they can calculate, decide, store or communicate anything useful.",
            "why": "Programs need precise representations of changing information before they can calculate, decide, store or communicate anything useful.",
            "outcomes": [
                "Explain the core ideas in Variables, Data Types, and Memory.",
                "Apply Variables, Data Types, and Memory to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l04",
                    "title": "Variables, Names, Assignment, and Memory",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "60 min",
                    "preview": false,
                    "description": "A variable is a named binding used to refer to a value; assignment changes what value a mutable binding refers to.",
                    "what": "A variable is a named binding used to refer to a value; assignment changes what value a mutable binding refers to.",
                    "why": "Meaningful names and controlled mutation make program state understandable and reduce accidental changes.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Declare names, assign values, reassign only when necessary and keep the scope of mutable state as small as practical.",
                    "terminology": [
                        {
                            "term": "Variable",
                            "definition": "A key concept in Variables, Names, Assignment, and Memory that the learner should be able to define and apply."
                        },
                        {
                            "term": "Declaration",
                            "definition": "A key concept in Variables, Names, Assignment, and Memory that the learner should be able to define and apply."
                        },
                        {
                            "term": "Assignment",
                            "definition": "A key concept in Variables, Names, Assignment, and Memory that the learner should be able to define and apply."
                        },
                        {
                            "term": "Reassignment",
                            "definition": "A key concept in Variables, Names, Assignment, and Memory that the learner should be able to define and apply."
                        },
                        {
                            "term": "Constant",
                            "definition": "A key concept in Variables, Names, Assignment, and Memory that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain variables, names, assignment, and memory in your own words.",
                        "Apply variables, names, assignment, and memory to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "A variable is a named binding used to refer to a value; assignment changes what value a mutable binding refers to.",
                        "Meaningful names and controlled mutation make program state understandable and reduce accidental changes.",
                        "Declare names, assign values, reassign only when necessary and keep the scope of mutable state as small as practical.",
                        "Practical perspective: let cartTotal = 250; cartTotal = cartTotal + 125; changes the state represented by cartTotal.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: A constant binding and an immutable value are different ideas; an object referenced by const may still be mutable in some languages."
                    ],
                    "examples": [
                        {
                            "id": "pf-l04-ex01",
                            "title": "Practical example",
                            "scenario": "let cartTotal = 250; cartTotal = cartTotal + 125; changes the state represented by cartTotal.",
                            "language": "text",
                            "code": "let cartTotal = 250; cartTotal = cartTotal + 125; changes the state represented by cartTotal.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l04-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Model productPrice, quantity and totalCost with clear names, then trace two updates to totalCost.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l04-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Variables, Names, Assignment, and Memory to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying variables, names, assignment, and memory without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Variables, Names, Assignment, and Memory",
                        "content": [
                            "A constant binding and an immutable value are different ideas; an object referenced by const may still be mutable in some languages.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "let cartTotal = 250; cartTotal = cartTotal + 125; changes the state represented by cartTotal."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l04-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m02",
                            "lessonId": "pf-l04",
                            "topic": "pf-l04",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which name best communicates a changing order total?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "orderTotal",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "orderTotal",
                            "questionFingerprint": "pf-l04-knowledge-07"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l05",
                    "title": "Primitive Data Types and Representation",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "65 min",
                    "preview": false,
                    "description": "A data type describes what kind of value a program is working with and which operations make sense for it.",
                    "what": "A data type describes what kind of value a program is working with and which operations make sense for it.",
                    "why": "Text, numbers, booleans and missing values have different meanings; mixing them carelessly creates incorrect calculations and comparisons.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Choose a representation based on domain meaning, validate missing values and avoid assuming numeric-looking text is already numeric.",
                    "terminology": [
                        {
                            "term": "String",
                            "definition": "A key concept in Primitive Data Types and Representation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Number",
                            "definition": "A key concept in Primitive Data Types and Representation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Boolean",
                            "definition": "A key concept in Primitive Data Types and Representation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Null-like value",
                            "definition": "A key concept in Primitive Data Types and Representation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Type",
                            "definition": "A key concept in Primitive Data Types and Representation that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain primitive data types and representation in your own words.",
                        "Apply primitive data types and representation to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "A data type describes what kind of value a program is working with and which operations make sense for it.",
                        "Text, numbers, booleans and missing values have different meanings; mixing them carelessly creates incorrect calculations and comparisons.",
                        "Choose a representation based on domain meaning, validate missing values and avoid assuming numeric-looking text is already numeric.",
                        "Practical perspective: The string '5' and the number 5 may look similar to a user but behave differently in expressions.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Money, dates and identifiers often need specialised representations because raw numbers or strings can hide important domain rules."
                    ],
                    "examples": [
                        {
                            "id": "pf-l05-ex01",
                            "title": "Practical example",
                            "scenario": "The string '5' and the number 5 may look similar to a user but behave differently in expressions.",
                            "language": "text",
                            "code": "The string '5' and the number 5 may look similar to a user but behave differently in expressions.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l05-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Choose types for full name, age, active status, account balance and an optional phone number, then explain each choice.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l05-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Primitive Data Types and Representation to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying primitive data types and representation without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Primitive Data Types and Representation",
                        "content": [
                            "Money, dates and identifiers often need specialised representations because raw numbers or strings can hide important domain rules.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "The string '5' and the number 5 may look similar to a user but behave differently in expressions."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l05-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m02",
                            "lessonId": "pf-l05",
                            "topic": "pf-l05",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "Which value is a Boolean rather than text?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "false without quotation marks"
                            ],
                            "correctAnswer": 3,
                            "explanation": "false without quotation marks",
                            "questionFingerprint": "pf-l05-knowledge-08"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l06",
                    "title": "Conversion, Mutability, References, and Values",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Conversion changes representation; reference semantics explain how multiple names can point to the same structured value.",
                    "what": "Conversion changes representation; reference semantics explain how multiple names can point to the same structured value.",
                    "why": "Unexpected coercion and shared mutation are common sources of bugs in real applications.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Convert external input deliberately, distinguish copies from shared references and limit mutation when shared state would become confusing.",
                    "terminology": [
                        {
                            "term": "Conversion",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        },
                        {
                            "term": "Coercion",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        },
                        {
                            "term": "Reference",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        },
                        {
                            "term": "Mutation",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        },
                        {
                            "term": "Copy",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        },
                        {
                            "term": "Identity",
                            "definition": "A key concept in Conversion, Mutability, References, and Values that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain conversion, mutability, references, and values in your own words.",
                        "Apply conversion, mutability, references, and values to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Conversion changes representation; reference semantics explain how multiple names can point to the same structured value.",
                        "Unexpected coercion and shared mutation are common sources of bugs in real applications.",
                        "Convert external input deliberately, distinguish copies from shared references and limit mutation when shared state would become confusing.",
                        "Practical perspective: If const user = {points:10}; const other = user; other.points = 25; both names observe the same changed object.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Shallow copies duplicate only the outer structure; nested objects may still share references, which matters in state-management systems."
                    ],
                    "examples": [
                        {
                            "id": "pf-l06-ex01",
                            "title": "Practical example",
                            "scenario": "If const user = {points:10}; const other = user; other.points = 25; both names observe the same changed object.",
                            "language": "text",
                            "code": "If const user = {points:10}; const other = user; other.points = 25; both names observe the same changed object.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l06-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Explain why '10' + 5 may produce 105 and fix it using explicit numeric conversion.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l06-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Conversion, Mutability, References, and Values to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying conversion, mutability, references, and values without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Conversion, Mutability, References, and Values",
                        "content": [
                            "Shallow copies duplicate only the outer structure; nested objects may still share references, which matters in state-management systems.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "If const user = {points:10}; const other = user; other.points = 25; both names observe the same changed object."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l06-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m02",
                            "lessonId": "pf-l06",
                            "topic": "pf-l06",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "If two variables reference the same object, what can happen after one mutates a property?",
                            "options": [
                                "Both can observe the changed object",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Both can observe the changed object",
                            "questionFingerprint": "pf-l06-knowledge-09"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m02-lab",
                "access": "free",
                "title": "Variables, Data Types, and Memory Practical Lab",
                "type": "guided-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Variables, Data Types, and Memory in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m02-quiz",
                "access": "free",
                "title": "Variables, Data Types, and Memory Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m02-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m02",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on variables, names, assignment, and memory. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply variables, names, assignment, and memory, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply variables, names, assignment, and memory, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m02-module-quiz-01"
                    },
                    {
                        "id": "pf-m02-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m02",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on primitive data types and representation. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply primitive data types and representation, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply primitive data types and representation, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m02-module-quiz-02"
                    },
                    {
                        "id": "pf-m02-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m02",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on conversion, mutability, references, and values. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply conversion, mutability, references, and values, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply conversion, mutability, references, and values, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m02-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m02-assessment",
                "access": "free",
                "title": "Variables, Data Types, and Memory Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Variables, Data Types, and Memory. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m03",
            "title": "Operators, Expressions, and Logic",
            "order": 3,
            "access": "free",
            "description": "Expressions are the building blocks of calculations, comparisons, validation and the conditions that control program behaviour.",
            "why": "Expressions are the building blocks of calculations, comparisons, validation and the conditions that control program behaviour.",
            "outcomes": [
                "Explain the core ideas in Operators, Expressions, and Logic.",
                "Apply Operators, Expressions, and Logic to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l07",
                    "title": "Arithmetic, Expressions, and Precedence",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "55 min",
                    "preview": false,
                    "description": "An expression combines values, variables and operators to produce a result.",
                    "what": "An expression combines values, variables and operators to produce a result.",
                    "why": "Applications calculate totals, measurements, scores, discounts, dates and statistics constantly.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Break complex calculations into named intermediate values and use parentheses when they make order of operations clearer.",
                    "terminology": [
                        {
                            "term": "Operator",
                            "definition": "A key concept in Arithmetic, Expressions, and Precedence that the learner should be able to define and apply."
                        },
                        {
                            "term": "Operand",
                            "definition": "A key concept in Arithmetic, Expressions, and Precedence that the learner should be able to define and apply."
                        },
                        {
                            "term": "Expression",
                            "definition": "A key concept in Arithmetic, Expressions, and Precedence that the learner should be able to define and apply."
                        },
                        {
                            "term": "Precedence",
                            "definition": "A key concept in Arithmetic, Expressions, and Precedence that the learner should be able to define and apply."
                        },
                        {
                            "term": "Modulo",
                            "definition": "A key concept in Arithmetic, Expressions, and Precedence that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain arithmetic, expressions, and precedence in your own words.",
                        "Apply arithmetic, expressions, and precedence to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "An expression combines values, variables and operators to produce a result.",
                        "Applications calculate totals, measurements, scores, discounts, dates and statistics constantly.",
                        "Break complex calculations into named intermediate values and use parentheses when they make order of operations clearer.",
                        "Practical perspective: subtotal, discount, tax and finalTotal can be calculated in separate named steps rather than one unreadable expression.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Numerical robustness includes rounding policy, division-by-zero handling and choosing safe numeric representations for money."
                    ],
                    "examples": [
                        {
                            "id": "pf-l07-ex01",
                            "title": "Practical example",
                            "scenario": "subtotal, discount, tax and finalTotal can be calculated in separate named steps rather than one unreadable expression.",
                            "language": "text",
                            "code": "subtotal, discount, tax and finalTotal can be calculated in separate named steps rather than one unreadable expression.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l07-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Build a VAT-inclusive invoice total using subtotal, discount, tax and finalTotal intermediate variables.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l07-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Arithmetic, Expressions, and Precedence to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying arithmetic, expressions, and precedence without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Arithmetic, Expressions, and Precedence",
                        "content": [
                            "Numerical robustness includes rounding policy, division-by-zero handling and choosing safe numeric representations for money.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "subtotal, discount, tax and finalTotal can be calculated in separate named steps rather than one unreadable expression."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l07-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m03",
                            "lessonId": "pf-l07",
                            "topic": "pf-l07",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "What does modulo commonly return?",
                            "options": [
                                "The remainder after division",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "The remainder after division",
                            "questionFingerprint": "pf-l07-knowledge-13"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l08",
                    "title": "Comparison, Equality, and Boundaries",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "60 min",
                    "preview": false,
                    "description": "Comparison operators evaluate relationships such as equality, inequality and ordering and produce Boolean results.",
                    "what": "Comparison operators evaluate relationships such as equality, inequality and ordering and produce Boolean results.",
                    "why": "Boundary mistakes such as > instead of >= can silently reject valid users or allow invalid values.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Translate wording precisely, compare compatible types and always test just below, at and above important boundaries.",
                    "terminology": [
                        {
                            "term": "Equality",
                            "definition": "A key concept in Comparison, Equality, and Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Inequality",
                            "definition": "A key concept in Comparison, Equality, and Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Ordering",
                            "definition": "A key concept in Comparison, Equality, and Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Strict equality",
                            "definition": "A key concept in Comparison, Equality, and Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Boundary",
                            "definition": "A key concept in Comparison, Equality, and Boundaries that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain comparison, equality, and boundaries in your own words.",
                        "Apply comparison, equality, and boundaries to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Comparison operators evaluate relationships such as equality, inequality and ordering and produce Boolean results.",
                        "Boundary mistakes such as > instead of >= can silently reject valid users or allow invalid values.",
                        "Translate wording precisely, compare compatible types and always test just below, at and above important boundaries.",
                        "Practical perspective: A rule saying '18 or older' should include age 18; age > 18 does not.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Equality may mean value equality, strict type-and-value equality or object identity depending on language and data structure."
                    ],
                    "examples": [
                        {
                            "id": "pf-l08-ex01",
                            "title": "Practical example",
                            "scenario": "A rule saying '18 or older' should include age 18; age > 18 does not.",
                            "language": "text",
                            "code": "A rule saying '18 or older' should include age 18; age > 18 does not.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l08-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "For a score range 0-100 inclusive, write five boundary-focused test values and expected outcomes.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l08-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Comparison, Equality, and Boundaries to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying comparison, equality, and boundaries without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Comparison, Equality, and Boundaries",
                        "content": [
                            "Equality may mean value equality, strict type-and-value equality or object identity depending on language and data structure.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A rule saying '18 or older' should include age 18; age > 18 does not."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l08-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m03",
                            "lessonId": "pf-l08",
                            "topic": "pf-l08",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "Which comparison matches '70 or higher'?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "score >= 70",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "score >= 70",
                            "questionFingerprint": "pf-l08-knowledge-14"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l09",
                    "title": "Logical Operators and Compound Expressions",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "65 min",
                    "preview": false,
                    "description": "Logical operators combine or invert Boolean expressions so programs can represent multi-part rules.",
                    "what": "Logical operators combine or invert Boolean expressions so programs can represent multi-part rules.",
                    "why": "Real requirements often say all conditions must hold, any permitted condition may hold, or a condition must not hold.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Name each predicate clearly, combine with AND/OR/NOT, use parentheses and verify combinations using concrete scenarios or truth tables.",
                    "terminology": [
                        {
                            "term": "AND",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        },
                        {
                            "term": "OR",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        },
                        {
                            "term": "NOT",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Short-circuiting",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Predicate",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        },
                        {
                            "term": "Truth table",
                            "definition": "A key concept in Logical Operators and Compound Expressions that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain logical operators and compound expressions in your own words.",
                        "Apply logical operators and compound expressions to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Logical operators combine or invert Boolean expressions so programs can represent multi-part rules.",
                        "Real requirements often say all conditions must hold, any permitted condition may hold, or a condition must not hold.",
                        "Name each predicate clearly, combine with AND/OR/NOT, use parentheses and verify combinations using concrete scenarios or truth tables.",
                        "Practical perspective: canPay = accountActive && balanceSufficient represents two mandatory requirements.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: De Morgan's laws and short-circuit evaluation help reason about complex policies, but readability should remain more important than cleverness."
                    ],
                    "examples": [
                        {
                            "id": "pf-l09-ex01",
                            "title": "Practical example",
                            "scenario": "canPay = accountActive && balanceSufficient represents two mandatory requirements.",
                            "language": "text",
                            "code": "canPay = accountActive && balanceSufficient represents two mandatory requirements.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l09-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Create a truth table for isVerified && !accountLocked and explain every row.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l09-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Logical Operators and Compound Expressions to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying logical operators and compound expressions without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Logical Operators and Compound Expressions",
                        "content": [
                            "De Morgan's laws and short-circuit evaluation help reason about complex policies, but readability should remain more important than cleverness.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "canPay = accountActive && balanceSufficient represents two mandatory requirements."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l09-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m03",
                            "lessonId": "pf-l09",
                            "topic": "pf-l09",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "If both accountActive and balanceSufficient are required, which logical relationship fits?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "AND",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "AND",
                            "questionFingerprint": "pf-l09-knowledge-15"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m03-lab",
                "access": "free",
                "title": "Operators, Expressions, and Logic Practical Lab",
                "type": "guided-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Operators, Expressions, and Logic in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m03-quiz",
                "access": "free",
                "title": "Operators, Expressions, and Logic Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m03-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m03",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on arithmetic, expressions, and precedence. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply arithmetic, expressions, and precedence, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply arithmetic, expressions, and precedence, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m03-module-quiz-01"
                    },
                    {
                        "id": "pf-m03-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m03",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on comparison, equality, and boundaries. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply comparison, equality, and boundaries, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply comparison, equality, and boundaries, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m03-module-quiz-02"
                    },
                    {
                        "id": "pf-m03-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m03",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "intermediate",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on logical operators and compound expressions. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply logical operators and compound expressions, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply logical operators and compound expressions, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m03-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m03-assessment",
                "access": "free",
                "title": "Operators, Expressions, and Logic Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Operators, Expressions, and Logic. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m04",
            "title": "Decision Making and Validation",
            "order": 4,
            "access": "free",
            "description": "Programs must choose behaviour safely based on user data, business rules, permissions, limits and changing application state.",
            "why": "Programs must choose behaviour safely based on user data, business rules, permissions, limits and changing application state.",
            "outcomes": [
                "Explain the core ideas in Decision Making and Validation.",
                "Apply Decision Making and Validation to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l10",
                    "title": "Boolean Reasoning and Truth Tables",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "60 min",
                    "preview": false,
                    "description": "Boolean reasoning represents facts and rules as true/false statements and analyses how they combine.",
                    "what": "Boolean reasoning represents facts and rules as true/false statements and analyses how they combine.",
                    "why": "Many serious logic defects are valid syntax but incorrect models of the business rule.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Extract named predicates, build truth tables and look for impossible, overlapping or always-true expressions.",
                    "terminology": [
                        {
                            "term": "Predicate",
                            "definition": "A key concept in Boolean Reasoning and Truth Tables that the learner should be able to define and apply."
                        },
                        {
                            "term": "Truth table",
                            "definition": "A key concept in Boolean Reasoning and Truth Tables that the learner should be able to define and apply."
                        },
                        {
                            "term": "Tautology",
                            "definition": "A key concept in Boolean Reasoning and Truth Tables that the learner should be able to define and apply."
                        },
                        {
                            "term": "Contradiction",
                            "definition": "A key concept in Boolean Reasoning and Truth Tables that the learner should be able to define and apply."
                        },
                        {
                            "term": "Negation",
                            "definition": "A key concept in Boolean Reasoning and Truth Tables that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain boolean reasoning and truth tables in your own words.",
                        "Apply boolean reasoning and truth tables to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Boolean reasoning represents facts and rules as true/false statements and analyses how they combine.",
                        "Many serious logic defects are valid syntax but incorrect models of the business rule.",
                        "Extract named predicates, build truth tables and look for impossible, overlapping or always-true expressions.",
                        "Practical perspective: score >= 80 && score < 80 is a contradiction; age >= 18 || age < 18 is almost always true for ordinary numeric ages.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Complex authorisation logic is often represented using policies or decision tables rather than deeply nested raw Boolean expressions."
                    ],
                    "examples": [
                        {
                            "id": "pf-l10-ex01",
                            "title": "Practical example",
                            "scenario": "score >= 80 && score < 80 is a contradiction; age >= 18 || age < 18 is almost always true for ordinary numeric ages.",
                            "language": "text",
                            "code": "score >= 80 && score < 80 is a contradiction; age >= 18 || age < 18 is almost always true for ordinary numeric ages.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l10-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Build a truth table for hasTicket || isStaff, then identify every case where entry should be allowed.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l10-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Boolean Reasoning and Truth Tables to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying boolean reasoning and truth tables without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Boolean Reasoning and Truth Tables",
                        "content": [
                            "Complex authorisation logic is often represented using policies or decision tables rather than deeply nested raw Boolean expressions.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "score >= 80 && score < 80 is a contradiction; age >= 18 || age < 18 is almost always true for ordinary numeric ages."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l10-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m04",
                            "lessonId": "pf-l10",
                            "topic": "pf-l10",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which expression is impossible for one numeric score?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "score >= 50 && score < 50",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "score >= 50 && score < 50",
                            "questionFingerprint": "pf-l10-knowledge-19"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l11",
                    "title": "If, Else, Guard Clauses, and Decision Trees",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "65 min",
                    "preview": false,
                    "description": "Conditional control flow selects different instruction paths based on Boolean conditions.",
                    "what": "Conditional control flow selects different instruction paths based on Boolean conditions.",
                    "why": "Applications need clear branches for success, denial, invalid input and alternative states.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Check invalid states early with guard clauses, order specific rules carefully and use decision trees before coding complex branching.",
                    "terminology": [
                        {
                            "term": "Branch",
                            "definition": "A key concept in If, Else, Guard Clauses, and Decision Trees that the learner should be able to define and apply."
                        },
                        {
                            "term": "Guard clause",
                            "definition": "A key concept in If, Else, Guard Clauses, and Decision Trees that the learner should be able to define and apply."
                        },
                        {
                            "term": "Else-if chain",
                            "definition": "A key concept in If, Else, Guard Clauses, and Decision Trees that the learner should be able to define and apply."
                        },
                        {
                            "term": "Decision tree",
                            "definition": "A key concept in If, Else, Guard Clauses, and Decision Trees that the learner should be able to define and apply."
                        },
                        {
                            "term": "Unreachable branch",
                            "definition": "A key concept in If, Else, Guard Clauses, and Decision Trees that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain if, else, guard clauses, and decision trees in your own words.",
                        "Apply if, else, guard clauses, and decision trees to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Conditional control flow selects different instruction paths based on Boolean conditions.",
                        "Applications need clear branches for success, denial, invalid input and alternative states.",
                        "Check invalid states early with guard clauses, order specific rules carefully and use decision trees before coding complex branching.",
                        "Practical perspective: A withdrawal function can reject non-positive amounts and insufficient funds before executing the normal approval path.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Decision tables can outperform nested if statements when many independent conditions create numerous combinations."
                    ],
                    "examples": [
                        {
                            "id": "pf-l11-ex01",
                            "title": "Practical example",
                            "scenario": "A withdrawal function can reject non-positive amounts and insufficient funds before executing the normal approval path.",
                            "language": "text",
                            "code": "A withdrawal function can reject non-positive amounts and insufficient funds before executing the normal approval path.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l11-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Design a login decision tree containing locked account, wrong credentials, unverified user and success.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l11-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply If, Else, Guard Clauses, and Decision Trees to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying if, else, guard clauses, and decision trees without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: If, Else, Guard Clauses, and Decision Trees",
                        "content": [
                            "Decision tables can outperform nested if statements when many independent conditions create numerous combinations.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A withdrawal function can reject non-positive amounts and insufficient funds before executing the normal approval path."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l11-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m04",
                            "lessonId": "pf-l11",
                            "topic": "pf-l11",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "What is a common benefit of guard clauses?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "They reduce deep nesting by handling invalid cases early"
                            ],
                            "correctAnswer": 3,
                            "explanation": "They reduce deep nesting by handling invalid cases early",
                            "questionFingerprint": "pf-l11-knowledge-20"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l12",
                    "title": "Validation, Invariants, and Edge Cases",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "75 min",
                    "preview": false,
                    "description": "Validation checks whether data satisfies required rules; invariants describe conditions that must remain true in valid program state.",
                    "what": "Validation checks whether data satisfies required rules; invariants describe conditions that must remain true in valid program state.",
                    "why": "Most real defects appear at boundaries, missing data and unusual combinations rather than the happy path.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Validate type, range and business constraints before mutation, protect invariants and test minimum, maximum and invalid values.",
                    "terminology": [
                        {
                            "term": "Validation",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        },
                        {
                            "term": "Invariant",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        },
                        {
                            "term": "Edge case",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        },
                        {
                            "term": "Happy path",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        },
                        {
                            "term": "Precondition",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        },
                        {
                            "term": "Postcondition",
                            "definition": "A key concept in Validation, Invariants, and Edge Cases that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain validation, invariants, and edge cases in your own words.",
                        "Apply validation, invariants, and edge cases to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Validation checks whether data satisfies required rules; invariants describe conditions that must remain true in valid program state.",
                        "Most real defects appear at boundaries, missing data and unusual combinations rather than the happy path.",
                        "Validate type, range and business constraints before mutation, protect invariants and test minimum, maximum and invalid values.",
                        "Practical perspective: A non-overdraft account can protect balance >= 0 by rejecting a withdrawal before the state change.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Design-by-contract thinking distinguishes preconditions, postconditions and invariants and helps make state transitions auditable."
                    ],
                    "examples": [
                        {
                            "id": "pf-l12-ex01",
                            "title": "Practical example",
                            "scenario": "A non-overdraft account can protect balance >= 0 by rejecting a withdrawal before the state change.",
                            "language": "text",
                            "code": "A non-overdraft account can protect balance >= 0 by rejecting a withdrawal before the state change.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l12-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "List ten edge cases for an online-order quantity field and define how each should be handled.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l12-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Validation, Invariants, and Edge Cases to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying validation, invariants, and edge cases without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Validation, Invariants, and Edge Cases",
                        "content": [
                            "Design-by-contract thinking distinguishes preconditions, postconditions and invariants and helps make state transitions auditable.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A non-overdraft account can protect balance >= 0 by rejecting a withdrawal before the state change."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l12-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m04",
                            "lessonId": "pf-l12",
                            "topic": "pf-l12",
                            "objective": "apply-and-explain",
                            "difficulty": "intermediate",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "For an allowed range 1-10 inclusive, which test set best targets boundaries?",
                            "options": [
                                "0, 1, 10 and 11",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "0, 1, 10 and 11",
                            "questionFingerprint": "pf-l12-knowledge-21"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m04-lab",
                "access": "free",
                "title": "Decision Making and Validation Practical Lab",
                "type": "guided-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Decision Making and Validation in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m04-quiz",
                "access": "free",
                "title": "Decision Making and Validation Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m04-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m04",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on boolean reasoning and truth tables. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply boolean reasoning and truth tables, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply boolean reasoning and truth tables, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m04-module-quiz-01"
                    },
                    {
                        "id": "pf-m04-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m04",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on if, else, guard clauses, and decision trees. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply if, else, guard clauses, and decision trees, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply if, else, guard clauses, and decision trees, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m04-module-quiz-02"
                    },
                    {
                        "id": "pf-m04-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m04",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on validation, invariants, and edge cases. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply validation, invariants, and edge cases, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply validation, invariants, and edge cases, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m04-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m04-assessment",
                "access": "free",
                "title": "Decision Making and Validation Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Decision Making and Validation. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m05",
            "title": "Loops and Iteration",
            "order": 5,
            "access": "free",
            "description": "Iteration lets programs process changing quantities of data without duplicated code and is central to collections, files, APIs and batch processing.",
            "why": "Iteration lets programs process changing quantities of data without duplicated code and is central to collections, files, APIs and batch processing.",
            "outcomes": [
                "Explain the core ideas in Loops and Iteration.",
                "Apply Loops and Iteration to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l13",
                    "title": "Iteration, Counters, and Accumulators",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "55 min",
                    "preview": false,
                    "description": "Iteration repeats a unit of work while counters track repetitions and accumulators combine results.",
                    "what": "Iteration repeats a unit of work while counters track repetitions and accumulators combine results.",
                    "why": "Programs routinely process lists of users, transactions, messages, records and events.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Define initial state, a continuation rule, repeated work and an update that moves execution toward termination.",
                    "terminology": [
                        {
                            "term": "Iteration",
                            "definition": "A key concept in Iteration, Counters, and Accumulators that the learner should be able to define and apply."
                        },
                        {
                            "term": "Loop body",
                            "definition": "A key concept in Iteration, Counters, and Accumulators that the learner should be able to define and apply."
                        },
                        {
                            "term": "Counter",
                            "definition": "A key concept in Iteration, Counters, and Accumulators that the learner should be able to define and apply."
                        },
                        {
                            "term": "Accumulator",
                            "definition": "A key concept in Iteration, Counters, and Accumulators that the learner should be able to define and apply."
                        },
                        {
                            "term": "Termination condition",
                            "definition": "A key concept in Iteration, Counters, and Accumulators that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain iteration, counters, and accumulators in your own words.",
                        "Apply iteration, counters, and accumulators to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Iteration repeats a unit of work while counters track repetitions and accumulators combine results.",
                        "Programs routinely process lists of users, transactions, messages, records and events.",
                        "Define initial state, a continuation rule, repeated work and an update that moves execution toward termination.",
                        "Practical perspective: A running total starts at zero and adds each transaction amount during traversal.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Loop invariants provide a formal way to reason about what remains true before and after every iteration."
                    ],
                    "examples": [
                        {
                            "id": "pf-l13-ex01",
                            "title": "Practical example",
                            "scenario": "A running total starts at zero and adds each transaction amount during traversal.",
                            "language": "text",
                            "code": "A running total starts at zero and adds each transaction amount during traversal.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l13-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Design a loop that counts passing scores and separately accumulates their total.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l13-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Iteration, Counters, and Accumulators to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying iteration, counters, and accumulators without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Iteration, Counters, and Accumulators",
                        "content": [
                            "Loop invariants provide a formal way to reason about what remains true before and after every iteration.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A running total starts at zero and adds each transaction amount during traversal."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l13-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m05",
                            "lessonId": "pf-l13",
                            "topic": "pf-l13",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Which variable pattern stores a running total?",
                            "options": [
                                "An accumulator",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "An accumulator",
                            "questionFingerprint": "pf-l13-knowledge-25"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l14",
                    "title": "While Loops, Sentinels, Retries, and Termination",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "65 min",
                    "preview": false,
                    "description": "A while-style loop repeats based on changing state rather than a fixed item count.",
                    "what": "A while-style loop repeats based on changing state rather than a fixed item count.",
                    "why": "Retry, user-input and stream-processing flows often cannot know in advance exactly how many iterations will occur.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Use a termination condition, update loop state, apply retry limits and introduce timeouts or backoff for external operations.",
                    "terminology": [
                        {
                            "term": "Sentinel",
                            "definition": "A key concept in While Loops, Sentinels, Retries, and Termination that the learner should be able to define and apply."
                        },
                        {
                            "term": "Retry loop",
                            "definition": "A key concept in While Loops, Sentinels, Retries, and Termination that the learner should be able to define and apply."
                        },
                        {
                            "term": "Infinite loop",
                            "definition": "A key concept in While Loops, Sentinels, Retries, and Termination that the learner should be able to define and apply."
                        },
                        {
                            "term": "Timeout",
                            "definition": "A key concept in While Loops, Sentinels, Retries, and Termination that the learner should be able to define and apply."
                        },
                        {
                            "term": "Backoff",
                            "definition": "A key concept in While Loops, Sentinels, Retries, and Termination that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain while loops, sentinels, retries, and termination in your own words.",
                        "Apply while loops, sentinels, retries, and termination to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "A while-style loop repeats based on changing state rather than a fixed item count.",
                        "Retry, user-input and stream-processing flows often cannot know in advance exactly how many iterations will occur.",
                        "Use a termination condition, update loop state, apply retry limits and introduce timeouts or backoff for external operations.",
                        "Practical perspective: Retry authentication while !authenticated && attempts < 3 rather than looping forever.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Distributed retries require idempotency awareness because repeating a request can accidentally repeat side effects such as payments."
                    ],
                    "examples": [
                        {
                            "id": "pf-l14-ex01",
                            "title": "Practical example",
                            "scenario": "Retry authentication while !authenticated && attempts < 3 rather than looping forever.",
                            "language": "text",
                            "code": "Retry authentication while !authenticated && attempts < 3 rather than looping forever.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l14-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Write pseudocode for retrying a network request at most five times with increasing delay.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l14-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply While Loops, Sentinels, Retries, and Termination to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying while loops, sentinels, retries, and termination without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: While Loops, Sentinels, Retries, and Termination",
                        "content": [
                            "Distributed retries require idempotency awareness because repeating a request can accidentally repeat side effects such as payments.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "Retry authentication while !authenticated && attempts < 3 rather than looping forever."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l14-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m05",
                            "lessonId": "pf-l14",
                            "topic": "pf-l14",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "What is the safest retry design?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A bounded retry with delay/backoff and a clear failure outcome",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "A bounded retry with delay/backoff and a clear failure outcome",
                            "questionFingerprint": "pf-l14-knowledge-26"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l15",
                    "title": "For Loops and Higher-Level Iteration Patterns",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "75 min",
                    "preview": false,
                    "description": "For-style iteration traverses known ranges or collections, while map/filter/find/reduce express common higher-level intentions.",
                    "what": "For-style iteration traverses known ranges or collections, while map/filter/find/reduce express common higher-level intentions.",
                    "why": "Collection processing becomes clearer and more scalable when developers recognise standard iteration patterns.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Choose direct loops for explicit control and higher-level operations when they communicate the purpose more clearly.",
                    "terminology": [
                        {
                            "term": "Traversal",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        },
                        {
                            "term": "Nested loop",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        },
                        {
                            "term": "Map",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        },
                        {
                            "term": "Filter",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        },
                        {
                            "term": "Find",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        },
                        {
                            "term": "Reduce",
                            "definition": "A key concept in For Loops and Higher-Level Iteration Patterns that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain for loops and higher-level iteration patterns in your own words.",
                        "Apply for loops and higher-level iteration patterns to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "For-style iteration traverses known ranges or collections, while map/filter/find/reduce express common higher-level intentions.",
                        "Collection processing becomes clearer and more scalable when developers recognise standard iteration patterns.",
                        "Choose direct loops for explicit control and higher-level operations when they communicate the purpose more clearly.",
                        "Practical perspective: filter selects active users; map converts those users to email strings; reduce can total balances.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Nested full scans may approach quadratic work; sets and maps can replace repeated searching with keyed or membership lookup."
                    ],
                    "examples": [
                        {
                            "id": "pf-l15-ex01",
                            "title": "Practical example",
                            "scenario": "filter selects active users; map converts those users to email strings; reduce can total balances.",
                            "language": "text",
                            "code": "filter selects active users; map converts those users to email strings; reduce can total balances.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l15-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Choose find/filter/map/reduce for four different collection requirements, then implement one using a normal loop as comparison.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l15-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply For Loops and Higher-Level Iteration Patterns to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying for loops and higher-level iteration patterns without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: For Loops and Higher-Level Iteration Patterns",
                        "content": [
                            "Nested full scans may approach quadratic work; sets and maps can replace repeated searching with keyed or membership lookup.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "filter selects active users; map converts those users to email strings; reduce can total balances."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l15-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m05",
                            "lessonId": "pf-l15",
                            "topic": "pf-l15",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which operation best means 'keep only active users'?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "filter",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "filter",
                            "questionFingerprint": "pf-l15-knowledge-27"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m05-lab",
                "access": "free",
                "title": "Loops and Iteration Practical Lab",
                "type": "guided-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Loops and Iteration in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m05-quiz",
                "access": "free",
                "title": "Loops and Iteration Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m05-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m05",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on iteration, counters, and accumulators. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply iteration, counters, and accumulators, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply iteration, counters, and accumulators, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m05-module-quiz-01"
                    },
                    {
                        "id": "pf-m05-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m05",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on while loops, sentinels, retries, and termination. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply while loops, sentinels, retries, and termination, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply while loops, sentinels, retries, and termination, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m05-module-quiz-02"
                    },
                    {
                        "id": "pf-m05-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m05",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on for loops and higher-level iteration patterns. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply for loops and higher-level iteration patterns, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply for loops and higher-level iteration patterns, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m05-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m05-assessment",
                "access": "free",
                "title": "Loops and Iteration Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Loops and Iteration. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m06",
            "title": "Functions, Scope, and Reusable Logic",
            "order": 6,
            "access": "free",
            "description": "Functions are the main tool for decomposing programs into focused behaviour with explicit inputs, outputs and boundaries.",
            "why": "Functions are the main tool for decomposing programs into focused behaviour with explicit inputs, outputs and boundaries.",
            "outcomes": [
                "Explain the core ideas in Functions, Scope, and Reusable Logic.",
                "Apply Functions, Scope, and Reusable Logic to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l16",
                    "title": "Functions and Single Responsibilities",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "60 min",
                    "preview": false,
                    "description": "A function is a named unit of behaviour that can receive input, perform work and optionally produce a result.",
                    "what": "A function is a named unit of behaviour that can receive input, perform work and optionally produce a result.",
                    "why": "Focused functions reduce duplication, create useful abstractions and make programs easier to test and change.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Identify one coherent responsibility, give it a meaningful name and keep unrelated side effects outside the function when practical.",
                    "terminology": [
                        {
                            "term": "Function",
                            "definition": "A key concept in Functions and Single Responsibilities that the learner should be able to define and apply."
                        },
                        {
                            "term": "Call",
                            "definition": "A key concept in Functions and Single Responsibilities that the learner should be able to define and apply."
                        },
                        {
                            "term": "Responsibility",
                            "definition": "A key concept in Functions and Single Responsibilities that the learner should be able to define and apply."
                        },
                        {
                            "term": "Abstraction",
                            "definition": "A key concept in Functions and Single Responsibilities that the learner should be able to define and apply."
                        },
                        {
                            "term": "Side effect",
                            "definition": "A key concept in Functions and Single Responsibilities that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain functions and single responsibilities in your own words.",
                        "Apply functions and single responsibilities to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "A function is a named unit of behaviour that can receive input, perform work and optionally produce a result.",
                        "Focused functions reduce duplication, create useful abstractions and make programs easier to test and change.",
                        "Identify one coherent responsibility, give it a meaningful name and keep unrelated side effects outside the function when practical.",
                        "Practical perspective: calculateTotal(price, quantity) communicates the meaning of price * quantity and can be reused.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: A function interface is a small API contract; strong contracts reduce coupling between the caller and implementation details."
                    ],
                    "examples": [
                        {
                            "id": "pf-l16-ex01",
                            "title": "Practical example",
                            "scenario": "calculateTotal(price, quantity) communicates the meaning of price * quantity and can be reused.",
                            "language": "text",
                            "code": "calculateTotal(price, quantity) communicates the meaning of price * quantity and can be reused.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l16-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Refactor repeated discount calculations into one clearly named function.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l16-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Functions and Single Responsibilities to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying functions and single responsibilities without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Functions and Single Responsibilities",
                        "content": [
                            "A function interface is a small API contract; strong contracts reduce coupling between the caller and implementation details.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "calculateTotal(price, quantity) communicates the meaning of price * quantity and can be reused."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l16-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m06",
                            "lessonId": "pf-l16",
                            "topic": "pf-l16",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which function name most strongly communicates one responsibility?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "calculateInvoiceTotal",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "calculateInvoiceTotal",
                            "questionFingerprint": "pf-l16-knowledge-31"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l17",
                    "title": "Parameters, Arguments, Returns, and Contracts",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "65 min",
                    "preview": false,
                    "description": "Parameters define expected inputs, arguments are supplied values and return values communicate results back to callers.",
                    "what": "Parameters define expected inputs, arguments are supplied values and return values communicate results back to callers.",
                    "why": "Explicit function contracts reduce hidden dependencies and make reuse and testing more predictable.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Pass required dependencies explicitly, validate assumptions where appropriate and return consistent results.",
                    "terminology": [
                        {
                            "term": "Parameter",
                            "definition": "A key concept in Parameters, Arguments, Returns, and Contracts that the learner should be able to define and apply."
                        },
                        {
                            "term": "Argument",
                            "definition": "A key concept in Parameters, Arguments, Returns, and Contracts that the learner should be able to define and apply."
                        },
                        {
                            "term": "Return value",
                            "definition": "A key concept in Parameters, Arguments, Returns, and Contracts that the learner should be able to define and apply."
                        },
                        {
                            "term": "Precondition",
                            "definition": "A key concept in Parameters, Arguments, Returns, and Contracts that the learner should be able to define and apply."
                        },
                        {
                            "term": "Postcondition",
                            "definition": "A key concept in Parameters, Arguments, Returns, and Contracts that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain parameters, arguments, returns, and contracts in your own words.",
                        "Apply parameters, arguments, returns, and contracts to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Parameters define expected inputs, arguments are supplied values and return values communicate results back to callers.",
                        "Explicit function contracts reduce hidden dependencies and make reuse and testing more predictable.",
                        "Pass required dependencies explicitly, validate assumptions where appropriate and return consistent results.",
                        "Practical perspective: calculateShipping(weightKg, ratePerKg) exposes both inputs instead of reading hidden global values.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Error strategies vary across languages: exceptions, result objects, option types and error codes are all contract design choices."
                    ],
                    "examples": [
                        {
                            "id": "pf-l17-ex01",
                            "title": "Practical example",
                            "scenario": "calculateShipping(weightKg, ratePerKg) exposes both inputs instead of reading hidden global values.",
                            "language": "text",
                            "code": "calculateShipping(weightKg, ratePerKg) exposes both inputs instead of reading hidden global values.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l17-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Design a canWithdraw(balance, amount) function contract including invalid-input behaviour.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l17-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Parameters, Arguments, Returns, and Contracts to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying parameters, arguments, returns, and contracts without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Parameters, Arguments, Returns, and Contracts",
                        "content": [
                            "Error strategies vary across languages: exceptions, result objects, option types and error codes are all contract design choices.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "calculateShipping(weightKg, ratePerKg) exposes both inputs instead of reading hidden global values."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l17-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m06",
                            "lessonId": "pf-l17",
                            "topic": "pf-l17",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "Why is returning a value generally more reusable than only printing it?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "The caller can store, test, transform or pass the returned value onward"
                            ],
                            "correctAnswer": 3,
                            "explanation": "The caller can store, test, transform or pass the returned value onward",
                            "questionFingerprint": "pf-l17-knowledge-32"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l18",
                    "title": "Scope, Pure Functions, Composition, and Recursion",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "Scope controls name visibility; pure functions minimise hidden state; composition combines focused behaviour; recursion solves a problem using smaller versions of itself.",
                    "what": "Scope controls name visibility; pure functions minimise hidden state; composition combines focused behaviour; recursion solves a problem using smaller versions of itself.",
                    "why": "These concepts prepare learners for modular, functional and object-oriented design and make complex programs easier to reason about.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Keep variables local, pass dependencies explicitly, compose small functions and ensure recursive calls always approach a base case.",
                    "terminology": [
                        {
                            "term": "Scope",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Local variable",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Global state",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Pure function",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Composition",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Recursion",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        },
                        {
                            "term": "Base case",
                            "definition": "A key concept in Scope, Pure Functions, Composition, and Recursion that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain scope, pure functions, composition, and recursion in your own words.",
                        "Apply scope, pure functions, composition, and recursion to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Scope controls name visibility; pure functions minimise hidden state; composition combines focused behaviour; recursion solves a problem using smaller versions of itself.",
                        "These concepts prepare learners for modular, functional and object-oriented design and make complex programs easier to reason about.",
                        "Keep variables local, pass dependencies explicitly, compose small functions and ensure recursive calls always approach a base case.",
                        "Practical perspective: A recursive countdown stops when n <= 0; without a base case it would continue calling itself.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Recursive elegance does not guarantee runtime efficiency; some problems need iteration, memoisation or explicit data structures."
                    ],
                    "examples": [
                        {
                            "id": "pf-l18-ex01",
                            "title": "Practical example",
                            "scenario": "A recursive countdown stops when n <= 0; without a base case it would continue calling itself.",
                            "language": "text",
                            "code": "A recursive countdown stops when n <= 0; without a base case it would continue calling itself.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l18-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Rewrite a function that depends on two globals so both dependencies become parameters, then identify whether it is now pure.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l18-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Scope, Pure Functions, Composition, and Recursion to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying scope, pure functions, composition, and recursion without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Scope, Pure Functions, Composition, and Recursion",
                        "content": [
                            "Recursive elegance does not guarantee runtime efficiency; some problems need iteration, memoisation or explicit data structures.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A recursive countdown stops when n <= 0; without a base case it would continue calling itself."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l18-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m06",
                            "lessonId": "pf-l18",
                            "topic": "pf-l18",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "What prevents well-designed recursion from continuing forever?",
                            "options": [
                                "A base case",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "A base case",
                            "questionFingerprint": "pf-l18-knowledge-33"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m06-lab",
                "access": "free",
                "title": "Functions, Scope, and Reusable Logic Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Functions, Scope, and Reusable Logic in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m06-quiz",
                "access": "free",
                "title": "Functions, Scope, and Reusable Logic Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m06-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m06",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on functions and single responsibilities. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply functions and single responsibilities, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply functions and single responsibilities, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m06-module-quiz-01"
                    },
                    {
                        "id": "pf-m06-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m06",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on parameters, arguments, returns, and contracts. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply parameters, arguments, returns, and contracts, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply parameters, arguments, returns, and contracts, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m06-module-quiz-02"
                    },
                    {
                        "id": "pf-m06-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m06",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on scope, pure functions, composition, and recursion. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply scope, pure functions, composition, and recursion, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply scope, pure functions, composition, and recursion, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m06-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m06-assessment",
                "access": "free",
                "title": "Functions, Scope, and Reusable Logic Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Functions, Scope, and Reusable Logic. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m07",
            "title": "Collections and Structured Data",
            "order": 7,
            "access": "free",
            "description": "Real application data is grouped into sequences, records and lookup structures rather than isolated single values.",
            "why": "Real application data is grouped into sequences, records and lookup structures rather than isolated single values.",
            "outcomes": [
                "Explain the core ideas in Collections and Structured Data.",
                "Apply Collections and Structured Data to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l19",
                    "title": "Arrays and Lists",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "beginner",
                    "duration": "65 min",
                    "preview": false,
                    "description": "Arrays and lists represent ordered collections whose items can be accessed and processed together.",
                    "what": "Arrays and lists represent ordered collections whose items can be accessed and processed together.",
                    "why": "Applications handle many related values such as products, users, scores, transactions and messages.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Use indexes carefully, prefer direct traversal when the index is unnecessary and test empty and boundary positions.",
                    "terminology": [
                        {
                            "term": "Collection",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        },
                        {
                            "term": "Array",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        },
                        {
                            "term": "List",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        },
                        {
                            "term": "Index",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        },
                        {
                            "term": "Length",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        },
                        {
                            "term": "Traversal",
                            "definition": "A key concept in Arrays and Lists that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain arrays and lists in your own words.",
                        "Apply arrays and lists to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Arrays and lists represent ordered collections whose items can be accessed and processed together.",
                        "Applications handle many related values such as products, users, scores, transactions and messages.",
                        "Use indexes carefully, prefer direct traversal when the index is unnecessary and test empty and boundary positions.",
                        "Practical perspective: In a zero-indexed array with length 5, valid indexes are 0 through 4.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Different collection implementations trade random access, insertion cost, memory layout and mutation behaviour."
                    ],
                    "examples": [
                        {
                            "id": "pf-l19-ex01",
                            "title": "Practical example",
                            "scenario": "In a zero-indexed array with length 5, valid indexes are 0 through 4.",
                            "language": "text",
                            "code": "In a zero-indexed array with length 5, valid indexes are 0 through 4.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l19-pr01",
                            "title": "Guided practice",
                            "difficulty": "beginner",
                            "task": "Store five temperatures in one collection and calculate minimum, maximum and average.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l19-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Arrays and Lists to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying arrays and lists without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Arrays and Lists",
                        "content": [
                            "Different collection implementations trade random access, insertion cost, memory layout and mutation behaviour.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "In a zero-indexed array with length 5, valid indexes are 0 through 4."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l19-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m07",
                            "lessonId": "pf-l19",
                            "topic": "pf-l19",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "In a zero-indexed array of length 5, what is the last valid index?",
                            "options": [
                                "4",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "4",
                            "questionFingerprint": "pf-l19-knowledge-37"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l20",
                    "title": "Objects, Records, and Nested Data",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Objects or records group related named properties to represent entities and concepts.",
                    "what": "Objects or records group related named properties to represent entities and concepts.",
                    "why": "Named fields communicate meaning far better than arbitrary positions and match how APIs and databases commonly represent data.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Group cohesive fields, choose stable identifiers, validate shape and combine objects with arrays to model richer structures.",
                    "terminology": [
                        {
                            "term": "Object",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Property",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Key",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Record",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Schema",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Identifier",
                            "definition": "A key concept in Objects, Records, and Nested Data that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain objects, records, and nested data in your own words.",
                        "Apply objects, records, and nested data to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Objects or records group related named properties to represent entities and concepts.",
                        "Named fields communicate meaning far better than arbitrary positions and match how APIs and databases commonly represent data.",
                        "Group cohesive fields, choose stable identifiers, validate shape and combine objects with arrays to model richer structures.",
                        "Practical perspective: A learner record can contain name, email, plan and active fields, while a course can contain an array of lesson records.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Schemas make data expectations explicit; strong domain modelling tries to make invalid states difficult to represent."
                    ],
                    "examples": [
                        {
                            "id": "pf-l20-ex01",
                            "title": "Practical example",
                            "scenario": "A learner record can contain name, email, plan and active fields, while a course can contain an array of lesson records.",
                            "language": "text",
                            "code": "A learner record can contain name, email, plan and active fields, while a course can contain an array of lesson records.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l20-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Model an order with customer information, an item array, total, payment state and status.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l20-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Objects, Records, and Nested Data to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying objects, records, and nested data without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Objects, Records, and Nested Data",
                        "content": [
                            "Schemas make data expectations explicit; strong domain modelling tries to make invalid states difficult to represent.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A learner record can contain name, email, plan and active fields, while a course can contain an array of lesson records."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l20-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m07",
                            "lessonId": "pf-l20",
                            "topic": "pf-l20",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "Which structure best represents one customer with several named fields?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "An object or record",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "An object or record",
                            "questionFingerprint": "pf-l20-knowledge-38"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l21",
                    "title": "Sets, Maps, Search, Filter, Transform, and Aggregate",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "Sets model uniqueness, maps model keyed lookup and collection algorithms locate, select, transform and aggregate values.",
                    "what": "Sets model uniqueness, maps model keyed lookup and collection algorithms locate, select, transform and aggregate values.",
                    "why": "Choosing the right structure can remove repeated scans and make both performance and intention clearer.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Use find for one match, filter for many, map for transformation, reduce for aggregation, sets for membership and maps for keyed access.",
                    "terminology": [
                        {
                            "term": "Set",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Map",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Search",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Filter",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Transform",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Aggregate",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        },
                        {
                            "term": "Lookup",
                            "definition": "A key concept in Sets, Maps, Search, Filter, Transform, and Aggregate that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain sets, maps, search, filter, transform, and aggregate in your own words.",
                        "Apply sets, maps, search, filter, transform, and aggregate to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Sets model uniqueness, maps model keyed lookup and collection algorithms locate, select, transform and aggregate values.",
                        "Choosing the right structure can remove repeated scans and make both performance and intention clearer.",
                        "Use find for one match, filter for many, map for transformation, reduce for aggregation, sets for membership and maps for keyed access.",
                        "Practical perspective: A Map keyed by userId can avoid scanning every user for every transaction lookup.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Many algorithmic improvements come from changing representation rather than micro-optimising syntax."
                    ],
                    "examples": [
                        {
                            "id": "pf-l21-ex01",
                            "title": "Practical example",
                            "scenario": "A Map keyed by userId can avoid scanning every user for every transaction lookup.",
                            "language": "text",
                            "code": "A Map keyed by userId can avoid scanning every user for every transaction lookup.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l21-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Replace a nested repeated user search with a map/dictionary keyed by userId and explain the performance change.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l21-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Sets, Maps, Search, Filter, Transform, and Aggregate to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying sets, maps, search, filter, transform, and aggregate without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Sets, Maps, Search, Filter, Transform, and Aggregate",
                        "content": [
                            "Many algorithmic improvements come from changing representation rather than micro-optimising syntax.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A Map keyed by userId can avoid scanning every user for every transaction lookup."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l21-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m07",
                            "lessonId": "pf-l21",
                            "topic": "pf-l21",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which structure is often best for repeated lookup by unique userId?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "A key-value map or dictionary",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "A key-value map or dictionary",
                            "questionFingerprint": "pf-l21-knowledge-39"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m07-lab",
                "access": "free",
                "title": "Collections and Structured Data Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Collections and Structured Data in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m07-quiz",
                "access": "free",
                "title": "Collections and Structured Data Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m07-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m07",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on arrays and lists. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply arrays and lists, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply arrays and lists, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m07-module-quiz-01"
                    },
                    {
                        "id": "pf-m07-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m07",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on objects, records, and nested data. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply objects, records, and nested data, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply objects, records, and nested data, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m07-module-quiz-02"
                    },
                    {
                        "id": "pf-m07-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m07",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on sets, maps, search, filter, transform, and aggregate. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply sets, maps, search, filter, transform, and aggregate, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply sets, maps, search, filter, transform, and aggregate, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m07-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m07-assessment",
                "access": "free",
                "title": "Collections and Structured Data Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Collections and Structured Data. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m08",
            "title": "Algorithms and Problem Solving",
            "order": 8,
            "access": "free",
            "description": "Transferable problem-solving ability matters more than memorising any one language's syntax.",
            "why": "Transferable problem-solving ability matters more than memorising any one language's syntax.",
            "outcomes": [
                "Explain the core ideas in Algorithms and Problem Solving.",
                "Apply Algorithms and Problem Solving to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l22",
                    "title": "Problem Decomposition and Requirements",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "65 min",
                    "preview": false,
                    "description": "Decomposition breaks a broad problem into smaller responsibilities with explicit inputs, outputs, constraints and success criteria.",
                    "what": "Decomposition breaks a broad problem into smaller responsibilities with explicit inputs, outputs, constraints and success criteria.",
                    "why": "Vague requirements create expensive rework because code can be internally correct while solving the wrong problem.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Clarify actors, data, rules and failure cases, then split the feature into testable responsibilities and acceptance criteria.",
                    "terminology": [
                        {
                            "term": "Decomposition",
                            "definition": "A key concept in Problem Decomposition and Requirements that the learner should be able to define and apply."
                        },
                        {
                            "term": "Constraint",
                            "definition": "A key concept in Problem Decomposition and Requirements that the learner should be able to define and apply."
                        },
                        {
                            "term": "Acceptance criterion",
                            "definition": "A key concept in Problem Decomposition and Requirements that the learner should be able to define and apply."
                        },
                        {
                            "term": "Use case",
                            "definition": "A key concept in Problem Decomposition and Requirements that the learner should be able to define and apply."
                        },
                        {
                            "term": "Dependency",
                            "definition": "A key concept in Problem Decomposition and Requirements that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain problem decomposition and requirements in your own words.",
                        "Apply problem decomposition and requirements to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Decomposition breaks a broad problem into smaller responsibilities with explicit inputs, outputs, constraints and success criteria.",
                        "Vague requirements create expensive rework because code can be internally correct while solving the wrong problem.",
                        "Clarify actors, data, rules and failure cases, then split the feature into testable responsibilities and acceptance criteria.",
                        "Practical perspective: Online checkout can be split into cart validation, stock check, pricing, payment, order creation and confirmation.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Requirements can become executable tests, linking business expectations directly to technical validation."
                    ],
                    "examples": [
                        {
                            "id": "pf-l22-ex01",
                            "title": "Practical example",
                            "scenario": "Online checkout can be split into cart validation, stock check, pricing, payment, order creation and confirmation.",
                            "language": "text",
                            "code": "Online checkout can be split into cart validation, stock check, pricing, payment, order creation and confirmation.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l22-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Decompose student course enrolment into at least six responsibilities and write three acceptance criteria.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l22-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Problem Decomposition and Requirements to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying problem decomposition and requirements without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Problem Decomposition and Requirements",
                        "content": [
                            "Requirements can become executable tests, linking business expectations directly to technical validation.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "Online checkout can be split into cart validation, stock check, pricing, payment, order creation and confirmation."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l22-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m08",
                            "lessonId": "pf-l22",
                            "topic": "pf-l22",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which is the strongest acceptance criterion?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "A specific observable rule that can be tested",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "A specific observable rule that can be tested",
                            "questionFingerprint": "pf-l22-knowledge-43"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l23",
                    "title": "Algorithms, Pseudocode, and Dry Runs",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "An algorithm is a finite method for solving a problem; pseudocode expresses the method without committing to language syntax.",
                    "what": "An algorithm is a finite method for solving a problem; pseudocode expresses the method without committing to language syntax.",
                    "why": "Separating algorithm design from syntax helps learners focus on correctness and communicate solutions across languages.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Write explicit steps, decisions and loops, then dry-run them with concrete inputs before implementation.",
                    "terminology": [
                        {
                            "term": "Algorithm",
                            "definition": "A key concept in Algorithms, Pseudocode, and Dry Runs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Pseudocode",
                            "definition": "A key concept in Algorithms, Pseudocode, and Dry Runs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Flowchart",
                            "definition": "A key concept in Algorithms, Pseudocode, and Dry Runs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Trace",
                            "definition": "A key concept in Algorithms, Pseudocode, and Dry Runs that the learner should be able to define and apply."
                        },
                        {
                            "term": "Dry run",
                            "definition": "A key concept in Algorithms, Pseudocode, and Dry Runs that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain algorithms, pseudocode, and dry runs in your own words.",
                        "Apply algorithms, pseudocode, and dry runs to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "An algorithm is a finite method for solving a problem; pseudocode expresses the method without committing to language syntax.",
                        "Separating algorithm design from syntax helps learners focus on correctness and communicate solutions across languages.",
                        "Write explicit steps, decisions and loops, then dry-run them with concrete inputs before implementation.",
                        "Practical perspective: To find the largest number, keep a largest-so-far value and replace it whenever a larger item is encountered.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Correctness arguments and loop invariants provide more formal ways to justify why an algorithm works for all supported inputs."
                    ],
                    "examples": [
                        {
                            "id": "pf-l23-ex01",
                            "title": "Practical example",
                            "scenario": "To find the largest number, keep a largest-so-far value and replace it whenever a larger item is encountered.",
                            "language": "text",
                            "code": "To find the largest number, keep a largest-so-far value and replace it whenever a larger item is encountered.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l23-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Write pseudocode for calculating an average and dry-run it with [60, 70, 80].",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l23-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Algorithms, Pseudocode, and Dry Runs to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying algorithms, pseudocode, and dry runs without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Algorithms, Pseudocode, and Dry Runs",
                        "content": [
                            "Correctness arguments and loop invariants provide more formal ways to justify why an algorithm works for all supported inputs.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "To find the largest number, keep a largest-so-far value and replace it whenever a larger item is encountered."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l23-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m08",
                            "lessonId": "pf-l23",
                            "topic": "pf-l23",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "What is the main purpose of pseudocode?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "To design and communicate logic without language-specific syntax"
                            ],
                            "correctAnswer": 3,
                            "explanation": "To design and communicate logic without language-specific syntax",
                            "questionFingerprint": "pf-l23-knowledge-44"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l24",
                    "title": "Efficiency and Big-O Intuition",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "Algorithmic complexity describes how time or memory use grows as input size grows.",
                    "what": "Algorithmic complexity describes how time or memory use grows as input size grows.",
                    "why": "A logically correct program can still become unusable if its work grows too quickly with realistic data sizes.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Identify dominant operations, recognise constant/linear/quadratic patterns and change algorithms or data structures when scale justifies it.",
                    "terminology": [
                        {
                            "term": "Complexity",
                            "definition": "A key concept in Efficiency and Big-O Intuition that the learner should be able to define and apply."
                        },
                        {
                            "term": "Big O",
                            "definition": "A key concept in Efficiency and Big-O Intuition that the learner should be able to define and apply."
                        },
                        {
                            "term": "Linear",
                            "definition": "A key concept in Efficiency and Big-O Intuition that the learner should be able to define and apply."
                        },
                        {
                            "term": "Quadratic",
                            "definition": "A key concept in Efficiency and Big-O Intuition that the learner should be able to define and apply."
                        },
                        {
                            "term": "Constant-time lookup",
                            "definition": "A key concept in Efficiency and Big-O Intuition that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain efficiency and big-o intuition in your own words.",
                        "Apply efficiency and big-o intuition to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Algorithmic complexity describes how time or memory use grows as input size grows.",
                        "A logically correct program can still become unusable if its work grows too quickly with realistic data sizes.",
                        "Identify dominant operations, recognise constant/linear/quadratic patterns and change algorithms or data structures when scale justifies it.",
                        "Practical perspective: A full scan inside another full scan can perform roughly n² comparisons as both inputs grow.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Professional optimisation combines complexity analysis with profiling; theoretical growth guides investigation and measurements confirm bottlenecks."
                    ],
                    "examples": [
                        {
                            "id": "pf-l24-ex01",
                            "title": "Practical example",
                            "scenario": "A full scan inside another full scan can perform roughly n² comparisons as both inputs grow.",
                            "language": "text",
                            "code": "A full scan inside another full scan can perform roughly n² comparisons as both inputs grow.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l24-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Compare repeated array scanning with one map-building pass plus repeated keyed lookup.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l24-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Efficiency and Big-O Intuition to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying efficiency and big-o intuition without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Efficiency and Big-O Intuition",
                        "content": [
                            "Professional optimisation combines complexity analysis with profiling; theoretical growth guides investigation and measurements confirm bottlenecks.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A full scan inside another full scan can perform roughly n² comparisons as both inputs grow."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l24-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m08",
                            "lessonId": "pf-l24",
                            "topic": "pf-l24",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Which structure most strongly suggests quadratic growth?",
                            "options": [
                                "A full loop nested inside another full loop",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "A full loop nested inside another full loop",
                            "questionFingerprint": "pf-l24-knowledge-45"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m08-lab",
                "access": "free",
                "title": "Algorithms and Problem Solving Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Algorithms and Problem Solving in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m08-quiz",
                "access": "free",
                "title": "Algorithms and Problem Solving Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m08-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m08",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on problem decomposition and requirements. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply problem decomposition and requirements, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply problem decomposition and requirements, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m08-module-quiz-01"
                    },
                    {
                        "id": "pf-m08-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m08",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on algorithms, pseudocode, and dry runs. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply algorithms, pseudocode, and dry runs, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply algorithms, pseudocode, and dry runs, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m08-module-quiz-02"
                    },
                    {
                        "id": "pf-m08-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m08",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on efficiency and big-o intuition. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply efficiency and big-o intuition, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply efficiency and big-o intuition, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m08-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m08-assessment",
                "access": "free",
                "title": "Algorithms and Problem Solving Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Algorithms and Problem Solving. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m09",
            "title": "Debugging, Defensive Programming, and Testing",
            "order": 9,
            "access": "free",
            "description": "Reliable software depends on evidence-driven diagnosis, trust-boundary validation and tests that preserve correct behaviour.",
            "why": "Reliable software depends on evidence-driven diagnosis, trust-boundary validation and tests that preserve correct behaviour.",
            "outcomes": [
                "Explain the core ideas in Debugging, Defensive Programming, and Testing.",
                "Apply Debugging, Defensive Programming, and Testing to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l25",
                    "title": "Errors and Systematic Debugging",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Debugging is the repeatable process of reproducing a failure, gathering evidence, locating the cause, fixing it and verifying the result.",
                    "what": "Debugging is the repeatable process of reproducing a failure, gathering evidence, locating the cause, fixing it and verifying the result.",
                    "why": "Random code changes are slow and destroy evidence; systematic debugging turns failures into testable hypotheses.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Reproduce, minimise, inspect values and stack traces, change one cause at a time and add regression coverage.",
                    "terminology": [
                        {
                            "term": "Syntax error",
                            "definition": "A key concept in Errors and Systematic Debugging that the learner should be able to define and apply."
                        },
                        {
                            "term": "Runtime error",
                            "definition": "A key concept in Errors and Systematic Debugging that the learner should be able to define and apply."
                        },
                        {
                            "term": "Logic error",
                            "definition": "A key concept in Errors and Systematic Debugging that the learner should be able to define and apply."
                        },
                        {
                            "term": "Stack trace",
                            "definition": "A key concept in Errors and Systematic Debugging that the learner should be able to define and apply."
                        },
                        {
                            "term": "Regression",
                            "definition": "A key concept in Errors and Systematic Debugging that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain errors and systematic debugging in your own words.",
                        "Apply errors and systematic debugging to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Debugging is the repeatable process of reproducing a failure, gathering evidence, locating the cause, fixing it and verifying the result.",
                        "Random code changes are slow and destroy evidence; systematic debugging turns failures into testable hypotheses.",
                        "Reproduce, minimise, inspect values and stack traces, change one cause at a time and add regression coverage.",
                        "Practical perspective: A program producing 105 instead of 15 may be traced to quantity being the string '10' rather than the number 10.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Production debugging relies on logs, metrics and traces because developers cannot attach a debugger to every live failure."
                    ],
                    "examples": [
                        {
                            "id": "pf-l25-ex01",
                            "title": "Practical example",
                            "scenario": "A program producing 105 instead of 15 may be traced to quantity being the string '10' rather than the number 10.",
                            "language": "text",
                            "code": "A program producing 105 instead of 15 may be traced to quantity being the string '10' rather than the number 10.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l25-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "For one reproducible bug, write three evidence-based hypotheses and one observation that would prove or disprove each.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l25-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Errors and Systematic Debugging to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying errors and systematic debugging without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Errors and Systematic Debugging",
                        "content": [
                            "Production debugging relies on logs, metrics and traces because developers cannot attach a debugger to every live failure.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A program producing 105 instead of 15 may be traced to quantity being the string '10' rather than the number 10."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l25-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m09",
                            "lessonId": "pf-l25",
                            "topic": "pf-l25",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "What is usually the best first step for a reproducible bug?",
                            "options": [
                                "Reproduce it consistently and gather evidence",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Reproduce it consistently and gather evidence",
                            "questionFingerprint": "pf-l25-knowledge-49"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l26",
                    "title": "Input Validation and Defensive Programming",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Defensive programming treats external data and failed assumptions explicitly rather than trusting them silently.",
                    "what": "Defensive programming treats external data and failed assumptions explicitly rather than trusting them silently.",
                    "why": "User input, files, APIs and databases can contain missing, malformed, unexpected or malicious values.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Validate type, format, range and business rules at trusted boundaries and fail closed for security-sensitive uncertainty.",
                    "terminology": [
                        {
                            "term": "Trust boundary",
                            "definition": "A key concept in Input Validation and Defensive Programming that the learner should be able to define and apply."
                        },
                        {
                            "term": "Validation",
                            "definition": "A key concept in Input Validation and Defensive Programming that the learner should be able to define and apply."
                        },
                        {
                            "term": "Sanitisation",
                            "definition": "A key concept in Input Validation and Defensive Programming that the learner should be able to define and apply."
                        },
                        {
                            "term": "Fail closed",
                            "definition": "A key concept in Input Validation and Defensive Programming that the learner should be able to define and apply."
                        },
                        {
                            "term": "Defensive programming",
                            "definition": "A key concept in Input Validation and Defensive Programming that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain input validation and defensive programming in your own words.",
                        "Apply input validation and defensive programming to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Defensive programming treats external data and failed assumptions explicitly rather than trusting them silently.",
                        "User input, files, APIs and databases can contain missing, malformed, unexpected or malicious values.",
                        "Validate type, format, range and business rules at trusted boundaries and fail closed for security-sensitive uncertainty.",
                        "Practical perspective: An API should validate a quantity server-side even if the browser already checked it.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Defensive design also includes resource limits, timeouts and maximum payload sizes, not only checking field values."
                    ],
                    "examples": [
                        {
                            "id": "pf-l26-ex01",
                            "title": "Practical example",
                            "scenario": "An API should validate a quantity server-side even if the browser already checked it.",
                            "language": "text",
                            "code": "An API should validate a quantity server-side even if the browser already checked it.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l26-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Create a validation contract for a 1-5 course rating and include missing, decimal, text and out-of-range cases.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l26-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Input Validation and Defensive Programming to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying input validation and defensive programming without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Input Validation and Defensive Programming",
                        "content": [
                            "Defensive design also includes resource limits, timeouts and maximum payload sizes, not only checking field values.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "An API should validate a quantity server-side even if the browser already checked it."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l26-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m09",
                            "lessonId": "pf-l26",
                            "topic": "pf-l26",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "Where should important API input validation occur?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "At the trusted receiving boundary before business logic relies on it",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "At the trusted receiving boundary before business logic relies on it",
                            "questionFingerprint": "pf-l26-knowledge-50"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l27",
                    "title": "Testing, Assertions, and Regression Design",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "Tests execute code under controlled conditions and compare observed behaviour with explicit expectations.",
                    "what": "Tests execute code under controlled conditions and compare observed behaviour with explicit expectations.",
                    "why": "Tests protect against regressions, document behaviour and give developers confidence to refactor.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Test normal, boundary, invalid and previously broken cases, using focused unit tests and broader integration tests appropriately.",
                    "terminology": [
                        {
                            "term": "Assertion",
                            "definition": "A key concept in Testing, Assertions, and Regression Design that the learner should be able to define and apply."
                        },
                        {
                            "term": "Unit test",
                            "definition": "A key concept in Testing, Assertions, and Regression Design that the learner should be able to define and apply."
                        },
                        {
                            "term": "Integration test",
                            "definition": "A key concept in Testing, Assertions, and Regression Design that the learner should be able to define and apply."
                        },
                        {
                            "term": "Regression test",
                            "definition": "A key concept in Testing, Assertions, and Regression Design that the learner should be able to define and apply."
                        },
                        {
                            "term": "Test fixture",
                            "definition": "A key concept in Testing, Assertions, and Regression Design that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain testing, assertions, and regression design in your own words.",
                        "Apply testing, assertions, and regression design to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Tests execute code under controlled conditions and compare observed behaviour with explicit expectations.",
                        "Tests protect against regressions, document behaviour and give developers confidence to refactor.",
                        "Test normal, boundary, invalid and previously broken cases, using focused unit tests and broader integration tests appropriately.",
                        "Practical perspective: For a minimum age of 18, useful cases include 17, 18 and 19 rather than repeating the same normal value.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Property-based testing generates many inputs against general rules, while mutation testing checks whether a test suite can detect deliberately introduced defects."
                    ],
                    "examples": [
                        {
                            "id": "pf-l27-ex01",
                            "title": "Practical example",
                            "scenario": "For a minimum age of 18, useful cases include 17, 18 and 19 rather than repeating the same normal value.",
                            "language": "text",
                            "code": "For a minimum age of 18, useful cases include 17, 18 and 19 rather than repeating the same normal value.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l27-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Design five non-repetitive tests for a percentage input accepted from 0 through 100 inclusive.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l27-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Testing, Assertions, and Regression Design to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying testing, assertions, and regression design without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Testing, Assertions, and Regression Design",
                        "content": [
                            "Property-based testing generates many inputs against general rules, while mutation testing checks whether a test suite can detect deliberately introduced defects.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "For a minimum age of 18, useful cases include 17, 18 and 19 rather than repeating the same normal value."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l27-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m09",
                            "lessonId": "pf-l27",
                            "topic": "pf-l27",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which test best protects a bug that previously accepted quantity 0?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "A regression test asserting quantity 0 is rejected",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "A regression test asserting quantity 0 is rejected",
                            "questionFingerprint": "pf-l27-knowledge-51"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m09-lab",
                "access": "free",
                "title": "Debugging, Defensive Programming, and Testing Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Debugging, Defensive Programming, and Testing in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m09-quiz",
                "access": "free",
                "title": "Debugging, Defensive Programming, and Testing Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m09-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m09",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on errors and systematic debugging. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply errors and systematic debugging, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply errors and systematic debugging, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m09-module-quiz-01"
                    },
                    {
                        "id": "pf-m09-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m09",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on input validation and defensive programming. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply input validation and defensive programming, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply input validation and defensive programming, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m09-module-quiz-02"
                    },
                    {
                        "id": "pf-m09-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m09",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on testing, assertions, and regression design. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply testing, assertions, and regression design, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply testing, assertions, and regression design, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m09-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m09-assessment",
                "access": "free",
                "title": "Debugging, Defensive Programming, and Testing Practical Assessment",
                "type": "practical",
                "passingScore": 70,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Debugging, Defensive Programming, and Testing. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m10",
            "title": "Program Design, State, and Refactoring",
            "order": 10,
            "access": "free",
            "description": "Fundamentals should prepare learners to build maintainable programs, not just solve isolated exercises.",
            "why": "Fundamentals should prepare learners to build maintainable programs, not just solve isolated exercises.",
            "outcomes": [
                "Explain the core ideas in Program Design, State, and Refactoring.",
                "Apply Program Design, State, and Refactoring to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l28",
                    "title": "State, Data Flow, and Side Effects",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "State represents the current condition of a program; data flow describes how information moves and changes across components.",
                    "what": "State represents the current condition of a program; data flow describes how information moves and changes across components.",
                    "why": "Hidden state mutation is one of the main reasons larger programs become hard to predict and debug.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Give important state clear ownership, pass data explicitly and isolate side effects such as file, network or database operations.",
                    "terminology": [
                        {
                            "term": "State",
                            "definition": "A key concept in State, Data Flow, and Side Effects that the learner should be able to define and apply."
                        },
                        {
                            "term": "Data flow",
                            "definition": "A key concept in State, Data Flow, and Side Effects that the learner should be able to define and apply."
                        },
                        {
                            "term": "Side effect",
                            "definition": "A key concept in State, Data Flow, and Side Effects that the learner should be able to define and apply."
                        },
                        {
                            "term": "State transition",
                            "definition": "A key concept in State, Data Flow, and Side Effects that the learner should be able to define and apply."
                        },
                        {
                            "term": "Ownership",
                            "definition": "A key concept in State, Data Flow, and Side Effects that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain state, data flow, and side effects in your own words.",
                        "Apply state, data flow, and side effects to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "State represents the current condition of a program; data flow describes how information moves and changes across components.",
                        "Hidden state mutation is one of the main reasons larger programs become hard to predict and debug.",
                        "Give important state clear ownership, pass data explicitly and isolate side effects such as file, network or database operations.",
                        "Practical perspective: calculateTotal can remain pure while saveInvoiceTotal performs the database side effect in a separate step.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Explicit state machines can prevent impossible transitions and are widely used in workflows, UI systems and distributed processes."
                    ],
                    "examples": [
                        {
                            "id": "pf-l28-ex01",
                            "title": "Practical example",
                            "scenario": "calculateTotal can remain pure while saveInvoiceTotal performs the database side effect in a separate step.",
                            "language": "text",
                            "code": "calculateTotal can remain pure while saveInvoiceTotal performs the database side effect in a separate step.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l28-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Trace email from login form input through validation, authentication request, database lookup and response.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l28-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply State, Data Flow, and Side Effects to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying state, data flow, and side effects without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: State, Data Flow, and Side Effects",
                        "content": [
                            "Explicit state machines can prevent impossible transitions and are widely used in workflows, UI systems and distributed processes.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "calculateTotal can remain pure while saveInvoiceTotal performs the database side effect in a separate step."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l28-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m10",
                            "lessonId": "pf-l28",
                            "topic": "pf-l28",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "Which operation is clearly a side effect?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Writing a changed value to a database",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "Writing a changed value to a database",
                            "questionFingerprint": "pf-l28-knowledge-55"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l29",
                    "title": "Modules, Separation of Concerns, and Interfaces",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "75 min",
                    "preview": false,
                    "description": "Modular design groups related responsibilities behind stable interfaces and limits unnecessary dependencies.",
                    "what": "Modular design groups related responsibilities behind stable interfaces and limits unnecessary dependencies.",
                    "why": "Large single files are difficult to navigate, test and change; clear modules reduce cognitive load and coupling.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Group cohesive behaviour, expose only necessary operations and keep dependency direction understandable.",
                    "terminology": [
                        {
                            "term": "Module",
                            "definition": "A key concept in Modules, Separation of Concerns, and Interfaces that the learner should be able to define and apply."
                        },
                        {
                            "term": "Interface",
                            "definition": "A key concept in Modules, Separation of Concerns, and Interfaces that the learner should be able to define and apply."
                        },
                        {
                            "term": "Encapsulation",
                            "definition": "A key concept in Modules, Separation of Concerns, and Interfaces that the learner should be able to define and apply."
                        },
                        {
                            "term": "Coupling",
                            "definition": "A key concept in Modules, Separation of Concerns, and Interfaces that the learner should be able to define and apply."
                        },
                        {
                            "term": "Cohesion",
                            "definition": "A key concept in Modules, Separation of Concerns, and Interfaces that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain modules, separation of concerns, and interfaces in your own words.",
                        "Apply modules, separation of concerns, and interfaces to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Modular design groups related responsibilities behind stable interfaces and limits unnecessary dependencies.",
                        "Large single files are difficult to navigate, test and change; clear modules reduce cognitive load and coupling.",
                        "Group cohesive behaviour, expose only necessary operations and keep dependency direction understandable.",
                        "Practical perspective: Authentication logic and authentication UI can be separate modules that cooperate through a small interface.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Dependency inversion allows high-level business logic to depend on abstractions rather than concrete infrastructure."
                    ],
                    "examples": [
                        {
                            "id": "pf-l29-ex01",
                            "title": "Practical example",
                            "scenario": "Authentication logic and authentication UI can be separate modules that cooperate through a small interface.",
                            "language": "text",
                            "code": "Authentication logic and authentication UI can be separate modules that cooperate through a small interface.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l29-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Refactor a file containing login, courses, payments and certificates into cohesive modules and describe each public interface.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l29-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Modules, Separation of Concerns, and Interfaces to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying modules, separation of concerns, and interfaces without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Modules, Separation of Concerns, and Interfaces",
                        "content": [
                            "Dependency inversion allows high-level business logic to depend on abstractions rather than concrete infrastructure.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "Authentication logic and authentication UI can be separate modules that cooperate through a small interface."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l29-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m10",
                            "lessonId": "pf-l29",
                            "topic": "pf-l29",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "Which module is most cohesive?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "A course repository containing course lookup and persistence behaviour"
                            ],
                            "correctAnswer": 3,
                            "explanation": "A course repository containing course lookup and persistence behaviour",
                            "questionFingerprint": "pf-l29-knowledge-56"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l30",
                    "title": "Refactoring, Readability, and Documentation",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "Refactoring improves internal structure while preserving intended observable behaviour.",
                    "what": "Refactoring improves internal structure while preserving intended observable behaviour.",
                    "why": "Software is read and changed repeatedly, so naming, duplication, boundaries and documentation directly affect maintenance cost.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Make small behaviour-preserving changes, rely on tests and document rationale rather than restating obvious code.",
                    "terminology": [
                        {
                            "term": "Refactoring",
                            "definition": "A key concept in Refactoring, Readability, and Documentation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Code smell",
                            "definition": "A key concept in Refactoring, Readability, and Documentation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Duplication",
                            "definition": "A key concept in Refactoring, Readability, and Documentation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Technical debt",
                            "definition": "A key concept in Refactoring, Readability, and Documentation that the learner should be able to define and apply."
                        },
                        {
                            "term": "Documentation",
                            "definition": "A key concept in Refactoring, Readability, and Documentation that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain refactoring, readability, and documentation in your own words.",
                        "Apply refactoring, readability, and documentation to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Refactoring improves internal structure while preserving intended observable behaviour.",
                        "Software is read and changed repeatedly, so naming, duplication, boundaries and documentation directly affect maintenance cost.",
                        "Make small behaviour-preserving changes, rely on tests and document rationale rather than restating obvious code.",
                        "Practical perspective: Replacing const x = p * q with const orderTotal = unitPrice * quantity changes clarity without changing behaviour.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Continuous refactoring lets architecture evolve gradually rather than requiring risky large rewrites."
                    ],
                    "examples": [
                        {
                            "id": "pf-l30-ex01",
                            "title": "Practical example",
                            "scenario": "Replacing const x = p * q with const orderTotal = unitPrice * quantity changes clarity without changing behaviour.",
                            "language": "text",
                            "code": "Replacing const x = p * q with const orderTotal = unitPrice * quantity changes clarity without changing behaviour.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l30-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Choose a small working function, add tests, then improve its naming, duplication and boundaries without changing outputs.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l30-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Refactoring, Readability, and Documentation to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying refactoring, readability, and documentation without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Refactoring, Readability, and Documentation",
                        "content": [
                            "Continuous refactoring lets architecture evolve gradually rather than requiring risky large rewrites.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "Replacing const x = p * q with const orderTotal = unitPrice * quantity changes clarity without changing behaviour."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l30-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m10",
                            "lessonId": "pf-l30",
                            "topic": "pf-l30",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Which change is a refactoring?",
                            "options": [
                                "Renaming and extracting duplicate logic while preserving behaviour",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Renaming and extracting duplicate logic while preserving behaviour",
                            "questionFingerprint": "pf-l30-knowledge-57"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m10-lab",
                "access": "free",
                "title": "Program Design, State, and Refactoring Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Program Design, State, and Refactoring in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m10-quiz",
                "access": "free",
                "title": "Program Design, State, and Refactoring Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m10-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m10",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on state, data flow, and side effects. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply state, data flow, and side effects, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply state, data flow, and side effects, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m10-module-quiz-01"
                    },
                    {
                        "id": "pf-m10-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m10",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on modules, separation of concerns, and interfaces. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply modules, separation of concerns, and interfaces, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply modules, separation of concerns, and interfaces, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m10-module-quiz-02"
                    },
                    {
                        "id": "pf-m10-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m10",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on refactoring, readability, and documentation. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply refactoring, readability, and documentation, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply refactoring, readability, and documentation, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m10-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m10-assessment",
                "access": "free",
                "title": "Program Design, State, and Refactoring Practical Assessment",
                "type": "practical",
                "passingScore": 75,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Program Design, State, and Refactoring. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m11",
            "title": "Files, APIs, and Databases",
            "order": 11,
            "access": "free",
            "description": "Modern programs persist data and communicate with external systems rather than living only in local memory.",
            "why": "Modern programs persist data and communicate with external systems rather than living only in local memory.",
            "outcomes": [
                "Explain the core ideas in Files, APIs, and Databases.",
                "Apply Files, APIs, and Databases to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l31",
                    "title": "Files, JSON, and Persistent Data",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "intermediate",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Persistence keeps information beyond one process execution; files are a basic mechanism for storing and exchanging data.",
                    "what": "Persistence keeps information beyond one process execution; files are a basic mechanism for storing and exchanging data.",
                    "why": "Programs need configuration, logs, exports, local state and durable project data.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Read, parse, validate and process file data separately, then write safely while handling missing paths, permissions and malformed content.",
                    "terminology": [
                        {
                            "term": "Persistence",
                            "definition": "A key concept in Files, JSON, and Persistent Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "File path",
                            "definition": "A key concept in Files, JSON, and Persistent Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Serialisation",
                            "definition": "A key concept in Files, JSON, and Persistent Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "JSON",
                            "definition": "A key concept in Files, JSON, and Persistent Data that the learner should be able to define and apply."
                        },
                        {
                            "term": "Encoding",
                            "definition": "A key concept in Files, JSON, and Persistent Data that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain files, json, and persistent data in your own words.",
                        "Apply files, json, and persistent data to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Persistence keeps information beyond one process execution; files are a basic mechanism for storing and exchanging data.",
                        "Programs need configuration, logs, exports, local state and durable project data.",
                        "Read, parse, validate and process file data separately, then write safely while handling missing paths, permissions and malformed content.",
                        "Practical perspective: A JSON progress file can store courseId, percentage and completed fields, but the parsed object still needs validation.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Critical file updates may use temporary files and atomic rename strategies to avoid partial-write corruption."
                    ],
                    "examples": [
                        {
                            "id": "pf-l31-ex01",
                            "title": "Practical example",
                            "scenario": "A JSON progress file can store courseId, percentage and completed fields, but the parsed object still needs validation.",
                            "language": "text",
                            "code": "A JSON progress file can store courseId, percentage and completed fields, but the parsed object still needs validation.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l31-pr01",
                            "title": "Guided practice",
                            "difficulty": "intermediate",
                            "task": "Design failure handling for a missing, unreadable or malformed configuration file.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l31-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Files, JSON, and Persistent Data to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying files, json, and persistent data without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Files, JSON, and Persistent Data",
                        "content": [
                            "Critical file updates may use temporary files and atomic rename strategies to avoid partial-write corruption.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A JSON progress file can store courseId, percentage and completed fields, but the parsed object still needs validation."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l31-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m11",
                            "lessonId": "pf-l31",
                            "topic": "pf-l31",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Why validate JSON after successful parsing?",
                            "options": [
                                "Parsed data can still violate the application's required schema or rules",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Parsed data can still violate the application's required schema or rules",
                            "questionFingerprint": "pf-l31-knowledge-61"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l32",
                    "title": "APIs, Requests, Responses, and Trust Boundaries",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "An API defines how software components request data or behaviour from one another across an interface, often over a network.",
                    "what": "An API defines how software components request data or behaviour from one another across an interface, often over a network.",
                    "why": "Modern systems depend on browsers, backend services, payment platforms and third-party APIs that can fail independently.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Check response outcomes, validate remote data, handle latency and failure, and enforce protected actions at trusted backend boundaries.",
                    "terminology": [
                        {
                            "term": "API",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Request",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Response",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "HTTP status",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Latency",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Authentication",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        },
                        {
                            "term": "Authorisation",
                            "definition": "A key concept in APIs, Requests, Responses, and Trust Boundaries that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain apis, requests, responses, and trust boundaries in your own words.",
                        "Apply apis, requests, responses, and trust boundaries to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "An API defines how software components request data or behaviour from one another across an interface, often over a network.",
                        "Modern systems depend on browsers, backend services, payment platforms and third-party APIs that can fail independently.",
                        "Check response outcomes, validate remote data, handle latency and failure, and enforce protected actions at trusted backend boundaries.",
                        "Practical perspective: A Pro lesson should be returned only after a trusted service verifies identity and entitlement; hiding a button is not protection.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Retries of non-idempotent operations can duplicate effects such as payments; idempotency keys help services recognise repeated requests safely."
                    ],
                    "examples": [
                        {
                            "id": "pf-l32-ex01",
                            "title": "Practical example",
                            "scenario": "A Pro lesson should be returned only after a trusted service verifies identity and entitlement; hiding a button is not protection.",
                            "language": "text",
                            "code": "A Pro lesson should be returned only after a trusted service verifies identity and entitlement; hiding a button is not protection.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l32-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "List six failure states for a network request and define how the UI should respond to each.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l32-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply APIs, Requests, Responses, and Trust Boundaries to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying apis, requests, responses, and trust boundaries without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: APIs, Requests, Responses, and Trust Boundaries",
                        "content": [
                            "Retries of non-idempotent operations can duplicate effects such as payments; idempotency keys help services recognise repeated requests safely.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A Pro lesson should be returned only after a trusted service verifies identity and entitlement; hiding a button is not protection."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l32-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m11",
                            "lessonId": "pf-l32",
                            "topic": "pf-l32",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "apply",
                            "type": "scenario",
                            "question": "Where should Pro content access ultimately be enforced?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "At a trusted backend or database authorization boundary",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 1,
                            "explanation": "At a trusted backend or database authorization boundary",
                            "questionFingerprint": "pf-l32-knowledge-62"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l33",
                    "title": "Databases, Data Models, Relationships, and Indexes",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "80 min",
                    "preview": false,
                    "description": "A database stores, organises, queries and updates persistent structured data with stronger concurrency and query capabilities than simple files.",
                    "what": "A database stores, organises, queries and updates persistent structured data with stronger concurrency and query capabilities than simple files.",
                    "why": "Shared applications need durable data models, stable identifiers, relationships, indexes and trusted access rules.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Model entities and relationships based on integrity and access patterns, then query through controlled database interfaces.",
                    "terminology": [
                        {
                            "term": "Database",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Table",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Document",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Primary key",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Foreign key",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Query",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        },
                        {
                            "term": "Index",
                            "definition": "A key concept in Databases, Data Models, Relationships, and Indexes that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain databases, data models, relationships, and indexes in your own words.",
                        "Apply databases, data models, relationships, and indexes to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "A database stores, organises, queries and updates persistent structured data with stronger concurrency and query capabilities than simple files.",
                        "Shared applications need durable data models, stable identifiers, relationships, indexes and trusted access rules.",
                        "Model entities and relationships based on integrity and access patterns, then query through controlled database interfaces.",
                        "Practical perspective: A relational learning platform can separate courses and enrolments so many users can enrol in many courses.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Transactions protect multi-step invariants, while schema and index design should follow both data integrity and real query patterns."
                    ],
                    "examples": [
                        {
                            "id": "pf-l33-ex01",
                            "title": "Practical example",
                            "scenario": "A relational learning platform can separate courses and enrolments so many users can enrol in many courses.",
                            "language": "text",
                            "code": "A relational learning platform can separate courses and enrolments so many users can enrol in many courses.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l33-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Design entities for users, courses, lessons, enrolments, assessments and certificates, then identify likely relationships.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l33-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Databases, Data Models, Relationships, and Indexes to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying databases, data models, relationships, and indexes without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Databases, Data Models, Relationships, and Indexes",
                        "content": [
                            "Transactions protect multi-step invariants, while schema and index design should follow both data integrity and real query patterns.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A relational learning platform can separate courses and enrolments so many users can enrol in many courses."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l33-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m11",
                            "lessonId": "pf-l33",
                            "topic": "pf-l33",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "What is the main purpose of a primary key?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "To uniquely identify a record",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "To uniquely identify a record",
                            "questionFingerprint": "pf-l33-knowledge-63"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m11-lab",
                "access": "free",
                "title": "Files, APIs, and Databases Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Files, APIs, and Databases in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m11-quiz",
                "access": "free",
                "title": "Files, APIs, and Databases Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m11-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m11",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on files, json, and persistent data. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply files, json, and persistent data, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply files, json, and persistent data, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m11-module-quiz-01"
                    },
                    {
                        "id": "pf-m11-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m11",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "understand",
                        "type": "concept",
                        "question": "A new application requirement depends on apis, requests, responses, and trust boundaries. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "Model the requirement, apply apis, requests, responses, and trust boundaries, test a normal case and at least one edge case",
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 0,
                        "explanation": "Model the requirement, apply apis, requests, responses, and trust boundaries, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m11-module-quiz-02"
                    },
                    {
                        "id": "pf-m11-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m11",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on databases, data models, relationships, and indexes. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply databases, data models, relationships, and indexes, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply databases, data models, relationships, and indexes, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m11-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m11-assessment",
                "access": "free",
                "title": "Files, APIs, and Databases Practical Assessment",
                "type": "practical",
                "passingScore": 75,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Files, APIs, and Databases. The scenario must combine at least one concept from an earlier module."
            }
        },
        {
            "id": "pf-m12",
            "title": "Capstone Project and Final Mastery",
            "order": 12,
            "access": "free",
            "description": "A complete project demonstrates that a learner can integrate concepts, handle failure, test behaviour and explain trade-offs rather than memorise isolated facts.",
            "why": "A complete project demonstrates that a learner can integrate concepts, handle failure, test behaviour and explain trade-offs rather than memorise isolated facts.",
            "outcomes": [
                "Explain the core ideas in Capstone Project and Final Mastery.",
                "Apply Capstone Project and Final Mastery to new programming scenarios.",
                "Complete a practical lab and assessment without relying on repeated lesson questions."
            ],
            "lessons": [
                {
                    "id": "pf-l34",
                    "title": "Project Planning, Architecture, and Milestones",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Project planning turns a broad idea into scoped requirements, data models, interfaces and deliverable milestones.",
                    "what": "Project planning turns a broad idea into scoped requirements, data models, interfaces and deliverable milestones.",
                    "why": "A smaller complete program teaches more than an oversized unfinished project.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Define acceptance criteria, choose a narrow MVP, break work into vertical slices and create testable milestones.",
                    "terminology": [
                        {
                            "term": "Milestone",
                            "definition": "A key concept in Project Planning, Architecture, and Milestones that the learner should be able to define and apply."
                        },
                        {
                            "term": "Vertical slice",
                            "definition": "A key concept in Project Planning, Architecture, and Milestones that the learner should be able to define and apply."
                        },
                        {
                            "term": "MVP",
                            "definition": "A key concept in Project Planning, Architecture, and Milestones that the learner should be able to define and apply."
                        },
                        {
                            "term": "Architecture",
                            "definition": "A key concept in Project Planning, Architecture, and Milestones that the learner should be able to define and apply."
                        },
                        {
                            "term": "Backlog",
                            "definition": "A key concept in Project Planning, Architecture, and Milestones that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain project planning, architecture, and milestones in your own words.",
                        "Apply project planning, architecture, and milestones to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Project planning turns a broad idea into scoped requirements, data models, interfaces and deliverable milestones.",
                        "A smaller complete program teaches more than an oversized unfinished project.",
                        "Define acceptance criteria, choose a narrow MVP, break work into vertical slices and create testable milestones.",
                        "Practical perspective: A task manager can deliver create/list tasks first, completion second, validation third, persistence fourth and testing/refactoring fifth.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Professional teams often record major architectural decisions and the trade-offs that led to them."
                    ],
                    "examples": [
                        {
                            "id": "pf-l34-ex01",
                            "title": "Practical example",
                            "scenario": "A task manager can deliver create/list tasks first, completion second, validation third, persistence fourth and testing/refactoring fifth.",
                            "language": "text",
                            "code": "A task manager can deliver create/list tasks first, completion second, validation third, persistence fourth and testing/refactoring fifth.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l34-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Choose one capstone idea and write five requirements, five acceptance criteria and six ordered milestones.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l34-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Project Planning, Architecture, and Milestones to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying project planning, architecture, and milestones without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Project Planning, Architecture, and Milestones",
                        "content": [
                            "Professional teams often record major architectural decisions and the trade-offs that led to them.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A task manager can deliver create/list tasks first, completion second, validation third, persistence fourth and testing/refactoring fifth."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l34-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m12",
                            "lessonId": "pf-l34",
                            "topic": "pf-l34",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "analyse",
                            "type": "decision",
                            "question": "What is a strong first milestone?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "A small end-to-end working slice with tests",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 2,
                            "explanation": "A small end-to-end working slice with tests",
                            "questionFingerprint": "pf-l34-knowledge-67"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l35",
                    "title": "Build, Test, Debug, and Refactor the Capstone",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "120 min",
                    "preview": false,
                    "description": "The capstone build phase implements planned milestones through repeated cycles of build, test, debug, refactor and commit.",
                    "what": "The capstone build phase implements planned milestones through repeated cycles of build, test, debug, refactor and commit.",
                    "why": "Integrated project work exposes design gaps that isolated exercises cannot reveal.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Implement one milestone at a time, test normal/boundary/invalid cases, fix defects, refactor safely and preserve working checkpoints.",
                    "terminology": [
                        {
                            "term": "Increment",
                            "definition": "A key concept in Build, Test, Debug, and Refactor the Capstone that the learner should be able to define and apply."
                        },
                        {
                            "term": "Regression suite",
                            "definition": "A key concept in Build, Test, Debug, and Refactor the Capstone that the learner should be able to define and apply."
                        },
                        {
                            "term": "Refactor cycle",
                            "definition": "A key concept in Build, Test, Debug, and Refactor the Capstone that the learner should be able to define and apply."
                        },
                        {
                            "term": "Code review",
                            "definition": "A key concept in Build, Test, Debug, and Refactor the Capstone that the learner should be able to define and apply."
                        },
                        {
                            "term": "Definition of done",
                            "definition": "A key concept in Build, Test, Debug, and Refactor the Capstone that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain build, test, debug, and refactor the capstone in your own words.",
                        "Apply build, test, debug, and refactor the capstone to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "The capstone build phase implements planned milestones through repeated cycles of build, test, debug, refactor and commit.",
                        "Integrated project work exposes design gaps that isolated exercises cannot reveal.",
                        "Implement one milestone at a time, test normal/boundary/invalid cases, fix defects, refactor safely and preserve working checkpoints.",
                        "Practical perspective: A disciplined cycle is PLAN -> IMPLEMENT -> TEST -> FIX -> REFACTOR -> COMMIT -> REPEAT.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: Reviewability is part of quality: focused commits, clear modules, useful tests and an honest README make technical work easier to evaluate."
                    ],
                    "examples": [
                        {
                            "id": "pf-l35-ex01",
                            "title": "Practical example",
                            "scenario": "A disciplined cycle is PLAN -> IMPLEMENT -> TEST -> FIX -> REFACTOR -> COMMIT -> REPEAT.",
                            "language": "text",
                            "code": "A disciplined cycle is PLAN -> IMPLEMENT -> TEST -> FIX -> REFACTOR -> COMMIT -> REPEAT.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l35-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Implement the first capstone milestone and record at least five tests plus one bug you discovered and how you fixed it.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l35-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Build, Test, Debug, and Refactor the Capstone to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying build, test, debug, and refactor the capstone without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Build, Test, Debug, and Refactor the Capstone",
                        "content": [
                            "Reviewability is part of quality: focused commits, clear modules, useful tests and an honest README make technical work easier to evaluate.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A disciplined cycle is PLAN -> IMPLEMENT -> TEST -> FIX -> REFACTOR -> COMMIT -> REPEAT."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l35-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m12",
                            "lessonId": "pf-l35",
                            "topic": "pf-l35",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "evaluate",
                            "type": "code-reading",
                            "question": "Which workflow best controls capstone risk?",
                            "options": [
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely",
                                "Build one milestone, test it, refactor safely, commit, then continue"
                            ],
                            "correctAnswer": 3,
                            "explanation": "Build one milestone, test it, refactor safely, commit, then continue",
                            "questionFingerprint": "pf-l35-knowledge-68"
                        }
                    ],
                    "resources": []
                },
                {
                    "id": "pf-l36",
                    "title": "Final Review, Transfer, and Next Learning Path",
                    "type": "lesson",
                    "access": "free",
                    "difficulty": "advanced",
                    "duration": "70 min",
                    "preview": false,
                    "description": "Final review connects the whole course into one mental model and prepares the learner to apply concepts in unfamiliar situations.",
                    "what": "Final review connects the whole course into one mental model and prepares the learner to apply concepts in unfamiliar situations.",
                    "why": "Deep learning requires retrieval and transfer, not repeating the same questions until answer positions are memorised.",
                    "who": [
                        "Software developers",
                        "Automation developers",
                        "Technical learners building programming foundations",
                        "Developers working across web, backend, data or application systems"
                    ],
                    "when": [
                        "When designing new program behaviour",
                        "When reading or maintaining existing code",
                        "When debugging or testing related logic"
                    ],
                    "where": [
                        "Web applications",
                        "Backend services",
                        "Automation scripts",
                        "Business and data-processing software"
                    ],
                    "avoidWhen": [],
                    "how": "Solve fresh scenarios, explain reasoning aloud, revisit weak objectives and use the capstone as evidence of integrated ability.",
                    "terminology": [
                        {
                            "term": "Retrieval practice",
                            "definition": "A key concept in Final Review, Transfer, and Next Learning Path that the learner should be able to define and apply."
                        },
                        {
                            "term": "Transfer",
                            "definition": "A key concept in Final Review, Transfer, and Next Learning Path that the learner should be able to define and apply."
                        },
                        {
                            "term": "Reflection",
                            "definition": "A key concept in Final Review, Transfer, and Next Learning Path that the learner should be able to define and apply."
                        },
                        {
                            "term": "Mastery",
                            "definition": "A key concept in Final Review, Transfer, and Next Learning Path that the learner should be able to define and apply."
                        },
                        {
                            "term": "Portfolio evidence",
                            "definition": "A key concept in Final Review, Transfer, and Next Learning Path that the learner should be able to define and apply."
                        }
                    ],
                    "objectives": [
                        "Explain final review, transfer, and next learning path in your own words.",
                        "Apply final review, transfer, and next learning path to a practical programming scenario.",
                        "Identify common failure cases or incorrect assumptions.",
                        "Connect the concept to larger program design."
                    ],
                    "concepts": [],
                    "content": [
                        "Final review connects the whole course into one mental model and prepares the learner to apply concepts in unfamiliar situations.",
                        "Deep learning requires retrieval and transfer, not repeating the same questions until answer positions are memorised.",
                        "Solve fresh scenarios, explain reasoning aloud, revisit weak objectives and use the capstone as evidence of integrated ability.",
                        "Practical perspective: A fresh parking-system problem can test variables, validation, conditions, functions, persistence and testing without repeating previous questions.",
                        "Learning strategy: do not memorise only the final syntax. Trace inputs, state changes, decisions and outputs until you can predict behaviour before running the program.",
                        "Engineering perspective: The next stage is language-specific depth, but strong developers keep returning to fundamentals when evaluating architecture, performance and correctness."
                    ],
                    "examples": [
                        {
                            "id": "pf-l36-ex01",
                            "title": "Practical example",
                            "scenario": "A fresh parking-system problem can test variables, validation, conditions, functions, persistence and testing without repeating previous questions.",
                            "language": "text",
                            "code": "A fresh parking-system problem can test variables, validation, conditions, functions, persistence and testing without repeating previous questions.",
                            "output": "",
                            "explanation": "Use the example to identify the concept, the data involved, the rule being applied and the expected result."
                        }
                    ],
                    "practice": [
                        {
                            "id": "pf-l36-pr01",
                            "title": "Guided practice",
                            "difficulty": "advanced",
                            "task": "Explain variables, decisions, loops, functions, collections, debugging and testing without notes, then solve a new scenario that combines all of them.",
                            "hint": "Write the problem in plain language first, then identify data, rules and expected results.",
                            "solution": "",
                            "expectedOutcome": "The learner can apply the concept without copying the lesson example."
                        },
                        {
                            "id": "pf-l36-pr02",
                            "title": "Transfer challenge",
                            "difficulty": "advanced",
                            "task": "Apply Final Review, Transfer, and Next Learning Path to a different domain such as banking, e-commerce, transport, cybersecurity or a learning platform. Explain why your design is correct and identify at least two edge cases.",
                            "hint": "Change the domain, not only the variable names.",
                            "solution": "",
                            "expectedOutcome": "The learner transfers the concept to a new scenario."
                        }
                    ],
                    "commonMistakes": [
                        "Memorising syntax without understanding the underlying rule.",
                        "Testing only the normal success path.",
                        "Using vague names or hidden assumptions.",
                        "Applying final review, transfer, and next learning path without checking boundary or failure behaviour."
                    ],
                    "troubleshooting": [
                        "Restate the expected behaviour before changing code.",
                        "Inspect concrete input and intermediate state.",
                        "Reduce the failing example to the smallest reproducible case.",
                        "Add a test for the failure after correcting it."
                    ],
                    "advanced": {
                        "available": true,
                        "access": "free",
                        "title": "Advanced foundation: Final Review, Transfer, and Next Learning Path",
                        "content": [
                            "The next stage is language-specific depth, but strong developers keep returning to fundamentals when evaluating architecture, performance and correctness.",
                            "At advanced-foundation level, compare more than one possible implementation and discuss readability, correctness, performance and maintainability trade-offs."
                        ]
                    },
                    "realWorld": [
                        "A fresh parking-system problem can test variables, validation, conditions, functions, persistence and testing without repeating previous questions."
                    ],
                    "knowledgeCheck": [
                        {
                            "id": "pf-l36-kc01",
                            "courseId": "programming-fundamentals",
                            "moduleId": "pf-m12",
                            "lessonId": "pf-l36",
                            "topic": "pf-l36",
                            "objective": "apply-and-explain",
                            "difficulty": "advanced",
                            "cognitiveLevel": "understand",
                            "type": "concept",
                            "question": "Which activity best demonstrates transfer?",
                            "options": [
                                "Applying the same concept successfully in a new scenario",
                                "A different concept that does not satisfy the requirement",
                                "A syntax-only change with no effect on the underlying rule",
                                "Skipping validation or reasoning entirely"
                            ],
                            "correctAnswer": 0,
                            "explanation": "Applying the same concept successfully in a new scenario",
                            "questionFingerprint": "pf-l36-knowledge-69"
                        }
                    ],
                    "resources": []
                }
            ],
            "lab": {
                "id": "pf-m12-lab",
                "access": "free",
                "title": "Capstone Project and Final Mastery Practical Lab",
                "type": "practical-lab",
                "estimatedTime": "60-90 min",
                "description": "Apply Capstone Project and Final Mastery in a fresh scenario that is not copied from the lesson examples.",
                "status": "available"
            },
            "quiz": {
                "id": "pf-m12-quiz",
                "access": "free",
                "title": "Capstone Project and Final Mastery Quiz",
                "passingScore": 70,
                "randomiseQuestions": true,
                "randomiseOptions": true,
                "questions": [
                    {
                        "id": "pf-m12-quiz-q01",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m12",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "apply",
                        "type": "scenario",
                        "question": "A new application requirement depends on project planning, architecture, and milestones. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "Model the requirement, apply project planning, architecture, and milestones, test a normal case and at least one edge case",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 1,
                        "explanation": "Model the requirement, apply project planning, architecture, and milestones, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m12-module-quiz-01"
                    },
                    {
                        "id": "pf-m12-quiz-q02",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m12",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "analyse",
                        "type": "decision",
                        "question": "A new application requirement depends on build, test, debug, and refactor the capstone. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Model the requirement, apply build, test, debug, and refactor the capstone, test a normal case and at least one edge case",
                            "Skipping validation or reasoning entirely"
                        ],
                        "correctAnswer": 2,
                        "explanation": "Model the requirement, apply build, test, debug, and refactor the capstone, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m12-module-quiz-02"
                    },
                    {
                        "id": "pf-m12-quiz-q03",
                        "courseId": "programming-fundamentals",
                        "moduleId": "pf-m12",
                        "lessonId": "",
                        "topic": "",
                        "objective": "apply-and-explain",
                        "difficulty": "advanced",
                        "cognitiveLevel": "evaluate",
                        "type": "code-reading",
                        "question": "A new application requirement depends on final review, transfer, and next learning path. Which response best demonstrates understanding rather than memorisation?",
                        "options": [
                            "A different concept that does not satisfy the requirement",
                            "A syntax-only change with no effect on the underlying rule",
                            "Skipping validation or reasoning entirely",
                            "Model the requirement, apply final review, transfer, and next learning path, test a normal case and at least one edge case"
                        ],
                        "correctAnswer": 3,
                        "explanation": "Model the requirement, apply final review, transfer, and next learning path, test a normal case and at least one edge case",
                        "questionFingerprint": "pf-m12-module-quiz-03"
                    }
                ]
            },
            "assessment": {
                "id": "pf-m12-assessment",
                "access": "free",
                "title": "Capstone Project and Final Mastery Practical Assessment",
                "type": "practical",
                "passingScore": 75,
                "instructions": [
                    "Solve a new scenario rather than copying lesson examples.",
                    "Explain why the solution is correct.",
                    "Include normal, boundary and invalid test cases.",
                    "Describe one alternative design and why you did or did not choose it."
                ],
                "scenario": "Design and implement or write detailed pseudocode for a small feature whose main focus is Capstone Project and Final Mastery. The scenario must combine at least one concept from an earlier module."
            }
        }
    ],
    "finalAssessment": {
        "id": "pf-final-assessment",
        "title": "Programming Fundamentals Final Assessment",
        "access": "free",
        "passingScore": 75,
        "questionCount": 15,
        "randomiseQuestions": true,
        "randomiseOptions": true,
        "questions": [
            {
                "id": "pf-final-q01",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "apply",
                "type": "concept",
                "question": "A booking system must never allow two confirmed bookings for the same slot. What concept describes a rule that must remain true?",
                "options": [
                    "Invariant",
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 0,
                "explanation": "Invariant",
                "questionFingerprint": "pf-final-transfer-01"
            },
            {
                "id": "pf-final-q02",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "analyse",
                "type": "scenario",
                "question": "A form provides the text '25' but the calculation needs a number. What should happen first?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "Convert and validate the value",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 1,
                "explanation": "Convert and validate the value",
                "questionFingerprint": "pf-final-transfer-02"
            },
            {
                "id": "pf-final-q03",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "evaluate",
                "type": "decision",
                "question": "You need emails for every active user. Which two collection patterns fit best?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Filter active users, then map them to email values",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 2,
                "explanation": "Filter active users, then map them to email values",
                "questionFingerprint": "pf-final-transfer-03"
            },
            {
                "id": "pf-final-q04",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "apply",
                "type": "code-reading",
                "question": "A function writes a balance to a database. What kind of operation is that?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely",
                    "A side effect"
                ],
                "correctAnswer": 3,
                "explanation": "A side effect",
                "questionFingerprint": "pf-final-transfer-04"
            },
            {
                "id": "pf-final-q05",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "analyse",
                "type": "concept",
                "question": "The rule says 18 or older but code uses age > 18. What kind of defect is present?",
                "options": [
                    "A boundary logic error",
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 0,
                "explanation": "A boundary logic error",
                "questionFingerprint": "pf-final-transfer-05"
            },
            {
                "id": "pf-final-q06",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "evaluate",
                "type": "scenario",
                "question": "Two full loops are nested over the same growing collection size. Which growth pattern should you suspect?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "Quadratic growth",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 1,
                "explanation": "Quadratic growth",
                "questionFingerprint": "pf-final-transfer-06"
            },
            {
                "id": "pf-final-q07",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "apply",
                "type": "decision",
                "question": "Where should premium lesson entitlement be enforced?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "At a trusted backend or database authorization boundary",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 2,
                "explanation": "At a trusted backend or database authorization boundary",
                "questionFingerprint": "pf-final-transfer-07"
            },
            {
                "id": "pf-final-q08",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "analyse",
                "type": "code-reading",
                "question": "A defect once allowed quantity 0. What should be added after fixing it?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely",
                    "A regression test for quantity 0"
                ],
                "correctAnswer": 3,
                "explanation": "A regression test for quantity 0",
                "questionFingerprint": "pf-final-transfer-08"
            },
            {
                "id": "pf-final-q09",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "evaluate",
                "type": "concept",
                "question": "A function reads five global variables. Which change most improves testability?",
                "options": [
                    "Pass required dependencies explicitly",
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 0,
                "explanation": "Pass required dependencies explicitly",
                "questionFingerprint": "pf-final-transfer-09"
            },
            {
                "id": "pf-final-q10",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "apply",
                "type": "scenario",
                "question": "Why does retrying a payment request require special care?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "The operation may need idempotency protection against duplicate effects",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 1,
                "explanation": "The operation may need idempotency protection against duplicate effects",
                "questionFingerprint": "pf-final-transfer-10"
            },
            {
                "id": "pf-final-q11",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "analyse",
                "type": "decision",
                "question": "Two variables both reflect one object's changed property. What likely happened?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "They share a reference to the same object",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 2,
                "explanation": "They share a reference to the same object",
                "questionFingerprint": "pf-final-transfer-11"
            },
            {
                "id": "pf-final-q12",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "evaluate",
                "type": "code-reading",
                "question": "What is a strong first capstone milestone?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely",
                    "A small end-to-end vertical slice that works and is tested"
                ],
                "correctAnswer": 3,
                "explanation": "A small end-to-end vertical slice that works and is tested",
                "questionFingerprint": "pf-final-transfer-12"
            },
            {
                "id": "pf-final-q13",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "apply",
                "type": "concept",
                "question": "Why use a map keyed by userId for repeated lookups?",
                "options": [
                    "It matches direct keyed access better than scanning every record repeatedly",
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 0,
                "explanation": "It matches direct keyed access better than scanning every record repeatedly",
                "questionFingerprint": "pf-final-transfer-13"
            },
            {
                "id": "pf-final-q14",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "analyse",
                "type": "scenario",
                "question": "A JSON file parses but required fields are missing. What should happen?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "Validate the parsed schema and reject or handle invalid data",
                    "A syntax-only change with no effect on the underlying rule",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 1,
                "explanation": "Validate the parsed schema and reject or handle invalid data",
                "questionFingerprint": "pf-final-transfer-14"
            },
            {
                "id": "pf-final-q15",
                "courseId": "programming-fundamentals",
                "moduleId": "pf-m12",
                "lessonId": "",
                "topic": "",
                "objective": "apply-and-explain",
                "difficulty": "advanced",
                "cognitiveLevel": "evaluate",
                "type": "decision",
                "question": "What best demonstrates learning transfer?",
                "options": [
                    "A different concept that does not satisfy the requirement",
                    "A syntax-only change with no effect on the underlying rule",
                    "Applying the same concept successfully in a new unfamiliar scenario",
                    "Skipping validation or reasoning entirely"
                ],
                "correctAnswer": 2,
                "explanation": "Applying the same concept successfully in a new unfamiliar scenario",
                "questionFingerprint": "pf-final-transfer-15"
            }
        ]
    },
    "capstone": {
        "id": "programming-fundamentals-capstone",
        "title": "Programming Logic Application",
        "access": "free",
        "estimatedTime": "8-12 hours",
        "chooseOne": [
            "Task Manager",
            "Personal Expense Tracker",
            "Inventory Tracker",
            "Quiz Engine",
            "Booking Simulator"
        ],
        "requiredEvidence": [
            "Requirements and acceptance criteria",
            "Pseudocode or algorithm design",
            "Structured data model",
            "Functions and modular design",
            "Validation and failure handling",
            "Loops and collection processing",
            "Persistent storage",
            "Normal, boundary and invalid tests",
            "At least one documented bug and regression test",
            "README with setup, design decisions, limitations and next improvements"
        ]
    }
};


    /* =====================================================
       VALIDATE ALL ASSESSMENT QUESTIONS
    ===================================================== */

    const allQuestions = [];

    course.curriculum.forEach(
        courseModule => {

            (courseModule.lessons || []).forEach(
                lesson => {

                    (lesson.knowledgeCheck || []).forEach(
                        question =>
                            allQuestions.push(question)
                    );

                }
            );

            (courseModule.quiz?.questions || []).forEach(
                question =>
                    allQuestions.push(question)
            );

        }
    );

    (course.finalAssessment?.questions || []).forEach(
        question =>
            allQuestions.push(question)
    );


    if (window.CWS_ASSESSMENT_CONFIG) {

        const validation =
            window.CWS_ASSESSMENT_CONFIG
                .validateQuestionBank(
                    allQuestions
                );

        if (validation.errors.length) {
            console.error(
                "Programming Fundamentals assessment errors:",
                validation.errors
            );
        }

        if (validation.warnings.length) {
            console.warn(
                "Programming Fundamentals assessment warnings:",
                validation.warnings
            );
        }

    }


    window.CWS_COURSE_UTILS
        .registerCourseData(
            course
        );


    console.log(
        "CWS CodeLab Programming Fundamentals full course loaded."
    );

    console.log(
        `Modules: ${course.curriculum.length}`
    );

    console.log(
        `Lessons: ${course.lessonCount}`
    );

    console.log(
        `Assessment questions: ${allQuestions.length}`
    );

})();
