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
    
