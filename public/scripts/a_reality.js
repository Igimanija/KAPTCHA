const game = document.querySelector(".game");

let mousedown = false;
let startX, startY, currentX, currentY;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  game.offsetWidth / game.offsetHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(game.offsetWidth, game.offsetHeight);
game.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
loader.load("../images/vertical.jpg", (texture) => {
  const geometry = new THREE.BoxGeometry(1, 1, 3);

  const materials = [
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    new THREE.MeshStandardMaterial({ map: texture }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  ];

  const cube = new THREE.Mesh(geometry, materials);
  scene.add(cube);

  camera.position.z = 3;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight);

  game.addEventListener("mousedown", event_start);
  game.addEventListener("touchstart", event_start);
  

  game.addEventListener("mousemove", event_move);
  game.addEventListener("touchmove", event_move);

  game.addEventListener("mouseup", event_end);
  game.addEventListener("touchend", event_end);

  function event_start(event) {
    mousedown = true;
    startX = event.pageX;
    startY = event.pageY;
  }

  function event_move(event) {
    if (!mousedown) {
      return;
    }
    currentX = event.pageX;
    currentY = event.pageY;

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    cube.rotation.y += deltaX / 200;
    cube.rotation.x -= deltaY / 200;

    startX = currentX;
    startY = currentY;
  }

  function event_end(event) {
    mousedown = false;
  }
  const animate = () => {
    requestAnimationFrame(animate);
    if (!mousedown) {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  };
  animate();
});

const h1_tag = document.querySelector("h1");
const container = document.querySelector(".container");
const first_font_size = window
  .getComputedStyle(h1_tag)
  .getPropertyValue("font-size");

function points_size() {
  let font_size_px = parseInt(first_font_size);
  while (container.scrollWidth > container.clientWidth) {
    font_size_px -= 30;
    h1_tag.style.fontSize = font_size_px + "px";
  }
}

points_size();
