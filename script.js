
const scene = new THREE.Scene();
scene.background = new THREE.Color("#151620")
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);  

camera.position.set(60,10,50);
camera.lookAt(0,0,0 )

const renderer = new THREE.WebGLRenderer({
   antialias: true,
   powerPerformance : "high-performance"
   });
renderer.setSize(window.innerWidth, window.innerHeight);   
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = .75;
document.querySelector(".model").appendChild(renderer.domElement);


const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping =true;
controls.dampingFactor = .05;
controls.minDistance = 10;
controls.maxDistance = 50;
controls.maxPolarAngle = Math.PI/2;


const createEmissonMaterial = (color , intensity=2)=>{
  return new THREE.MeshStandardMaterial({
    color:color,
    emission:color,
    emissionIntensity : intensity,
    toneMapped : false
  })
  
}

let model;

let loader = new THREE.GLTFLoader();
loader.load("./assets/scene.gltf", (gltf) => {
  model = gltf.scene;

  const box = new THREE.Box3().setFromObject(model
  );
  const center = box.getCenter(new THREE.Vector3())
  model.position.sub(center)
  scene.add(model);
});  
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
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

const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene,camera)
composer.addPass(renderPass)

const bloom = new THREE.UnrealBloomPass(
  new THREE.Vector2(window.innerWidth , window.innerHeight),
  .6,
  1,
  .1,

)

composer.addPass(bloom)

const canvasContainer = renderer.domElement;

canvasContainer.style.cursor = 'grab';


controls.addEventListener('start', () => {
    canvasContainer.style.cursor = 'grabbing'; 
});    


controls.addEventListener('end', () => {
    canvasContainer.style.cursor = 'grab'; 
});    




function animate() {
  requestAnimationFrame(animate);
  controls.update(); 
  composer.render()
}

animate();
