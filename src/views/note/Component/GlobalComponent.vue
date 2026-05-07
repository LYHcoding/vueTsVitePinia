<template>
  <!-- 全局组件示例 -->
  <div class="globalComponent">
    <div class="card-header">
      <span class="card-title">主标题</span>
      <span class="card-subtitle">副标题</span>
    </div>
    <div v-if="content" class="card-content">
      {{ content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Props = {
  content?: string
}
const props = defineProps<Props>()
const content = ref(props.content || '这是一个全局组件卡片的内容区域')
</script>

<style scoped>
.globalComponent {
  width: 300px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow: hidden;
  background-color: #ffffff;
  transition: box-shadow 0.2s ease;
}
.globalComponent:hover {
  box-shadow: 0 0 10px #cccccc;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
}
.card-title {
  font-weight: 600;
}
.card-subtitle {
  margin-left: auto;
  color: #666666;
  font-size: 14px;
}
.card-content {
  padding: 10px;
}
</style>
