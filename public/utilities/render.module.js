window.RENDER_MODULE = {
    hideHome,
    showHome,
    hideHomeAndRenderOptions,
    hideCategories,
    renderQuestion,
    renderScore,
    renderFeedback,
    changeItemBackground,
    renderProgressBar,
    renderProgressDotColor,
    renderGameReview,
    hideGameReview
}

const ETC = window.ETC_MODULE;

const homeEl = document.querySelector('#home');
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
const progressDivEl = document.querySelector("#progress_bar");
const progressDotEl = document.querySelector("#progress_dot");
const finalScoreEl = document.querySelector('#total_correct');
const finalTotalQuestionsEl = document.querySelector('#total_questions');
const gameOverEl = document.querySelector('#game_over');

function hideHome() {
    homeEl.style.display = "none";
}

function showHome() {
    homeEl.style.display = "block";
}

function hideHomeAndRenderOptions(categories) {
    renderCategories(categories);
    homeEl.style.display = "none";
    categoryOptionsEl.style.display = "block";
    categoryOptionsEl.style.visibility = "visible";
    categoryOptionsEl.style.opacity = 1;
}

function renderCategories(categories) {
    categories.forEach(category => {
        categoryEl = document.createElement('option');
        categoryEl.text = category.name;
        categoryEl.value = category.id;
        categoryDropdownEl.add(categoryEl);
    });
}

function hideCategories() {
    categoryOptionsEl.style.visibility = "hidden";
    categoryOptionsEl.style.opacity = 0;
    categoryOptionsEl.style.transition = "0s, opacity  0.5s linear";
}

function renderQuestion(question, answers) {
    questionDispEl.innerHTML = question;
    possibleAnswersEl.innerHTML = '';
    answers.forEach(answer => {
        let answerElement = document.createElement("li");
        answerElement.innerHTML = (answer);
        answerElement.className = 'item';
        possibleAnswersEl.appendChild(answerElement);
    });
    questionAndAnswerDispEl.style.display = "block";
}

function changeItemBackground(selectedAnswer, color) {
    selectedAnswer.style.backgroundColor = color;
}

function renderScore() {
    scoreBoardEl.innerText = state.totalCorrect;
}

function renderProgressBar(numberOfQuestions) {
    progressDivEl.style.display = "block";
    let num = numberOfQuestions;
    while (num > 0) {
        num--;
        let progressDot = document.createElement("span");
        progressDot.className = "progress_dot";
        progressDivEl.appendChild(progressDot);
    }    
}

function renderProgressDotColor(questionNumber, color) {
    let child = progressDivEl.querySelectorAll("span");
    child[questionNumber].style.backgroundColor = color;
}


function renderFeedback(feedback, correctAnswer) {
    feedbackTextEl.innerText = feedback;
    correctAnswerEl.innerHTML = correctAnswer;
    feedbackSectionEl.style.display = "block";
}

function renderGameReview(score, numQuestions) {
    document.querySelector('#next_question_button').style.display = "none";
    questionAndAnswerDispEl.style.display = "none";
    progressDivEl.style.display = "none";
    finalScoreEl.innerText = score;
    finalTotalQuestionsEl.innerText = numQuestions;
    gameOverEl.style.display = "block";
}

function hideGameReview() {
    gameOverEl.style.display = "none";
}

