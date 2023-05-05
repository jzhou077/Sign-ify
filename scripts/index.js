//splits the letters of an element and adds it to the target element
function splitLetters(text, target) {
    let element = document.getElementById(target);
    let splitText = text.split("");

    splitText.forEach(letter => {
        const span = document.createElement("span");
        span.className = "letter";
        span.innerText = letter;
        element.appendChild(span);
    });
}

//preloader
$(window).on("load", function() {
    let tl = gsap.timeline({ease: "slow"});
    tl.to(".preloader", {autoAlpha: 0, delay: 0.5, duration: 1});
    tl.from(".menu-btn", {autoAlpha: 0, yPercent: -10, duration: 0.5});
    tl.from(".intro-anim", {autoAlpha: 0, yPercent: 20, duration: 1, stagger: 0.1});
    tl.fromTo(".learnBtn", {autoAlpha: 0}, {autoAlpha: 1, duration: 0.25});
})

$(document).ready(function() {
    splitLetters("Silence.", "splitText");
    document.body.onpointermove = function(event) {
        const { clientX, clientY} = event;
        blob = document.querySelector(".blob");
        blob.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, {duration: 3000, fill:"forwards"});
    }
});