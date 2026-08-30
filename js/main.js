/* =========================================================
   CWS CODELAB
   Global Site JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const navToggle =
    document.querySelector(".nav-toggle");

  const primaryNav =
    document.querySelector(".primary-nav");

  const siteHeader =
    document.querySelector(".site-header");

  const yearTarget =
    document.querySelector("#current-year");


  /* =======================================================
     CONFIGURATION
  ======================================================= */

  const MOBILE_NAV_BREAKPOINT = 1050;

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  if (yearTarget) {

    yearTarget.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     HEADER SCROLL STATE
  ======================================================= */

  function updateHeaderScrollState() {

    if (!siteHeader) {
      return;
    }


    siteHeader.classList.toggle(
      "scrolled",
      window.scrollY > 12
    );

  }


  updateHeaderScrollState();


  window.addEventListener(
    "scroll",
    updateHeaderScrollState,
    {
      passive: true
    }
  );


  /* =======================================================
     MOBILE NAVIGATION
  ======================================================= */

  if (navToggle && primaryNav) {


    /* -----------------------------------------------------
       OPEN NAV
    ----------------------------------------------------- */

    function openNavigation() {

      primaryNav.classList.add(
        "open"
      );


      navToggle.classList.add(
        "active"
      );


      navToggle.setAttribute(
        "aria-expanded",
        "true"
      );


      navToggle.setAttribute(
        "aria-label",
        "Close navigation"
      );


      document.body.classList.add(
        "nav-open"
      );

    }


    /* -----------------------------------------------------
       CLOSE NAV
    ----------------------------------------------------- */

    function closeNavigation() {

      primaryNav.classList.remove(
        "open"
      );


      navToggle.classList.remove(
        "active"
      );


      navToggle.setAttribute(
        "aria-expanded",
        "false"
      );


      navToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );


      document.body.classList.remove(
        "nav-open"
      );

    }


    /* -----------------------------------------------------
       TOGGLE NAV
    ----------------------------------------------------- */

    function toggleNavigation() {

      const isOpen =
        primaryNav.classList.contains(
          "open"
        );


      if (isOpen) {

        closeNavigation();

      } else {

        openNavigation();

      }

    }


    /* -----------------------------------------------------
       TOGGLE BUTTON
    ----------------------------------------------------- */

    navToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        toggleNavigation();

      }
    );


    /* -----------------------------------------------------
       NAV LINK CLICK
    ----------------------------------------------------- */

    primaryNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            if (
              window.innerWidth <=
              MOBILE_NAV_BREAKPOINT
            ) {

              closeNavigation();

            }

          }
        );

      });


    /* -----------------------------------------------------
       CLICK OUTSIDE
    ----------------------------------------------------- */

    document.addEventListener(
      "click",
      (event) => {

        if (
          !primaryNav.classList.contains(
            "open"
          )
        ) {

          return;

        }


        const clickedNav =
          primaryNav.contains(
            event.target
          );


        const clickedToggle =
          navToggle.contains(
            event.target
          );


        if (
          !clickedNav &&
          !clickedToggle
        ) {

          closeNavigation();

        }

      }
    );


    /* -----------------------------------------------------
       ESCAPE KEY
    ----------------------------------------------------- */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key !== "Escape"
        ) {

          return;

        }


        if (
          !primaryNav.classList.contains(
            "open"
          )
        ) {

          return;

        }


        closeNavigation();

        navToggle.focus();

      }
    );


    /* -----------------------------------------------------
       DESKTOP RESET
    ----------------------------------------------------- */

    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth >
          MOBILE_NAV_BREAKPOINT
        ) {

          closeNavigation();

        }

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     SAFE SAME-PAGE SCROLL
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          let target;


          try {

            target =
              document.querySelector(
                targetId
              );

          } catch (error) {

            console.warn(
              "CWS CodeLab: Invalid section link.",
              targetId
            );

            return;

          }


          if (!target) {

            return;

          }


          event.preventDefault();


          target.scrollIntoView({

            behavior:
              reducedMotion.matches
                ? "auto"
                : "smooth",

            block:
              "start"

          });


          if (
            window.location.hash !==
            targetId
          ) {

            history.pushState(
              null,
              "",
              targetId
            );

          }

        }
      );

    });


  /* =======================================================
     INITIAL HASH
  ======================================================= */

  function scrollToInitialHash() {

    const hash =
      window.location.hash;


    if (!hash) {

      return;

    }


    let target;


    try {

      target =
        document.querySelector(
          hash
        );

    } catch (error) {

      return;

    }


    if (!target) {

      return;

    }


    window.setTimeout(
      () => {

        target.scrollIntoView({

          behavior:
            reducedMotion.matches
              ? "auto"
              : "smooth",

          block:
            "start"

        });

      },
      100
    );

  }


  scrollToInitialHash();


  /* =======================================================
     EXTERNAL LINK SECURITY
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http://"], a[href^="https://"]'
    )
    .forEach((link) => {

      try {

        const url =
          new URL(
            link.href,
            window.location.href
          );


        if (
          url.origin ===
          window.location.origin
        ) {

          return;

        }


        const relValues =
          new Set(
            (
              link.getAttribute("rel") ||
              ""
            )
              .split(/\s+/)
              .filter(Boolean)
          );


        relValues.add(
          "noopener"
        );


        relValues.add(
          "noreferrer"
        );


        link.setAttribute(
          "rel",
          Array
            .from(relValues)
            .join(" ")
        );

      } catch (error) {

        console.warn(
          "CWS CodeLab: Invalid external link.",
          link.href
        );

      }

    });


  /* =======================================================
     ACTIVE PAGE NAVIGATION
  ======================================================= */

  function normalisePath(path) {

    let cleanPath =
      path.replace(
        /\/+$/,
        ""
      );


    if (
      cleanPath.endsWith(
        "/index.html"
      )
    ) {

      cleanPath =
        cleanPath.slice(
          0,
          -"/index.html".length
        );

    }


    return cleanPath || "/";

  }


  function updateActiveNavigation() {

    if (!primaryNav) {

      return;

    }


    const currentPath =
      normalisePath(
        window.location.pathname
      );


    primaryNav
      .querySelectorAll("a")
      .forEach((link) => {

        const rawHref =
          link.getAttribute(
            "href"
          );


        if (!rawHref) {

          return;

        }


        if (
          rawHref.startsWith("#") ||
          rawHref.startsWith("http://") ||
          rawHref.startsWith("https://")
        ) {

          return;

        }


        try {

          const linkUrl =
            new URL(
              link.href,
              window.location.href
            );


          const linkPath =
            normalisePath(
              linkUrl.pathname
            );


          if (
            linkPath ===
            currentPath
          ) {

            link.classList.add(
              "active"
            );


            if (
              !link.hasAttribute(
                "aria-current"
              )
            ) {

              link.setAttribute(
                "aria-current",
                "page"
              );

            }

          }

        } catch (error) {

          console.warn(
            "CWS CodeLab: Could not evaluate navigation link.",
            rawHref
          );

        }

      });

  }


  updateActiveNavigation();


  /* =======================================================
     BUTTON PRESS FEEDBACK
  ======================================================= */

  document
    .querySelectorAll(
      ".btn, .nav-cta, .pricing-button"
    )
    .forEach((button) => {


      const addPressedState =
        () => {

          button.classList.add(
            "pressed"
          );

        };


      const removePressedState =
        () => {

          button.classList.remove(
            "pressed"
          );

        };


      button.addEventListener(
        "pointerdown",
        addPressedState
      );


      button.addEventListener(
        "pointerup",
        removePressedState
      );


      button.addEventListener(
        "pointercancel",
        removePressedState
      );


      button.addEventListener(
        "pointerleave",
        removePressedState
      );


      button.addEventListener(
        "blur",
        removePressedState
      );

    });


  /* =======================================================
     OPTIONAL ANALYTICS CONSENT

     Essential authentication storage is not controlled by
     this banner. Only optional Analytics is enabled after an
     explicit choice.
  ======================================================= */

  const ANALYTICS_CONSENT_KEY =
    "cws.analytics-consent";

  const preferenceButton =
    document.getElementById("manage-cookie-preferences");

  let consentBanner = null;


  preferenceButton?.addEventListener("click", () => {
    clearConsentPreference();
    showConsentBanner();
  });


  if (!readConsentPreference()) {
    showConsentBanner();
  }


  function showConsentBanner() {

    if (consentBanner?.isConnected) {
      consentBanner.querySelector("button")?.focus();
      return;
    }

    consentBanner = document.createElement("aside");
    consentBanner.className = "consent-banner";
    consentBanner.setAttribute("aria-label", "Analytics preferences");

    const cookiePolicyUrl =
      document.body.dataset.page === "home"
        ? "pages/cookie-policy.html"
        : "cookie-policy.html";

    consentBanner.innerHTML = `
      <div>
        <strong>Optional analytics</strong>
        <p>CodeLab uses essential storage for account features. Optional Analytics only runs if you allow it. <a href="${cookiePolicyUrl}">Read the Cookie Policy</a>.</p>
      </div>
      <div class="consent-actions">
        <button type="button" class="consent-decline">Decline</button>
        <button type="button" class="consent-accept">Allow analytics</button>
      </div>
    `;

    consentBanner
      .querySelector(".consent-decline")
      ?.addEventListener("click", () => saveConsentPreference("denied"));

    consentBanner
      .querySelector(".consent-accept")
      ?.addEventListener("click", () => saveConsentPreference("granted"));

    document.body.appendChild(consentBanner);
  }


  function saveConsentPreference(value) {
    try {
      localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
    } catch (error) {
      console.info("CWS CodeLab could not persist the analytics preference.", error);
    }

    window.dispatchEvent(
      new CustomEvent("cws:analytics-consent", { detail: value })
    );

    consentBanner?.remove();
    consentBanner = null;
  }


  function readConsentPreference() {
    try {
      return localStorage.getItem(ANALYTICS_CONSENT_KEY);
    } catch {
      return null;
    }
  }


  function clearConsentPreference() {
    try {
      localStorage.removeItem(ANALYTICS_CONSENT_KEY);
    } catch {
      // The preference can still be changed for the current page.
    }
  }


  /* =======================================================
     CATALOGUE-DRIVEN PUBLIC METRICS

     The homepage and catalogue summary use the same central
     metadata as the course cards. This prevents marketing
     counts from becoming stale when a course changes status.
  ======================================================= */

  const publicCourses =
    Array.isArray(window.CWS_COURSES)
      ? window.CWS_COURSES
      : [];


  if (publicCourses.length) {

    const availableCourses =
      publicCourses.filter(
        course => course.status === "available"
      );

    const metrics = {
      available: availableCourses.length,
      free: availableCourses.filter(
        course => String(course.access).toLowerCase() === "free"
      ).length,
      pro: availableCourses.filter(
        course => String(course.access).toLowerCase() === "pro"
      ).length,
      upcoming: publicCourses.filter(
        course => course.status === "coming-soon"
      ).length,
      projects: availableCourses.reduce(
        (total, course) => total + Number(course.projects || 0),
        0
      )
    };

    document
      .querySelectorAll("[data-course-metric]")
      .forEach(element => {
        const name = element.dataset.courseMetric;

        if (Object.hasOwn(metrics, name)) {
          element.textContent = String(metrics[name]);
        }
      });

    renderHomeCourses(availableCourses);

  }


  function renderHomeCourses(courses) {

    const grid =
      document.getElementById("home-course-grid");

    if (!grid) {
      return;
    }

    const featured = courses
      .filter(course => course.featured)
      .slice(0, 3);

    const visibleCourses =
      featured.length === 3
        ? featured
        : courses.slice(0, 3);

    grid.innerHTML = visibleCourses
      .map(course => {
        const access = String(course.access || "Free");
        const accessClass = access.toLowerCase() === "pro" ? "pro" : "free";
        const accent = sanitiseCssColour(course.accent);

        return `
          <article class="home-course-card" style="--course-accent:${accent}">
            <div class="home-course-top">
              <span class="course-monogram">${escapeHtml(course.icon || "CWS")}</span>
              <span class="access-badge ${accessClass}">${escapeHtml(access)}</span>
            </div>
            <h3>${escapeHtml(course.title)}</h3>
            <p>${escapeHtml(course.outcome || course.description)}</p>
            <div class="home-course-meta">
              <span>${escapeHtml(course.level)}</span>
              <span>${Number(course.modules || 0)} modules</span>
              <span>${Number(course.projects || 0)} projects</span>
            </div>
            <a class="text-link" href="pages/courses.html?course=${encodeURIComponent(course.id)}">
              View course <span aria-hidden="true">→</span>
            </a>
          </article>
        `;
      })
      .join("");

  }


  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }


  function sanitiseCssColour(value) {
    const colour = String(value || "").trim();
    return /^#[\da-f]{3,8}$/i.test(colour)
      ? colour
      : "#8b7cff";
  }


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  console.log(
    "CWS CodeLab initialized successfully."
  );

});
