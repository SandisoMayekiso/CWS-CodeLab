/* =========================================================
   CWS CODELAB
   COURSE EXPERIENCE SCHEMA + HELPERS

   Shared structural conventions for:
   - Lessons
   - Examples
   - Practice tasks
   - Knowledge checks
   - Module challenges
   - Projects
   - Assessments

   Free courses may use the full structure.
   Pro content can use the same schema, but premium bodies
   should ultimately be delivered from protected storage.
========================================================= */

(() => {

    "use strict";


    const ACCESS = Object.freeze({
        FREE: "free",
        PRO: "pro"
    });


    const DIFFICULTY = Object.freeze({
        FOUNDATION: "foundation",
        BEGINNER: "beginner",
        INTERMEDIATE: "intermediate",
        ADVANCED: "advanced",
        PROFESSIONAL: "professional",
        PREMIUM: "premium"
    });


    const QUESTION_TYPES = Object.freeze({
        DEFINITION: "definition",
        CONCEPT: "concept",
        SCENARIO: "scenario",
        CODE_READING: "code-reading",
        PREDICT_OUTPUT: "predict-output",
        DEBUGGING: "debugging",
        DECISION: "decision",
        ORDERING: "ordering",
        MATCHING: "matching",
        TRUE_FALSE: "true-false",
        FILL_CODE: "fill-code",
        PRACTICAL: "practical",
        CASE_STUDY: "case-study"
    });


    const COGNITIVE_LEVELS = Object.freeze({
        REMEMBER: "remember",
        UNDERSTAND: "understand",
        APPLY: "apply",
        ANALYSE: "analyse",
        EVALUATE: "evaluate",
        CREATE: "create"
    });


    function makeLesson(
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

            access:
                options.access ||
                ACCESS.FREE,

            difficulty:
                options.difficulty ||
                DIFFICULTY.BEGINNER,

            duration:
                options.duration ||
                "25 min",

            preview:
                Boolean(
                    options.preview
                ),

            description:
                options.description ||
                "",

            what:
                options.what ||
                "",

            why:
                options.why ||
                "",

            who:
                normaliseArray(
                    options.who
                ),

            when:
                normaliseArray(
                    options.when
                ),

            where:
                normaliseArray(
                    options.where
                ),

            avoidWhen:
                normaliseArray(
                    options.avoidWhen
                ),

            how:
                options.how ||
                "",

            terminology:
                normaliseArray(
                    options.terminology
                ),

            objectives:
                normaliseArray(
                    options.objectives
                ),

            concepts:
                normaliseArray(
                    options.concepts
                ),

            content:
                normaliseArray(
                    options.content
                ),

            examples:
                normaliseArray(
                    options.examples
                ),

            practice:
                normaliseArray(
                    options.practice
                ),

            commonMistakes:
                normaliseArray(
                    options.commonMistakes
                ),

            troubleshooting:
                normaliseArray(
                    options.troubleshooting
                ),

            advanced:
                options.advanced ||
                null,

            realWorld:
                normaliseArray(
                    options.realWorld
                ),

            knowledgeCheck:
                normaliseArray(
                    options.knowledgeCheck
                ),

            resources:
                normaliseArray(
                    options.resources
                )

        };

    }


    function makeModule(
        id,
        title,
        options = {}
    ) {

        return {

            id,

            title,

            order:
                Number(
                    options.order ||
                    0
                ),

            access:
                options.access ||
                ACCESS.FREE,

            description:
                options.description ||
                "",

            why:
                options.why ||
                "",

            outcomes:
                normaliseArray(
                    options.outcomes
                ),

            lessons:
                normaliseArray(
                    options.lessons
                ),

            lab:
                options.lab ||
                null,

            quiz:
                options.quiz ||
                null,

            assessment:
                options.assessment ||
                null,

            project:
                options.project ||
                null

        };

    }


    function makeExample(
        options = {}
    ) {

        return {

            id:
                options.id ||
                "",

            title:
                options.title ||
                "Example",

            scenario:
                options.scenario ||
                "",

            language:
                options.language ||
                "javascript",

            code:
                options.code ||
                "",

            output:
                options.output ||
                "",

            explanation:
                options.explanation ||
                ""

        };

    }


    function makePractice(
        options = {}
    ) {

        return {

            id:
                options.id ||
                "",

            title:
                options.title ||
                "Practice",

            difficulty:
                options.difficulty ||
                DIFFICULTY.BEGINNER,

            task:
                options.task ||
                "",

            hint:
                options.hint ||
                "",

            solution:
                options.solution ||
                "",

            expectedOutcome:
                options.expectedOutcome ||
                ""

        };

    }


    function makeQuestion(
        options = {}
    ) {

        return {

            id:
                options.id ||
                "",

            courseId:
                options.courseId ||
                "",

            moduleId:
                options.moduleId ||
                "",

            lessonId:
                options.lessonId ||
                "",

            topic:
                options.topic ||
                "",

            objective:
                options.objective ||
                "",

            difficulty:
                options.difficulty ||
                DIFFICULTY.BEGINNER,

            cognitiveLevel:
                options.cognitiveLevel ||
                COGNITIVE_LEVELS.UNDERSTAND,

            type:
                options.type ||
                QUESTION_TYPES.CONCEPT,

            question:
                options.question ||
                "",

            options:
                normaliseArray(
                    options.options
                ),

            correctAnswer:
                options.correctAnswer,

            explanation:
                options.explanation ||
                "",

            questionFingerprint:
                options.questionFingerprint ||
                ""

        };

    }


    function normaliseArray(
        value
    ) {

        return Array.isArray(
            value
        )
            ? value
            : [];

    }


    window.CWS_COURSE_EXPERIENCE = {

        ACCESS,

        DIFFICULTY,

        QUESTION_TYPES,

        COGNITIVE_LEVELS,

        makeLesson,

        makeModule,

        makeExample,

        makePractice,

        makeQuestion

    };


    console.log(
        "CWS CodeLab course experience schema loaded."
    );


})();
