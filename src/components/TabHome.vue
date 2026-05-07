<template>
  <div class="tab-content">
    <h2>首页</h2>
    <p>这是首页组件内容</p>
    <div class="counter">
      <p>点击次数: {{ clickCount }}</p>
      <button @click="clickCount++">点击我</button>
    </div>
    <div class="lifecycle-logs">
      <h4>生命周期日志:</h4>
      <ul>
        <li v-for="(log, index) in logs" :key="index">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, onDeactivated, onUnmounted } from 'vue'

const emit = defineEmits<{
  (e: 'created'): void
}>()

const clickCount = ref(0)
const logs = ref<string[]>()

const addLog = (message: string) => {
  if (!logs.value) logs.value = []
  logs.value.push(`${new Date().toLocaleTimeString()} - ${message}`)
}

onMounted(() => {
  addLog('onMounted - 组件挂载')
  emit('created')
})

onActivated(() => {
  addLog('onActivated - 组件激活')
})

onDeactivated(() => {
  addLog('onDeactivated - 组件停用')
})

onUnmounted(() => {
  addLog('onUnmounted - 组件卸载')
})
</script>

<script lang="ts">
export default {
  name: 'TabHome'
}
</script>

<style scoped>
.tab-content {
  padding: 20px;
}

h2 {
  color: #42b983;
}

.counter {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f8f0;
  border-radius: 8px;
}

.counter button {
  padding: 8px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.counter button:hover {
  background-color: #3aa474;
}

.lifecycle-logs {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.lifecycle-logs ul {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.lifecycle-logs li {
  font-size: 12px;
  color: #666;
  padding: 4px 0;
  border-bottom: 1px solid #eee;
}
</style>