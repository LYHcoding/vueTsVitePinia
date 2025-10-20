<template>
  <div class="watchEffectRelated">
    <div class="watchEffectRef border">
      <a class="titleText">watchEffect Ref 监听Ref案例:</a><br />
      <div class="watchEffectCase split">
        <div>{{ message }}</div>
        <div>{{ message2 }}</div>
      </div>
      <div class="split">
        <div><button @click="changeRef">changeRef</button></div>
        <div><button @click="changeRef2">changeRef2</button></div>
      </div>
    </div>
    <hr />
    <div class="watchEffectFuction border">
      <a class="titleText">watchEffect Fuction 监听触发前调用函数——防抖:</a><br />
      <div class="watchEffectCase split">
        <div>{{ message3 }}</div>
        <div>{{ message4 }}</div>
      </div>
      <div class="split">
        <div><button @click="changeRef3">changeRef3</button></div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';

// watchEffect  立即执行传入的函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
// 如果用到message 就只会监听message 就是用到几个监听几个 而且是非惰性 会默认调用一次
// watchEffect 监听Ref案例
const message = ref<string>('msg')
const message2 = ref<string>('msg2')
 watchEffect(() => {
    //console.log('message:', message.value);
    console.log('message2:', message2.value);
})
const changeRef = () => {
  message.value = 'changeRefMsg'
}
const changeRef2 = () => {
  message2.value = 'changeRefMsg2'
}

// watchEffect 监听触发前调用函数——防抖
const message3 = ref<string>('msg3')
const message4 = ref<string>('msg4')
const changeRef3 = () => {
  message3.value = 'changeRefMsg3'
  message4.value = 'changeRefMsg4'
}
watchEffect((oninvalidate) => {
  oninvalidate(() => {
    // setTimeout(() => {
    //   console.log('添加防抖逻辑');
    // }, 500);

    debounce(debouncefunc, 5000)
  })
  console.log('message3:', message3.value);
  console.log('message4:', message4.value);
})

const debouncefunc = () => {
  console.log('添加防抖逻辑');
}
function debounce<T extends (...args:unknown[]) => unknown>(fn: T, delay: number) {
  let timer: number | null = null
  return function (this:unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
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
