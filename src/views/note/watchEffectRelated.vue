<template>
  <!-- watchEffect 响应式高级监听器案例 -->
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
      <div class="watchEffectFuctionCase1">
        <div class="split">
          <div>{{ message3 }}</div>
          <div>{{ message4 }}</div>
        </div>
        <div class="split">
          <div><button @click="changeRef3">changeRef3</button></div>
          <div><button @click="changeRef4">changeRef4</button></div>
        </div>
      </div>
      <hr />
      <div class="watchEffectFuctionCase2">
        <div class="split">
          <div>{{ message5 }}</div>
          <div>{{ message6 }}</div>
        </div>
        <div class="split">
          <div><button @click="changeRef5">changeRef5</button></div>
          <div><button @click="changeRef6">changeRef6</button></div>
        </div>
      </div>
      <hr />
      <div class="watchEffectFuctionCase3">
        <div class="split">
          <div>{{ message7 }}</div>
          <div>{{ message8 }}</div>
        </div>
        <div class="split">
          <div><button @click="changeRef7">changeRef7</button></div>
          <div><button @click="changeRef8">changeRef8</button></div>
        </div>
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
function debounce<P extends unknown[], R>(fn: (...args: P) => R, delay: number) {
  let timer: number | null = null
  return function (this:unknown, ...args: P) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.call(this, ...args)
    }, delay)
  }
}
// 防抖案例1
const message3 = ref<number>(0)
const message4 = ref<number>(0)
const changeRef3 = () => {
  message3.value++
}
const changeRef4 = () => {
  message4.value++
}
const logValues = (val3: number, val4: number) => {
  console.log('防抖后打印，message3:', val3, '，message4:', val4);
}
// debounce(logValues, 500)  // 这里只是创建了防抖函数，若不调用它，logValues 就永远不会执行
const debouncedLog = debounce(logValues, 500);
watchEffect(() => {
  debouncedLog(message3.value, message4.value)
})
// 防抖案例2
const message5 = ref<number>(0)
const message6 = ref<number>(0)
const changeRef5 = () => {
  message5.value++
  debouncedChg(message5.value, 'message5')
}
const changeRef6 = () => {
  message6.value++
  debouncedChg(message6.value, 'message6')
}
const logChangeValues = (val: number, refName: string) => {
  console.log(`防抖后打印，${refName}:`, val);
}
const debouncedChg = debounce(logChangeValues, 500);
// 防抖案例3
const message7 = ref<number>(0)
const message8 = ref<number>(0)
const changeRef7 = () => {
  message7.value++
}
const changeRef8 = () => {
  message8.value++
}
watchEffect((oninvalidate) => {
  const current7 = message7.value;
  const current8 = message8.value;
  // 监听 message 变化，每次变化时启动一个定时器
  const timer = setTimeout(() => {
    console.log('延时后执行，message7:', current7, '，message8:', current8);
    // console.log('延时后执行，message7:', message7.value, '，message8:', message8.value);
  }, 3000);
  oninvalidate(() => {
    clearTimeout(timer)
  })
})

// watchEffect 停止跟踪
const stop =  watchEffect(() => {
    console.log('message3', message3.value, '，message5:', message5.value, '，message7:', message7.value);
},{
    flush:"post",
    onTrigger () {
      console.log('监听 message3、message5 和 message7');
    }
})
setTimeout(stop, 10000)
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
