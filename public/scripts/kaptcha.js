let checked_item;


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const createQuestion = (questionObject) => {
    if (questionObject == null) {
        return "Object is empty";
    }
    const questionHeader = document.querySelector("#question")
    const options = document.querySelector('.options')
    const question = questionObject.question;
    const answers = shuffle(questionObject.answers.split(","))
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
    let counter = 1;
    const element = document.createElement("div");
    element.className = "checked";
    element.innerHTML = "✔";
    items.forEach((item) => {
        item.setAttribute("num", counter++);
        item.addEventListener("click", (e) => {
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


