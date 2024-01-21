import {b,a} from "./preguntas/pregunta1.js";
let quizData
if (2 === 2){
    quizData = b
} else{
     quizData = a
}

// Ahora puedes usar quizData fuera del bloque if

const retryButton = document.getElementById('retry');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) { 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {

    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
           score++;
        } else {
            incorrectAnswers.push({
            question: quizData[currentQuestion].question,
            incorrectAnswer: answer,
            correctAnswer: quizData[currentQuestion].answer,
        });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    resultContainer.innerHTML = `Puntuacion ${score} de ${quizData.length}`;
}

function retryQuiz() {
    alert("FUnciono")
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);

displayQuestion();
