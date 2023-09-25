<template>
  <div id="canvas"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

onMounted(() => {
  // Set up Three.js scene, camera, and renderer
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  document.getElementById('canvas').appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('../../assets/3d/CSSA_card.glb', gltf => {
    const model = gltf.scene

    scene.add(model)

    // Rotate the model diagonally
    model.rotation.x = Math.PI / 4 // 45 degrees
    model.rotation.y = Math.PI / 4 // 45 degrees
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

    // Rotate the model around its center
    scene.traverse(object => {
      if (object.isMesh) {
        object.rotation.x += 0.01 // Rotate diagonally around X-axis
        object.rotation.y += 0.01 // Rotate diagonally around Y-axis
      }
    })

    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
div {
  height: 100px;
  width: 100px;
}
</style>
