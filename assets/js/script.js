var startButton = document.getElementById('start-btn')
var timeEl = document.querySelector(".time");
var secondsLeft = 100;
var score= 0;
var nextButton = document.getElementById('next-btn')
var questionContainterEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-buttons')
var shuffleQ, currentQIndex
startButton.addEventListener('click', start)
nextButton.addEventListener('click', () => {
    currentQIndex++
    setNext()
})

function start() {
    startButton.classList.add('hide')
    function setTime() {
        var timerInterval = setInterval(function () {
            secondsLeft--;
            timeEl.textContent = secondsLeft + " seconds left.";
            if (secondsLeft === 0) {
                clearInterval(timerInterval);
                sendMessage.apply.textContent = "Game Over!"
            }
        }, 1000);
    }
    shuffleQ = questions.sort(() => Math.random() - .5)
    currentQIndex = 0
    questionContainterEl.classList.remove('hide')
    setNext()
    setTime();
}

function setNext() {
    resetState()
    showQuestion(shuffleQ[currentQIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild
            (answerBtnEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQ.length > currentQIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<scripting>", correct: false },
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false },
            { text: "<js>", correct: false }
        ]
    },
    {
        question: "The external JavaScript file must contain the <script> tag.",
        answers: [
            { text: "True", correct: false },
            { text: "False", correct: true }
        ]
    },
    {
        question: "How do you write \"Hello World\" in an alert box?",
        answers: [
            { text: "alert(“Hello World”);", correct: true },
            { text: "msg(“Hello World”);", correct: false },
            { text: "alertBox(“Hello World”);", correct: false },
            { text: "msgBox(“Hello World”);", correct: false }
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
        answers: [
            { text: "function = myFunction()", correct: false },
            { text: "function:myFunction()", correct: false },
            { text: "function myFunction()", correct: true }
        ]
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: [
            { text: "var colors = “red” “blue” “green”", correct: false },
            { text: "var colors = (1:”red”, 2:”blue”, 3:”green:)", correct: false },
            { text: "var colors = [“red”, “blue”, “green”]", correct: true },
            { text: "var colors = 1=(“red”), 2 =(“blue”), 3=(“green”)", correct: false }
        ]
    }
]