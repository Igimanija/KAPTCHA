// const username = session.get('username');
const errorP = document.querySelector('#errorP')

async function createRoom() {
    try {
        const user = await fetch("/accountInfo2");
        const jsonUser = await user.json()
        const response = await fetch('/rooms/' + jsonUser.username, {
            method: 'POST'
        })
        const json = await response.json()
        if (json.message !== "Room already exists") {
            await getRooms();
            return;
        }
        errorP.innerHTML = json.message

    } catch (e) {
        console.log(e)
    }
}

async function getRooms() {
    console.log("test123");
    try {
        const response = await fetch('/rooms');
        const json = await response.json();
        roomHtml(json)
    } catch (error) {
        return console.error(error);
    }
}

function roomHtml(rooms) {
    const gameRoom = document.querySelector('.game_room');
    for (const room of rooms) {
        gameRoom.insertAdjacentHTML("beforeend", ` 
        <div class="room">
            <div class="room-name">${room}</div>
            <button>Play</button>
        </div>
    `)
    }
}



