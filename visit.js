
/* =========================================
   MORÉ — VISIT INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".visit-page");

    if (!page) return;

    // 1. Reveal sections as they enter the viewport
    const revealElements = page.querySelectorAll(".visit-reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${(index % 3) * 90}ms`;
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // 2. Smooth scrolling for links within this page
    page.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });
        });
    });

    // 3. Subtle hero image movement on desktop
    const hero = page.querySelector(".visit-hero");
    const heroImage = page.querySelector(".visit-hero-image img");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hero && heroImage && window.matchMedia("(hover: hover)").matches && !reduceMotion) {
        let animationFrame = null;

        hero.addEventListener("mousemove", (event) => {
            if (window.innerWidth < 900) return;

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            const bounds = hero.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            animationFrame = requestAnimationFrame(() => {
                heroImage.style.transform =
                    `scale(1.06) translate(${x * -9}px, ${y * -7}px)`;
            });
        });

        hero.addEventListener("mouseleave", () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            heroImage.style.transform = "";
        });
    }

    // 4. Keep the back-to-top link at the top of the page
    const backToTop = page.querySelector(".visit-back-top");

    if (backToTop) {
        backToTop.addEventListener("click", (event) => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth"
            });
        });
    }

    
    // 5. Editorial reveal for section headings
    const titleSelectors = [
        ".visit-intro-main h2",
        ".visit-rhythm-heading h2",
        ".visit-details-content h2",
        ".visit-finale-content h2"
    ];

    const titleElements = page.querySelectorAll(titleSelectors.join(", "));

    titleElements.forEach((title) => {
        title.classList.add("visit-title-reveal");

        const originalHTML = title.innerHTML;
        const lines = originalHTML.split(/<br\s*\/?>/i);

        title.innerHTML = lines
            .map((line) => `<span class="visit-title-line"><span>${line}</span></span>`)
            .join("");

        if (reduceMotion) {
            title.classList.add("is-title-visible");
            return;
        }

        if ("IntersectionObserver" in window) {
            const titleObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-title-visible");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.2 }
            );

            titleObserver.observe(title);
        } else {
            title.classList.add("is-title-visible");
        }
    });

    
    // 6. Subtle photo parallax on scroll
    const parallaxImages = page.querySelectorAll(
        ".visit-photo img, .visit-details-image img"
    );

    if (
        parallaxImages.length &&
        !reduceMotion &&
        window.matchMedia("(min-width: 769px)").matches
    ) {
        let parallaxFrame = null;

        const updateParallax = () => {
            const viewportHeight = window.innerHeight;

            parallaxImages.forEach((img) => {
                const container = img.parentElement;
                const bounds = container.getBoundingClientRect();

                if (
                    bounds.bottom < 0 ||
                    bounds.top > viewportHeight
                ) {
                    return;
                }

                const progress =
                    (bounds.top + bounds.height / 2 - viewportHeight / 2) /
                    viewportHeight;

                const offset = Math.max(-18, Math.min(18, progress * -28));

                img.style.setProperty("--visit-parallax-y", `${offset}px`);
            });

            parallaxFrame = null;
        };

        const requestParallaxUpdate = () => {
            if (parallaxFrame === null) {
                parallaxFrame = requestAnimationFrame(updateParallax);
            }
        };

        parallaxImages.forEach((img) => {
            img.style.transform =
                "translate3d(0, var(--visit-parallax-y, 0px), 0)";
        });

        window.addEventListener("scroll", requestParallaxUpdate, {
            passive: true
        });

        window.addEventListener("resize", requestParallaxUpdate);

        requestParallaxUpdate();
    }


});
