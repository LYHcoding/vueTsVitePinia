<template>
  <div>
    <div class="refRelated">
      <div class="Text border">
        <a class="titleText">非响应式对象:</a>
        <div class="nameText">{{ text.name }}</div>
        <button @click="changeName">change</button>
      </div>
      <hr />
      <div class="refText border">
        <a class="titleText">响应式对象 ref:</a>
        <div class="refNameText">{{ refName.name }}</div>
        <button @click="changeRefName">change2</button>
      </div>
      <div class="isRefTRes border">
        <a class="titleText">isRef 判断:</a>
        <div class="isRefText">普通值: {{ text }} - {{ isRef(text) }}</div>
        <div class="isRefText">&nbsp;&nbsp; {{ notRef }} - {{ isRef(notRef) }}</div>
        <div class="isRefText">ref对象: {{ refName }} - {{ isRef(refName) }}</div>
        <!-- Vue 会自动将 message 解包为其内部值，即 message.value 的字符串值 "message"/"change msg"，而非 ref 对象本身 -->
        <div class="isRefText">&nbsp;&nbsp; {{ message }} - {{ isRef(message) }}</div>
        <div class="isRefText">isRef判断结果: {{ isRefResult }} - {{ isRef(isRefResult) }}</div>
        <div class="isRefText">计算属性(值): {{ messageNotRef }} - {{ isRef(messageNotRef) }}</div>
        <!-- 解决方法：将 ref 包装在对象中； 使用计算属性返回 ref 本身 -->
        <div class="isRefText">计算属性(ref):{{ messageRef }} - {{ isRef(messageRef) }}</div>
        <div class="isRefText">包装对象中的ref: {{ wrapper.message }} - {{ isRef(wrapper.message) }}</div>
        <hr />
        <button @click="changeMsg">changeMsg</button>
      </div>
      <div class="shallowRefText border">
        <a class="titleText">浅层响应式对象 shallowRef:</a><br />
        {{ shallowRefText }}<br />
        <button @click="changeSRValueF">changeSRValueF</button> <a class="titleText">修改属性(不触发更新)</a><br />
        <button @click="changeSRValueT">changeSRValueT</button> <a class="titleText">替换整个对象(触发更新)</a>
      </div>
      <div class="triggerRefText border">
        <a class="titleText">手动触发更新dom triggerRef:</a><br />
        <button @click="useTriggerRef">useTriggerRef</button>
      </div>
      <div class="customRefText border">
        <a class="titleText">自定义防抖ref customRef:</a><br />
        {{ customRefText }}<br />
        <button @click="changeCustomRefText">changeCustomRefText</button> <p class="titleText">500ms内的多次点击只会执行最后一次更新</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, isRef, computed, shallowRef, triggerRef, customRef } from 'vue'
import type { Ref } from 'vue'

// 非响应式对象
const text = { name: 'lyh' }
console.log(text.name)
text.name = 'update lyh'
console.log(text.name)
const changeName = () => {
  text.name = 'update lyh1'
  console.log(text)
}

// 响应式对象 ref
type RF = {
  name: string
}
// const refName = ref<RF>({ name: 'lyh' })
const refName:Ref<RF> = ref({ name: 'lyh' })
// const refName = ref({ name: 'lyh0' })  //常用
console.log(refName.value.name)
refName.value.name = 'update lyh0'
console.log(refName.value.name)
// text常量始终是非响应的，但change2触发响应式更新时，会使页面DOM重新渲染，更新text当前值
const changeRefName = () => {
  refName.value.name = 'update lyh2'
  console.log(refName)
}

// isRef 判断
const message: Ref<string | number> = ref("message")
const notRef:number = 123
const changeMsg = () => {
  message.value = "change msg"
  console.log(message)
  console.log(isRef(message)); //true
  console.log(notRef)
  console.log(isRef(notRef)); //false
}
const wrapper = { message }
const messageNotRef = computed(() => message.value)
const messageRef = computed(() => message)
const isRefResult = isRef(message)

// shallowRef 浅层响应式
// const shallowRefText = shallowRef('shallowRefText')
const shallowRefText = shallowRef({
  name: 'shallowRefText'
})
const changeSRValueF = () => {
  // shallowRefText.value = 'change shallowRefText'
  shallowRefText.value.name = 'change shallowRefText'
  console.log(shallowRefText)
}
const changeSRValueT = () => {
  shallowRefText.value = { name: 'change shallowRefText 2' }
  console.log(shallowRefText)
}

// triggerRef 更新dom，强制更新页面DOM
const useTriggerRef = () => {
  triggerRef(shallowRefText)
}

// customRef 自定义ref,基于customRef封装的自定义Hook函数,要求返回一个对象 并且实现get和set，做防抖功能的响应式引用
const customRefText = useCustomRef('customRefText')
let n = 0
const changeCustomRefText = () => {
  n++
  customRefText.value = 'change customRefText ' + n
}
// 500ms内快速连续点击changeCustomRefText按钮三次，最后dom更新呈现效果为：change customRefText 23, 且此时 n=133
// 原因：customRef 防抖代表着 500ms timer 时期，多次点击只执行最后一次定时器 setTimeout 函数内的数值更新和响应式触发
// function useCustomRef<T=any>(value: T) { //warn
// function useCustomRef<T=unknown>(value: T) {
function useCustomRef<T>(value: T) {
  // let timer:any;  // warn: Unexpected any. Specify a different type.eslint@typescript-eslint/no-explicit-any
  let timer: number | null;
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newVal) {
        // clearTimeout(timer)
        if (timer !== null) {
          clearTimeout(timer)
        }
        n = n + 10
        timer =  setTimeout(() => {
          n = n + 100
          console.log('触发了set', n)
          value = newVal
          trigger()
        },500)
      }
    }
  })
}
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
}
.titleText {
  color: gray;
}
</style>
