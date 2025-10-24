<template>
  <!-- computed 计算属性 -->
  <div class="computedRelated">
    <div class="computed border">
      <a class="titleText">computed:</a><br />
      <div class="computedFuction split">
        <div>computed 函数形式</div>
        <div>price1:{{ price1 }}</div>
        <div>m1:{{ m1 }}</div>
      </div>
      <div class="computedObject split">
        <div>computed 对象形式</div>
        <div>price2:{{ price2 }}</div>
        <div>m2:{{ m2 }}</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// 用法 函数形式
const price1 = ref(0) //$0
const m1 = computed<string>(() => {
  return '$' + price1.value
})
price1.value = 100

// 用法 对象形式
const price2 = ref<number | string>(1) //$0
const m2 = computed({
  get: () => {
    return '$' + price2.value
  },
  set: (value) => {
    price2.value = 'set' + value
  }
})
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
}
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
