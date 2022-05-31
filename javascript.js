//Global Variables (Do I pretty much need a variable for every HTML element on the screen I'm going to manipulate?)
var displayedQuestion = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var buttonOne = document.getElementById("button-one");
var buttonTwo = document.getElementById("button-two");
var buttonThree = document.getElementById("button-three");
var buttonFour = document.getElementById("button-four");
var highScoresEl = document.getElementById("high-scores");
var userScore = document.getElementById("user-score");
var displayScores = document.getElementById("saved-scores");

var saveButton = document.getElementById("save-button");
var savedScores = JSON.parse(localStorage.getItem("score")) || [];


var timerText = document.getElementById("timer");
var timerCount = 100;
var startButton = document.getElementById("start-button");
var feedback = document.getElementById("feedback");
var introText = document.getElementById("intro");

var currentQuestion = 0;



var questions = [
    {
        text: "How do you write a comment in Javascript?",
        questionChoices: ["//This is a comment", "<-This is a comment->", "$/This is a comment", "(comment)This is a comment"],
        correctAnswer: "//This is a comment"
    },
    {
        text: "Javascript files have an extension of:",
        questionChoices: [".css", "html", ".js", ".java"],
        correctAnswer: ".js"
    },
    {
        text: "Which statement cannot be used to declare a variable in JavaScript?",
        questionChoices: ["let", "int", "const", "var"],
        correctAnswer: "int"
    },
    {
        text: "Inside which HTML element do we put the JavaScript?",
        questionChoices: ["js", "java", "script", "head"],
        correctAnswer: "script"
    },
]

function winGame(){
    clearInterval(timer);
    displayedQuestion.classList.add("hide");
    answerButtons.classList.add("hide");
    feedback.classList.add("hide");
    highScoresEl.classList.remove("hide");
    console.log(timerCount);
    userScore.innerHTML = "Your score is " + timerCount;

}

//Function to move to the next question
function nextQuestion(answer) {
    console.log("this is answer", answer);
    if (answer === questions[currentQuestion].correctAnswer) {
        feedback.innerHTML = "CORRECT!!";
        feedback.classList.remove("hide");
    } else {
        timerCount -= 10;
        feedback.innerHTML = "WRONG!!";
        feedback.classList.remove("hide");
    }
    if (currentQuestion < questions.length-1){
        currentQuestion++;
    } else {
        winGame();
        console.log("End the Game");
    }
    
    showQuestion();
}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerText.textContent = timerCount;

        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            // loseGame(); ---- needs to be created
        }
    }, 1000);
}




buttonOne.onclick = (event) => {
    event.preventDefault();
    console.log(event.target.innerHTML);
    nextQuestion(event.target.innerHTML);
}

buttonTwo.onclick = (event) => {
    event.preventDefault();
    console.log(event.target.innerHTML);
    nextQuestion(event.target.innerHTML);
}

buttonThree.onclick = (event) => {
    event.preventDefault();
    console.log(event.target.innerHTML);
    nextQuestion(event.target.innerHTML);
}

buttonFour.onclick = (event) => {
    event.preventDefault();
    console.log(event.target.innerHTML);
    nextQuestion(event.target.innerHTML);
}

function showQuestion(){
    displayedQuestion.innerHTML = questions[currentQuestion].text;
    buttonOne.innerHTML = questions[currentQuestion].questionChoices[0];
    buttonTwo.innerHTML = questions[currentQuestion].questionChoices[1];
    buttonThree.innerHTML = questions[currentQuestion].questionChoices[2];
    buttonFour.innerHTML = questions[currentQuestion].questionChoices[3];
}

//Function to start the game when start button is clicked
function startGame() {
    startButton.classList.add("hide");
    introText.classList.add("hide");
    feedback.classList.add("hide");
    startTimer();

    
    displayedQuestion.classList.remove("hide");
    answerButtons.classList.remove("hide");
    showQuestion();

    

} // end of startGame()
function saveScore(){
    var userName = document.getElementById("name");
    console.log(typeof savedScores);
    var initials = userName.value;
    savedScores+=`${timerCount}, ${initials}, `;
    localStorage.setItem("score", JSON.stringify(savedScores));
    displayScores.innerHTML = savedScores;
    displayScores.classList.remove("hide");

}

startButton.addEventListener("click", startGame);
saveButton.addEventListener("click", saveScore);

