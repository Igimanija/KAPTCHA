window.onload = () => {
  const labels = document.querySelectorAll("label");
  labels.forEach((label) => {
    label.addEventListener("click", () => {
      animate_label(label, "-185%", "255, 255, 255, 0.4");
    });

    label.nextElementSibling.addEventListener("mousedown", () => {
      animate_label(label, "-185%", "255, 255, 255, 0.4");
    });

    document.addEventListener("click", (event) => {
      if (event.target === label) {
        return;
      }
      if (event.target === label.nextElementSibling) {
        return;
      }

      if (label.nextElementSibling.value !== "") {
        return;
      }
      console.log("clicked outside");
      animate_label(label, "-45%", "255, 255, 255, 1");
    });
  });
};

function animate_label(label, height, rgba) {
  label.animate(
    { transform: `translateY(${height})`, color: `rgba(${rgba})` },
    {
      duration: 100,
      fill: "forwards",
    }
  );
}
