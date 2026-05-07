<template>
  <div class="sibling-a">
    <h3>兄弟组件 A（发送方）</h3>
    <p>点击按钮发送消息给兄弟组件 B</p>
    <div class="button-group">
      <button @click="sendMessage('你好，我是组件 A！')" class="btn">发送消息 1</button>
      <button @click="sendMessage('这是一条重要通知')" class="btn">发送消息 2</button>
      <button @click="sendCount" class="btn">发送计数</button>
    </div>
    <p class="count">当前计数: {{ count }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import bus from '../utils/bus'

const count = ref(0)

const sendMessage = (message: string) => {
  bus.emit('message', message)
}

const sendCount = () => {
  count.value++
  bus.emit('count', count.value)
}
</script>

<style scoped>
.sibling-a {
  padding: 20px;
  background-color: #e8f5e9;
  border-radius: 8px;
  border: 2px solid #4caf50;
}

.sibling-a h3 {
  margin-top: 0;
  color: #2e7d32;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.btn {
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #43a047;
}

.count {
  font-weight: bold;
  color: #2e7d32;
}
</style>