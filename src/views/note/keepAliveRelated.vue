<template>
  <div class="app">
    <h1>Keep-Alive 缓存组件示例</h1>

    <!-- 切换按钮 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        @click="currentTab = tab.name"
        :class="['tab-btn', { active: currentTab === tab.name }]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- 缓存配置 -->
    <div class="config-panel">
      <label>
        <input type="checkbox" v-model="useKeepAlive" />
        启用 keep-alive 缓存
      </label>
      <label>
        <input type="checkbox" v-model="includeOnly" :disabled="!useKeepAlive" />
        仅缓存指定组件 (include="TabHome,TabAbout")
      </label>
      <label>
        <input type="number" v-model.number="maxCache" min="1" max="10" :disabled="!useKeepAlive" />
        最大缓存数量 (max)
      </label>
    </div>

    <!-- 动态组件区域 -->
    <div class="content">
      <transition name="fade" mode="out-in">
        <keep-alive
          v-if="useKeepAlive"
          :include="includeOnly ? 'TabHome,TabAbout' : ''"
          :max="maxCache"
        >
          <component :is="currentComponent" :key="currentTab" />
        </keep-alive>
        <component v-else :is="currentComponent" :key="currentTab" />
      </transition>
    </div>

    <!-- 缓存信息 -->
    <div class="cache-info">
      <h3>缓存状态</h3>
      <p>当前组件: {{ currentTab }}</p>
      <p>缓存状态: {{ useKeepAlive ? '已启用' : '已禁用' }}</p>
      <p>TabHome 创建次数: {{ homeCreateCount }}</p>
      <p>TabAbout 创建次数: {{ aboutCreateCount }}</p>
      <p>TabSettings 创建次数: {{ settingsCreateCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TabHome from '@/components/TabHome.vue'
import TabAbout from '@/components/TabAbout.vue'
import TabSettings from '@/components/TabSettings.vue'

const tabs = [
  { name: 'home', label: '首页' },
  { name: 'about', label: '关于' },
  { name: 'settings', label: '设置' }
]

const currentTab = ref('home')
const useKeepAlive = ref(true)
const includeOnly = ref(false)
const maxCache = ref(3)

// 创建次数追踪（用于演示缓存效果）
const homeCreateCount = ref(0)
const aboutCreateCount = ref(0)
const settingsCreateCount = ref(0)

const currentComponent = computed(() => {
  switch (currentTab.value) {
    case 'home':
      return TabHome
    case 'about':
      return TabAbout
    case 'settings':
      return TabSettings
    default:
      return TabHome
  }
})

// 暴露给子组件的方法
defineExpose({
  incrementCreateCount: (componentName: string) => {
    switch (componentName) {
      case 'TabHome':
        homeCreateCount.value++
        break
      case 'TabAbout':
        aboutCreateCount.value++
        break
      case 'TabSettings':
        settingsCreateCount.value++
        break
    }
  }
})
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background-color: #d0d0d0;
}

.tab-btn.active {
  background-color: #42b983;
  color: #fff;
}

.config-panel {
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.config-panel label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.config-panel input[type="number"] {
  width: 60px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.content {
  min-height: 300px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.cache-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.cache-info h3 {
  margin-top: 0;
  color: #333;
}

.cache-info p {
  margin: 5px 0;
  color: #666;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
