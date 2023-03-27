const username = session.get('username');
function createRoom(){
    fetch("/create-rooms/"+username)
    .then(response =>response.json())
    .catch(err =>{
        console.log(err);
        return; 
    });
    window.location.href="/chatroom.html/"+username;
}


function getRooms(){}