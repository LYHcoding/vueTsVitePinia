<template>
  <div class="wraps">
    <div
      :style="{
        height: item.height + 'px',
        background: item.background,
        top: item.top + 'px',
        left: item.left + 'px'
      }"
      v-for="item in waterList"
      class="items"
      :key="item.background"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
// 定义列表项的类型接口（明确每个属性的类型）
interface WaterItem {
  height: number // 高度（必选）
  background: string // 背景色（必选，用于key）
  top?: number // 顶部定位（动态添加，可选）
  left?: number // 左侧定位（动态添加，可选）
}
// 定义 props 类型（使用上面的接口，避免 any）
const props = defineProps<{
  list: WaterItem[]
}>()
// 定义 waterList 类型（明确为 WaterItem 数组）
const waterList = reactive<WaterItem[]>([])
const init = () => {
  // 复制 props.list 为副本（避免直接修改 props）
  const listCopy = [...props.list] // 深拷贝（简单场景用扩展运算符，复杂场景用 structuredClone）
  const heightList: number[] = [] // 存储每列的累计高度（明确为 number[]，替代 any[]）
  const itemWidth = 130 // 每个item的宽度（提取为变量，增强可读性）
  const windowWidth = document.body.clientWidth
  const column = Math.floor(windowWidth / itemWidth) // 计算列数
  for (let i = 0; i < listCopy.length; i++) {
    if (i < column) {
      listCopy[i].top = 10
      listCopy[i].left = i * itemWidth
      heightList.push(listCopy[i].height + 10)
      waterList.push(listCopy[i])
    } else {
      let current = heightList[0]
      let index = 0
      heightList.forEach((h, inx) => {
        if (current > h) {
          current = h
          index = inx
        }
      })
      console.log(current, 'c')
      listCopy[i].top = current + 20
      console.log(listCopy[i].top, 'top', i)
      listCopy[i].left = index * itemWidth
      heightList[index] = heightList[index] + listCopy[i].height + 20
      waterList.push(listCopy[i])
    }
  }
  console.log(listCopy)
}

onMounted(() => {
  window.onresize = () => init()
  init()
})
</script>

<style scoped lang="less">
.wraps {
  position: relative;
  height: 100%;
  .items {
    position: absolute;
    width: 120px;
  }
}
</style>
