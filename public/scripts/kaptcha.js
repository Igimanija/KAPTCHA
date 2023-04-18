let checked_item;


const createQuestion = (questionObject) => {
    if (questionObject == null) {
        return "Object is empty";
    }
    const questionHeader = document.querySelector("#question")
    const options = document.querySelector('.options')
    const question = questionObject.question;
    const answers = questionObject.answers.split(",")
    // console.log(answers);
    options.innerHTML = ""
    questionHeader.innerHTML = question
    for (const answer of answers) {
        const answerHtml = ` 
        <div class="item">
            <p class="selected_a">${answer}</p>
        </div>`

        options.innerHTML += answerHtml;
    }
    const items = document.querySelectorAll(".item");
    // console.log(items);
    let counter = 1;
    const element = document.createElement("div");
    element.className = "checked";
    element.innerHTML = "✔";
    items.forEach((item) => {
        item.setAttribute("num", counter++);
        item.addEventListener("click", (e) => {
            // console.log(item);
            items.forEach((i) => {
                i.classList.remove("item-scale");
            });
            element.remove();
            item.appendChild(element);
            item.classList.toggle("item-scale");
            checked_item = item.getElementsByClassName("selected_a")[0].innerHTML;
        });
    });

}

