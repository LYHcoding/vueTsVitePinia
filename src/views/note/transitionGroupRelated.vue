<template>
  <div class="app">
    <h1>Transition-Group 过渡列表示例</h1>

    <!-- 示例1: 基础列表过渡 -->
    <section class="demo-section">
      <h2>1. 基础列表过渡（添加/删除）</h2>
      <div class="controls">
        <button @click="addItem" class="toggle-btn">添加元素</button>
        <button @click="removeItem" class="toggle-btn remove">删除元素</button>
      </div>
      <transition-group name="list" tag="div" class="list-container">
        <div v-for="item in list" :key="item" class="list-item">
          {{ item }}
        </div>
      </transition-group>
    </section>

    <!-- 示例2: 列表移动过渡（v-move） -->
    <section class="demo-section">
      <h2>2. 列表移动过渡（v-move）</h2>
      <div class="controls">
        <button @click="shuffleItems" class="toggle-btn">随机打乱</button>
        <button @click="sortItems" class="toggle-btn">排序</button>
      </div>
      <transition-group name="shuffle" tag="ul" class="shuffle-container">
        <li v-for="item in shuffleList" :key="item.id" class="shuffle-item">
          {{ item.number }}
        </li>
      </transition-group>
    </section>

    <!-- 示例3: 网格布局过渡 -->
    <section class="demo-section">
      <h2>3. 网格布局过渡</h2>
      <div class="controls">
        <button @click="shuffleGrid" class="toggle-btn">随机打乱</button>
        <button @click="addGridItem" class="toggle-btn">添加</button>
        <button @click="removeGridItem" class="toggle-btn remove">删除</button>
      </div>
      <transition-group name="grid" tag="div" class="grid-container">
        <div v-for="item in gridList" :key="item.id" class="grid-item">
          {{ item.number }}
        </div>
      </transition-group>
    </section>

    <!-- 示例4: 状态过渡（数字动画） -->
    <section class="demo-section">
      <h2>4. 状态过渡（数字动画）</h2>
      <div class="number-demo">
        <label>
          目标数字：
          <input
            v-model.number="num.current"
            type="number"
            step="10"
            class="number-input"
          />
        </label>
        <div class="number-display">{{ num.tweenedNumber.toFixed(0) }}</div>
      </div>
    </section>

    <!-- 示例5: 拖拽排序过渡 -->
    <section class="demo-section">
      <h2>5. 拖拽排序过渡</h2>
      <div class="controls">
        <button @click="shuffleDrag" class="toggle-btn">随机打乱</button>
      </div>
      <transition-group name="drag" tag="div" class="drag-container">
        <div
          v-for="(item, index) in dragList"
          :key="item.id"
          class="drag-item"
          @click="moveUp(index)"
          :title="'点击向上移动'"
        >
          {{ item.text }}
        </div>
      </transition-group>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

// 示例1: 基础列表
const list = ref<number[]>([1, 2, 3, 4, 5])
let nextId = 6

const addItem = () => {
  list.value.push(nextId++)
}

const removeItem = () => {
  if (list.value.length > 0) {
    list.value.pop()
  }
}

// 示例2: 列表移动过渡
const shuffleList = ref(
  Array.from({ length: 9 }, (_, i) => ({
    id: i,
    number: (i % 9) + 1
  }))
)

const shuffleItems = () => {
  shuffleList.value = shuffleList.value
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const sortItems = () => {
  shuffleList.value.sort((a, b) => a.number - b.number)
}

// 示例3: 网格布局
const gridList = ref(
  Array.from({ length: 12 }, (_, i) => ({
    id: i,
    number: i + 1
  }))
)

const shuffleGrid = () => {
  gridList.value = gridList.value
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const addGridItem = () => {
  const newId = Math.max(...gridList.value.map(item => item.id)) + 1
  gridList.value.push({ id: newId, number: newId })
}

const removeGridItem = () => {
  if (gridList.value.length > 0) {
    gridList.value.pop()
  }
}

// 示例4: 状态过渡（数字动画）
const num = reactive({
  tweenedNumber: 0,
  current: 0
})

watch(() => num.current, (newVal) => {
  const duration = 1000
  const startValue = num.tweenedNumber
  const startTime = performance.now()

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    num.tweenedNumber = startValue + (newVal - startValue) * progress

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
})

// 示例5: 拖拽排序
const dragList = ref(
  Array.from({ length: 5 }, (_, i) => ({
    id: i,
    text: `项目 ${i + 1}`
  }))
)

const shuffleDrag = () => {
  dragList.value = dragList.value
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

const moveUp = (index: number) => {
  if (index > 0) {
    const item = dragList.value.splice(index, 1)[0]
    dragList.value.splice(index - 1, 0, item)
  }
}
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.demo-section {
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
}

.demo-section h2 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #42b983;
  font-size: 18px;
}

.controls {
  margin-bottom: 15px;
}

.toggle-btn {
  padding: 8px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: #3aa474;
}

.toggle-btn.remove {
  background-color: #ff6347;
}

.toggle-btn.remove:hover {
  background-color: #e55a3d;
}

/* 示例1: 基础列表过渡 */
.list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.list-item {
  padding: 10px 20px;
  background-color: #42b983;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

/* 示例2: 列表移动过渡 */
.shuffle-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: calc(40px * 9 + 40px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.shuffle-item {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #1e90ff;
  color: #fff;
  font-weight: bold;
}

.shuffle-enter-active,
.shuffle-leave-active {
  transition: all 0.5s ease;
}

.shuffle-enter-from {
  opacity: 0;
  transform: scale(0.5);
}

.shuffle-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.shuffle-leave-active {
  position: absolute;
}

.shuffle-move {
  transition: transform 0.8s ease;
}

/* 示例3: 网格布局过渡 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
}

.grid-item {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #9370db;
  border-radius: 8px;
  background-color: #9370db;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
}

.grid-enter-active,
.grid-leave-active {
  transition: all 0.5s ease;
}

.grid-enter-from {
  opacity: 0;
  transform: scale(0) rotate(-180deg);
}

.grid-leave-to {
  opacity: 0;
  transform: scale(0) rotate(180deg);
}

.grid-leave-active {
  position: absolute;
}

.grid-move {
  transition: transform 0.5s ease;
}

/* 示例4: 状态过渡 */
.number-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.number-demo label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.number-input {
  padding: 8px;
  width: 120px;
  border: 2px solid #42b983;
  border-radius: 4px;
  font-size: 16px;
}

.number-display {
  font-size: 48px;
  font-weight: bold;
  color: #42b983;
  padding: 20px 40px;
  background-color: #f0f8f0;
  border-radius: 8px;
}

/* 示例5: 拖拽排序过渡 */
.drag-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.drag-item {
  padding: 15px 20px;
  background-color: #ffd700;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.drag-item:hover {
  background-color: #ffcc00;
}

.drag-enter-active,
.drag-leave-active {
  transition: all 0.5s ease;
}

.drag-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.drag-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.drag-leave-active {
  position: absolute;
}

.drag-move {
  transition: transform 0.5s ease;
}
</style>
