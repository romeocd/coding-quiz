var timerEl = document.getElementById("timer");
var highScoresLink = document.getElementById("high-scores-link");
var timeLeft = 75;
var timerID;

var introEl = document.getElementById("intro");
var startButton = document.getElementById("start-btn");

var questionsContainerEl = document.getElementById("questions-container");
var questionsEl = document.getElementById("questions");
var answersEl = document.getElementById("answer-btns");
var answerFeedback = document.getElementById("answer-feedback")
var scoresEl = document.getElementById("scores")
var submitButton = document.getElementById("submit-btn");
var clearScoresButton = document.getElementById("clear-scores-btn");
var restartButton = document.getElementById("restart-btn");
var leaderboardEl = document.getElementById("leaderboard")
var shuffledQuestions, currentQuestionIndex;

var score = 0;
var scores = JSON.parse(localStorage.getItem("scores")) || [];


var questions = [
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
        correct: "1 - Quotes",
    },
    {
        question: "Commonly used data types do NOT include:",
        answers: ["1 - Booleans", "2 - Alerts", "3 - Strings", "4 - Numbers"],
        correct: "2 - Alerts", 
    },
    {
        question: "The condition of an if/else statement is enclosed within ______.",
        answers: ["1 - Quotes", "2 - Curly Brackets", "3 - Parentheses", "4 - Square Brackets"],
        correct: "3 - Parentheses",
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above"],
        correct: "4 - All of the above"
    },
];

function displayQuestion() {
    if (currentQuestionIndex < shuffledQuestions.length) {
        var currentQuestion = shuffledQuestions[currentQuestionIndex];
        
        questionsEl.textContent = currentQuestion.question;
        
        answersEl.innerHTML = '';
        
        for (var i = 0; i < currentQuestion.answers.length; i++) {
            var answerChoice = currentQuestion.answers[i];
            var button = document.createElement('button');
            button.textContent = answerChoice;
            
            button.addEventListener('click', function(event) {
                var selectedAnswer = event.target.textContent;
                checkAnswer(selectedAnswer);
            });
            
            answersEl.appendChild(button);
        }
}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    startButton.style.display = 'none';
    introEl.style.display = 'none';
    shuffledQuestions = shuffleArray(questions);
    currentQuestionIndex = 0;

    questionsContainerEl.style.display = 'block';

    displayQuestion();
    startTimer();
}

function checkAnswer(selectedAnswer) {
    var currentQuestion = shuffledQuestions[currentQuestionIndex];

    var answerFeedback = document.getElementById("answer-feedback");

    if (selectedAnswer === currentQuestion.correct) {
        answerFeedback.textContent = 'Correct!';
    } else {
        answerFeedback.textContent = 'Wrong!';
        timeLeft -= 10; 
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < shuffledQuestions.length) {

        setTimeout(function() {
            answerFeedback.textContent = ''; 
            displayQuestion();
        }, 1000); 
    } else {
        clearInterval(timerID);
        displayFinalScore();

    }
}

function startTimer() {
    timerID = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = 'Timer: ' + timeLeft;
            timeLeft--;
        } else {
            clearInterval(timerID);

            questionsContainerEl.style.display = 'none';
            scoresEl.style.display = 'block';
        }
    }, 1000);
}

startButton.addEventListener("click", startQuiz);

function displayFinalScore() {

    questionsContainerEl.style.display = 'none';

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = 'Your Score: ' + timeLeft;

    scoresEl.style.display = 'block';
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var initials = document.getElementById("initials-field").value.trim();

    if (initials !== "") {
        var scoreData = {
            initials: initials,
            score: timeLeft,
        };

        scores.push(scoreData);

        localStorage.setItem("scores", JSON.stringify(scores));

        var scoresEl = document.getElementById("scores");
        scoresEl.style.display = "none";

        var leaderboardEl = document.getElementById("leaderboard");
        leaderboardEl.style.display = "block";

        
        showPastScores();
    }
});


function showPastScores() {
    var scoreList = document.getElementById("score-list");
    scoreList.innerHTML = "";

    if (scores.length > 0) {

        scores.sort(function(a, b) {
            return b.score - a.score;
        });

        scores.forEach(function(scoreData, index) {
            var scoreItem = document.createElement("li");
            scoreItem.textContent = scoreData.initials + ": " + scoreData.score;
            scoreList.appendChild(scoreItem);
        });
    } else {
        var noScoresItem = document.createElement("li");
        noScoresItem.textContent = "No past scores available.";
        scoreList.appendChild(noScoresItem);
    }

    var leaderboardEl = document.getElementById("leaderboard");
    leaderboardEl.style.display = "block"; 
}

function clearScores() {

    localStorage.removeItem("scores");

    var scoreList = document.getElementById("score-list");
    scoreList.innerHTML = "Scores cleared.";

}

clearScoresButton.addEventListener("click", function() {

    clearScores();
});

restartButton.addEventListener("click", function () {
    window.location.reload();
});

highScoresLink.addEventListener("click", function(event) {
    event.preventDefault(); 

    var introEl = document.getElementById("intro");
    introEl.style.display = "none";

    showPastScores();
});