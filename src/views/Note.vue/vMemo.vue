<template>
  <!-- 需要继续深入学习 -->
  <!-- v-memo用法,用于缓存具体元素节点的vnode,在节点更新时节约重新创建vnode的时间,节约patch比较的时间,他的核心就是复用vnode。小幅度手动提升一部分性能. -->
  <div>
    <!-- <div v-for="(item,index) in arr" :key="item"> -->
    <div v-for="(item,index) in arrlist" :key="item" v-memo="[index == 2]">
      <a @click="addOne(index)">{{ item }}</a>
    </div>

    <!-- <div @click="select(item.id)" :key="item.id" v-for="(item) in arr"> -->
    <div @click="select(item.id)" :key="item.id" v-for="(item) in arr"  v-memo="[item.id, active]">
      {{ item.id }} - selected: {{ item.id == active }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const arrlist = ref([1,2,3])
const addOne = (index: number) => {
  console.time('addOne')
  arrlist.value[index] ++
  console.timeEnd('addOne')
}

interface ListItem {
  id: number;
  name: string;
}
const arr = reactive<ListItem[]>([])
for (let i = 0; i < 10000; i++) {
  arr.push({
    id: i+1,
    name: "test"
  })
}
const active = ref()
const select = async (index: number) => {
  active.value = index
  console.time('select-exec')
  await Promise.resolve()
  console.timeEnd('select-exec')
}
</script>

<style scoped>
</style>
