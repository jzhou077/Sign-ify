import { FilesetResolver, GestureRecognizer } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js";

//global variables for the model
let vision = null;
let gestureRecognizer = null;
//variable used later on for getting the letters inside of the user's chosen word
let lettersToSpell;

//loads in the machine learning model that recognizes hand gestures
async function loadModel() {
    // Create task for image file processing:
    vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "scripts/ASL_Recognizer.task"
        },
        numHands: 1
    });
}

//checks if webcam access is supported
function getUserMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function enableCam(event) {
    const video = document.getElementById("webcam");

    if (!gestureRecognizer) {
        alert("Gesture recognizer loading");
        return;
    }

    const constraints = {
        video: true
    };

    //starts playing information from the camera on the video tag 
    //and starts predicting once the video starts playing to stop the model from predicting any empty frames
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    })
}

//classifies the gestures into ASL letters
async function predictWebcam() {
    const video = document.getElementById("webcam");
    const canvas = document.getElementById("output-canvas");
    const canvasCtx = canvas.getContext("2d");

    await gestureRecognizer.setOptions({ runningMode: "video" });
    let nowInMs = Date.now();
    //this is the function that calls the model and the results are stored in a variable
    const results = gestureRecognizer.recognizeForVideo(video, nowInMs);

    canvasCtx.save();
    $(canvas).css({"width":"480px", "height":"360px"});
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                color: "#e2dddf",
                lineWidth: 3
            });
            drawLandmarks(canvasCtx, landmarks, {color: "#2f404d", lineWidth: 3});
        }
    }

    canvasCtx.restore();
    
    //if the model detects any ASL letters
    if (results.gestures.length > 0 && $("#chosen-word").text().length > 0 && lettersToSpell.length > 0) {
        let prediction = results.gestures[0][0].categoryName;
        let confidence = Math.round(parseFloat(results.gestures[0][0].score) * 100);
        console.log(prediction);
        console.log(confidence);

        //if the character is a space, then move on
        if (lettersToSpell[0].innerHTML === " ") {
            lettersToSpell.shift()
        }

        //checks if the predicted asl letter corresponds with the letter that the user chose
        //if so, then it will move on to the next letter
        if (lettersToSpell[0].innerHTML === prediction && confidence > 50) {
            gsap.to(lettersToSpell[0], {color: "white", duration: 0.25});
            lettersToSpell.shift();
        }
    }

    window.requestAnimationFrame(predictWebcam);
}

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
    tl.from(".menu-btn", {autoAlpha: 0, yPercent: -10, duration: 0.5}, "together");
    //"getting started" section, handles the slide down and the close button
    tl.from("#instructions", {yPercent: 100, duration: 1}, "together");
});

$(document).ready(function(){
    loadModel();
    
    if (getUserMediaSupported()) {
        $("#camera-btn").click(function() {
            enableCam();
            gsap.to("#instructions", {yPercent: 100, duration: 1, oncomplete: function() {
                $("#camera-btn").toggle();
                $("#close-instructions-btn").toggle();
            }});
        });
    }

    $("#open-letters-btn").click(function() {
        gsap.to("#asl-letters", {top: "0", duration: 1, ease: "none", delay: 0});

    });

    $("#close-letters-btn").click(function() {
        gsap.to("#asl-letters", {top: "100%", duration: 1, ease: "none", delay: 0});
    })

    //sets the inital word of "learn" for the user to practice
    splitLetters("learn", "chosen-word");
    lettersToSpell = Array.from(document.querySelectorAll("#chosen-word .letter"));

    let userText;
    $(".textfield").on("input", function() {
        userText = $(".textfield").val().toLowerCase();
    });

    $(".spell-btn").click(function(){
        if (!userText.includes("j") && !userText.includes("z") && userText.length <= 10 && userText.length > 0) {
            $("#chosen-word").empty();
            splitLetters(userText, "chosen-word");
            lettersToSpell = Array.from(document.querySelectorAll("#chosen-word .letter"));
            $(".textfield").val("");
        }
    });
});