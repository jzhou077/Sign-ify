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

    tl.to(["#hero h1", ".scroll-indicator"], {
        scrollTrigger: {
            trigger: "#hero h1",
            start: "center center",
            end: "+=100%",
        },
        yPercent: -100,
        autoAlpha: 0
    });

    tl.from("#hero > p", {
        scrollTrigger: {
            trigger: "#hero h1",
            start: "center 25%",
            end: "+=100%",
        },
        yPercent: 100,
        autoAlpha: 0,
    });

    tl.from("#sec1 .img-container", {
        scrollTrigger: {
            trigger: "#sec1",
            start: "top bottom",
            end: "top top",
            pin: false,
        },
        opacity: 0,
    });

    ScrollTrigger.create({
        trigger: "#sec1",
        start: "top top",
        pin: true,
        pinSpacing: false,
    })

});