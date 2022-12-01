import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import waterVertexShader from './shaders/water/vertex.glsl';
import waterFramentShader from './shaders/water/fragment.glsl';
import { generateUUID } from 'three/src/math/MathUtils';

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
// gui.close();
const debugObject = {};
debugObject.depthColor = '#186691';
debugObject.surfaceColor = '#9bd8ff';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)

// Material
const waterMaterial = new THREE.ShaderMaterial({
	vertexShader: waterVertexShader,
	fragmentShader: waterFramentShader,
	uniforms: {
		uBigWavesElevation: { value: 0.2 },
		uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
		uTime: { value: 0 },
		uBigWavesSpeed: { value: 0.5 },

		uSmallWavesElevation: { value: 0.15 },
		uSmallWavesFrequency: { value: 3.0 },
		uSmallWavesSpeed: { value: 0.2 },
		uSmallWavesIteration: { value: 4.0 },

		uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
		uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
		uColorOffset: { value: 0.08 },
		uColorMultiplier: { value: 5.0 }
	}
});

gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name("Big Waves");
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name("Big Waves Freq X");
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name("Big Waves Freq Y");
gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name("Big Waves Speed");

gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name("Small Waves");
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(10).step(0.001).name("Small Waves Freq");
gui.add(waterMaterial.uniforms.uSmallWavesIteration, 'value').min(0).max(10).step(0.001).name("Small Waves Iter");
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name("Small Waves Speed");

gui.addColor(debugObject, 'depthColor').onChange((value) => {
	waterMaterial.uniforms.uDepthColor.value.set(value);
});
gui.addColor(debugObject, 'surfaceColor').onChange((value) => {
	waterMaterial.uniforms.uSurfaceColor.value.set(value);
});
gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name("Color offset");
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name("Color mutiplier");

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

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
camera.position.set(1, 1, 1)
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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

		// Update wave
		waterMaterial.uniforms.uTime.value = elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()