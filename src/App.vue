<template>
  <div class="toRelated">
    <div class="toRef border">
      <a class="titleText">toRef:</a><br />
      <div>state:{{ state }}</div>
      <button @click="change1">change1</button>&nbsp;

      <!-- <button @click="change2">change2</button> -->
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'

// toRef 转化为响应式对象
// 如果原始对象是非响应式的就不会更新视图,数据是会变的
// 如果原始对象是响应式的就会更新视图,并且改变数据的
const obj = {
  foo: 1,
  bar: 1
}
const state = toRef(obj,'bar')
// bar 转化为响应式对象
const change1 = () => {
  state.value++
  console.log(obj, state);
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
