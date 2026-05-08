<template>
  <div class="category-view">
    <div class="category-content">
      <div v-if="localSelectedItem" class="content-wrapper">
        <div class="content-header">
          <h2>{{ localSelectedItem.label }}</h2>
          <p class="component-path">组件路径: {{ localSelectedItem.component }}</p>
        </div>
        <div class="content-body">
          <template v-if="isMultiRootComponent(localSelectedItem?.name)">
            <component :is="currentComponent" :key="localSelectedItem.name" v-bind="getComponentProps(localSelectedItem?.name)" />
          </template>
          <template v-else>
            <Transition name="fade" mode="out-in">
              <component :is="currentComponent" :key="localSelectedItem.name" v-bind="getComponentProps(localSelectedItem?.name)" />
            </Transition>
          </template>
        </div>
      </div>

      <div v-else class="item-list">
        <div
          v-for="item in currentCategory?.items"
          :key="item.name"
          :class="{ active: isItemSelected(item) }"
          @click="handleItemClick(item)"
          class="item-card"
        >
          <div class="item-icon">📄</div>
          <div class="item-info">
            <h3>{{ item.label }}</h3>
            <p>{{ getComponentPath(item.component) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, onMounted, watch, inject, provide, type Ref } from 'vue'
import { navigationCategories, type NavItem } from '@/constants/navigation'

const props = defineProps<{
  categoryName: string
}>()

const emit = defineEmits<{
  (e: 'select', item: NavItem): void
}>()

const userName = ref('LYH')
const themeColor = ref('#42b983')
const isDark = ref(false)

provide('userName', userName)
provide('themeColor', themeColor)
provide('isDark', isDark)
provide('updateUserName', (name: string) => { userName.value = name })
provide('resetSettings', () => {
  userName.value = 'LYH'
  themeColor.value = '#42b983'
  isDark.value = false
})

const currentCategory = computed(() => {
  return navigationCategories.find(cat => cat.name === props.categoryName)
})

// 使用局部状态，避免类型推断问题
const localSelectedItem = ref<NavItem | null>(null)
const currentComponent = ref<object | null>(null)

// 接收来自 App.vue 的选中项
const externalSelectedItem = inject<Ref<NavItem | null>>('selectedItem', ref(null))

const getComponentPath = (component: string) => {
  if (component.startsWith('../')) {
    return `src/${component.slice(3)}`
  } else {
    return `src/views/note/${component}`
  }
}

const multiRootComponents = ['theWelcome', 'defaultApp']

const isMultiRootComponent = (name?: string) => {
  return name && multiRootComponents.includes(name)
}

const getComponentProps = (name?: string) => {
  if (name === 'helloWorld') {
    return { msg: 'Welcome to Vue 3' }
  }
  return {}
}

const isItemSelected = (item: NavItem) => {
  return localSelectedItem.value?.name === item.name
}

const loadComponent = async (item: NavItem) => {
  if (localSelectedItem.value?.name === item.name) {
    return
  }

  currentComponent.value = null
  localSelectedItem.value = null

  await new Promise(resolve => requestAnimationFrame(resolve))

  try {
    let componentPath: string
    if (item.component.startsWith('../')) {
      componentPath = item.component
    } else {
      componentPath = `./note/${item.component}`
    }
    const module = await import(/* @vite-ignore */ componentPath)

    if (module.default) {
      currentComponent.value = markRaw(module.default)
      localSelectedItem.value = item
    } else {
      throw new Error('组件导出为空')
    }
  } catch (error) {
    console.error('Failed to load component:', item.component, error)
    currentComponent.value = null
    localSelectedItem.value = null
    alert(`无法加载组件: ${item.component}\n\n错误: ${(error as Error).message}`)
  }
}

const handleItemClick = (item: NavItem) => {
  loadComponent(item)
  emit('select', item)
}

// 监听路由参数变化，确保组件正确加载
watch(() => props.categoryName, (newCategoryName) => {
  currentComponent.value = null
  localSelectedItem.value = null

  // 等待组件更新后再加载
  setTimeout(() => {
    const category = navigationCategories.find(cat => cat.name === newCategoryName)
    if (category && category.items.length) {
      // 检查是否有外部选中项匹配当前分类
      if (externalSelectedItem.value) {
        const matchedItem = category.items.find(i => i.name === externalSelectedItem.value!.name)
        if (matchedItem) {
          loadComponent(matchedItem)
          return
        }
      }
      // 默认加载第一个
      loadComponent(category.items[0])
    }
  }, 0)
}, { immediate: true })

// 监听外部选中项变化（来自侧边栏）
watch(externalSelectedItem, (newItem) => {
  if (newItem) {
    const isCurrentCategoryItem = currentCategory.value?.items.some(i => i.name === newItem.name)
    if (isCurrentCategoryItem) {
      loadComponent(newItem)
    }
  }
})

// 初始化时加载第一个项目
onMounted(() => {
  const category = navigationCategories.find(cat => cat.name === props.categoryName)
  if (category && category.items.length) {
    loadComponent(category.items[0])
  }
})
</script>

<style scoped>
.category-view {
  min-height: 100vh;
  padding: 20px;
}

.category-content {
  max-width: 1200px;
  margin: 0 auto;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.item-card {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 4px solid transparent;
}

.item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  border-left-color: #3498db;
}

.item-card.active {
  border-left-color: #3498db;
  background: #f8fafc;
}

.item-icon {
  font-size: 24px;
  margin-right: 15px;
}

.item-info h3 {
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #2c3e50;
}

.item-info p {
  margin: 0;
  font-size: 12px;
  color: #95a5a6;
}

.content-wrapper {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-header {
  padding: 20px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
}

.content-header h2 {
  margin: 0 0 5px 0;
  font-size: 20px;
  color: #2c3e50;
}

.component-path {
  margin: 0;
  font-size: 12px;
  color: #95a5a6;
  font-family: monospace;
}

.content-body {
  padding: 20px;
  min-height: calc(100vh - 200px);
}

.content-body > * {
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
