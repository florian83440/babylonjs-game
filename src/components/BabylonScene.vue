<template>
  <canvas ref="renderCanvas" style="width: 100%; height: 100vh;"></canvas>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as BABYLON from 'babylonjs'
import { createScene } from '@/babylon/createScene'

const renderCanvas = ref(null)
let engine = null

onMounted(() => {
  if (!renderCanvas.value) return

  engine = new BABYLON.Engine(renderCanvas.value, true)
  const scene = createScene(engine, renderCanvas.value)

  engine.runRenderLoop(() => scene.render())
  window.addEventListener('resize', () => engine.resize())
})

onBeforeUnmount(() => {
  engine?.dispose()
})
</script>

<style scoped>
canvas {
  display: block;
}
</style>
