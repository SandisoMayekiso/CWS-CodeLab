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

  const MOBILE_NAV_BREAKPOINT = 900;

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
     INITIALIZATION
  ======================================================= */

  console.log(
    "CWS CodeLab initialized successfully."
  );

});
