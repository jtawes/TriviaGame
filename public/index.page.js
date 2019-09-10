let quizzes = {};

// All these modules are defined in /public/utilities
const HTTP = window.HTTP_MODULE;

let timeUp = false;
let score  = 0;
let incorrectAnsArr = [];
let possibleAnswers = [];

// change vars to const
const questionDisp = document.querySelector(".question");
const answerDisp = document.querySelector(".answer");
const startBtn = document.querySelector("#startButton");
const ul = document.querySelector('#possibleAnswers');
// add 'El' to clarify elements
const scoreBoard = document.querySelector(".score");
const possibleAnswerItem = ul.child;


startBtn.addEventListener("click", function() {
    HTTP.getQuestions();    
});

console.log(JSON.parse(localStorage.getItem("quizzes")));


function handleErrors(res) {
    if(!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function parseJSON (res) {
    return res.json().then(function(data){
        return data;
    });
}

function updateQuestion(data) {
    //debugger;
    var question = data.results[0].question;
    var correctAnswer = data.results[0].correct_answer;
    questionDisp.innerHTML = question;
    answerDisp.innerHTML = correctAnswer;
    possibleAnswers.push(correctAnswer);
    var incorrectAnswers = data.results[0].incorrect_answers;

    for (var prop in incorrectAnswers) {
        possibleAnswers.push(incorrectAnswers[prop]);
    };

    for (var prop in possibleAnswers) {
        var answerItem = document.createElement("li");
        answerItem.appendChild(document.createTextNode(possibleAnswers[prop]));
        ul.appendChild(answerItem);
        answerItem.className = 'item';
        console.log("Possible Answers: " + possibleAnswers[prop]);
    };

    questionNumber++;
    randomizeAnswers();
};

function displayErros(err) {
    console.log("Inside display errors");
    console.log(err);
};

ul.addEventListener('click', function(e) {
    if (e.target && e.target.matches("li.item")) {
        if(e.target.innerText == answerDisp.innerText) {
            score++;
            scoreBoard.textContent = score;
            deletePossibleAnswers();
            possibleAnswers = [];
            fetch(url)
            .then(handleErrors)
            .then(parseJSON)
            .then(updateQuestion)
            .catch(displayErros);
        }
    }
});

function randomizeAnswers() {    
    for(var j = ul.children.length; j >=0; j--) {
        ul.appendChild(ul.children[Math.random() * j | 0]);
    }
};

function possibleAnswerArray(list) {
        var correctAnswer = list[questionNumber].correct_answer;
        var incorrectAnswers = list[questionNumber].incorrect_answers;
        for (var prop in incorrectAnswers) {
            possibleAnswers.push(incorrectAnswers[prop]);
        }
        possibleAnswers.push(correctAnswer);
        console.log("array: " + incorrectAnsArr);
        console.log("possibles: " + possibleAnswers);
};

function deletePossibleAnswers() {
    var child = ul.lastElementChild;
    while(child) {
        ul.removeChild(child);
        child=ul.lastElementChild;
    }
};

li.addEventListener("click", function() {
    console.log("clicked");
} );