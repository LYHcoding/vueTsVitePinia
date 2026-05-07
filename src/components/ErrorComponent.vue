<template>
  <div class="error">
    <div class="error-icon">✗</div>
    <p>加载失败</p>
    <button @click="$emit('retry')" class="retry-btn">重试</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'retry'): void
}>()
</script>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #fff5f5;
  border: 1px solid #ffcccc;
  border-radius: 4px;
}

.error-icon {
  width: 48px;
  height: 48px;
  background-color: #dc3545;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

p {
  margin-top: 16px;
  color: #dc3545;
  font-weight: 500;
}

.retry-btn {
  margin-top: 16px;
  padding: 8px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.retry-btn:hover {
  background-color: #c82333;
}
</style>
