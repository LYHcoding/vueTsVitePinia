<template>
  <div class="header">
    <div class="titleText">子组件给父组件传参</div>
    <div class="split">
      <!-- <div>子组件数据: {{ list }}</div> -->
      <div><button @click="clickTap">派发给父组件</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const list = reactive<number[]>([4, 5, 6])
// 通过defineEmits派发一个事件1
const emit = defineEmits(['on-click'])
// 通过defineEmits派发一个事件2  ts特有
// const emit = defineEmits<{
//   (e: "on-click", name: number[]): void
// }>()
const clickTap = () => {
  emit('on-click', list)
}

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
