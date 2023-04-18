const buttons = document.querySelectorAll('.playground-button');
const tiles_pos = [0,102,191, 280, 369.5, 460, 549.5, 640, 729.5, 820];
let counter1 = 0;
let counter2 = 0;

function player1_point(){
    if(counter1 >= tiles_pos.length-1){
        return;
    }
    counter1++;
    player_blue.animate([
        { left: tiles_pos[counter1 - 1] + 'px' },
        { left: tiles_pos[counter1] + "px" },
      ], {
        duration: 1000, // animation duration in milliseconds
        easing: "ease-out", // easing function for animation
        fill: "forwards" // keep the object at the final position after animation ends
    });
}


function player2_point(){
    if(counter2 >= tiles_pos.length-1){
        return;
    }
    counter2++;
    player_red.animate([
        { left: tiles_pos[counter2 - 1] -10 + 'px' },
        { left: tiles_pos[counter2] - 10 + "px" },
      ], {
        duration: 1000, // animation duration in milliseconds
        easing: "ease", // easing function for animation
        fill: "forwards" // keep the object at the final position after animation ends
    });
}