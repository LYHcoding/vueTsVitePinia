<template>
  <div class="toRelated">
    <div class="toRef border">
      <a class="titleText">toRef:</a><br />
      <div>state:{{ state }}</div>
      <button @click="change1">test1</button>&nbsp;
      <button @click="change2">test2</button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'

// toRef 转化为响应式对象
const obj = {
  foo: 1,
  bar: 2
}
const state = toRef(obj,'bar')
const cahnge = () => {
  state.value++
}
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
}
.titleText {
  color: gray;
}
</style>
