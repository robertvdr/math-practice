let firstNumber;
let secondNumber;
let correctAnswer;
let wrongAnswerOne;
let wrongAnswerTwo;
let wrongAnswerThree;



document.addEventListener('DOMContentLoaded', () => {
    generateNewQuestion();
    addingListeners();

})


function generateNewQuestion() {
    const problemCounter = document.querySelector('.currentProblem');

    if (problemCounter.innerText == 11) {
        showScore();
    };

    let arrayOfAnswers = [];

    firstNumber = getRandomNumber(10);
    secondNumber = getRandomNumber(10);
    correctAnswer = firstNumber * secondNumber;

    //generates random numbers for the wrong answers
    wrongAnswerOne = getRandomNumberForWrongAnswers(81, correctAnswer);
    wrongAnswerTwo = getRandomNumberForWrongAnswers(81, correctAnswer);
    wrongAnswerThree = getRandomNumberForWrongAnswers(81, correctAnswer);

    //check to make sure the numbers aren't the same
    checkWrongAnswers(correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree);

    //add numbers to the array
    arrayOfAnswers.push(correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree);

    //randomize the array and replace array
    arrayOfAnswers = shuffleArray(arrayOfAnswers);

    //set the numbers for the multiplication problem
    const multipliedNumbers = document.querySelector('.expression');
    multipliedNumbers.innerText = firstNumber + ' * ' + secondNumber;


    const listItems = document.querySelectorAll('li');
    for (let i = 0; i < arrayOfAnswers.length; i++) {
        //displaying the answers
        listItems[i].innerText = arrayOfAnswers[i];



    };

}

function addingListeners() {
    //set the numbers for the answers
    const listItems = document.querySelectorAll('li');
    const problemCounter = document.querySelector('.currentProblem');
    const currentScoreCounter = document.querySelector('.currentScore');
    const resetButton = document.getElementById('btnStartOver');
    const showHideContent = document.querySelectorAll('.show-hide');

    let currentProblemNumber;
    let currentScore;


    resetButton.addEventListener('click', () => {
        currentScoreCounter.innerText = 0;
        problemCounter.innerText = 1;

        showHideContent.forEach((contentItem) => {
            contentItem.classList.remove('hidden');
        })
        
        generateNewQuestion();
    })


    for (let i = 0; i < listItems.length; i++) {
        //adding event listeners to each answer
        listItems[i].addEventListener('click', (event) => {
            if (event.target.innerText == correctAnswer) {
                //update score +1
                currentScore = parseInt(currentScoreCounter.innerText);
                currentScore++;
                currentScoreCounter.innerText = currentScore;

                //update problem number +1
                currentProblemNumber = parseInt(problemCounter.innerText);
                currentProblemNumber++;
                problemCounter.innerText = currentProblemNumber;

                //call method to change question
                generateNewQuestion();

            }
            else  {
                //update problem number +1
                currentProblemNumber = parseInt(problemCounter.innerText);
                currentProblemNumber = currentProblemNumber + 1;
                problemCounter.innerText = currentProblemNumber;

                //call method to change question
                generateNewQuestion();

            };
        })
    };
}

function showScore(){
    const showHideContent = document.querySelectorAll('.show-hide');
    const problemCounter = document.querySelector('.currentProblem');

    problemCounter.innerText = 10;

    showHideContent.forEach((contentItem) => {
        contentItem.classList.add('hidden');
    })
}

function shuffleArray(arr) {
    return arr.sort(function (a, b) { return Math.random() - 0.5 })
}

function getRandomNumber(maxNumber) {
    return Math.floor(Math.random() * Math.floor(maxNumber));
}


function getRandomNumberForWrongAnswers(maxNumber, correctAnswer) {
    randomNumber = Math.floor(Math.random() * Math.floor(maxNumber));

    while (randomNumber === correctAnswer) {
        randomNumber = Math.floor(Math.random() * Math.floor(maxNumber));
    }
    return randomNumber;
}

function checkWrongAnswers(correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree) {
    while (wrongAnswerOne === wrongAnswerTwo || wrongAnswerTwo === wrongAnswerThree || wrongAnswerThree === wrongAnswerOne) {
        wrongAnswerOne = getRandomNumberForWrongAnswers(81, correctAnswer);
        wrongAnswerTwo = getRandomNumberForWrongAnswers(81, correctAnswer);
        wrongAnswerThree = getRandomNumberForWrongAnswers(81, correctAnswer);
    }
}


function reset(){

}