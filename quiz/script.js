const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//create an array of objects
const myQuestions = [{
        question: "Are ya dumb?",
        answers: {
            a: "Yes",
            b: "No",
            c: "You tell me",
        },
        correctAnswer: "a"
    },
    {
        question: "Are you a little ugly on the side?",
        answers: {
            a: "Beauty is like in the eye of the behold man",
            b: "Face only a mom could love ya know",
            c: "No",
        },
        correctAnswer: "b"
    },
    {
        question: "Butt stink?",
        answers: {
            a: "On purpose",
            b: "No",
            c: "You tell me (asshole)"
        },
        correctAnswer: "a"
    },
    {
        question: "Are you hated by many, loved by few?",
        answers: {
            a: "Doesn't matter",
            b: "Duty ends where love begins",
            c: "I like turtles"
        },
        correctAnswer: "c"
    }
];


function buildQuiz() {
    const output = [];

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {

            const answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter}:
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="slide">
                    <div class="question"> ${currentQuestion.question} </div>
                    <div class="answers"> ${answers.join('')} </div>
                </div>`
            );
        }
    );
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');

    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            // add to the number of correct answers
            numCorrect++;
            answerContainers[questionNumber].style.color = "darkgreen";
        } else {

            answerContainers[questionNumber].style.color = "red";
        }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `<br>${numCorrect} out of ${myQuestions.length}.<br><br>
    ${howDumb(numCorrect)}`;
}

function howDumb(countOfCorrect) {
    let totalCorrect = countOfCorrect;

    switch (totalCorrect) {
        case 4:
            return "not all that dumb in a dumb kinda way."
        case 0:
            return "super dumb. the most dumb, even."
     
        default:
            return "medium dumb. not even exceptional at dumb."
    }

}

function showSlide(n) {
    //at this point, currSlide is still the number representing the slide being moved away from (hasn't been incremented yet),
    slides[currSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    //now currslide is udpated
    currSlide = n;

    if (currSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }

    if (currSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

//call the function


function showNextSlide() {
    showSlide(currSlide + 1);
}

function showPreviousSlide() {
    showSlide(currSlide - 1);

}


// Call the functions/Execute code
// will build quiz immediately at load
buildQuiz();

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
//note this one is a querySelector...it selects a selector (.slide)
const slides = document.querySelectorAll('.slide');

//declaring this variable w/ let at global scope to share between functions
let currSlide = 0;

showSlide(0);

submitButton.addEventListener("click", showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
