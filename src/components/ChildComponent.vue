<template>
  <div class="child-component" :style="componentStyle">
    <h3>子组件（第一层）</h3>
    <p>用户名：{{ userName }}</p>
    <p>主题颜色：{{ themeColor }}</p>

    <!-- 孙组件 -->
    <GrandChildComponent />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import type { Ref } from 'vue'
import GrandChildComponent from '@/components/GrandChildComponent.vue'

// 使用 inject 接收数据（保留 ref 对象，保持响应式）
const userName = inject<Ref<string>>('userName', ref(''))
const themeColor = inject<Ref<string>>('themeColor', ref('#42b983'))
const isDark = inject<Ref<boolean>>('isDark', ref(false))

// 计算样式（使用 ref.value 获取值）
const componentStyle = computed(() => ({
  backgroundColor: isDark.value ? '#333' : '#fff',
  color: isDark.value ? '#fff' : '#333',
  borderColor: themeColor.value || '#ddd'
}))
</script>

<style scoped>
.child-component {
  padding: 20px;
  border: 2px solid;
  border-radius: 8px;
  margin-bottom: 20px;
}

.child-component h3 {
  margin-top: 0;
}
</style>
