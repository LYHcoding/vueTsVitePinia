<template>
  <div id="app">
    <!-- 左侧导航栏 -->
    <SidebarNav @select="handleSelect" @home="handleHome" />

    <!-- 右侧内容区域 -->
    <main class="main-content">
      <!-- 路由视图区域 -->
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import { type NavItem } from '@/constants/navigation'

const router = useRouter()
const selectedItem = ref<NavItem | null>(null)

const handleSelect = (item: NavItem) => {
  selectedItem.value = item
}

const handleHome = () => {
  selectedItem.value = null
  router.push('/')
}

provide('selectedItem', selectedItem)
</script>

<style scoped>
.main-content {
  margin-left: 280px;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
  width: calc(100% - 280px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
    padding: 10px;
    width: 100%;
  }
}
</style>
