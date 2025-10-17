<template>
  <!-- 有问题：
   1.resetDate函数无法使得数据重置，调用obj的变量仍旧为之前的状态，为什么？
   2.界面数据始终不变  -->
  <div class="mapRelated">
    <div class="map border">
      <a class="titleText">map 集合:</a><br />
      <div class="non-mapSet split">
        <div>
          <div>非响应式 map:{{ map }}</div>
          数据条目：<br />
          <div v-for="([key, value], idx) in map" :key="idx">
            键：{{ key }} → 值：{{ value }}
          </div>
          <div v-if="map.size === 0">暂无数据</div>
        </div>
      </div>
      <hr />
      <div class="ref-mapSet split">
        <div>
          <div>响应式 map2:{{ map2 }}</div>
          数据条目：<br />
          <div v-for="([key, value], idx) in map2" :key="idx">
            键：{{ key }} → 值：{{ value }}
          </div>
          <div v-if="map2.size === 0">暂无数据</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="weakMap border">
      <a class="titleText">weakMap 集合（弱引用）:</a><br />
      <div class="weakMapSet split">
        <div>
          <div>非响应式 weakMap:{{ weakMap }}</div>
          数据状态：<br />
          <div>是否存在数据：{{ weakMap.has(obj) ? '是' : '否' }}</div>
          <div>通过 get 获取值：{{ weakMap.get(obj) || 'undefined' }}</div>
        </div>
      </div>
      <hr />
      <div class="weakMapSet split">
        <div>
          <div>响应式 weakMap2:{{ weakMap2 }}</div>
          数据状态：<br />
          <div>是否存在数据：{{ weakMap2.has(obj) ? '是' : '否' }}</div>
          <div>通过 get 获取值：{{ weakMap2.get(obj) || 'undefined' }}</div>
        </div>
      </div>
    </div>
    <hr />
    <div class="button split">
      <div><button @click="clearSet">清空非集</button></div>
      <div><button @click="clearSet2">清空响集</button></div>
      <div><button @click="delayVerify">延时验非</button></div>
      <div><button @click="delayVerify2">延时验响</button></div>
      <div><button @click="updateDate">更新数据</button></div>
      <div><button @click="resetDate">重置数据</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const map = new Map()
const weakMap = new WeakMap()
let obj: { name: string } | null = { name: 'lyh' }
// 向集合中添加键值对（键为obj对象，值为字符串）
map.set(obj, 'mapDefaultValue')
weakMap.set(obj, 'weakMapDefaultValue')
console.log("map:", map)
console.log("weakMap:", weakMap)

// 新建对比的响应式对象
const map2 = ref(new Map())
const weakMap2 = ref(new WeakMap())
map2.value.set(obj, 'map2RespondValue')
weakMap2.value.set(obj, 'weakMap2RespondValue')
console.log("map2:", map2.value)
console.log("weakMap2:", weakMap2.value)

const printLog = () => {
  console.log("非响应式 map:", map.get(obj),"weakMap:",  obj ? weakMap.get(obj) : undefined)
  console.log("响应式 map2:", map2.value.get(obj),"weakMap2:",  obj ? weakMap2.value.get(obj) : undefined)
}
printLog()

const clearSet = () => {
  obj = null
  console.log("map:", map, map.get(obj))
  // 当obj对象被垃圾回收后，weakMap集合中对应的键值对也会被自动删除
  // 日志中WeakMap显示有条目，这只是控制台的临时预览效果，并非实际仍存在原键值对；
  // JavaScript 的垃圾回收是自动且异步的，console 打印时可能还未完成垃圾回收，所以在日志中看不到立即删除的效果
  console.log("weakMap:", weakMap,  obj ? weakMap.get(obj) : undefined)
}
const clearSet2 = () => {
  obj = null
  console.log("map2:", map2.value, map2.value.get(obj))
  // 当obj对象被垃圾回收后，weakMap集合中对应的键值对也会被自动删除
  // 日志中WeakMap显示有条目，这只是控制台的临时预览效果，并非实际仍存在原键值对；
  // JavaScript 的垃圾回收是自动且异步的，console 打印时可能还未完成垃圾回收，所以在日志中看不到立即删除的效果
  console.log("weakMap2:", weakMap2.value,  obj ? weakMap2.value.get(obj) : undefined)
}

const delayVerify = () => {
  setTimeout(() => {
    console.log("map:", map.size)
    // console.log("weakMap是否存在原键:", weakMap.has({ name: 'lyh' })) // 结果恒为 false
    console.log("weakMap是否存在原键:",  obj ? weakMap.has(obj) : false) // false
    console.log("weakMap大小（无法直接获取，需间接判断）:", obj ? !weakMap.get(obj) : true)
  }, 1000)
}
const delayVerify2 = () => {
  setTimeout(() => {
    console.log("map2:", map2.value.size)
    // console.log("weakMap2是否存在原键:", weakMap2.has({ name: 'lyh' })) // 结果恒为 false
    console.log("weakMap2是否存在原键:", obj ? weakMap2.value.has(obj) : false) // false
    console.log("weakMap2大小（无法直接获取，需间接判断）:", obj ? !weakMap2.value.get(obj) : true)
  }, 1000)
}

// 响应式刷新标记（控制组件重渲染）
const refreshFlag = ref(0)
const updateDate = () => {
  // 修改响应式标记，强制组件重新渲染
  refreshFlag.value++
  console.log("数据已更新，界面将重新渲染")
  printLog()
}
const resetDate = () => {
  obj = { name: 'lyh' }
  refreshFlag.value = 0
  console.log("数据已重置，界面将重新渲染")
  printLog()
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
