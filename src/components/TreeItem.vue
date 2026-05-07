<template>
  <div class="tree-item">
    <div
      v-for="(item, index) in data"
      :key="index"
      class="tree-node"
    >
      <div class="tree-label" @click="handleClick(item)">
        <span v-if="item?.children?.length" class="expand-icon">
          {{ expanded ? '▼' : '▶' }}
        </span>
        <span v-else class="expand-icon placeholder">•</span>
        {{ item.name }}
      </div>
      <div v-if="item?.children?.length && expanded" class="tree-children">
        <TreeItem :data="item.children" @on-click="handleChildClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TreeList = {
  name: string
  icon?: string
  children?: TreeList[] | []
}

type Props<T> = {
  data?: T[] | []
}

defineProps<Props<TreeList>>()

const emit = defineEmits<{
  (e: 'on-click', item: TreeList): void
}>()

const expanded = ref(true)

const handleClick = (item: TreeList) => {
  if (item?.children?.length) {
    expanded.value = !expanded.value
  }
  emit('on-click', item)
}

const handleChildClick = (item: TreeList) => {
  emit('on-click', item)
}
</script>

<script lang="ts">
export default {
  name: 'TreeItem'
}
</script>

<style scoped>
.tree-item {
  padding-left: 8px;
}

.tree-node {
  cursor: pointer;
}

.tree-label {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.tree-label:hover {
  background-color: #f0f0f0;
}

.expand-icon {
  font-size: 10px;
  width: 16px;
  text-align: center;
}

.expand-icon.placeholder {
  color: #999;
}

.tree-children {
  padding-left: 16px;
  margin-top: 2px;
}
</style>
