import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Fog
const fog = new THREE.Fog('#262937', 1, 15);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Door
const doorTextureColor = textureLoader.load('/textures/door/color.jpg');
const doorTextureAlpha = textureLoader.load('/textures/door/alpha.jpg');
const doorTextureAmbientOcclusion = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorTextureHeight = textureLoader.load('/textures/door/height.jpg');
const doorTextureMetalness = textureLoader.load('/textures/door/metalness.jpg');
const doorTextureNormal = textureLoader.load('/textures/door/normal.jpg');
const doorTextureRoughness = textureLoader.load('/textures/door/roughness.jpg');

// Bricks
const wallsTextureColor = textureLoader.load('/textures/bricks/color.jpg');
const wallsTextureNormal = textureLoader.load('/textures/bricks/normal.jpg');
const wallsTextureAmbientOcclusion = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const wallsTextureRoughness = textureLoader.load('/textures/bricks/roughness.jpg');

// Floor
const floorTextureColor = textureLoader.load('/textures/grass/color.jpg');
const floorTextureNormal = textureLoader.load('/textures/grass/normal.jpg');
const floorTextureAmbientOcclusion = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const floorTextureRoughness = textureLoader.load('/textures/grass/roughness.jpg');

floorTextureColor.repeat.set(8, 8);
floorTextureNormal.repeat.set(8, 8);
floorTextureAmbientOcclusion.repeat.set(8, 8);
floorTextureRoughness.repeat.set(8, 8);

floorTextureColor.wrapS = THREE.RepeatWrapping;
floorTextureNormal.wrapS = THREE.RepeatWrapping;
floorTextureAmbientOcclusion.wrapS = THREE.RepeatWrapping;
floorTextureRoughness.wrapS = THREE.RepeatWrapping;

floorTextureColor.wrapT = THREE.RepeatWrapping;
floorTextureNormal.wrapT = THREE.RepeatWrapping;
floorTextureAmbientOcclusion.wrapT = THREE.RepeatWrapping;
floorTextureRoughness.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Group
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
	new THREE.BoxGeometry(4, 2.5, 4),
	new THREE.MeshStandardMaterial({ 
		map: wallsTextureColor,
		aoMap: wallsTextureAmbientOcclusion,
		normalMap: wallsTextureNormal,
		roughnessMap: wallsTextureRoughness
	})
);
walls.geometry.setAttribute(
	'uv2', 
	new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 1.25;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
	new THREE.ConeGeometry(3.5, 1, 4),
	new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 3;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door
const door = new THREE.Mesh(
	new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
	new THREE.MeshStandardMaterial({ 
		map: doorTextureColor,
		transparent: true,
		alphaMap: doorTextureAlpha,
		aoMap: doorTextureAmbientOcclusion,
		displacementMap: doorTextureHeight,
		displacementScale: 0.1,
		normalMap: doorTextureNormal,
		metalnessMap: doorTextureMetalness,
		roughnessMap: doorTextureRoughness
	})
);
door.geometry.setAttribute(
	'uv2', 
	new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1;
door.position.z = 2.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' });

for (let i = 0; i < 50; i++) {
	const angle = Math.random() * Math.PI * 2;
	const radius = 3.5 + Math.random() * 6;
	const x = Math.sin(angle);
	const z = Math.cos(angle);
	const grave = new THREE.Mesh(graveGeometry, graveMaterial);
	grave.position.set(x * radius, 0.3, z * radius);
	grave.rotation.y = (Math.random() - 0.5) * 0.5;
	grave.rotation.z = (Math.random() - 0.5) * 0.3;
	grave.castShadow = true;
	graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
			map: floorTextureColor,
			aoMap: floorTextureAmbientOcclusion,
			normalMap: floorTextureNormal,
			roughnessMap: floorTextureRoughness
		})
)
floor.geometry.setAttribute(
	'uv2', 
	new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
scene.add(moonLight)

// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Ghost
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight('#00ffff', 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight('#ffff00', 2, 3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262937');

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

		// Update Ghost
		ghost1.position.x = Math.sin(elapsedTime * 0.5) * 4
		ghost1.position.z = Math.cos(elapsedTime * 0.5) * 4
		ghost1.position.y = Math.sin(elapsedTime * 3)

		ghost2.position.x = Math.sin(-elapsedTime * 0.32) * 5
		ghost2.position.z = Math.cos(-elapsedTime * 0.32) * 5
		ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

		ghost3.position.x = Math.sin(-elapsedTime * 0.5) * (7 + Math.sin(elapsedTime * 0.32))
		ghost3.position.z = Math.cos(-elapsedTime * 0.5) * (7 + Math.sin(elapsedTime * 0.5))
		ghost3.position.y = Math.sin(elapsedTime * 5) + Math.sin(elapsedTime * 2)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()