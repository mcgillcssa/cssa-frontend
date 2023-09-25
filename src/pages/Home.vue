<template>
  <NavBar />
  <div class="banner-background">
    <img
      class="home-title"
      src="https://media.discordapp.net/attachments/887824994602733598/1155642024175878215/image.png"
    />
  </div>
  <gradient-stripe></gradient-stripe>
  <div id="three-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import NavBar from '../components/NavBar.vue'
import GradientStripe from '../components/GradientStripe.vue'

onMounted(() => {
  // Set up Three.js scene, camera, and renderer
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  document.getElementById('three-container').appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  loader.load('../assets/3d/CSSA_card.glb', gltf => {
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

<style>
body {
  margin: 0;
}

.page {
  overflow: hidden;
}

.vertical-flex-container {
  flex-direction: column;
}

.banner-background {
  position: relative;

  background-image: linear-gradient(
      122.63deg,
      #ffc6b4 0.67%,
      #ffa7d1 25.09%,
      #ad87cb 50.63%,
      #8986ed 84.36%,
      #4f78c9 100%
    ),
    url('https://i.imgur.com/ZgCeJBq.jpg');
  background-size: cover;
  background-blend-mode: multiply;
  width: 100%;
  height: calc(100vh - 24px);
}

.home-title {
  max-width: 600px;
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
}

@media screen and (min-width: 1921px) {
  .home-title {
    max-width: 800px;
    left: 3%;
  }
}

#three-container {
  width: 100vw !important;
  height: 400px !important;
}
</style>
