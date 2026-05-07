<template>
  <div class="sibling-b">
    <h3>兄弟组件 B（接收方）</h3>
    <div v-if="receivedMessage" class="message-box">
      <p class="label">收到消息：</p>
      <p class="message">{{ receivedMessage }}</p>
    </div>
    <div v-else class="empty-state">
      <p>等待接收消息...</p>
    </div>
    <div class="count-box">
      <p class="label">收到计数：</p>
      <p class="count-value">{{ receivedCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import bus from '../utils/bus'

const receivedMessage = ref('')
const receivedCount = ref(0)

const handleMessage = (message: unknown) => {
  receivedMessage.value = message as string
}

const handleCount = (count: unknown) => {
  receivedCount.value = count as number
}

onMounted(() => {
  bus.on('message', handleMessage)
  bus.on('count', handleCount)
})

onUnmounted(() => {
  bus.off('message', handleMessage)
  bus.off('count', handleCount)
})
</script>

<style scoped>
.sibling-b {
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 8px;
  border: 2px solid #1976d2;
}

.sibling-b h3 {
  margin-top: 0;
  color: #1565c0;
}

.message-box {
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
}

.empty-state {
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  color: #999;
}

.label {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #666;
}

.message {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #1565c0;
}

.count-box {
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
}

.count-value {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  color: #ff9800;
}
</style>