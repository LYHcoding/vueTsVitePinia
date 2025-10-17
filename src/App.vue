<template>
  <div class="watchRelated">
    <div class="watch border">
      <a class="titleText">watch:</a><br />
      <div class="watchCase split">
        <div>watch 监听Ref案例</div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'

const message = ref({
  nav:{
    bar:{
      name:""
    }
  }
})

// watch 监听响应式对象，参数：监听源、回调函数、配置项
watch(message, (newVal, oldVal) => {
  console.log('新的值----', newVal);
  console.log('旧的值----', oldVal);
},{
  // 是否立即调用一次回调函数
  immediate:true,
  // 是否开启深度监听
  deep:true
})

const message1 = ref('')
const message2 = ref('')
// 监听多个ref时，注意监听源变成数组
watch([message1,message2], (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
})

const message3 = reactive({
    nav:{
        bar:{
            name:""
        }
    }
})
// 监听Reactive，是否开启deep的效果都是深层监听对象
watch(message3, (newVal, oldVal) => {
    console.log('新的值----', newVal);
    console.log('旧的值----', oldVal);
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
