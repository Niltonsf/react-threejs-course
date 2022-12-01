import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(200, 120, 300);

// Scene
const scene = new THREE.Scene();
const scene2 = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Renderer
const renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const renderer2 = new CSS3DRenderer();
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.domElement.style.position = 'absolute';
renderer2.domElement.style.top = 0;
renderer2.domElement.style.bottom = 0;
document.body.appendChild(renderer2.domElement);

const controls = new OrbitControls(camera, renderer2.domElement);

window.addEventListener('resize', onWindowResize);

const material = new THREE.MeshBasicMaterial({
	color: 0x000000,
	wireframe: true,
	wireframeLinewidth: 1,
	side: THREE.DoubleSide
});

// WEbgl
// const geometry = new THREE.PlaneGeometry(100, 100);
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.copy(object.position);
// mesh.rotation.x = 0;
// mesh.scale.copy(object.scale);
// mesh.position.x = 9;
// scene.add(mesh);

// CSS3dElement
// const element = document.createElement(`div`);
// element.innerHTML = `Tutorix is the best e-learning platform Tutorix is the best e-learning platform Tutorix is the best e-learning platform`;
// element.style.width = '100px';
// element.style.height = '100px';
// element.style.overflowY = 'auto';
// element.style.background = new THREE.Color(0x00F0FF).getStyle();

// const object = new CSS3DObject(element);
// object.position.copy(mesh.position);
// object.rotation.copy(mesh.rotation);
// object.scale.copy(mesh.scale);
// scene2.add(object);

// scene
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

gltfLoader.load(
	'/models/monitor.glb',
	(gltf) => {
		gltf.scene.scale.set(100, 100, 100);
		scene.add(gltf.scene);
		const dd = gltf.scene;
		dd.rotation.y = -1;

		// CSS3dElement
		const element = document.createElement(`div`);
		element.innerHTML = `Tutorix is the best e-learning platform Tutorix is the best e-learning platform Tutorix is the best e-learning platform`;
		element.style.width = '100px';
		element.style.height = '100px';
		element.style.overflowY = 'auto';
		element.style.background = new THREE.Color(0x00F0FF).getStyle();
		
		const object = new CSS3DObject(element);
		object.position.copy(dd.position);
		object.rotation.copy(dd.rotation);
		object.scale.copy(dd.scale / 2);
		scene2.add(object);		
	}
);

animate();

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer2.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
  renderer2.render(scene2, camera);
}
