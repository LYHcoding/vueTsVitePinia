<template>
  <div class="reactiveRelated">
    <div class="reactiveObject border">
      <a class="titleText">reactive 基础用法:</a>
      <div class="nameText">{{ reactivePerson }}</div>
      <div class="nameText">{{ reactivePerson.name }}</div>
      <div class="nameText">{{ reactivePerson.age }}</div>
      <button @click="changeContent">修改</button>
    </div>
    <div class="formObject border">
      <a class="titleText">reactive 表单用法:</a><br />
      <p>表单属性</p>
      <div class="nameText">{{ reactiveForm }}</div> <hr />
      <p>value 绑定表单值——单向（只能读取，不能修改）</p>
      <input type="text" :value="reactiveForm.name" />&nbsp;
      <input type="number" :value="reactiveForm.age" /> <hr />
      <p>v-model 实现双向绑定</p>
      <input type="text" v-model="reactiveForm.name" />&nbsp;
      <input type="number" v-model="reactiveForm.age" />
      <br /><button @click="changeFormContent">修改</button> <hr />
      <p>表单提交事件，注意用.prevent防止表单默认刷新事件</p>
      <form>
        <input type="text" v-model="reactiveForm.name" />&nbsp;
        <input type="number" v-model="reactiveForm.age" />
        <br /><button @click.prevent="changeFormContent">修改</button>
      </form>
    </div>
    <div class="listObject border">
      <a class="titleText">reactive 数组用法:</a><br />
      <a>list的单纯push添加</a>&nbsp;<button @click="add1">添加1</button>
      <ul>
        <li v-for="item in list1" v-bind:key="item">{{ item }}</li>
      </ul><hr />
      <a>list的函数添加(整体)</a>&nbsp;<button @click="add2">添加2</button>
      <ul>
        <li v-for="item in list2" v-bind:key="item">{{ item }}</li>
      </ul><hr />
      <a>list的函数添加(属性)</a>&nbsp;<button @click="add3">添加3</button>
      <ul>
        <li v-for="item in list3" v-bind:key="item">{{ item }}</li>
      </ul><hr />
      <a>list的对象属性添加</a>&nbsp;<button @click="add4">添加4</button>
      <ul>
        <li v-for="item in list4.arr" v-bind:key="item">{{ item }}</li>
      </ul><hr />
    </div>
    <div class="readonlyObject border">
      <a class="titleText">reactive 的 readonly:</a><br />
      <button @click="show">查看</button>
      <div class="nameText" v-show="showBtn">reactiveObject: {{ reactiveObject }}</div>
      <div class="nameText" v-show="showBtn">readOnlyObject: {{ readOnlyObject }}</div>
    </div>
    <div class="shallowReactiveObject border">
      <a class="titleText">shallowReactive 浅层响应式对象:</a><br />
      <div>{{ shallowReactiveObject }}</div>
      <button @click="changeSRO">修改1</button> <button @click="changeSRO2">修改2</button>
    </div>

    <div class="example border">
      <a class="titleText">教程示例:</a><br />
      <div>state:{{ state }}</div>
      <button @click="change1">test1</button>&nbsp;
      <button @click="change2">test2</button>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">
import { reactive, readonly, ref, shallowReactive } from 'vue'

// reactive 复杂数据类型的响应式对象,不可以绑定普通的数据类型
// reactive 基础用法，在取值和赋值时都不需要添加.value
// 响应式对象
// type P = {
//   name: string,
//   age: number
// }
// const reactivePerson = reactive<P>({
const reactivePerson = reactive({
   name:"lyh",
   age: 28
})
reactivePerson.name = "LYH" // 使用reactive 去修改值无须.value
const changeContent = () => {
  reactivePerson.age = 18
  console.log(reactivePerson)
}

// 响应式表单对象
const reactiveForm = reactive({
   name:"li yuanhao",
   age: 28
})
const changeFormContent = () => {
  // reactiveForm.name = "yuanhao li"
  // reactiveForm.age = 18
  console.log(reactiveForm)
}

// 响应式数组对象
const list1 = reactive<string[]>([])
const add1 = () => {
  list1.push("lyh")
}
let list2 = reactive<string[]>([])
const add2 = () => {
  setTimeout(() => {
    const res = ['lyh1','lyh2','lyh3']
    // reactive proxy 不能直接赋值，否则破坏对象的响应式
    list2 = res
    console.log(list2)
  }, 500)
}
// 解决方法：使用push方法添加解构的数组；添加一个把数组作为属性的对象
const list3 = reactive<string[]>([])
const add3 = () => {
  setTimeout(() => {
    const res = ['lyh1','lyh2','lyh3']
    list3.push(...res)
    console.log(list3)
  }, 500)
}
const list4 = reactive<{arr:string[]}>({arr:[]})
const add4 = () => {
  setTimeout(() => {
    const res = ['lyh1','lyh2','lyh3']
    list4.arr = res
    console.log(list4)
  }, 500)
}

// readonly 只读属性，不能修改
// reactiveObject 可以修改，而 readOnlyObject 不能修改
const reactiveObject =reactive({name:'LYH'})
const readOnlyObject = readonly(reactiveObject)
const showBtn = ref(false)
const show = () => {
  showBtn.value = true
  // readOnlyObject.name = 'error' // 只读报错
  reactiveObject.name = 'lyh 666'
  console.log(reactiveObject, readOnlyObject)
}

//shallowReactive 浅层响应式对象
const shallowReactiveObject = shallowReactive({
  fool:{
    bar:{
      num:1
    }
  }
})
// 浅层响应式对象只能修改最外层的属性，不能修改内层的属性
const changeSRO = () => {
  reactiveObject.name = 'change lyh'
  shallowReactiveObject.fool.bar.num = 2
  console.log(shallowReactiveObject)
}
const changeSRO2 = () => {
  shallowReactiveObject.fool = {bar:{num:3}}
  console.log(shallowReactiveObject)
}

// example
const obj = {
  a: 1,
  first: {
    b: 2,
    second: {
      c: 3
    }
  }
}
const state = shallowReactive(obj)
function change1() {
  state.a = 7
}
function change2() {
  state.first.b = 8
  state.first.second.c = 9
  console.log(state);
}

setTimeout(() => {
  console.log('500ms后')
}, 500)
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
