<template>
  <div class="content">
    <div class="titleText">子组件暴露给父组件内部属性</div>
    <div class="split">
      <div>子组件数据: {{ listExpose }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const listExpose = reactive<number[]>([7, 8, 9])

// 父组件想要读到子组件的属性可以通过 defineExpose 暴露
defineExpose({
    listExpose
})

</script>

<style scoped>
.titleText {
  color: gray;
}
.split {
  display: flex;
}
.split div {
  flex: 1;
}
</style>
