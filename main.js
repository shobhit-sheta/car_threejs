import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

document.addEventListener("keydown", onDocumentKeyDown, false);

//Scene
const scene = new THREE.Scene();

// Create our model

let model;

new GLTFLoader().load("car.glb", (loadedModel) => {
  model = loadedModel.scene;

  scene.add(model);
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
const light = new THREE.PointLight(0xfffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
  15,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
// document.body.appendChild( renderer.domElement );
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = false;
controls.autoRotate = true;

controls.keys = {
  LEFT: "ArrowLeft", //left arrow
  UP: "ArrowUp", // up arrow
  RIGHT: "ArrowRight", // right arrow
  BOTTOM: "ArrowDown", // down arrow
};

canvas.addEventListener("mouseenter", function () {
  controls.autoRotate = false;
});

// Add an event listener for when the mouse leaves the object
canvas.addEventListener("mouseleave", function () {
  controls.autoRotate = true;
});

// Resize
window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//loop
const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
  controls.update(loop);
};
loop();

// Timeline magic

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

// Mouse Animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true));
window.addEventListener("mouseup", () => (mouseDown = false));

function onDocumentKeyDown(event) {
  var keyCode = event.which;
  // q
  if (keyCode == 81) {
    model.position.y -= 0.05;
    console.log(model.position);  
  } 
  // w
  else if (keyCode == 87) {
    model.position.y += 0.05;
  }
  // arrow down
  else if (keyCode == 40) {
    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, -0.1);
  }
  //arrow up
  else if (keyCode == 38) {
    var direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.addScaledVector(direction, 0.1);
  }
  //arrow left
  else if (keyCode == 37) {
    model.position.x += 0.1;
  }
  //arrow right
  else if (keyCode == 39) {
    model.position.x -= 0.02;
  }
  // a
  else if (keyCode == 65) {
    model.rotation.y += 0.1;
  }
  //s
  else if (keyCode == 83) {
    model.rotation.y -= 0.02;
    // space
  }
  render();
}
