window.HTTP_MODULE = {
    getQuestions
}



function getQuestions() {
    // const { onSuccess, onError } = options;
    const url = 'https://opentdb.com/api.php?amount=10&category=18';
    const today = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let newQuiz = {};
    fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
        let newQuiz = {
            questions: data.results,
            "current-question": 0,
            "total-questions": data.results.length,
            "total-incorrect": 0,
            "total-correct": 0,
            date: `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`
            };        
            if(!localStorage.getItem("quizzes")) {
                localStorage.setItem("quizzes", JSON.stringify([]));
                
            }              localStorage.setItem("quizzes", newQuiz.questions);
        });        
        console.log("getQuestions function called");
};

// const numberOfQuestionsEl = document.querySelector("#numberOfQuestions");
// const numberSpanEl = document.querySelector('#totalAvailableQuestions');
// const numQuestionsInputEl = document.querySelector("#numQuestions");


//categoryDropdownEl.add(defaultOptionCategoryEl);
//categoryDropdownEl.selectedIndex = 0;

    
// function returnCategoryQuestionCount() {
//     let selectedCategory = categoryDropdownEl.selectedIndex;
//     categoryID = categoriesArr[selectedCategory].id;
//     let questionCountLookupURL =  `https://opentdb.com/api_count.php?category=${categoryID}`;
//     fetch(questionCountLookupURL).then(response => {
//         return response.json();
//     }).then(results => {
//         console.log("Question count: " + JSON.stringify(results));
//         let counts = results.category_question_count;
//         let totalCount = counts.total_question_count;
//         let easyCount = counts.total_easy_question_count;
//         let mediumCount = counts.total_medium_question_count;
//         let hardCount = counts.total_hard_question_count;
//         questionCount = totalCount;
//         console.log("questionCount: " + questionCount);
//         numberSpanEl.innerHTML = questionCount.toString();
//         numQuestionsInputEl.setAttribute("max", questionCount);
//     });
// }


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