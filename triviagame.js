var url = "https://opentdb.com/api.php?amount=5&type=multiple"
let timeUp = false;
let score  = 0;
let questionNumber = 0;
let incorrectAnsArr = [];
let possibleAnswers = [];
let allQuestions = {};

var questionDisp = document.querySelector(".question");
var answerDisp = document.querySelector(".answer");
var startBtn = document.querySelector("#startButton");
var ul = document.querySelector('#possibleAnswers');
var scoreBoard = document.querySelector(".score");
var possibleAnswerItem = ul.child;


startBtn.addEventListener("click", function() {
    fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateQuestion)
    .catch(displayErros);
});

function handleErrors(res) {
    if(!res.ok) {
        throw Error(res.status);
    }
    return res;
}

function parseJSON (res) {
    console.log("Parsing");
    return res.json().then(function(data){
        console.log("data inside parseJSON: " + JSON.stringify(data.results, null, 2));
        allQuestions = JSON.stringify(data.results, null, 2);
        return data;
    });
}

function updateQuestion(data) {
    console.log("data: " + JSON.stringify(data, null, 2));
    var questionList = JSON.stringify(data.results, null, 2);
    console.log("questionList: " + questionList);
    console.log("Object.keys(data): " + Object.keys(data.results));
    var correctAnswer = questionList[questionNumber].correct_answer;
    console.log("answer: " + correctAnswer);
    questionDisp.innerHTML = question;
    answerDisp.innerHTML = correctAnswer;
    possibleAnswers.push(questionList[questionNumber].correct_answer);
    var incorrectAnswers = questionList[questionNumber].incorrect_answers;

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
            questionNumber++;
            possibleAnswers = [];
            updateQuestion(allQuestions);
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