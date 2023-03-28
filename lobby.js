// const username = session.get('username');
const errorP = document.querySelector('#errorP')

async function createRoom() {
    try {
        const response = await fetch('/rooms/mr7287', {
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



