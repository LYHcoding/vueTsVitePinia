<template>
  <!-- 父子组件传参 -->
  <div class="Parent-Child-Component">
    <!-- 子组件接受父组件传参 -->
    <div class="layout demo0 border">
      <Menu></Menu>
      <div class="layout-right">
        <!-- <Header></Header>
        <Content></Content> -->
      </div>
    </div>
    <hr />
    <div class="layout demo1 border">
      <Menu title="示例一 无非字符串类型传参"></Menu>
      <div class="layout-right">
      </div>
    </div>
    <hr />
    <div class="layout demo2 border">
      <Menu v-bind:data="data" title="示例二 有非字符串类型传参"></Menu>
      <div class="layout-right">
      </div>
    </div>
    <hr />
    <!-- 子组件给父组件传参:子组件触发事件，父组件接收，通过defineEmits派发一个事件 -->
    <div class="layout event1 border">
      <Header @on-click="getList"></Header>
      <div>{{ data }}</div>
    </div>
    <hr />
    <!-- 子组件暴露给父组件内部属性 -->
    <div class="layout event2 border">
      <Content ref="refContent"></Content>
      <div>子组件暴露给父组件内部属性: {{ refContent?.listExpose || '无' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Menu from './Menu/index.vue'
// import Header from './Header/index.vue'
// import Content from './Content/index.vue'
import Menu from './menuIndex.vue'
import Header from './headerIndex.vue'
import Content from './contentIndex.vue'
import { reactive, ref } from 'vue';

const data = reactive<number[]>([1, 2, 3])

const getList = (list: number[]) => {
    console.log(list,'父组件接受子组件');
    data.length = 0  // 添加数据前选择性清空data
    data.push(...list)
}

//注意typeof里面放的是组件名字(Content)不是ref的名字 ref的名字对应开头的变量名(refContent)
const refContent = ref<InstanceType<typeof Content> & { listExpose: number[] }>()
// console.log(refContent.value, Content.value); // undefined undefined

</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
}
</style>
