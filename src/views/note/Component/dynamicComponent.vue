<template>
  <!-- 动态组件 -->
  <div class="dynamicComponent">
    <a class="titleText">dynamicComponent:</a><br />

    <!-- 动态组件 Tab 切换 -->
    <div class="border">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          :class="['tab-btn', { active: currentTab === tab.comName }]"
          @click="currentTab = tab.comName"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="tab-content-wrapper">
        <component :is="currentTab"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, markRaw, type Component } from 'vue'
import TabA from '@/components/TabA.vue'
import TabB from '@/components/TabB.vue'
import TabC from '@/components/TabC.vue'

// 动态组件配置 - 使用 markRaw 避免 Vue 对组件进行不必要的 proxy 代理
type TabItem = {
  name: string
  comName: Component
}
const tabs = ref<TabItem[]>([
  { name: 'A组件', comName: markRaw(TabA) },
  { name: 'B组件', comName: markRaw(TabB) },
  { name: 'C组件', comName: markRaw(TabC) }
])
const currentTab = ref(tabs.value[0].comName)
</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
  margin: 5px;
}
.titleText {
  color: gray;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.tab-btn {
  padding: 8px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}
.tab-btn:hover {
  background-color: #f5f5f5;
}
.tab-btn.active {
  background-color: #42b983;
  border-color: #42b983;
  color: #fff;
}
.tab-content-wrapper {
  min-height: 200px;
}
</style>
