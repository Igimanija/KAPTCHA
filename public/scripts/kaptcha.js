const createQuestion = (questionObject) => {
    if (questionObject == null) {
        return "Object is empty";
    }
    const questionHeader = document.querySelector("#question")
    const options = document.querySelector('.options')
    const question = questionObject.question;
    const answers = questionObject.answers.split(",")
    console.log(answers);
    options.innerHTML = ""
    questionHeader.innerHTML = question
    for (const answer of answers) {
        const answerHtml = ` 
        <div class="item">
            <p>${answer}</p>
        </div>`

        options.innerHTML += answerHtml;
    }


}