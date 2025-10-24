<template>
  <!-- watch 响应式监听案例 -->
  <div class="watchRelated">
    <div class="watchRef border">
      <a class="titleText">watch Ref 监听Ref案例:</a><br />
      <div class="watchCase split">
        <div>{{ message }}</div>
      </div>
      <div><button @click="changeRef">changeRef</button></div>
    </div>
    <hr />
    <div class="watchMultiRef border">
      <a class="titleText">watch MultiRef 监听多个Ref案例:</a><br />
      <div class="watchCase split">
        <div>{{ message1 }}</div>
        <div>{{ message2 }}</div>
      </div>
      <div><button @click="changeMultiRef">changeMultiRef</button></div>
    </div>
    <hr />
    <div class="watchReactive border">
      <a class="titleText">watch Reactive 监听Reactive:</a><br />
      <div class="watchCase split">
        <div>{{ message3}}</div>
      </div>
      <div><button @click="changeReactive">changeReactive</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

const message = ref({
  nav:{
    bar:{
      name:"ref"
    }
  }
})

// watch 监听响应式对象，参数：监听源、回调函数、配置项
watch(message, (newVal, oldVal) => {
  console.log('msg新值----', newVal);
  console.log('msg旧值----', oldVal);
},{
  // 是否立即调用一次回调函数
  immediate:true,
  // 是否开启深度监听
  deep:true
})

const message1 = ref('mref1')
const message2 = ref('mref2')
// 监听多个ref时，注意监听源变成数组
watch([message1,message2], (newVal, oldVal) => {
    console.log('[msg1,msg2]新值----', newVal);
    console.log('[msg1,msg2]旧值----', oldVal);
},{immediate:true})

const message3 = reactive({
    nav:{
        bar:{
            name:"reactive"
        }
    }
})
// 监听Reactive，是否开启deep的效果都是深层监听对象
watch(message3, (newVal, oldVal) => {
    console.log('msg3新值----', newVal);
    console.log('msg3旧值----', oldVal);
},{immediate:true})

const changeRef = () => {
  message.value.nav.bar.name = 'changeRef'
}
const changeMultiRef = () => {
  message1.value = 'changeMRef1'
  message2.value = 'changeMRef2'
}
const changeReactive = () => {
  message3.nav.bar.name = 'changeReactive'
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
