
/* ==========================================
   MORÉ — HOME PAGE MOTION ENGINE
   Cinematic, delayed, editorial reveals
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const hero = $(".hero");
    const homeEnd = $(".home-end");

    /* 1. HERO */

    if (hero) {
        hero.classList.add("hero-loaded");
    }

    const scrollIndicator = $(".scroll-indicator");

    if (scrollIndicator) {
        scrollIndicator.addEventListener("click", () => {
            $(".about-section")?.scrollIntoView({
                behavior: reduceMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    }

    /* 2. PREPARE TEXT */

    const textGroups = [
        ".about-content",
        ".day-title",
        ".morning-title",
        ".afternoon-title",
        ".golden-title",
        ".evening-title",
        ".home-end-content"
    ];

    textGroups.forEach(selector => {
        $$(selector).forEach(group => {
            const elements = $$(
                "h1, h2, p, span, .about-intro, .about-text",
                group
            );

            elements.forEach((element, index) => {
                element.classList.add("text-reveal");

                element.style.setProperty(
                    "--reveal-delay",
                    `${Math.min(index * 150, 600)}ms`
                );
            });
        });
    });

    const sectionSelector = [
        ".about-section",
        ".day-intro",
        ".morning-section",
        ".afternoon-section",
        ".golden-section",
        ".evening-section",
        ".home-end"
    ].join(", ");

    const sections = $$(sectionSelector);

    const visuals = $$(
        ".morning-visual, .afternoon-visual, " +
        ".golden-visual, .evening-visual"
    );

    const images = $$(
    ".morning-image img, " +
    ".afternoon-image img, " +
    ".golden-image img, " +
    ".evening-image img"
);

    const placeholders = $$(
        ".image-placeholder, .afternoon-placeholder, " +
        ".golden-placeholder, .evening-placeholder"
    );

    const numbers = $$(".section-number");
    const goldenGlow = $(".golden-glow");

    const revealAll = () => {
        sections.forEach(element => {
            element.classList.add("is-visible");
        });

        visuals.forEach(element => {
            element.classList.add("visual-visible");
        });

        placeholders.forEach(element => {
            element.classList.add("placeholder-visible");
        });

        numbers.forEach(element => {
            element.classList.add("number-visible");
        });

        images.forEach(element => {
    element.classList.add("image-visible");
});

        goldenGlow?.classList.add("glow-visible");
        homeEnd?.classList.add("home-end-visible");
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealAll();
        return;
    }

    /* 3. HIDE SECTIONS UNTIL THEY ARE NEAR */

    sections.forEach(section => {
        section.classList.add("home-reveal");
    });

    /*
       Start later than before:
       the section must enter farther into the viewport
       before the reveal begins.
    */

    const targets = new Set([
    ...sections,
    ...visuals,
    ...placeholders,
    ...images,
    ...numbers
]);

    if (goldenGlow) targets.add(goldenGlow);

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const element = entry.target;

                if (element.matches(sectionSelector)) {
                    element.classList.add("is-visible");
                }

                if (element.matches(
                    ".morning-visual, .afternoon-visual, " +
                    ".golden-visual, .evening-visual"
                )) {
                    element.classList.add("visual-visible");
                }

                if (element.matches(
                    ".image-placeholder, .afternoon-placeholder, " +
                    ".golden-placeholder, .evening-placeholder"
                )) {
                    element.classList.add("placeholder-visible");
                }

                if (element.matches(".section-number")) {
                    element.classList.add("number-visible");
                }

                if (element.matches(".golden-glow")) {
                    element.classList.add("glow-visible");
                }

                if (element === homeEnd) {
                    element.classList.add("home-end-visible");
                }

                if (element.matches(
    ".morning-image img, .afternoon-image img, " +
    ".golden-image img, .evening-image img"
)) {
    element.classList.add("image-visible");
}

                observer.unobserve(element);
            });
        },
        {
            /*
              Negative top margin delays the trigger.
              The section needs to move farther down
              into the visible area before animating.
            */
            
            threshold: 0,
         rootMargin: "-35% 0px -35% 0px"
        }
    );

    targets.forEach(element => observer.observe(element));

    window.addEventListener(
        "pagehide",
        () => observer.disconnect(),
        { once: true }
    );
});
