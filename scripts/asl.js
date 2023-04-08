//preloader
$(window).on("load", function() {
    let tl = gsap.timeline({ease: "slow"});
    tl.to(".preloader", {autoAlpha: 0, delay: 0.5, duration: 1});
    tl.from(".menu-btn", {autoAlpha: 0, yPercent: -10, duration: 0.5});
})

$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({scrub: 1});
    let tl = gsap.timeline()

    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=200%",
        pin: true,
    });

    tl.to(["#hero-heading", ".scroll-indicator"], {
        scrollTrigger: {
            trigger: "#hero-heading",
            start: "center center",
            end: "+=100%",
        },
        yPercent: -100,
        autoAlpha: 0
    });

    tl.from("#hero-content", {
        scrollTrigger: {
            trigger: "#hero-heading",
            start: "center 25%",
            end: "+=100%",
        },
        yPercent: 100,
        autoAlpha: 0,
    });

    tl.from("#sec1", {
        scrollTrigger: {
            trigger: "#hero-content",
            start: "150% center",
            markers: true,
        },
        yPercent: 100,
    })
    
});