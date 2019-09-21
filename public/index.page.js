const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;

let state = {
    categories: [],
    totalCorrect: 0,
    currentQuestionNumber: -1,
    questions: [],
};

window.onload = init;

function init() {
    document.querySelector('#category-dropdown').addEventListener('change', onCategorySelection);
    document.querySelector('#select_options_button').addEventListener('click', onSelectOptionsButton);
    document.querySelector('#wild_card_button').addEventListener('click', onWildCardButton);
    document.querySelector('#next_question_button').addEventListener('click', renderNextQuestionAndAnswers);
    document.querySelector('#start_over_button').addEventListener('click', onStartNewGame);

    document.querySelector('#possible_answers').addEventListener('click', function (e) {
        if (e.target && e.target.className == "item") {
            onAnswerSelection(e);
        }
    });


    HTTP.fetchCategoriesAPI()
        .then(results => {
            state.categories = results.trivia_categories;
        });
};

function onSelectOptionsButton() {
    RENDER.hideHomeAndRenderOptions(state.categories);
}

function onWildCardButton() {
    let questionURL = `https://opentdb.com/api.php?amount=20`;
    fetchQuestionsAPI(questionURL)
        .then(response => {
            let results = response.results;
            state.questions = results;
        }).then(() => {
            RENDER.hideHome();
            renderNextQuestionAndAnswers();
            RENDER.renderProgressBar(20);
        });
}

function onCategorySelection() {
    const categoryDropdownEl = document.querySelector("#category-dropdown");
    const selectedCategory = categoryDropdownEl.selectedIndex;
    const categoryID = (state.categories[selectedCategory].id - 1);
    let questionURL = `https://opentdb.com/api.php?amount=5&category=${categoryID}`;
    fetchQuestionsAPI(questionURL)
        .then(response => {
            let results = response.results;
            state.questions = results;
        }).then(() => {
            renderNextQuestionAndAnswers();
            RENDER.renderProgressBar(state.questions.length);
            RENDER.hideCategories();
        });
};

function renderNextQuestionAndAnswers() {
    state.currentQuestionNumber++;
    if (state.currentQuestionNumber < state.questions.length) {
        const currentQuestion = state.questions[state.currentQuestionNumber];
        const possibleAnswersArray = [
            ...currentQuestion.incorrect_answers,
            currentQuestion.correct_answer
        ];
        const shuffledAnswers = shuffleArray(possibleAnswersArray);
        RENDER.renderQuestion(currentQuestion.question, shuffledAnswers);
        if (state.currentQuestionNumber === (state.questions.length -1)) {
            document.querySelector('#next_question_button').innerText = "Review Game";
        }
        document.querySelector("#feedback_section").style.display = "none";
        document.querySelector('#next_question_button').style.display = "none";
    } else {
        RENDER.renderGameReview(state.totalCorrect, state.questions.length);
    }
};

function onAnswerSelection(event) {
    const answer = event.target.innerHTML;
    const isCorrect = isCorrectAnswer(answer, state.questions[state.currentQuestionNumber]);
    const correctAnswer = state.questions[state.currentQuestionNumber].correct_answer;
    let feedback = "";
    if (isCorrect) {
        state.totalCorrect++;
        feedback = "CORRECT!: ";
        RENDER.renderProgressDotColor(state.currentQuestionNumber, "green");
        RENDER.changeItemBackground(event.target, "green");
    } else {
        feedback = "Sorry, the correct answer is: ";
        RENDER.renderProgressDotColor(state.currentQuestionNumber, "red");
        RENDER.changeItemBackground(event.target, "red");
    };
    RENDER.renderFeedback(feedback, correctAnswer);
    RENDER.renderScore();
    document.querySelector('#next_question_button').style.display = "block";
 };

function isCorrectAnswer(selectedAnswer, question) {
    const correctAnswer = question.correct_answer;
    console.log("selectedAnswer: " + selectedAnswer);
    console.log("correct answer: " + correctAnswer);
    return selectedAnswer === correctAnswer;
};

function onStartNewGame() {
    state = {
        categories: [],
        totalCorrect: 0,
        currentQuestionNumber: -1,
        questions: [],
    };
    RENDER.showHome();
    RENDER.hideGameReview();
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};
