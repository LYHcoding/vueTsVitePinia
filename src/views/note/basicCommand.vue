<template>
  <div >
    <!-- Vue3的三种语法风格—— A B C -->
    <div class="vue3Format">
      <a @click="Method">{{ name }}</a>
    </div>
    <div class="grammar">
      {{ a }}
      {{ a + 1 }}
      {{ a ? 'true' : 'false' }}
      {{ b }}
      {{ b.map(v=>({num:v})) }}
    </div>
    <div class="command">
      <div v-text="aText"></div>
      <div v-html="aHtml"></div>
      <!-- v-if 和 v-show 在性能等方面有区别 -->
      <div v-if="aIf">v-if:true</div> <!-- v-if判定为false时会注释掉div内容 -->
      <div v-else>v-if:false</div>
      <div v-show="aIf">v-show:true</div> <!-- v-show判定为false时会改变style内容—display为none -->
      <div v-show="!aIf">v-show:false</div>
      <div v-if="aElseIf == 'a'">A</div>
      <div v-else-if="aElseIf == 'b'">B</div>
      <div v-else>C</div>
      <input type="text" :value="n">
      <button v-on:click="clickBut">'+'加</button>
      <button @click="clickBut">点击</button>
      <!-- 动态事件event + 修饰符示例 -->
      <div @click="parent">
        <button @[event].stop="clickBut">动态事件</button>
      </div>
      <div v-bind:id="id">v-bind:id</div>
      <div :id="id" :style="bindStyle">:id</div>
      <div :id="id" class="styleCr">:style</div>
      <div :id="id" :class="['styleCr','styleBr']">:style</div>
      <!-- 标签最多支持一个静态class和一个动态class -->
      <div :id="id" class="styleBk" :class="[aIf ? 'styleCr' : 'styleBr']">:style</div>
      <input type="text" v-model="vModelText">
      <div>{{ vModelText }}</div>
      <div v-once>{{ vModelText }}</div>
      <div v-for="(item,index) in vForList" :key="index">{{ index }}--{{ item }}
        <div v-if="Array.isArray(item)">
          <div v-for="(i) in item" :key="i">&nbsp;&nbsp;{{ index }}--{{ i }}</div>
        </div>
      </div>
      <div :class="flag">{{flag}}</div>
    </div>
    <div class="virtualDom">
      <div class="h">
        <a @click="activeText">Vue3 中 div 对应 dom 的属性</a>
        <div v-show="textActivated">
          {{ divStr }}
        </div>
      </div>
      <!-- 无key的diff算法有3步：D:\Project\github\sourceCode\core\packages\runtime-core\src\renderer.ts——1712 -->
      <!-- <div v-for="item in diffList">{{ item }}</div> -->
      <!-- 有key的diff算法有5步：D:\Project\github\sourceCode\core\packages\runtime-core\src\renderer.ts——1772 -->
      <div v-for="item in diffList" :key="item">{{ item }}</div>
    </div>
  </div>
</template>

<!-- <script lang="ts">
// // A 支持Vue2的option API
// export default {
//   data () {
//     return {
//       name: "A"
//     }
//   },
//   methods: {
//     Method () {
//       console.log("点击vue2ExportMethodA方法")
//     }
//   }
// }

// B setup的函数模式
export default {
  setup () {
    const name = "B"
    function Method () {
      console.log("点击vue3SetupMethodB方法")
    }
    return {
      name,
      Method
    }
  }
}
</script> -->

<script setup lang="ts">
import { ref } from 'vue'

// C setup的语法糖模式
const name:string = "C"
function Method () {
  console.log("点击vue3Setup语法糖MethodC方法")
}

// Vue3的插值/运算语法
const a = 1
const b = [1,2,3,4,5] // const b:number[] = [1,2,3,4,5]

// Vue3的指令
const aText = "I'm LYH. welcome!"
const aHtml = "<section style='color:red'>I'm LYH. welcome!<secion>"  // v-html支持标签解析但不支持组件
const aIf = false
const aElseIf = (aIf ? 'a' : 'b')
const n = ref(0)
const event = 'click'
function parent () {
  console.log('parent')
}
function clickBut () {
  n.value++
  // console.log(n)
}
const id = 'lyh'
const bindStyle = {
  color: 'red',
  border: '1px solid #ccc'
}
const vModelText = ref('LYH--VUE')
const vForList = ['A','B','C',['D','E','F']]

type Cls = {
  other: boolean,
  h: boolean
}
const flag: Cls = {
  other: true,
  h: false
}

// Vue3的虚拟DOM
const divProperty = document.createElement('div')
let divStr = ''
for (const key in divProperty) {
  divStr += key + ', '
}
const textActivated = ref(false)
function activeText () {
  textActivated.value = !textActivated.value
}
const diffList = ['A','B','C','E']
diffList.splice(3,0,'DDD')

</script>

<style scoped>
/*  */
.styleCr {
  color: blueviolet;
}
.styleBr {
  border: 1px solid #ccc;
}
.styleBk {
  background-color: yellowgreen;
}

.other {
  color: blue;
}
.h {
  border: 1px solid #ccc;
  padding: 5px;
}
</style>
