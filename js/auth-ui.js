/* =========================================================
   CWS CODELAB
   Authentication UI
   Frontend validation only
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           PASSWORD VISIBILITY
        ===================================================== */

        const passwordToggles =
            document.querySelectorAll(
                "[data-password-toggle]"
            );


        passwordToggles.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const targetId =
                            button.dataset
                                .passwordToggle;


                        const input =
                            document.getElementById(
                                targetId
                            );


                        if (!input) {

                            return;

                        }


                        const showing =
                            input.type === "text";


                        input.type =
                            showing
                                ? "password"
                                : "text";


                        button.textContent =
                            showing
                                ? "Show"
                                : "Hide";


                        button.setAttribute(
                            "aria-label",
                            showing
                                ? "Show password"
                                : "Hide password"
                        );

                    }
                );

            }
        );


        /* =====================================================
           REGISTER FORM
        ===================================================== */

        const registerForm =
            document.getElementById(
                "register-form"
            );


        if (registerForm) {

            initialiseRegisterForm(
                registerForm
            );

        }


        /* =====================================================
           LOGIN FORM
        ===================================================== */

        const loginForm =
            document.getElementById(
                "login-form"
            );


        if (loginForm) {

            initialiseLoginForm(
                loginForm
            );

        }


        /* =====================================================
           FORGOT PASSWORD FORM
        ===================================================== */

        const forgotForm =
            document.getElementById(
                "forgot-password-form"
            );


        if (forgotForm) {

            initialiseForgotForm(
                forgotForm
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


            passwordInput?.addEventListener(
                "input",
                () => {

                    updatePasswordRequirements(
                        passwordInput.value
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
                        passwordInput?.value || "";


                    const confirmPassword =
                        confirmInput?.value || "";


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


                    if (!valid) {

                        showMessage(
                            "register-message",
                            "Please correct the highlighted fields.",
                            "error"
                        );


                        return;

                    }


                    /*
                     * Firebase account creation will replace
                     * this message in the authentication phase.
                     */

                    showMessage(
                        "register-message",
                        "Registration form validated successfully. Firebase account creation will be connected next.",
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
                        passwordInput?.value || "";


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


                    if (!password) {

                        showFieldError(
                            passwordInput,
                            "password-error",
                            "Enter your password."
                        );


                        valid =
                            false;

                    }


                    if (!valid) {

                        showMessage(
                            "login-message",
                            "Please enter your account details.",
                            "error"
                        );


                        return;

                    }


                    /*
                     * Firebase sign-in will replace
                     * this message next.
                     */

                    showMessage(
                        "login-message",
                        "Login form validated successfully. Secure authentication will be connected next.",
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


                        return;

                    }


                    /*
                     * Firebase password reset will replace
                     * this message later.
                     */

                    showMessage(
                        "forgot-message",
                        "Email validated. Password reset delivery will be enabled when Firebase Authentication is connected.",
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


        function toggleRequirement(
            id,
            valid
        ) {

            const element =
                document.getElementById(
                    id
                );


            element?.classList.toggle(
                "valid",
                valid
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


            setText(
                errorId,
                message
            );

        }


        function clearFormErrors(
            form
        ) {

            form.querySelectorAll(
                ".input-error"
            ).forEach(
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
            ).forEach(
                error => {

                    error.textContent =
                        "";

                }
            );

        }


        /* =====================================================
           MESSAGE
        ===================================================== */

        function showMessage(
            id,
            message,
            type
        ) {

            const element =
                document.getElementById(
                    id
                );


            if (!element) {

                return;

            }


            element.textContent =
                message;


            element.classList.remove(
                "error",
                "success"
            );


            element.classList.add(
                type
            );


            element.hidden =
                false;

        }


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
                "success"
            );

        }


        /* =====================================================
           TEXT
        ===================================================== */

        function setText(
            id,
            value
        ) {

            const element =
                document.getElementById(
                    id
                );


            if (element) {

                element.textContent =
                    value;

            }

        }


        /* =====================================================
           INITIALIZATION
        ===================================================== */

        console.log(
            "CWS CodeLab authentication UI initialized."
        );

    }
);
