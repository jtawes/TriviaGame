window.HTTP_MODULE = {
    fetchCategoriesAPI,
    fetchQuestionsAPI
};

function fetchCategoriesAPI() {
    const categoryLookupURL = 'https://opentdb.com/api_category.php';
    return fetch(categoryLookupURL)
        .then(response => response.clone().json())
};

function fetchQuestionsAPI(questionURL) {    
    return fetch(questionURL)
        .then(response => response.clone().json())
};

/**
-create timer and final score modals
-make title responsive to category name
-if no category selected default to all categories
-allow timer option or play with no timer
-sessions? to track player games and scores?
-css/sass


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

function displayErrors(err) {
    console.log("Inside display errors");
    console.log(err);
};

 *
 * function isCorrectAnswer(answer, questionNumber) {
 *   const question = questions[questionNumber];
 *   return question.correctAnswers[0] === answer;
 * }

 // TODO: Fix as it's not follow the SRP (Single responsibility principle)
// Easy way to clean up: follow up on promise
// fetchCategories.then((results) => renderCategories(results));


// TODO: More readable name, ex: renderCategoryOptions

// TODO: Follow SRP (single responsibility principle), don't render too.
// fetchQuestions()
// .then((questionsList) => loadQuestionsToApp(questionsList));
// .then(() => hideCategoryList())


// TODO: Try to get rid of this.
function createPossibleAnswersArray(correctAnswer, incorrectAnsArr) {
    // possibleAnswerArray = [...correctAnswer, ...incorrectAnsArr];
    for(let i = 0; i < incorrectAnsArr.length; i++) {
        possibleAnswersArr.push(incorrectAnsArr[i]);
    }; 
    possibleAnswersArr.push(correctAnswer);
**/