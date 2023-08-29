<template>
  <div class="grid">
    <div class="item" v-for="(item, index) in images" :key="index">
      <img :src="item" crossorigin="anonymous" @mouseenter="handleMouseEnter($event.target, index)"
        @mouseleave="handleMouseLeave" :style="{ opacity: hoverIndex === -1 ? 1 : index === hoverIndex ? 1 : 0.2 }">
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ColorThief from 'colorthief'
const colorThief = new ColorThief()
const images = []
for (let i = 0; i < 4; i++) {
  images.push(`https://picsum.photos/800/800?random=${i}`)
}
const hoverIndex = ref(-1)
const html = document.documentElement
async function handleMouseEnter(target, index) {
  hoverIndex.value = index
  const colors = colorThief.getPalette(target, 3)
  const [c1, c2, c3] = colors.map(c => `rgb(${c[0]},${c[1]},${c[2]})`)
  html.style.setProperty('--color1', c1)
  html.style.setProperty('--color2', c2)
  html.style.setProperty('--color3', c3)
}
async function handleMouseLeave() {
  hoverIndex.value = -1
  html.style.setProperty('--color1', '#fff')
  html.style.setProperty('--color2', '#fff')
  html.style.setProperty('--color3', '#fff')
}
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, var(--color1), var(--color2), var(--color3));
}
</style>
<style scoped>
.grid {
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.grid .item {
  width: 50%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}


.grid .item img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
}

.grid .item img:hover {
  transform: scale(1.1);
  border: 5px solid #fff;
}
</style>
