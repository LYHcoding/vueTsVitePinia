<template>
  <!-- to*** 转化响应形式相关 -->
  <div class="toRelated">
    <div class="toRef border">
      <a class="titleText">toRef:</a><br />
      <div class="nonResponsive split">
        <div>nonResponsive</div>
        <div>obj1:{{ obj1 }}</div>
        <div>state1:{{ state1 }}</div>
      </div>
      <div class="responsive split">
        <div>responsive</div>
        <div>obj2:{{ obj2 }}</div>
        <div>state2:{{ state2 }}</div>
      </div>
      <button @click="change1">change1</button>&nbsp;
      <button @click="change2">change2</button>
    </div>
    <hr />
    <div class="toRefs border">
      <a class="titleText">toRefs:</a><br />
      <div class="batchRef split">
        <div>batchRef</div>
        <div>obj3:{{ obj3 }}</div>
        <div>foo:{{ foo }}</div>
        <div>bar:{{ bar }}</div>
      </div>
      <button @click="change3">change3</button>
    </div>
    <hr />
    <div class="toRaw border">
      <a class="titleText">toRaw:</a><br />
      <div class="refToRaw split">
        <div>refToRaw</div>
        <div>obj3:{{ obj3 }}</div>
        <div>obj3Normal:{{ obj3Normal }}</div>
      </div>
      <div class="refToRaw split">
        <div>obj3Normal.foo:{{ obj3Normal.foo }}</div>
        <div>obj3Normal.bar:{{ obj3Normal.bar }}</div>
      </div>
      <button @click="change4">change4</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw, toRef, toRefs } from 'vue'

// toRef 转化为响应式对象
// obj1 如果原始对象是非响应式的就不会更新视图,数据是会变的
// obj2 如果原始对象是响应式的就会更新视图,并且改变数据的
const obj1 = {
  foo: 1,
  bar: 1
}
const obj2 = reactive({
  foo: 1,
  bar: 1
})
// bar 转化为响应式对象
const state1 = toRef(obj1,'bar')
const state2 = toRef(obj2,'bar')
const change1 = () => {
  state1.value++
  console.log(obj1, state1);
}
const change2 = () => {
  state2.value++
  console.log(obj2, state2);
}

// toRefs 批量转化为响应式对象
// 针对响应式不同的对象，视图更新也不同，类似 toRef
const obj3 = reactive({
  foo: 0,
  bar: 1
})
const { foo, bar } = toRefs(obj3)
foo.value++
console.log(foo.value, bar.value);
const change3 = () => {
  foo.value++
  console.log(obj3, foo, bar);
}

// toRaw 将响应式对象转化为普通对象
const obj3Normal = toRaw(obj3)
const change4 = () => {
  obj3Normal.foo++
  console.log(obj3Normal, foo, bar);
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
.split {
  display: flex;
}
.split div {
  flex: 1;
}
</style>
