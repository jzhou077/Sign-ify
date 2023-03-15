function showMenu() {
    $(".menu").toggleClass("menu-shown");
    let t1 = gsap.timeline();
    //auto alpha sets visiblility AND opacity to visible/hidden or 1/0, respectively
    t1.to(".menu", {autoAlpha: 1, duration: 1, ease: "slow"}, 'start');
    t1.fromTo(".navigation-item a", {yPercent: 100}, {yPercent: 0, duration: 0.6, stagger: 0.15, ease: "slow"}, 'start');
    t1.fromTo(".secondary-nav-links", {yPercent: 50, opacity: 0}, {yPercent: 0, opacity: 1, duration: 0.75, ease: "slow"});
}

function hideMenu() {
    let t1 = gsap.timeline();
    t1.to(".menu", {autoAlpha: 0, duration: 1, ease: "slow"}, 'start');
    t1.to(".navigation-item a", {yPercent: -100, duration: 0.5, ease: "slow"}, 'start');
    t1.to(".secondary-nav-links", {opacity: 0, duration: 0.5, ease: "slow"}, 'start');
    $(".menu").toggleClass("menu-shown");
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