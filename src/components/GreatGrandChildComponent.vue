<template>
  <div class="great-grand-child" :style="componentStyle">
    <h5>曾孙组件（第三层）</h5>
    <p>通过 inject 接收祖先组件的数据：</p>
    <div class="card">
      <div class="card-header" :style="{ backgroundColor: themeColor }">
        用户信息卡
      </div>
      <div class="card-body">
        <p>姓名：{{ userName }}</p>
        <p>深色模式：{{ isDark ? '🌙' : '☀️' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import type { Ref } from 'vue'

// 使用 inject 接收数据（保留 ref 对象，保持响应式）
const userName = inject<Ref<string>>('userName', ref(''))
const themeColor = inject<Ref<string>>('themeColor', ref('#42b983'))
const isDark = inject<Ref<boolean>>('isDark', ref(false))

// 计算样式（使用 ref.value 获取值）
const componentStyle = computed(() => ({
  backgroundColor: isDark.value ? '#555' : '#f0f0f0',
  color: isDark.value ? '#fff' : '#333'
}))
</script>

<style scoped>
.great-grand-child {
  padding: 15px;
  border-radius: 8px;
  margin-top: 15px;
}

.great-grand-child h5 {
  margin-top: 0;
}

.card {
  margin-top: 10px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 10px 15px;
  color: #fff;
  font-weight: bold;
}

.card-body {
  padding: 15px;
  background-color: #fff;
  color: #333;
}

.card-body p {
  margin: 5px 0;
}
</style>
