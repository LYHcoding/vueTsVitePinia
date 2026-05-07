<template>
  <div class="app">
    <h1>Transition 动画组件示例</h1>

    <!-- 示例1: 基础淡入淡出 -->
    <section class="demo-section">
      <h2>1. 基础淡入淡出动画</h2>
      <button @click="showFade = !showFade" class="toggle-btn">切换显示</button>
      <transition name="fade">
        <div v-if="showFade" class="box fade-box">淡入淡出效果</div>
      </transition>
    </section>

    <!-- 示例2: 缩放动画 -->
    <section class="demo-section">
      <h2>2. 缩放动画</h2>
      <button @click="showScale = !showScale" class="toggle-btn">切换显示</button>
      <transition name="scale">
        <div v-if="showScale" class="box scale-box">缩放效果</div>
      </transition>
    </section>

    <!-- 示例3: 旋转动画 -->
    <section class="demo-section">
      <h2>3. 旋转动画</h2>
      <button @click="showRotate = !showRotate" class="toggle-btn">切换显示</button>
      <transition name="rotate">
        <div v-if="showRotate" class="box rotate-box">旋转效果</div>
      </transition>
    </section>

    <!-- 示例4: 滑动动画 -->
    <section class="demo-section">
      <h2>4. 滑动动画</h2>
      <button @click="showSlide = !showSlide" class="toggle-btn">切换显示</button>
      <transition name="slide">
        <div v-if="showSlide" class="box slide-box">滑动效果</div>
      </transition>
    </section>

    <!-- 示例5: 自定义过渡类名 -->
    <section class="demo-section">
      <h2>5. 自定义过渡类名</h2>
      <button @click="showCustom = !showCustom" class="toggle-btn">切换显示</button>
      <transition
        enter-active-class="custom-enter-active"
        enter-from-class="custom-enter-from"
        enter-to-class="custom-enter-to"
        leave-active-class="custom-leave-active"
        leave-from-class="custom-leave-from"
        leave-to-class="custom-leave-to"
      >
        <div v-if="showCustom" class="box custom-box">自定义类名效果</div>
      </transition>
    </section>

    <!-- 示例6: 过渡模式 (out-in) -->
    <section class="demo-section">
      <h2>6. 过渡模式 (out-in)</h2>
      <button @click="toggleMode = !toggleMode" class="toggle-btn">切换组件</button>
      <transition name="fade" mode="out-in">
        <div v-if="toggleMode" key="a" class="box mode-box">组件 A</div>
        <div v-else key="b" class="box mode-box">组件 B</div>
      </transition>
    </section>

    <!-- 示例7: appear 初始动画 -->
    <section class="demo-section">
      <h2>7. appear 初始动画</h2>
      <p>页面加载时自动执行动画</p>
      <transition name="bounce" appear>
        <div class="box bounce-box">初始动画效果</div>
      </transition>
    </section>

    <!-- 示例8: JavaScript 钩子 -->
    <section class="demo-section">
      <h2>8. JavaScript 钩子</h2>
      <button @click="showJsHook = !showJsHook" class="toggle-btn">切换显示</button>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
      >
        <div v-if="showJsHook" class="box js-box">JavaScript 钩子动画</div>
      </transition>
      <div class="logs">
        <h4>动画日志:</h4>
        <ul>
          <li v-for="(log, index) in jsLogs" :key="index">{{ log }}</li>
        </ul>
      </div>
    </section>

    <!-- 示例9: 动态过渡时长 -->
    <section class="demo-section">
      <h2>9. 动态过渡时长</h2>
      <button @click="showDuration = !showDuration" class="toggle-btn">切换显示</button>
      <transition :duration="{ enter: 1000, leave: 500 }" name="duration">
        <div v-if="showDuration" class="box duration-box">进入: 1s, 离开: 0.5s</div>
      </transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 基础动画状态
const showFade = ref(true)
const showScale = ref(false)
const showRotate = ref(false)
const showSlide = ref(false)
const showCustom = ref(false)
const toggleMode = ref(true)
const showJsHook = ref(false)
const showDuration = ref(false)

// JavaScript 钩子日志
const jsLogs = ref<string[]>([])

const addLog = (message: string) => {
  jsLogs.value.push(`${new Date().toLocaleTimeString()} - ${message}`)
  if (jsLogs.value.length > 10) {
    jsLogs.value.shift()
  }
}

// JavaScript 过渡钩子
const beforeEnter = (el: Element) => {
  addLog('before-enter: 进入之前')
  ;(el as HTMLElement).style.opacity = '0'
  ;(el as HTMLElement).style.transform = 'translateX(-100px)'
}

const enter = (el: Element, done: () => void) => {
  addLog('enter: 进入过渡中')
  const animate = () => {
    ;(el as HTMLElement).style.opacity = '1'
    ;(el as HTMLElement).style.transform = 'translateX(0)'
    ;(el as HTMLElement).addEventListener('transitionend', done)
  }
  requestAnimationFrame(animate)
}

const afterEnter = () => {
  addLog('after-enter: 进入完成')
}

const beforeLeave = () => {
  addLog('before-leave: 离开之前')
}

const leave = (el: Element, done: () => void) => {
  addLog('leave: 离开过渡中')
  ;(el as HTMLElement).style.opacity = '0'
  ;(el as HTMLElement).style.transform = 'translateX(100px)'
  ;(el as HTMLElement).addEventListener('transitionend', done)
}

const afterLeave = () => {
  addLog('after-leave: 离开完成')
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

.toggle-btn {
  padding: 8px 20px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  transition: background-color 0.2s;
}

.toggle-btn:hover {
  background-color: #3aa474;
}

.box {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  border-radius: 8px;
}

/* 淡入淡出动画 */
.fade-box {
  background-color: #42b983;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 缩放动画 */
.scale-box {
  background-color: #1e90ff;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* 旋转动画 */
.rotate-box {
  background-color: #ff6347;
}

.rotate-enter-active {
  transition: all 1s ease;
}

.rotate-leave-active {
  transition: all 0.5s ease;
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(180deg) scale(0);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(-180deg) scale(0);
}

/* 滑动动画 */
.slide-box {
  background-color: #9370db;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

/* 自定义类名动画 */
.custom-box {
  background-color: #ffd700;
  color: #333;
}

.custom-enter-active {
  transition: all 1.5s ease;
}

.custom-enter-from {
  opacity: 0;
  background: red;
  width: 0px;
  height: 0px;
}

.custom-enter-to {
  opacity: 1;
  background: #ffd700;
  width: 200px;
  height: 100px;
}

.custom-leave-active {
  transition: all 0.5s ease;
}

.custom-leave-from {
  opacity: 1;
  width: 200px;
  height: 100px;
}

.custom-leave-to {
  opacity: 0;
  width: 0px;
  height: 0px;
}

/* 模式切换动画 */
.mode-box {
  background-color: #00ced1;
}

/* appear 初始动画 */
.bounce-box {
  background-color: #ff69b4;
}

.bounce-enter-active,
.bounce-appear-active {
  animation: bounce 1s ease;
}

@keyframes bounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* JavaScript 钩子动画 */
.js-box {
  background-color: #2f4f4f;
  transition: all 0.5s ease;
}

.logs {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.logs h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
}

.logs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.logs li {
  font-size: 12px;
  color: #888;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
}

/* 动态时长动画 */
.duration-box {
  background-color: #ffa500;
}

.duration-enter-active,
.duration-leave-active {
  transition: all ease;
}

.duration-enter-from,
.duration-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
