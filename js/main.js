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
       OPEN NAVIGATION
    ----------------------------------------------------- */

    function openNavigation() {

      primaryNav.classList.add("open");

      navToggle.classList.add("active");

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
       CLOSE NAVIGATION
    ----------------------------------------------------- */

    function closeNavigation() {

      primaryNav.classList.remove("open");

      navToggle.classList.remove("active");

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
       TOGGLE NAVIGATION
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
       NAV BUTTON CLICK
    ----------------------------------------------------- */

    navToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        toggleNavigation();

      }
    );


    /* -----------------------------------------------------
       CLOSE NAV AFTER LINK CLICK
    ----------------------------------------------------- */

    primaryNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            closeNavigation();

          }
        );

      });


    /* -----------------------------------------------------
       CLICK OUTSIDE NAV
    ----------------------------------------------------- */

    document.addEventListener(
      "click",
      (event) => {

        const navIsOpen =
          primaryNav.classList.contains(
            "open"
          );


        if (!navIsOpen) {
          return;
        }


        const clickedInsideNav =
          primaryNav.contains(
            event.target
          );


        const clickedToggle =
          navToggle.contains(
            event.target
          );


        if (
          !clickedInsideNav &&
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


        const navIsOpen =
          primaryNav.classList.contains(
            "open"
          );


        if (!navIsOpen) {
          return;
        }


        closeNavigation();

        navToggle.focus();

      }
    );


    /* -----------------------------------------------------
       RESET NAVIGATION WHEN RETURNING TO DESKTOP
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

      }
    );

  }


  /* =======================================================
     SMOOTH SCROLL FOR SAME-PAGE LINKS
  ======================================================= */

  const samePageLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  samePageLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });


        /*
         * Update URL without causing another jump.
         */

        history.pushState(
          null,
          "",
          targetId
        );

      }
    );

  });


  /* =======================================================
     HANDLE PAGE LOAD WITH HASH
  ======================================================= */

  if (window.location.hash) {

    const hashTarget =
      document.querySelector(
        window.location.hash
      );


    if (hashTarget) {

      setTimeout(
        () => {

          hashTarget.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        },
        100
      );

    }

  }


  /* =======================================================
     EXTERNAL LINK SECURITY
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="http"]'
    )
    .forEach((link) => {

      try {

        const url =
          new URL(
            link.href,
            window.location.href
          );


        if (
          url.origin !==
          window.location.origin
        ) {

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );

        }

      } catch (error) {

        console.warn(
          "CWS CodeLab: Invalid link detected.",
          link.href
        );

      }

    });


  /* =======================================================
     ACTIVE PAGE NAVIGATION
  ======================================================= */

  function updateActiveNavigation() {

    if (!primaryNav) {
      return;
    }


    const currentPath =
      window.location.pathname
        .replace(/\/+$/, "");


    primaryNav
      .querySelectorAll("a")
      .forEach((link) => {

        const rawHref =
          link.getAttribute("href");


        if (
          !rawHref ||
          rawHref.startsWith("#") ||
          rawHref.startsWith("http")
        ) {
          return;
        }


        try {

          const linkURL =
            new URL(
              link.href,
              window.location.href
            );


          const linkPath =
            linkURL.pathname
              .replace(/\/+$/, "");


          if (
            linkPath === currentPath
          ) {

            link.classList.add(
              "active"
            );


            /*
             * Do not overwrite manually assigned
             * aria-current values.
             */

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
     BUTTON FEEDBACK
  ======================================================= */

  document
    .querySelectorAll(
      ".btn, .nav-cta"
    )
    .forEach((button) => {

      button.addEventListener(
        "mousedown",
        () => {

          button.classList.add(
            "pressed"
          );

        }
      );


      button.addEventListener(
        "mouseup",
        () => {

          button.classList.remove(
            "pressed"
          );

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.classList.remove(
            "pressed"
          );

        }
      );

    });


  /* =======================================================
     INITIALIZATION
  ======================================================= */

  console.log(
    "CWS CodeLab initialized successfully."
  );

});
