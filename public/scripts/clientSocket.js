const socket = io("http://localhost:3001");

socket.on("connection");

socket.emit("username", get_my_room());

async function send() {
  USERNAME_PROMISE.then((username) => {
    socket.emit(
      "message",
      username + ": " + message_input.value,
      get_my_room()
    );
    message_input.value = "";
  });
}

function get_my_room() {
  const url = window.location.href;
  const lastSlashIndex = url.lastIndexOf("/");
  return url.slice(lastSlashIndex + 1);
}

socket.on("username", (game_room, room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }
  p1.innerHTML = game_room.player1.username;
  p2.innerHTML = game_room.player2.username;
  t1.innerHTML = game_room.player1.trophies;
  t2.innerHTML = game_room.player2.trophies;
});

socket.on("message", (message, room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }
  textarea.value += message + "\n";
});

socket.on("logged", (check, room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }
  if (check === false) {
    alert("Player has disconnected, you have won!");
    location.href = "lobby";
  }
});

socket.on("start_game", (room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }
  console.log("game should start");
});

window.addEventListener("beforeunload", (event) => {
  fetch(`/rooms/${get_my_room()}`, {
    method: "DELETE",
  });
  event.preventDefault();
  event.returnValue = "";
});

function logEvery5Seconds() {
  setInterval(() => {
    socket.emit("logging", get_my_room());
  }, 5000);
}

logEvery5Seconds();

socket.on("game-start", (check, room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }
  USERNAME_PROMISE.then((username) => {
    if (check === true) {
      console.log("Game should start!");
      socket.emit("my-turn", get_my_room());
    }
  });
});

const USERNAME_PROMISE = new Promise((resolve, reject) => {
  let username = null;
  console.log("fetch!!!");
  fetch("/accountInfo2")
    .then((response) => response.json())
    .then((data) => {
      username = data.username;
      resolve(username);
    })
    .catch((error) => reject(error));
});

const items = document.querySelectorAll(".item");
let checked_item;
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
    checked_item = item.getAttribute("num");
  });
});

magic.addEventListener("click", (e) => {
  if (checked_item === undefined) {
    alert("Please select an answer");
    return;
  }
  console.log(checked_item);
  USERNAME_PROMISE.then((username) => {
    socket.emit("answer", get_my_room(), username, checked_item);
  });
});

socket.on("my-turn", (player, room_id) => {
  if (room_id !== get_my_room()) {
    return;
  }  
  const captcha = document.querySelector(".captcha");
  USERNAME_PROMISE.then((username) => {
    if (username !== player) {
      console.log("bababba");
      captcha.style.opacity = "0.6";
    } else {
      captcha.style.opacity = "1";
    }
  });
});
