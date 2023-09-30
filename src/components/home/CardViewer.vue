<template>
  <div id="canvas"></div>
</template>

<script setup>
import { onMounted, nextTick } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

onMounted(async () => {
  await nextTick()

  const canvasElement = document.getElementById('canvas')
  const rect = canvasElement.getBoundingClientRect()

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(rect.width, rect.height)
  canvasElement.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableZoom = false
  controls.enablePan = false
  controls.enableRotate = true
  controls.rotateSpeed = 0.5
  controls.minAzimuthAngle = -Infinity
  controls.maxAzimuthAngle = Infinity
  controls.minPolarAngle = Math.PI / 2 // Set vertical rotation limits to horizontal rotation
  controls.maxPolarAngle = Math.PI / 2

  const loader = new GLTFLoader()
  loader.load('../../assets/3d/CSSA_card.glb', gltf => {
    const model = gltf.scene

    scene.add(model)

    // Rotate the model diagonally
    model.rotation.x = Math.PI / 3 // 45 degrees
    model.rotation.y = Math.PI / 6 // 45 degrees
  })

  // Position the camera
  camera.position.z = 2

  // Add a flat ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 2) // Color, Intensity
  scene.add(ambientLight)

  // Add a light source
  const light = new THREE.PointLight(0xffffff, 1)
  light.position.set(0, 0, 5)
  scene.add(light)

  // Animation function
  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
div {
  height: 500px;
  width: 500px;
}
</style>
