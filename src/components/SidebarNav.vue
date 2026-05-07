<template>
  <aside class="sidebar">
    <div class="sidebar-header" @click="handleHeaderClick">
      <h2>Vue 3 学习导航</h2>
    </div>

    <nav class="sidebar-nav">
      <div v-for="category in navItems" :key="category.name" class="nav-category">
        <div
          class="category-title"
          :class="{ active: isCategoryActive(category.name) }"
          @click="handleCategoryClick(category)"
        >
          <span class="category-icon">{{ category.expanded ? '▼' : '▶' }}</span>
          <span>{{ category.label }}</span>
        </div>

        <ul v-show="category.expanded" class="category-items">
          <li
            v-for="item in category.items"
            :key="item.name"
            :class="{ active: selectedItem === item.name }"
            @click.stop="selectItem(item)"
          >
            <span class="item-icon">📄</span>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { navigationCategories, type NavItem, type NavCategory, findCategoryByItem } from '@/constants/navigation'

const emit = defineEmits<{
  (e: 'select', item: NavItem): void
  (e: 'home'): void
}>()

const router = useRouter()
const route = useRoute()
const selectedItem = ref('')
const activeCategory = ref('')

const navItems = ref<NavCategory[]>(
  navigationCategories.map(cat => ({ ...cat, expanded: cat.expanded }))
)

const isCategoryActive = (categoryName: string) => {
  return activeCategory.value === categoryName
}

const handleCategoryClick = (category: NavCategory) => {
  category.expanded = !category.expanded
  if (category.expanded) {
    activeCategory.value = category.name
    router.push(`/category/${category.name}`)
  }
}

const selectItem = async (item: NavItem) => {
  const categoryName = findCategoryByItem(item.name)
  if (categoryName) {
    if (route.name !== 'category' || route.params.categoryName !== categoryName) {
      const category = navItems.value.find(c => c.name === categoryName)
      if (category) {
        category.expanded = true
      }
      activeCategory.value = categoryName
      await router.push(`/category/${categoryName}`)
    }
    selectedItem.value = item.name
    emit('select', item)
  }
}

const handleHeaderClick = () => {
  selectedItem.value = ''
  activeCategory.value = ''
  emit('home')
  router.push('/')
}

watch(() => route.params, (params) => {
  if (params.categoryName) {
    activeCategory.value = params.categoryName as string
    const category = navItems.value.find(c => c.name === params.categoryName)
    if (category) {
      category.expanded = true
    }
  }
}, { immediate: true })
</script>

<style scoped>
.sidebar {
  width: 280px;
  height: 100vh;
  background-color: #2c3e50;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar-header {
  padding: 20px;
  background-color: #34495e;
  border-bottom: 1px solid #1a252f;
  cursor: pointer;
}

.sidebar-header:hover {
  background-color: #3d5266;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ecf0f1;
}

.sidebar-nav {
  flex: 1;
  padding: 10px 0;
}

.nav-category {
  margin-bottom: 5px;
}

.category-title {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #bdc3c7;
  transition: background-color 0.2s;
}

.category-title:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.category-title.active {
  background-color: #3498db;
  color: #fff;
}

.category-icon {
  margin-right: 8px;
  font-size: 10px;
}

.category-items {
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: #1a252f;
}

.category-items li {
  display: flex;
  align-items: center;
  padding: 10px 20px 10px 45px;
  cursor: pointer;
  font-size: 13px;
  color: #95a5a6;
  transition: all 0.2s;
}

.category-items li:hover {
  background-color: #3498db;
  color: #fff;
}

.category-items li.active {
  background-color: #3498db;
  color: #fff;
  border-left: 3px solid #f1c40f;
}

.item-icon {
  margin-right: 8px;
  font-size: 12px;
}
</style>
