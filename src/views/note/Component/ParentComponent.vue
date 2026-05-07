<template>
  <div class="ParentComponent">
    <h3>递归组件示例</h3>
    <h4>相关文件：src\components\TreeItem.vue，src\views\note\Component\ParentComponent.vue，src\views\note\Component\componentRelated.vue</h4>
    <TreeItem :data="data" @on-click="handleItemClick" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import TreeItem from '@/components/TreeItem.vue'

// 递归树数据：在父组件配置数据结构、数组对象格式，传给子组件
type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}
const data = reactive<TreeList[]>([
  {
    name: 'no.1',
    children: [
      {
        name: 'no.1-1',
        children: [
          {
            name: 'no.1-1-1'
          }
        ]
      }
    ]
  },
  {
    name: 'no.2',
    children: [
      {
        name: 'no.2-1'
      }
    ]
  },
  {
    name: 'no.3'
  }
])
const handleItemClick = (item: TreeList) => {
  console.log('点击了:', item.name)
}
</script>

<style scoped>
.ParentComponent {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
h3 {
  margin-bottom: 16px;
  font-size: 16px;
  color: #333;
}
</style>
