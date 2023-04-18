// const username = session.get('username');
const errorP = document.querySelector("#errorP");

async function createRoom() {
  try {
    const user = await fetch("/accountInfo2");
    const jsonUser = await user.json();
    const response = await fetch("/rooms/" + jsonUser.username, {
      method: "POST",
    });
    const json = await response.json();
    if (json.message !== "Room already exists") {
      location.href = "/room/" + jsonUser.username;
      return;
    }
    errorP.innerHTML = json.message;
  } catch (e) {
    console.log(e);
  }
}

async function getRooms() {
  try {
    const response = await fetch("/rooms");
    const data = await response.json();
    const myMap = new Map(Object.entries(data));
    roomHtml(myMap);
  } catch (error) {
    return console.error(error);
  }
}

function roomHtml(rooms) {
  const gameRoom = document.querySelector(".game_room");
  const old_rooms = gameRoom.querySelectorAll(".room");
  old_rooms.forEach((room) => {
    room.remove();
  });
  for (const [key, value] of rooms) {
    gameRoom.insertAdjacentHTML(
      "beforeend",
      ` 
        <div class="room">
            <div class="room-name">${key}</div>
            <a href="/room/${key}">
            <button>
            Play
            </button>
            </a>
        </div>
    `
    );
  }
}

function refreshLobby() {
  setInterval(() => {
    getRooms();
  }, 5000);
}

refreshLobby();