<template>
  <div class="app">
    <a class="titleText">异步组件 & Suspense 示例</a><br />

    <!-- 示例1：基本异步组件 -->
    <div class="border">
      <h4>1. 基本异步组件</h4>
      <button @click="showAsyncDialog = !showAsyncDialog" class="toggle-btn">
        {{ showAsyncDialog ? '隐藏' : '加载异步组件' }}
      </button>
      <div v-if="showAsyncDialog">
        <Suspense>
          <template #default>
            <AsyncDialog>
              <template #header>异步组件标题</template>
              <template #default>这是异步加载的组件内容</template>
            </AsyncDialog>
          </template>
          <template #fallback>
            <LoadingComponent />
          </template>
        </Suspense>
      </div>
    </div>

    <!-- 示例2：带配置的异步组件 -->
    <div class="border">
      <h4>2. 带配置的异步组件（加载/错误状态）</h4>
      <button @click="showConfigDialog = !showConfigDialog" class="toggle-btn">
        {{ showConfigDialog ? '隐藏' : '加载配置异步组件' }}
      </button>
      <div v-if="showConfigDialog">
        <ConfigAsyncDialog @retry="handleRetry" />
      </div>
    </div>

    <!-- 示例3：顶层 await -->
    <div class="border">
      <h4>3. 顶层 await 数据加载</h4>
      <Suspense>
        <template #default>
          <DataFetcher />
        </template>
        <template #fallback>
          <LoadingComponent />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

const showAsyncDialog = ref(false)
const showConfigDialog = ref(false)

// 基本异步组件
const AsyncDialog = defineAsyncComponent(() => import('@/components/Dialog.vue'))

// 带完整配置的异步组件
const ConfigAsyncDialog = defineAsyncComponent({
  loader: () => import('@/components/Dialog.vue'),
  loadingComponent: LoadingComponent,
  delay: 200,
  errorComponent: ErrorComponent,
  timeout: 3000
})

const handleRetry = () => {
  showConfigDialog.value = false
  setTimeout(() => {
    showConfigDialog.value = true
  }, 100)
}

// 顶层 await 示例组件
import { defineComponent, h } from 'vue'

interface FetchResult {
  title: string
  items: string[]
}

const DataFetcher = defineComponent({
  async setup() {
    // 模拟 API 请求
    const fetchData = async (): Promise<FetchResult> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: '异步加载的数据',
            items: ['数据项1', '数据项2', '数据项3']
          })
        }, 1500)
      })
    }

    const data: FetchResult = await fetchData()

    return () => h('div', { class: 'data-content' }, [
      h('h5', data.title),
      h('ul', data.items.map((item: string, index: number) => h('li', { key: index }, item)))
    ])
  }
})
</script>

<style scoped>
.app {
  padding: 20px;
}

.border {
  border: 1px solid #cccccc;
  padding: 15px;
  margin: 15px 0;
}

.titleText {
  color: gray;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.toggle-btn {
  padding: 8px 16px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

.toggle-btn:hover {
  background-color: #1c86ee;
}

.data-content {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.data-content h5 {
  margin-top: 0;
  color: #42b983;
}

.data-content ul {
  padding-left: 20px;
}

.data-content li {
  padding: 4px 0;
}
</style>
