//preloader
$(window).on("load", function() {
    let tl = gsap.timeline({ease: "slow"});
    tl.to(".preloader", {autoAlpha: 0, delay: 0.5, duration: 1});
    tl.fromTo(".menu-btn", {autoAlpha: 0, yPercent: -10}, {autoAlpha: 1, yPercent: 0, duration: 0.5});
    tl.from(".intro-anim", {autoAlpha: 0, yPercent: 20, duration: 1, stagger: 0.25});
});

$(document).ready(function() {
    const lightBgColor = "#eeeeee";
    const darkBgColor = "#262626";

    //everything here creates the scroll animation effects
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({scrub: 1});

    let tl = gsap.timeline();
    tl.to("#sec1", {
        scrollTrigger: {
            trigger: "#sec1",
            start: "top bottom",
            end: "bottom bottom",
        },
        backgroundColor: lightBgColor,
    });
    
    tl.to(".hero-main-content", {
        scrollTrigger: {
            trigger: "#sec1",
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "restart none reverse none"
        },
        yPercent: -100,
        opacity: 0
    });

    ScrollTrigger.create({
        trigger: "#sec1",
        start: "top 10%",
        onEnter: function() { $(".menu-btn").toggleClass("dark"); },
        onLeaveBack: function() { $(".menu-btn").toggleClass("dark"); }
    });
    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        pin: true,
        pinSpacing: false
    });

    tl.to([".sec1-content h1", ".sec1-content p"], {
        scrollTrigger: {
            trigger: "#sec1",
            start: "top 25%",
            end: "bottom bottom",
            toggleActions: "restart none reverse none",
        },
        left: 0,
        ease: "slow",
        stagger: 0.25,
    });

    ScrollTrigger.create({
        trigger: "#sec1",
        end: "+=75%",
        pin: true,
        pinSpacing: true,
    });

    tl.to(".sec1-content", {
        scrollTrigger: {
            trigger: "#sec2",
            start: "top 90%",
            end: "bottom bottom",
            toggleActions: "restart none reverse none",
        },
        yPercent: -100,
        opacity: 0,
    })

    tl.to("#sec2 h1", {
        scrollTrigger: {
            trigger: "#sec2",
            start: "top 20%",
            end: "top top",
            toggleActions: "restart none reverse none",
        }, 
        opacity: 1,
    });

    ScrollTrigger.create({
        trigger: "#sec2",
        start: "top top",
        pin: true,
        pinSpacing: false
    });

    tl.to("#sec2 h1", {
        scrollTrigger: {
            trigger: "#sec3",
            start: "top 80%",
            end: "bottom bottom",
        },
        yPercent: 75,
        immediateRender: false,
    });

    tl.from(["#sec3", "#sec4"], {
        scrollTrigger: {
            trigger: "#sec3",
            start: "top 80%",
            end: "bottom bottom",
        },
        backgroundColor: lightBgColor,
    });

    tl.from("#sec3 .horizontal-content", {
        scrollTrigger: {
            trigger: "#sec3",
            start: "top 70%",
            end: "top 40%",
        },
        yPercent: -150,
        opacity: 0
    });

    ScrollTrigger.create({
        trigger: ".horizontal-scroll-wrapper",
        start: "top 10%",
        onEnter: function() { $(".menu-btn").toggleClass("dark"); },
        onLeaveBack: function() { $(".menu-btn").toggleClass("dark"); }
    });


    //creates the fake horizontal scrolling effect
    const sections = gsap.utils.toArray(".horizontal-scroll-container section");
    const container = document.querySelector(".horizontal-scroll-container");
    let horizontalScrollTween = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".horizontal-scroll-wrapper",
            start: "top top",
            end: "+=3000",
            pin: true,
            snap: {snapTo: 1 / (sections.length - 1), directional: false},
        }
    });

    //animates the text content for each section
    sections.forEach((section) => {
        let text = section.querySelectorAll(".anim");
        
        if (text.length === 0) { return; }

        gsap.from(text, {
            scrollTrigger: {
                trigger: section,
                containerAnimation: horizontalScrollTween,
                start: "left center",
                end: "left left",
            },
            yPercent: -25,
            opacity: 0,
            stagger: 0.1,
        })
    });

});
