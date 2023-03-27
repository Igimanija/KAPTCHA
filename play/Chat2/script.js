function create_room(){
    fetch('/generate-room')
        .then(get_rooms);
}

function get_rooms(){
    fetch('/get-rooms')
        .then(response => response.json())
        .then(room_ids => {
            display_rooms(room_ids);
        })
        .catch(error => {
            console.error(error);
            return [];
        });;
}

get_rooms();

function in_room(){
    window.location.href = 'chatroom.html/' +  choosen_room.value;
}

function display_rooms(room_ids){
    room_list.innerHTML = '';
    room_ids.forEach(room_id => {
        const new_room = document.createElement('button');
        new_room.textContent = room_id;
        room_list.appendChild(new_room);
    });
}