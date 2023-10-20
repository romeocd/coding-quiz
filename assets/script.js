
var timerEl = document.getElementById("timer");
var highScoresEl = getElementById("high-scores");
var timeLeft = 75;
var timerID;
var introEl = document.getElementById("intro");
var startButton = document.getElementById("start-btn");

var questionsContainerEl = document.getElementById("questions-container");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answer-btns");

var scoresEl = document.getElementById("scores")
var submitButton = document.getElementById("submit-btn");

var shuffledQuestions, currentQuestionIndex;
var scores = JSON.parse(localStorage.getItem("scores")) || [];


var questions = [
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
        correct: "option3",
    },
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1 - Booleans", "2 - Alerts", "3 - Strings", "4 - Numbers"],
        correct: "option1",
    },
    {
        question: "The condition of an if/else statement is enclosed within ______.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Parentheses", "4 - Square Brackets"],
        correct: "option2",
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above",],
        correct: "option3",
    },
];

function startQuiz () {
    timerID = setInterval(timeTick, 1000);
    introEl.document.style = "none";
    startButton.document.style = "none";

}
//Event Listener to start quiz
startButton.addEventListener("click", startQuiz);