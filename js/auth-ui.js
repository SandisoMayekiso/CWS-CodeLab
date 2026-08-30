/* CWS CodeLab authentication presentation helpers.
 * This file intentionally does not submit forms. Firebase submission,
 * validation and errors remain owned by auth.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  initialisePasswordToggles();
  initialisePasswordRequirements();
  initialiseFieldCleanup();
});

function initialisePasswordToggles() {
  document.querySelectorAll("[data-password-toggle]").forEach(button => {
    const input = document.getElementById(button.dataset.passwordToggle || "");

    if (!input) {
      button.hidden = true;
      return;
    }

    button.addEventListener("click", () => {
      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      button.setAttribute("aria-pressed", String(shouldShow));
      button.setAttribute("aria-label", shouldShow ? "Hide password" : "Show password");

      const label = button.querySelector("[data-password-toggle-label]");
      if (label) {
        label.textContent = shouldShow ? "Hide" : "Show";
      }

      input.focus({ preventScroll: true });
    });
  });
}

function initialisePasswordRequirements() {
  const password = document.getElementById("password");

  if (!password || !document.getElementById("password-requirements")) {
    return;
  }

  const requirements = [
    ["requirement-length", value => value.length >= 8],
    ["requirement-uppercase", value => /[A-Z]/.test(value)],
    ["requirement-lowercase", value => /[a-z]/.test(value)],
    ["requirement-number", value => /\d/.test(value)]
  ];

  const update = () => {
    requirements.forEach(([id, validate]) => {
      const item = document.getElementById(id);
      const valid = validate(password.value);

      item?.classList.toggle("valid", valid);
      item?.setAttribute("data-valid", String(valid));
    });
  };

  password.addEventListener("input", update);
  update();
}

function initialiseFieldCleanup() {
  document.querySelectorAll(".auth-form input").forEach(input => {
    const clear = () => {
      input.removeAttribute("aria-invalid");

      const describedBy = (input.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter(Boolean);

      describedBy.forEach(id => {
        const target = document.getElementById(id);
        if (target?.classList.contains("form-error")) {
          target.textContent = "";
        }
      });
    };

    input.addEventListener(input.type === "checkbox" ? "change" : "input", clear);
  });
}
