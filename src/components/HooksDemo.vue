<template>
  <div class="hooks-demo">
    <!-- 1. useMousePosition 演示 -->
    <div class="section">
      <h3>1. useMousePosition - 鼠标位置追踪</h3>
      <div class="mouse-info">
        <p>鼠标 X: <strong>{{ mouseX }}</strong></p>
        <p>鼠标 Y: <strong>{{ mouseY }}</strong></p>
      </div>
      <div
        class="mouse-tracker"
        :style="{ left: mouseX + 'px', top: mouseY + 'px' }"
      ></div>
    </div>

    <!-- 2. useLocalStorage 演示 -->
    <div class="section">
      <h3>2. useLocalStorage - 本地存储</h3>
      <input
        v-model="userName.data"
        type="text"
        placeholder="输入用户名"
        class="storage-input"
      />
      <p>存储的值: <strong>{{ userName.data }}</strong></p>
      <button @click="userName.remove" class="clear-btn">清除存储</button>
    </div>

    <!-- 3. useDebounce 演示 -->
    <div class="section">
      <h3>3. useDebounce - 防抖</h3>
      <input
        v-model="searchInput"
        type="text"
        placeholder="输入搜索内容"
        class="debounce-input"
      />
      <p>原始值: <span class="original">{{ searchInput }}</span></p>
      <p>防抖值: <span class="debounced">{{ debouncedValue }}</span></p>
    </div>

    <!-- 4. useResize 演示 -->
    <div class="section resize-section" ref="resizeRef">
      <h3>4. useResize - 元素尺寸监听</h3>
      <p>宽度: <strong>{{ width }}px</strong></p>
      <p>高度: <strong>{{ height }}px</strong></p>
    </div>

    <!-- 5. useFetch 演示 -->
    <div class="section">
      <h3>5. useFetch - 数据请求</h3>
      <div v-if="fetchData.loading" class="loading">加载中...</div>
      <div v-else-if="fetchData.error" class="error">{{ fetchData.error }}</div>
      <div v-else class="fetch-result">
        <pre>{{ JSON.stringify(fetchData.data, null, 2) }}</pre>
      </div>
      <button @click="fetchData.refetch" class="refetch-btn">重新请求</button>
    </div>

    <!-- 6. useImageToBase64 演示 -->
    <div class="section">
      <h3>6. useImageToBase64 - 图片转 Base64</h3>
      <img
        id="demo-image"
        src="https://picsum.photos/200/150?random=1"
        alt="示例图片"
        class="demo-image"
      />
      <div v-if="imageBase64.loading" class="loading">转换中...</div>
      <div v-else-if="imageBase64.error" class="error">{{ imageBase64.error }}</div>
      <div v-else class="base64-result">
        <p>Base64 转换完成！</p>
        <img :src="imageBase64.baseUrl ?? undefined" alt="转换后的图片" class="result-image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useDebounce } from '@/hooks/useDebounce'
import { useResize } from '@/hooks/useResize'
import { useFetch } from '@/hooks/useFetch'
import { useImageToBase64 } from '@/hooks/useImageToBase64'

// 1. 鼠标位置
const { x: mouseX, y: mouseY } = useMousePosition()

// 2. 本地存储
const userName = useLocalStorage('userName', '张三')

// 3. 防抖
const searchInput = ref('')
const debouncedValue = computed(() => useDebounce(searchInput.value, 500))

// 4. 元素尺寸监听
const resizeRef = ref<HTMLElement | null>(null)
const width = ref(0)
const height = ref(0)

onMounted(() => {
  if (resizeRef.value) {
    useResize(resizeRef.value, (cr) => {
      width.value = cr.width
      height.value = cr.height
    })
  }
})

// 5. 数据请求
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}
const fetchData = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')

// 6. 图片转 Base64
const imageBase64 = useImageToBase64({ el: '#demo-image' })
</script>

<script lang="ts">
export default {
  name: 'HooksDemo'
}
</script>

<style scoped>
.hooks-demo {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
  position: relative;
}

.section h3 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 15px;
}

/* 鼠标追踪 */
.mouse-info {
  display: flex;
  gap: 20px;
}

.mouse-tracker {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #42b983;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

/* 本地存储 */
.storage-input {
  padding: 8px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.clear-btn {
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 防抖 */
.debounce-input {
  padding: 8px;
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.original, .debounced {
  padding: 4px 8px;
  border-radius: 4px;
}

.original {
  background-color: #ffe4e1;
}

.debounced {
  background-color: #e8f5e9;
}

/* 尺寸监听 */
.resize-section {
  min-height: 100px;
  resize: both;
  overflow: auto;
  border: 2px dashed #42b983;
}

/* 数据请求 */
.loading {
  color: #42b983;
}

.error {
  color: #ff6347;
}

.fetch-result pre {
  background-color: #2d2d2d;
  color: #ccc;
  padding: 10px;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.refetch-btn {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* 图片转换 */
.demo-image {
  max-width: 200px;
  border-radius: 8px;
}

.result-image {
  max-width: 200px;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
