<template>
  <!-- AI 生成的 -->
  <!-- 根元素加 :key ，通过 refreshFlag 触发重渲染 -->
  <div class="mapRelated" :key="refreshFlag">
    <div class="map border">
      <a class="titleText">map 集合:</a><br />
      <div class="non-mapSet split">
        <div>
          <div>非响应式 map:{{ map }}</div>
          数据条目：<br />
          <div v-for="([key, value], idx) in map" :key="idx">
            键：{{ key.name }} → 值：{{ value }}
          </div>
          <div v-if="map.size === 0">暂无数据</div>
        </div>
      </div>
      <hr />
      <div class="ref-mapSet split">
        <div>
          <div>响应式 map2:{{ map2 }}</div> <!-- 响应式 map2 需读 .value -->
          数据条目：<br />
          <div v-for="([key, value], idx) in map2" :key="idx">
            键：{{ key.name }} → 值：{{ value }}
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
          <div>响应式 weakMap2:{{ weakMap2 }}</div> <!-- 响应式 weakMap2 需读 .value -->
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

// 1. 非响应式集合初始化
const map = new Map()
const weakMap = new WeakMap()
let obj = { name: 'lyh' }
map.set(obj, 'mapDefaultValue')
weakMap.set(obj, 'weakMapDefaultValue')

// 2. 响应式集合初始化（需用 ref 包裹，操作时读 .value）
const map2 = ref(new Map())
const weakMap2 = ref(new WeakMap())
map2.value.set(obj, 'map2RespondValue')
weakMap2.value.set(obj, 'weakMap2RespondValue')

// 打印日志（统一读取当前 obj 对应的值）
const printLog = () => {
  console.log("非响应式：", map.get(obj), weakMap.get(obj))
  console.log("响应式：", map2.value.get(obj), weakMap2.value.get(obj))
}
printLog()

// 清空非响应式集合（解除 obj 引用，但不清除集合数据）
const clearSet = () => {
  obj = null
  console.log("清空非响应式后：")
  console.log("map:", map, map.get(obj))
  console.log("weakMap:", weakMap, weakMap.get(obj))
}

// 清空响应式集合（解除 obj 引用 + 清空 map2 数据）
const clearSet2 = () => {
  obj = null
  map2.value.clear() // 响应式集合需主动清空
  console.log("清空响应式后：")
  console.log("map2:", map2.value, map2.value.get(obj))
  console.log("weakMap2:", weakMap2.value, weakMap2.value.get(obj))
}

// 延时验证非响应式集合
const delayVerify = () => {
  setTimeout(() => {
    console.log("延时验非：")
    console.log("map size:", map.size)
    console.log("weakMap 存在原键？", weakMap.has(obj))
  }, 1000)
}

// 延时验证响应式集合
const delayVerify2 = () => {
  setTimeout(() => {
    console.log("延时验响：")
    console.log("map2 size:", map2.value.size)
    console.log("weakMap2 存在原键？", weakMap2.value.has(obj))
  }, 1000)
}

// 响应式刷新标记（用自增确保每次值不同，触发重渲染）
const refreshFlag = ref(0)

// 更新数据（给所有集合添加新键值对）
const updateDate = () => {
  obj = { name: 'new-lyh-' + Date.now() } // 新 obj
  // 非响应式集合更新
  map.clear()
  map.set(obj, 'map-Updated-' + Math.random().toFixed(2))
  weakMap.set(obj, 'weakMap-Updated-' + Math.random().toFixed(2))
  // 响应式集合更新
  map2.value.clear()
  map2.value.set(obj, 'map2-Updated-' + Math.random().toFixed(2))
  weakMap2.value.set(obj, 'weakMap2-Updated-' + Math.random().toFixed(2))

  refreshFlag.value++ // 触发界面重渲染
  console.log("数据已更新：")
  printLog()
}

// 重置数据（恢复初始状态，重新添加数据）
const resetDate = () => {
  obj = { name: 'lyh' } // 重置为初始 obj（新对象）
  // 非响应式集合重置
  map.clear()
  map.set(obj, 'mapDefaultValue')
  weakMap.set(obj, 'weakMapDefaultValue')
  // 响应式集合重置
  map2.value.clear()
  map2.value.set(obj, 'map2RespondValue')
  weakMap2.value.set(obj, 'weakMap2RespondValue')

  refreshFlag.value++ // 触发界面重渲染（用自增，不用重置为 0）
  console.log("数据已重置：")
  printLog()
}
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
  margin-bottom: 10px;
}
.titleText {
  color: gray;
  font-weight: 500;
}
.split {
  display: flex;
  gap: 10px;
  margin: 5px 0;
}
.split div {
  flex: 1;
}
button {
  padding: 4px 8px;
  cursor: pointer;
}
</style>
