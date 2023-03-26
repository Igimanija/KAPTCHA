window.onload = () => {
  console.log('loaded');
  const moving_buttons = document.querySelectorAll(".moving_button");
  const max_distance = 14;
  moving_buttons.forEach((item) => {
    const start_item_xy = item.getBoundingClientRect();
    const start_item_x = start_item_xy.left + start_item_xy.width / 2;
    const start_item_y = start_item_xy.top + start_item_xy.height / 2;

    let mouse_leave = false;
    document.addEventListener("mousemove", (mouse) => {
      const mouse_x = mouse.clientX;
      const mouse_y = mouse.clientY;

      const distance_x = start_item_x - mouse_x;
      const distance_y = start_item_y - mouse_y;

      const distance = Math.sqrt(
        distance_x * distance_x + distance_y * distance_y
      );

      if (mouse_leave) {
        animate_item(distance_x, distance_y, 500);
      }
      if (distance > max_distance) {
        mouse_leave = false;
        animate_item(0, 0, 500);
        item.style.backgroundColor = "transparent";
      }
    });

    item.addEventListener("mouseleave", () => {
      mouse_leave = true;
      item.style.backgroundColor = "#39dcfd";
    });

    function animate_item(distance_x, distance_y, speed) {
      item.animate(
        [{ transform: `translate(${-distance_x}px, ${-distance_y}px)` }],
        {
          duration: speed,
          fill: "forwards",
        }
      );
    }
  });
};
