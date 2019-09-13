
// create timer and final score modals
// make title responsive to category name
// hide correct answer container until after answer selected
// if no category selected default to all categories
// allow timer option or play with no timer
// sessions? to track player games and scores?
// css/sass
// make a loading modal at start
// group functions by purpose and comment on each purpose

let score  = 0;
let counter = 0;
let question = "";
let correctAnswer = "";
let incorrectAnsArr = [];
let possibleAnswersArr = [];
let categoriesArr = [{id:0, name: 'All Categories'}];
let questionList = {};
let categoryID = 9;
let questionCount = 5;
let loadingDelay;

const categoryDropdownEl = document.querySelector("#category-dropdown");
let defaultOptionCategoryEl = document.createElement('option');
defaultOptionCategoryEl.text = "Choose Category";
const questionDispEl = document.querySelector("#question");
const answerDispEl = document.querySelector("#correct_answer");
const startBtnEl = document.querySelector("#startButton");
const ul = document.querySelector('#possible_answers');
const scoreBoardEl = document.querySelector(".score");
const possibleAnswerItemEl = ul.child;

document.addEventListener("click", answerChosen);

function loadingCategories() {
    fetchCategories();
    loadingDelay = setTimeout(showPage, 100);
}

function showPage() {
    document.getElementById('loader').style.display = "none";
    document.getElementById('option-selector').style.display = "block";
}

function fetchCategories() {
    const categoryLookupURL = `https://opentdb.com/api_category.php`;
    const fetchCategoryPromise = fetch(categoryLookupURL);
    fetchCategoryPromise.then(response => {
        return response.json();
    }).then(results => {
        let categories = results.trivia_categories;
        for(let i = 0; i < categories.length; i++) {
            categoriesArr.push(categories[i]);
        }
        createOptions(categoriesArr, categoryDropdownEl);
    });
}

function createOptions(arr, element) {
    let option;
    for(let i = 0; i < arr.length; i++) {
        option = document.createElement('option');
        option.text = arr[i].name;
        option.value = arr[i].id;
        element.add(option);
    }
}

function fetchQuestions() {
    let selectedCategory = categoryDropdownEl.selectedIndex;
    categoryID = categoriesArr[selectedCategory].id;
    //let questionURL = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryID}`;
    let questionURL = `https://opentdb.com/api.php?amount=${questionCount}&category=${categoryID}`;
    const fetchQuestionPromise = fetch(questionURL);
    fetchQuestionPromise.then(response => {
        return response.json();
    }).then(results => {
        questionList = results.results;
        return questionList;
    }).then(questionList => {
        loadQuestion(questionList);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createPossibleAnswersArray(correctAnswer, incorrectAnsArr) {
    for(let i = 0; i < incorrectAnsArr.length; i++) {
        possibleAnswersArr.push(incorrectAnsArr[i]);
    }; 
    possibleAnswersArr.push(correctAnswer);
}

function createAnswers(arr) {
    for(let j = 0; j < arr.length; j++) {
        let answerElement = document.createElement("li");
        answerElement.innerHTML = (arr[j]);
        ul.appendChild(answerElement);
        answerElement.className = 'item';       
    }
}

function answerChosen(event) {
    let element = event.target;
    if(element.tagName == "LI") {
        console.log("Chosen answer: " + element.innerHTML);
        if(element.innerHTML === correctAnswer && counter < (questionList.length -1)) {
            console.log("You're right!");
            score++;
            counter++;
            possibleAnswersArr = [];
            deletePossibleAnswers();
            updateScoreboard(score);
            loadQuestion(questionList);
        } else if (element.innerHTML !== correctAnswer && counter < (questionList.length -1)) {
            console.log("Sorry!");
            counter++;
            possibleAnswersArr = [];
            deletePossibleAnswers();
            updateScoreboard(score);
            loadQuestion(questionList);
        } else {
            if(element.innerHTML === correctAnswer) {
                score++;
                updateScoreboard(score);
                document.getElementById('game_over').style.display = "block";
                document.getElementById('total_correct').innerHTML = score;
                console.log("GAME OVER, Your score is : " + score);
            } else {
                console.log("GAME OVER, Your score is : " + score);
            }            
        }
    }
}

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

function loadQuestion(questionList) {
    question = questionList[counter].question;
    correctAnswer = questionList[counter].correct_answer;
    incorrectAnsArr = questionList[counter].incorrect_answers;
    createPossibleAnswersArray(correctAnswer, incorrectAnsArr);
    shuffle(possibleAnswersArr);
    questionDispEl.innerHTML = question;   
    createAnswers(possibleAnswersArr);
    answerDispEl.innerHTML = correctAnswer;
}

function updateScoreboard(score) {
    scoreBoardEl.innerText = score;
}



