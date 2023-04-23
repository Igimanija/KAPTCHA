const buttons = document.querySelectorAll('.playground-button');
// const tiles_pos = [0, 75,147, 219, 291, 363, 435, 507, 579, 651];
const tiles_pos = [0, 11,21, 31, 41, 51, 61, 71, 81, 91];
let counter1 = 0;
let counter2 = 0;

function player1_point(){
    if(counter1 >= tiles_pos.length-1){
        return;
    }
    counter1++;
    player_blue.animate([
        { left: tiles_pos[counter1 - 1] + '%' },
        { left: tiles_pos[counter1] + "%" },
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
        { left: tiles_pos[counter2 - 1] - 2 + '%' },
        { left: tiles_pos[counter2] - 2 + "%" },
      ], {
        duration: 1000, // animation duration in milliseconds
        easing: "ease", // easing function for animation
        fill: "forwards" // keep the object at the final position after animation ends
    });
}