// Set up health meter + gameover Modal + startagain button
var heartsNum = 4;
var heartsSymbol = '&hearts;'
var healthMeter = document.querySelector('#health-meter');
for (var i = 0; i < heartsNum; i++) {
    healthMeter.innerHTML += heartsSymbol;
};

var gameoverModal = document.querySelector('#gameover-modal');
function gameover() {
    if (heartsNum == 0) {
        gameoverModal.style.visibility = "visible";
    };
};

var startagain = document.querySelector('#startagain');
var startagainFn = function () {
    var heartsNum = 4;
    for (var i = 0; i < heartsNum; i++) {
        healthMeter.innerHTML += heartsSymbol;
    };
    curQ = 0;
    questionDiv.innerHTML = questions[curQ][0];
    allAnswers.forEach((element, index) => {
        element.innerHTML = questions[curQ][index + 1];
    });
    qNumber.innerHTML = (curQ + 1) + " / " + questions.length;
    next.style.visibility = 'hidden';
    gameoverModal.style.visibility = "hidden";
    clearFeedback();
};
startagain.addEventListener('click', startagainFn);

// QUESTIONS
var questions = [
    ["demo question", "correct", "wrong1", "wrong2", "wrong3"],
    ["capital city of Portugal?", "Lisbon", "Norway", "Faro", "Porto"],
    ["What is the ich form of dürfen?", "darf", "darfst", "dürfen", "dürft"],
    ["What is the er form of dürfen?", "darf", "darfst", "dürfen", "dürft"]
];

// Store correct answers in new array
var allCorrect = questions.map((questions) => questions[1]);
var allWrongs = questions.map(arr => arr.slice(2));

// Shuffle answers
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i) + 1;  // start from second element
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

for (i = 0; i < 4; i++) {
    shuffleArray(questions[i]);
};

// Send Question 1 to the DOM
var curQ = 0;
var questionDiv = document.querySelector('#question');
questionDiv.innerHTML = questions[curQ][0];

// Send Q1 Answers to DOM
var allAnswers = document.querySelectorAll('.answer');
allAnswers.forEach((element, index) => {
    element.innerHTML = questions[curQ][index + 1];
});

// Feedback when user clicks answer
var feedback = document.querySelector('#feedback');
feedback.style.visibility = "hidden";
function hideWrongs() {
    allAnswers.forEach(answer => {
        if (allWrongs[curQ].includes(answer.innerHTML)) {
            answer.style.visibility = "hidden";
        }
    });
};
function showWrongs() {
    allAnswers.forEach(answer => {
        answer.style.visibility = "visible";
    });
};
function reduceHealth() {
    if (heartsNum > 0) {
        heartsNum--;
        healthMeter.innerHTML = '';

        for (var i = 0; i < heartsNum; i++) {
            healthMeter.innerHTML += heartsSymbol;
        }
    }
};

allAnswers.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (element.innerHTML == allCorrect[curQ]) {
            element.classList.add('correctAnswer');
            feedback.style.visibility = "visible";
            feedback.classList.remove('wrongText');
            feedback.classList.add('correctText');
            feedback.innerHTML = ("CORRECT!");
            allBtns[1].style.visibility = "visible";
            hideWrongs();
        }
        else {
            element.classList.add('wrongAnswer');
            feedback.style.visibility = "visible";
            feedback.classList.remove('correctText');
            feedback.classList.add('wrongText');
            feedback.innerHTML = ("Try again");
            reduceHealth();
            gameover();
        };
    });
});

function clearFeedback() {
    allAnswers.forEach((element, index) => {
        feedback.style.visibility = "hidden";
        element.classList.remove('correctAnswer');
        element.classList.remove('wrongAnswer');
    });
};

// Question Number Indicator
var qNumber = document.querySelector('#q-number');
qNumber.innerHTML = (curQ + 1) + " / " + questions.length;

// NAV BUTTONS
var allBtns = document.querySelectorAll('.btn');
allBtns.forEach((element, index) => {
    element.style.visibility = "hidden";
});
var next = document.querySelector('#next');
next.addEventListener('click', () => {
    if (curQ < (questions.length - 1)) {
        showWrongs();
        clearFeedback();
        // prev.style.visibility = 'visible';
        curQ++;
        questionDiv.innerHTML = questions[curQ][0];
        allAnswers.forEach((element, index) => {
            element.innerHTML = questions[curQ][index + 1];
        });
        qNumber.innerHTML = (curQ + 1) + " / " + questions.length;
        next.style.visibility = 'hidden';
    };
});
var prev = document.querySelector('#prev');
prev.style.visibility = 'hidden';
prev.addEventListener('click', () => {
    if (curQ > 0) {
        showWrongs();
        clearFeedback();
        next.style.visibility = 'visible';
        curQ--;
        questionDiv.innerHTML = questions[curQ][0];
        allAnswers.forEach((element, index) => {
            element.innerHTML = questions[curQ][index + 1];
        });
        qNumber.innerHTML = (curQ + 1) + " / " + questions.length;
        if (curQ == 0) {
            prev.style.visibility = 'hidden';
        };
    };
});