<template>
  <div class="tab-content">
    <h2>关于我们</h2>
    <p>这是关于页面组件内容</p>
    <div class="counter">
      <p>输入内容: {{ inputText }}</p>
      <input v-model="inputText" type="text" placeholder="输入一些内容..." />
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

const inputText = ref('')
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
  name: 'TabAbout'
}
</script>

<style scoped>
.tab-content {
  padding: 20px;
}

h2 {
  color: #1e90ff;
}

.counter {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f4ff;
  border-radius: 8px;
}

.counter input {
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
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