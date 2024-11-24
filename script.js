
const scene = new THREE.Scene();
scene.background = new THREE.Color("#151620")
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".model").appendChild(renderer.domElement);


const controls = new THREE.OrbitControls(camera, renderer.domElement);

let model;

let loader = new THREE.GLTFLoader();
loader.load("./assets/scene.gltf", (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

const canvasContainer = renderer.domElement;

// Initially set the cursor to grab
canvasContainer.style.cursor = 'grab';

// Detect when the user starts dragging
controls.addEventListener('start', () => {
    canvasContainer.style.cursor = 'grabbing'; // Change to grabbing cursor
});

// Detect when the user stops dragging
controls.addEventListener('end', () => {
    canvasContainer.style.cursor = 'grab'; // Change back to grab cursor
});


const ambientLight = new THREE.AmbientLight(0x404040, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);


const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);


const spotLight = new THREE.SpotLight(0x0000ff, 1);
spotLight.position.set(-5, 5, 5);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
scene.add(spotLight);



camera.position.set(60,10,10);
camera.lookAt(0,0,0 )

function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  renderer.render(scene, camera);
}

animate();
