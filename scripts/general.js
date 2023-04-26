function showMenu() {
    $(".menu").toggleClass("menu-shown");
    let tl = gsap.timeline();
    //auto alpha sets visiblility AND opacity to visible/hidden or 1/0, respectively
    tl.to(".menu", {autoAlpha: 1, duration: 1, ease: "slow"}, 'start');
    tl.fromTo(".navigation-item a", {yPercent: 100}, {yPercent: 0, duration: 0.6, stagger: 0.15, ease: "slow"}, 'start');
    tl.to(".menu-btn span", {autoAlpha: 0, xPercent: -25, duration: 0.05, ease: "power1"}, 'start');
    tl.to(".menu-btn span", {onStart: function(){ $(".menu-btn span").html("close") }, autoAlpha: 1, xPercent: 0, duration: 0.05, delay: 0.5, ease: "slow", clearProps: "opacity"}, 'start');
    // tl.fromTo(".secondary-nav-links", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1, duration: 0.75, ease: "slow"});
    $("body").css("overflow", "hidden");

    //checks if the color scheme of the button is dark, and if so, then it toggles it to not be dark, and adds a class that indicates that it was dark
    if ($(".menu-btn").hasClass("dark")) {
        $(".menu-btn").toggleClass("dark");
        $(".menu-btn").toggleClass("was-dark");
    }
}

function hideMenu() {
    let tl = gsap.timeline();
    tl.to(".menu", {autoAlpha: 0, duration: 1, ease: "slow"}, 'start');
    tl.to(".navigation-item a", {yPercent: -100, duration: 0.5, ease: "slow"}, 'start');
    tl.to(".menu-btn span", {autoAlpha: 0, xPercent: -25, duration: 0.05, ease: "power1"}, 'start');
    tl.to(".menu-btn span", {onStart: function(){ $(".menu-btn span").html("menu") }, autoAlpha: 1, xPercent: 0, duration: 0.05, delay: 0.5, ease: "slow", clearProps: "opacity"}, 'start');
    $(".menu").toggleClass("menu-shown");
    $("body").css("overflow", "");
    
    //checks if the color scheme of the button was dark, and if it was then, it will make it dark again
    if ($(".menu-btn").hasClass("was-dark")) {
        $(".menu-btn").toggleClass("dark");
        $(".menu-btn").toggleClass("was-dark");
    }
}

$(document).ready(function() {
    $(".menu-btn").click(function() {
        if (!$(".menu").hasClass("menu-shown")) {
            showMenu();
        }
        else {
            hideMenu();
        }
    });
});