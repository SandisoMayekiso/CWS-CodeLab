/* =========================================================
   CWS CODELAB
   ASSESSMENT CONFIGURATION + QUALITY VALIDATION

   Goals:
   - Prevent repeated questions
   - Prevent paraphrased clones sharing the same fingerprint
   - Avoid predictable answer-position patterns
   - Encourage varied cognitive levels and question types

   NOTE:
   This client-side validator improves course quality.
   Authoritative Pro assessment answers / grading should
   ultimately live in trusted backend logic.
========================================================= */

(() => {

    "use strict";


    const policy = {

        minimumOptions:
            3,

        maximumSameAnswerPositionRun:
            2,

        requireUniqueQuestionIds:
            true,

        requireUniqueFingerprints:
            true,

        disallowExactQuestionDuplicates:
            true,

        preferredQuestionTypes: [
            "definition",
            "concept",
            "scenario",
            "code-reading",
            "predict-output",
            "debugging",
            "decision",
            "ordering",
            "matching",
            "practical",
            "case-study"
        ],

        preferredCognitiveLevels: [
            "remember",
            "understand",
            "apply",
            "analyse",
            "evaluate",
            "create"
        ]

    };


    function normaliseQuestionText(
        value
    ) {

        return String(
            value ||
            ""
        )
            .trim()
            .toLowerCase()
            .replace(
                /[^a-z0-9\s]/g,
                " "
            )
            .replace(
                /\s+/g,
                " "
            );

    }


    function validateQuestionBank(
        questions = []
    ) {

        const errors = [];
        const warnings = [];

        const ids = new Set();
        const fingerprints = new Set();
        const prompts = new Set();


        questions.forEach(
            (
                question,
                index
            ) => {


                const label =
                    question.id ||
                    `question-${index + 1}`;


                if (
                    policy.requireUniqueQuestionIds
                ) {


                    if (!question.id) {

                        errors.push(
                            `${label}: question id is required.`
                        );

                    }

                    else if (
                        ids.has(
                            question.id
                        )
                    ) {

                        errors.push(
                            `${label}: duplicate question id.`
                        );

                    }


                    ids.add(
                        question.id
                    );

                }


                if (
                    policy.requireUniqueFingerprints
                ) {


                    if (
                        !question.questionFingerprint
                    ) {

                        warnings.push(
                            `${label}: add a questionFingerprint to detect paraphrased clones.`
                        );

                    }

                    else if (
                        fingerprints.has(
                            question.questionFingerprint
                        )
                    ) {

                        errors.push(
                            `${label}: duplicate questionFingerprint "${question.questionFingerprint}".`
                        );

                    }


                    if (
                        question.questionFingerprint
                    ) {

                        fingerprints.add(
                            question.questionFingerprint
                        );

                    }

                }


                const prompt =
                    normaliseQuestionText(
                        question.question
                    );


                if (
                    policy.disallowExactQuestionDuplicates &&
                    prompt
                ) {


                    if (
                        prompts.has(
                            prompt
                        )
                    ) {

                        errors.push(
                            `${label}: repeated question wording.`
                        );

                    }


                    prompts.add(
                        prompt
                    );

                }


                if (
                    Array.isArray(
                        question.options
                    ) &&
                    question.options.length > 0 &&
                    question.options.length <
                        policy.minimumOptions
                ) {

                    warnings.push(
                        `${label}: use at least ${policy.minimumOptions} answer options where appropriate.`
                    );

                }


            }
        );


        validateAnswerPattern(
            questions,
            warnings
        );


        return {

            valid:
                errors.length ===
                0,

            errors,

            warnings

        };

    }


    function validateAnswerPattern(
        questions,
        warnings
    ) {

        let currentAnswer = null;
        let runLength = 0;


        questions.forEach(
            question => {


                if (
                    typeof question.correctAnswer !==
                    "number"
                ) {

                    currentAnswer =
                        null;

                    runLength =
                        0;

                    return;

                }


                if (
                    question.correctAnswer ===
                    currentAnswer
                ) {

                    runLength += 1;

                }

                else {

                    currentAnswer =
                        question.correctAnswer;

                    runLength =
                        1;

                }


                if (
                    runLength >
                    policy.maximumSameAnswerPositionRun
                ) {

                    warnings.push(
                        `Answer-position pattern: option index ${currentAnswer} is correct ${runLength} times consecutively.`
                    );

                }


            }
        );

    }


    function assertQuestionBank(
        questions
    ) {

        const result =
            validateQuestionBank(
                questions
            );


        if (!result.valid) {

            throw new Error(
                `CWS assessment bank validation failed:\n${result.errors.join("\n")}`
            );

        }


        return result;

    }


    window.CWS_ASSESSMENT_CONFIG = {

        policy,

        validateQuestionBank,

        assertQuestionBank

    };


})();
