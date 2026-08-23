/* =========================================================
   CWS CODELAB
   AUTHENTICATION UI

   Current responsibilities:
   - Password visibility
   - Register form validation
   - Login form validation
   - Forgot-password validation
   - Social authentication UI
   - Form messages
   - Field validation helpers

   IMPORTANT:
   This file currently provides frontend behaviour only.

   Real authentication will later be connected to:
   - Email / Password
   - Google
   - GitHub
   - Apple

   through the CodeLab authentication service.
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           INITIAL ELEMENTS
        ===================================================== */

        const registerForm =
            document.getElementById(
                "register-form"
            );


        const loginForm =
            document.getElementById(
                "login-form"
            );


        const forgotForm =
            document.getElementById(
                "forgot-password-form"
            );


        const socialAuthButtons =
            document.querySelectorAll(
                "[data-auth-provider]"
            );


        const passwordToggles =
            document.querySelectorAll(
                "[data-password-toggle]"
            );


        /* =====================================================
           PASSWORD VISIBILITY
        ===================================================== */

        initialisePasswordToggles();


        function initialisePasswordToggles() {


            passwordToggles.forEach(
                button => {


                    button.addEventListener(
                        "click",
                        () => {


                            const targetId =
                                button.dataset
                                    .passwordToggle;


                            if (!targetId) {

                                return;

                            }


                            const input =
                                document.getElementById(
                                    targetId
                                );


                            if (!input) {

                                return;

                            }


                            const isShowing =
                                input.type ===
                                "text";


                            input.type =
                                isShowing

                                    ? "password"

                                    : "text";


                            button.textContent =
                                isShowing

                                    ? "Show"

                                    : "Hide";


                            button.setAttribute(
                                "aria-label",

                                isShowing

                                    ? "Show password"

                                    : "Hide password"
                            );


                            button.setAttribute(
                                "aria-pressed",

                                isShowing
                                    ? "false"
                                    : "true"
                            );


                        }
                    );


                }
            );


        }


        /* =====================================================
           REGISTER FORM
        ===================================================== */

        if (registerForm) {

            initialiseRegisterForm(
                registerForm
            );

        }


        /* =====================================================
           LOGIN FORM
        ===================================================== */

        if (loginForm) {

            initialiseLoginForm(
                loginForm
            );

        }


        /* =====================================================
           FORGOT PASSWORD FORM
        ===================================================== */

        if (forgotForm) {

            initialiseForgotForm(
                forgotForm
            );

        }


        /* =====================================================
           SOCIAL AUTHENTICATION
        ===================================================== */

        initialiseSocialAuthentication();


        function initialiseSocialAuthentication() {


            if (
                socialAuthButtons.length === 0
            ) {

                return;

            }


            socialAuthButtons.forEach(
                button => {


                    button.addEventListener(
                        "click",
                        () => {


                            const provider =
                                normalizeProvider(
                                    button.dataset
                                        .authProvider
                                );


                            if (!provider) {

                                return;

                            }


                            handleSocialSignIn(
                                provider,
                                button
                            );


                        }
                    );


                }
            );


        }


        /* =====================================================
           SOCIAL SIGN-IN HANDLER
        ===================================================== */

        function handleSocialSignIn(
            provider,
            button
        ) {


            const providerConfig =
                getProviderConfig(
                    provider
                );


            if (!providerConfig) {


                showMessage(
                    "login-message",
                    "This sign-in provider is not currently supported.",
                    "error"
                );


                return;

            }


            /*
             * OAuth is not connected yet.
             *
             * When Firebase / OAuth is introduced,
             * this function will call the appropriate
             * provider authentication method.
             */


            setSocialButtonBusy(
                button,
                true
            );


            showMessage(
                "login-message",

                `${providerConfig.name} sign-in is ready in the CodeLab interface but is not connected to the authentication service yet.`,

                "info"
            );


            /*
             * Reset the temporary UI state immediately
             * because no external OAuth request is being
             * started yet.
             */

            window.setTimeout(
                () => {

                    setSocialButtonBusy(
                        button,
                        false
                    );

                },
                350
            );


        }


        /* =====================================================
           SOCIAL PROVIDER CONFIGURATION
        ===================================================== */

        function getProviderConfig(
            provider
        ) {


            const providers = {


                google: {

                    name:
                        "Google",

                    firebaseProvider:
                        "GoogleAuthProvider"

                },


                github: {

                    name:
                        "GitHub",

                    firebaseProvider:
                        "GithubAuthProvider"

                },


                apple: {

                    name:
                        "Apple",

                    firebaseProvider:
                        'OAuthProvider("apple.com")'

                }


            };


            return providers[
                provider
            ] || null;


        }


        /* =====================================================
           NORMALIZE PROVIDER
        ===================================================== */

        function normalizeProvider(
            provider
        ) {


            if (
                typeof provider !==
                "string"
            ) {

                return "";

            }


            return provider
                .trim()
                .toLowerCase();


        }


        /* =====================================================
           SOCIAL BUTTON BUSY STATE
        ===================================================== */

        function setSocialButtonBusy(
            button,
            busy
        ) {


            if (!button) {

                return;

            }


            button.disabled =
                busy;


            button.setAttribute(
                "aria-busy",
                busy
                    ? "true"
                    : "false"
            );


            button.classList.toggle(
                "is-loading",
                busy
            );


        }


        /* =====================================================
           REGISTER
        ===================================================== */

        function initialiseRegisterForm(
            form
        ) {


            const nameInput =
                document.getElementById(
                    "full-name"
                );


            const emailInput =
                document.getElementById(
                    "email"
                );


            const passwordInput =
                document.getElementById(
                    "password"
                );


            const confirmInput =
                document.getElementById(
                    "confirm-password"
                );


            const termsInput =
                document.getElementById(
                    "terms"
                );


            /* =================================================
               LIVE PASSWORD REQUIREMENTS
            ================================================= */

            passwordInput?.addEventListener(
                "input",
                () => {


                    updatePasswordRequirements(
                        passwordInput.value
                    );


                    clearSingleFieldError(
                        passwordInput,
                        "password-error"
                    );


                }
            );


            /* =================================================
               LIVE CONFIRM PASSWORD
            ================================================= */

            confirmInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        confirmInput,
                        "confirm-password-error"
                    );


                }
            );


            /* =================================================
               LIVE NAME
            ================================================= */

            nameInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        nameInput,
                        "full-name-error"
                    );


                }
            );


            /* =================================================
               LIVE EMAIL
            ================================================= */

            emailInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        emailInput,
                        "email-error"
                    );


                }
            );


            /* =================================================
               TERMS
            ================================================= */

            termsInput?.addEventListener(
                "change",
                () => {


                    if (
                        termsInput.checked
                    ) {

                        setText(
                            "terms-error",
                            ""
                        );

                    }


                }
            );


            /* =================================================
               SUBMIT
            ================================================= */

            form.addEventListener(
                "submit",
                event => {


                    event.preventDefault();


                    clearFormErrors(
                        form
                    );


                    hideMessage(
                        "register-message"
                    );


                    let valid =
                        true;


                    const name =
                        nameInput?.value
                            .trim() || "";


                    const email =
                        emailInput?.value
                            .trim() || "";


                    const password =
                        passwordInput?.value ||
                        "";


                    const confirmPassword =
                        confirmInput?.value ||
                        "";


                    /* =============================================
                       NAME
                    ============================================== */

                    if (
                        name.length < 2
                    ) {


                        showFieldError(
                            nameInput,
                            "full-name-error",
                            "Please enter your full name."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       EMAIL
                    ============================================== */

                    if (
                        !isValidEmail(
                            email
                        )
                    ) {


                        showFieldError(
                            emailInput,
                            "email-error",
                            "Enter a valid email address."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       PASSWORD
                    ============================================== */

                    if (
                        !isStrongPassword(
                            password
                        )
                    ) {


                        showFieldError(
                            passwordInput,
                            "password-error",
                            "Use at least 8 characters with uppercase, lowercase and a number."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       CONFIRM PASSWORD
                    ============================================== */

                    if (
                        !confirmPassword ||
                        confirmPassword !==
                            password
                    ) {


                        showFieldError(
                            confirmInput,
                            "confirm-password-error",
                            "Passwords do not match."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       TERMS
                    ============================================== */

                    if (
                        !termsInput?.checked
                    ) {


                        setText(
                            "terms-error",
                            "You must accept the Terms and Privacy Policy."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       VALIDATION FAILED
                    ============================================== */

                    if (!valid) {


                        showMessage(
                            "register-message",
                            "Please correct the highlighted fields.",
                            "error"
                        );


                        focusFirstInvalidField(
                            form
                        );


                        return;


                    }


                    /*
                     * Real account creation will replace
                     * this placeholder once authentication
                     * is connected.
                     */


                    showMessage(
                        "register-message",
                        "Your registration details are valid. Secure account creation will be connected to the CodeLab authentication service next.",
                        "success"
                    );


                }
            );


        }


        /* =====================================================
           LOGIN
        ===================================================== */

        function initialiseLoginForm(
            form
        ) {


            const emailInput =
                document.getElementById(
                    "email"
                );


            const passwordInput =
                document.getElementById(
                    "password"
                );


            /* =================================================
               LIVE EMAIL CLEAR
            ================================================= */

            emailInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        emailInput,
                        "email-error"
                    );


                }
            );


            /* =================================================
               LIVE PASSWORD CLEAR
            ================================================= */

            passwordInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        passwordInput,
                        "password-error"
                    );


                }
            );


            /* =================================================
               SUBMIT
            ================================================= */

            form.addEventListener(
                "submit",
                event => {


                    event.preventDefault();


                    clearFormErrors(
                        form
                    );


                    hideMessage(
                        "login-message"
                    );


                    let valid =
                        true;


                    const email =
                        emailInput?.value
                            .trim() || "";


                    const password =
                        passwordInput?.value ||
                        "";


                    /* =============================================
                       EMAIL
                    ============================================== */

                    if (
                        !isValidEmail(
                            email
                        )
                    ) {


                        showFieldError(
                            emailInput,
                            "email-error",
                            "Enter a valid email address."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       PASSWORD
                    ============================================== */

                    if (!password) {


                        showFieldError(
                            passwordInput,
                            "password-error",
                            "Enter your password."
                        );


                        valid =
                            false;


                    }


                    /* =============================================
                       VALIDATION FAILED
                    ============================================== */

                    if (!valid) {


                        showMessage(
                            "login-message",
                            "Please enter your account details.",
                            "error"
                        );


                        focusFirstInvalidField(
                            form
                        );


                        return;


                    }


                    /*
                     * Real authentication will replace
                     * this placeholder.
                     */


                    showMessage(
                        "login-message",
                        "Your login details are valid. Secure account authentication will be connected next.",
                        "success"
                    );


                }
            );


        }


        /* =====================================================
           FORGOT PASSWORD
        ===================================================== */

        function initialiseForgotForm(
            form
        ) {


            const emailInput =
                document.getElementById(
                    "reset-email"
                );


            emailInput?.addEventListener(
                "input",
                () => {


                    clearSingleFieldError(
                        emailInput,
                        "reset-email-error"
                    );


                }
            );


            form.addEventListener(
                "submit",
                event => {


                    event.preventDefault();


                    clearFormErrors(
                        form
                    );


                    hideMessage(
                        "forgot-message"
                    );


                    const email =
                        emailInput?.value
                            .trim() || "";


                    if (
                        !isValidEmail(
                            email
                        )
                    ) {


                        showFieldError(
                            emailInput,
                            "reset-email-error",
                            "Enter a valid email address."
                        );


                        showMessage(
                            "forgot-message",
                            "Please enter the email address associated with your account.",
                            "error"
                        );


                        emailInput?.focus();


                        return;


                    }


                    /*
                     * Real password-reset delivery will
                     * replace this placeholder.
                     */


                    showMessage(
                        "forgot-message",
                        "Email validated. Password reset delivery will be enabled when CodeLab authentication is connected.",
                        "success"
                    );


                }
            );


        }


        /* =====================================================
           PASSWORD REQUIREMENTS
        ===================================================== */

        function updatePasswordRequirements(
            password
        ) {


            toggleRequirement(
                "requirement-length",
                password.length >= 8
            );


            toggleRequirement(
                "requirement-uppercase",
                /[A-Z]/.test(
                    password
                )
            );


            toggleRequirement(
                "requirement-lowercase",
                /[a-z]/.test(
                    password
                )
            );


            toggleRequirement(
                "requirement-number",
                /\d/.test(
                    password
                )
            );


        }


        /* =====================================================
           TOGGLE REQUIREMENT
        ===================================================== */

        function toggleRequirement(
            id,
            valid
        ) {


            const element =
                document.getElementById(
                    id
                );


            if (!element) {

                return;

            }


            element.classList.toggle(
                "valid",
                valid
            );


            element.setAttribute(
                "aria-current",
                valid
                    ? "true"
                    : "false"
            );


        }


        /* =====================================================
           VALIDATORS
        ===================================================== */

        function isValidEmail(
            email
        ) {


            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(
                    email
                );


        }


        function isStrongPassword(
            password
        ) {


            return (

                password.length >= 8 &&

                /[A-Z]/.test(
                    password
                ) &&

                /[a-z]/.test(
                    password
                ) &&

                /\d/.test(
                    password
                )

            );


        }


        /* =====================================================
           FIELD ERROR
        ===================================================== */

        function showFieldError(
            input,
            errorId,
            message
        ) {


            input?.classList.add(
                "input-error"
            );


            input?.setAttribute(
                "aria-invalid",
                "true"
            );


            if (errorId) {


                input?.setAttribute(
                    "aria-describedby",
                    errorId
                );


            }


            setText(
                errorId,
                message
            );


        }


        /* =====================================================
           CLEAR SINGLE FIELD
        ===================================================== */

        function clearSingleFieldError(
            input,
            errorId
        ) {


            if (!input) {

                return;

            }


            input.classList.remove(
                "input-error"
            );


            input.removeAttribute(
                "aria-invalid"
            );


            if (errorId) {


                setText(
                    errorId,
                    ""
                );


            }


        }


        /* =====================================================
           CLEAR FORM ERRORS
        ===================================================== */

        function clearFormErrors(
            form
        ) {


            if (!form) {

                return;

            }


            form.querySelectorAll(
                ".input-error"
            )
                .forEach(
                    input => {


                        input.classList.remove(
                            "input-error"
                        );


                        input.removeAttribute(
                            "aria-invalid"
                        );


                    }
                );


            form.querySelectorAll(
                ".form-error"
            )
                .forEach(
                    error => {


                        error.textContent =
                            "";


                    }
                );


        }


        /* =====================================================
           FOCUS FIRST INVALID FIELD
        ===================================================== */

        function focusFirstInvalidField(
            form
        ) {


            const invalidField =
                form?.querySelector(
                    ".input-error"
                );


            invalidField?.focus();


        }


        /* =====================================================
           MESSAGE
        ===================================================== */

        function showMessage(
            id,
            message,
            type = "info"
        ) {


            const element =
                document.getElementById(
                    id
                );


            if (!element) {

                return;

            }


            const validTypes =
                [
                    "error",
                    "success",
                    "info"
                ];


            const messageType =
                validTypes.includes(
                    type
                )

                    ? type

                    : "info";


            element.textContent =
                message;


            element.classList.remove(
                "error",
                "success",
                "info"
            );


            element.classList.add(
                messageType
            );


            element.hidden =
                false;


        }


        /* =====================================================
           HIDE MESSAGE
        ===================================================== */

        function hideMessage(
            id
        ) {


            const element =
                document.getElementById(
                    id
                );


            if (!element) {

                return;

            }


            element.hidden =
                true;


            element.textContent =
                "";


            element.classList.remove(
                "error",
                "success",
                "info"
            );


        }


        /* =====================================================
           SET TEXT
        ===================================================== */

        function setText(
            id,
            value
        ) {


            if (!id) {

                return;

            }


            const element =
                document.getElementById(
                    id
                );


            if (!element) {

                return;

            }


            element.textContent =
                value;


        }


        /* =====================================================
           INITIAL PASSWORD REQUIREMENTS

           Ensures register page indicators correctly reflect
           pre-filled/password-manager values.
        ===================================================== */

        const initialRegisterPassword =
            document.getElementById(
                "password"
            );


        if (
            registerForm &&
            initialRegisterPassword
        ) {


            updatePasswordRequirements(
                initialRegisterPassword.value ||
                ""
            );


        }


        /* =====================================================
           INITIALIZATION
        ===================================================== */

        console.log(
            "CWS CodeLab authentication UI initialized."
        );


        if (
            socialAuthButtons.length > 0
        ) {


            console.log(
                `CWS CodeLab social sign-in providers detected: ${socialAuthButtons.length}`
            );


        }


    }
);
