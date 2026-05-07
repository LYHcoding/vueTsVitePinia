<template>
  <!-- 组件：全局组件，局部组件，递归组件 -->
  <div class="componentRelated">
    <a class="titleText">component:</a><br />

    <div class="component border">
      <div class="globalComponent split">
        <div>Global Component 全局组件</div>
        <div class="card">
          <div class="card-header">
            <span class="card-title">主标题</span>
            <span class="card-subtitle">副标题</span>
          </div>
          <div v-if="content" class="card-content">
            {{ content }}
          </div>
        </div>
      </div>
    </div>
    <!-- <GlobalComponent :content="content" /> -->

    <div class="localComponent split border">
      <div>Local Component 局部组件</div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">调用 GlobalComponent 这一局部组件</span>
        </div>
        <div class="card-content">
          <GlobalComponent />
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">调用 ComputedRelated 局部组件</span>
        </div>
        <div class="card-content">
          <ComputedRelated />
        </div>
      </div>
    </div>

    <!-- 递归组件示例 -->
    <div class="recursiveComponent">
      <ParentComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlobalComponent from '@/views/note/Component/GlobalComponent.vue'
import ComputedRelated from '@/views/note/computedRelated.vue'
import ParentComponent from '@/views/note/Component/ParentComponent.vue'

type Props = {
  content?: string
}
const props = defineProps<Props>()
const content = ref(props.content || '这是一个全局组件的内容区域')
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
  margin: 5px;
}
.titleText {
  color: gray;
}
.split {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}
.split > * {
  min-width: 0;
}
.card {
  width: 500px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  overflow: hidden;
  background-color: #ffffff;
  transition: box-shadow 0.2s ease;
}
.card:hover {
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
.recursiveComponent {
  margin: 5px;
}
</style>
