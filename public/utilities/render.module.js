window.RENDER_MODULE = {
    removeLoaderAndRenderCategories,
    renderQuestion,
    renderAnswers,
    removePreviouslyRenderedAnswers,
    renderScore,
    renderFeedback,
    hideFeedbackSection,
    renderProgressBar,
    renderGameReview
}

const ETC = window.ETC_MODULE;

const loaderEl = document.querySelector('#loader');
const categoryOptionsEl = document.querySelector('#options_form');
const categoryDropdownEl = document.querySelector("#category-dropdown");
let defaultOptionCategoryEl = document.createElement('option');
defaultOptionCategoryEl.text = "Choose Category";
const questionAndAnswerDispEl = document.querySelector("#container");
const questionDispEl = document.querySelector("#question");
const startBtnEl = document.querySelector("#startButton");
const possibleAnswersEl = document.querySelector('#possible_answers');
const scoreBoardEl = document.querySelector(".score");
const possibleAnswerItemEl = possibleAnswersEl.child;
const feedbackSectionEl = document.querySelector("#feedback_section");
const feedbackTextEl = document.querySelector("#feedback_text");
const correctAnswerEl = document.querySelector("#correct_answer");


function removeLoaderAndRenderCategories(categories) {
    renderCategories(categories);
    loaderEl.style.display = "none";
    categoryOptionsEl.style.display = "block";    
}

function renderCategories(categories) {
    categories.forEach(category => {
        categoryEl = document.createElement('option');
        categoryEl.text = category.name;
        categoryEl.value = category.id;
        categoryDropdownEl.add(categoryEl);
    });
}

function renderQuestion(question) {
    questionDispEl.innerHTML = question;
}

function renderAnswers(answersArray) {
    possibleAnswersEl.innerHTML = '';
    answersArray.forEach(answer => {
        let answerElement = document.createElement("li");
        answerElement.innerHTML = (answer);
        possibleAnswersEl.appendChild(answerElement);
        answerElement.className = 'item';
    });
    questionAndAnswerDispEl.style.display = "block";
    // TODO: Revisit
    document.querySelector(".item").addEventListener("click", onAnswerSelection);
}

function removePreviouslyRenderedAnswers() {
    let child = possibleAnswersEl.lastElementChild;
    while(child) {
        possibleAnswersEl.removeChild(child);
        child=possibleAnswersEl.lastElementChild;
    }
};

function renderScore() {
    scoreBoardEl.innerText = state.totalCorrect;
}

function renderFeedback(feedback) {
    feedbackSectionEl.style.display = "block";
    feedbackTextEl.innerText = feedback;
    correctAnswerEl.innerHTML = state.questions[state.currentQuestionNumber].correct_answer;
    correctAnswerEl.style.display = "block";
}

function hideFeedbackSection() {
    feedbackSectionEl.style.display = "none";
}

function renderProgressBar(questions, correctAnswer) {
    console.log("Rendering progress");
}

function renderGameReview() {
    console.log("Rendering review page");
}

