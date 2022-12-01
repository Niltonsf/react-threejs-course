import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded',
		particlesColor: '#ffffff'
}

gui.addColor(parameters, 'materialColor').onChange(() => {
	material.color.set(parameters.materialColor);
});

gui.addColor(parameters, 'particlesColor').onChange(() => {
	particles.material.color.set(parameters.particlesColor)
});
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter; 
const particlesTexture = textureLoader.load('/textures/particles/9.png');

/**
 * Objects
 */
const material = new THREE.MeshToonMaterial({
	color: parameters.materialColor,
	gradientMap: gradientTexture
});

const objectsDistance = 4;

const mesh1 = new THREE.Mesh(
	new THREE.TorusGeometry(1, 0.4, 16, 60),
	material
);

const mesh2 = new THREE.Mesh(
	new THREE.ConeGeometry(1, 2, 32),
	material
);

const mesh3 = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
	material
);

mesh1.position.y = 0;
mesh1.position.x = 2;
mesh2.position.y = - objectsDistance * 1;
mesh2.position.x = -2;
mesh3.position.y = - objectsDistance * 2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3);

const sectionsMeshes = [ mesh1, mesh2, mesh3 ];

/**
 * Particles
 */
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32);
const count = 300;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
	positions[i * 3] = (Math.random() - 0.5) * 10;
	positions[i * 3 + 1] = objectsDistance * 0.4 - Math.random() * objectsDistance * sectionsMeshes.length;
	positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
)

const particlesMaterial = new THREE.PointsMaterial({
	size: 0.1, 
	transparent: true,
	alphaMap: particlesTexture,
	sizeAttenuation: true,
	depthWrite: true
})

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

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
// Group
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener('scroll', () => {
	scrollY = window.scrollY;

	const newSection = Math.round(scrollY / sizes.height);

	if (newSection !== currentSection) {
		currentSection = newSection;

		gsap.to(sectionsMeshes[currentSection].rotation, {			
			duration: 1,
			ease: 'power2.inOut',
			x: '+=6',
			y: '+=3',
			z: '+=1.5'
		});
	};
});

/**
 * Cursor
 */
const cursor = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
	cursor.x = (event.clientX / sizes.width) - 0.5;
	cursor.y = (event.clientY / sizes.height) - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
		const deltaTime = elapsedTime - previousTime;
		previousTime = elapsedTime;

		// Animate camera
		camera.position.y = - (scrollY / sizes.height) * objectsDistance;

		const parallaxX = cursor.x * 0.5;
		const parallaxY = - cursor.y * 0.5;
		cameraGroup.position.x += (parallaxX - cameraGroup.position.x) / 0.9 * deltaTime;
		cameraGroup.position.y += (parallaxY - cameraGroup.position.y) / 0.9 * deltaTime;

		// Update objects
		for (const mesh of sectionsMeshes) {
			mesh.rotation.x += deltaTime * 0.1;
			mesh.rotation.y += deltaTime * 0.13;
		}

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()