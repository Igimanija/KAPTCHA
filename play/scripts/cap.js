const items = document.querySelectorAll(".item");
let checked_items = [];
let counter = 0;
items.forEach((item) => {
  const check = item.querySelector(".checked");
  item.setAttribute("num", counter++);
  item.addEventListener("click", (e) => {
    check.classList.toggle("show-checked");
    item.classList.toggle("item-scale");
    const att = item.getAttribute("num");
    if (checked_items.includes(att)) {
      checked_items = checked_items.filter((i) => i !== att);
    } else {
      checked_items.push(att);
    }
    console.log(checked_items);
  });
});
