const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;

let state = {
    categories: [],
    totalCorrect: 0,
    counter: 0,
    currentQuestionNumber: -1,
    questions: [],
};

window.onload = init;

function init() {
    document.querySelector('#category-dropdown').addEventListener('change', onCategorySelection);

    document.addEventListener('click', function (e) {
        if (e.target && e.target.className == "item") {
            onAnswerSelection(e);
        }
    });


    HTTP.fetchCategoriesAPI()
        .then(results => {
            state.categories = results.trivia_categories;
        }).then(() => {
            RENDER.removeLoaderAndRenderCategories(state.categories)
        });
};

function onCategorySelection() {
    const categoryDropdownEl = document.querySelector("#category-dropdown");
    const selectedCategory = categoryDropdownEl.selectedIndex;
    const categoryID = state.categories[selectedCategory].id;
    let questionURL = `https://opentdb.com/api.php?amount=5&category=${categoryID}`;
    fetchQuestionsAPI(questionURL)
        .then(response => {
            let results = response.results;
            state.questions = results;
        }).then(() => {
            const currentQuestion = state.questions[state.currentQuestionNumber];
            const possibleAnswersArray = [
                ...currentQuestion.incorrect_answers,
                currentQuestion.correct_answer
            ];
            const shuffledAnswers = shuffleArray(possibleAnswersArray);
            RENDER.renderQuestion(currentQuestion.question);
            RENDER.renderAnswers(shuffledAnswers);
        });
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random()*(i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function createAndRenderPossibleAnswersArray() {
    let possibleAnswersArray = [];
    let wrongAnswers = state.questions[state.currentQuestionNumber].incorrect_answers;
    let correctAnswer = state.questions[state.currentQuestionNumber].correct_answer;
    possibleAnswersArray = [correctAnswer, ...wrongAnswers];
    shuffleArray(possibleAnswersArray);
    RENDER.renderAnswers(possibleAnswersArray);
}

function onAnswerSelection(event) {
    const answer = event.target;
    const isCorrect = isCorrectAnswer(answer, state.currentQuestionNumber);
    let feedback = "";
    if (isCorrect) { 
        state.totalCorrect++;
        feedback = "CORRECT!";   
        RENDER.renderScore();      
    } else {
        feedback = "WRONG";
    };
    RENDER.renderFeedback(feedback);
    RENDER.renderScore();
    renderNextQuestionAndAnswers(); 
 };

function isCorrectAnswer(answer) {
        const selectedAnswer = answer.innerHTML;
        const correctAnswer = state.questions[state.currentQuestionNumber].correct_answer;
        console.log("selectedAnswer: " + selectedAnswer);
        console.log("correct answer: " + correctAnswer);
        if (selectedAnswer === correctAnswer) {
            return true;
        } else {
            return false;
        }
};
 
function renderNextQuestionAndAnswers() {
    // hideFeedbackSection();
    RENDER.removePreviouslyRenderedAnswers();
    state.currentQuestionNumber++;
    if (state.currentQuestionNumber < state.questions.length) {
        const currentQuestion = state.questions[state.currentQuestionNumber];
        const possibleAnswersArray = [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer
        ];
        const shuffledAnswers = shuffleArray(possibleAnswersArray);
        RENDER.renderQuestion(currentQuestion.question);
        RENDER.renderAnswers(shuffledAnswers);
        // RENDER.hideFeedbackSection();
    } else {
       RENDER.renderGameReview();
    }
};
 




