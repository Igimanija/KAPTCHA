let checked_item = undefined;
// Set the initial timer value in milliseconds
let timerValue = 30000;
let timerInterval;

// Get the timer element, restart button element, and start button element
const timerElement = document.getElementById("timer");

function startTimer() {
  clearInterval(timerInterval);
  timerValue = 30000;
  // Start the timer interval
  timerInterval = setInterval(() => {
    // Decrement the timer value by 10 milliseconds
    timerValue -= 10;

    // Format the time in minutes, seconds, and milliseconds
    let minutes = Math.floor(timerValue / 60000);
    let seconds = Math.floor((timerValue % 60000) / 1000);
    let milliseconds = timerValue % 1000;
    let timeString = `${seconds.toString().padStart(2, "0")}.${milliseconds
      .toString()
      .padStart(3, "0")}`;

    // Update the timer element with the new time
    timerElement.innerHTML = timeString;
  }, 10);
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const createQuestion = (questionObject) => {
  if (questionObject == null) {
    return "Object is empty";
  }
  const questionHeader = document.querySelector("#question");
  const options = document.querySelector(".options");
  const question = questionObject.question;
  const answers = shuffle(questionObject.answers.split(","));
  options.innerHTML = "";
  questionHeader.innerHTML = question;
  for (const answer of answers) {
    const answerHtml = ` 
        <div class="item">
            <p class="selected_a">${answer}</p>
        </div>`;

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
};

const question = document.querySelector("#question");
const question_div = document.querySelector(".question");
const question_font_size = window
  .getComputedStyle(question)
  .getPropertyValue("font-size");
font_size(question_div, question);

const item = document.querySelectorAll(".item > p");
const options = document.querySelector('.options');
item.forEach((element)=>{
    font_size(options, element);
});

function font_size(div, text_tag) {
  const initial_font_size = window
    .getComputedStyle(text_tag)
    .getPropertyValue("font-size");
  let font_size_px = parseInt(initial_font_size);
  while (
    div.scrollWidth > div.clientWidth ||
    div.scrollHeight > div.clientHeight
  ) {
    console.log("why");
    font_size_px -= 1;
    text_tag.style.fontSize = font_size_px + "px";
  }
}
