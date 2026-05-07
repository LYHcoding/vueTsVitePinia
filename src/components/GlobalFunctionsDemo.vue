<template>
  <div class="global-demo">
    <!-- 全局变量展示 -->
    <div class="section">
      <h3>1. 全局变量</h3>
      <div class="variable-list">
        <div class="variable-item">
          <span class="label">应用名称：</span>
          <span class="value">{{ $appName }}</span>
        </div>
        <div class="variable-item">
          <span class="label">版本号：</span>
          <span class="value">{{ $version }}</span>
        </div>
        <div class="variable-item">
          <span class="label">当前环境：</span>
          <span class="value env-tag" :class="$env">{{ $env }}</span>
        </div>
      </div>
    </div>

    <!-- 全局过滤器展示 -->
    <div class="section">
      <h3>2. 全局过滤器 $filters</h3>
      <div class="filter-grid">
        <div class="filter-item">
          <p class="filter-label">格式化金额</p>
          <p class="filter-result">{{ $filters.formatCurrency(12345.67) }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">格式化日期</p>
          <p class="filter-result">{{ $filters.formatDate(new Date()) }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">格式化时间</p>
          <p class="filter-result">{{ $filters.formatTime(new Date()) }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">截取字符串</p>
          <p class="filter-result">{{ $filters.truncate('这是一段很长的文本用于测试', 10) }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">转换大写</p>
          <p class="filter-result">{{ $filters.toUpperCase('hello world') }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">格式化数字</p>
          <p class="filter-result">{{ $filters.formatNumber(123456789) }}</p>
        </div>
        <div class="filter-item">
          <p class="filter-label">布尔值转文字</p>
          <p class="filter-result">{{ $filters.boolToText(true) }} / {{ $filters.boolToText(false) }}</p>
        </div>
      </div>
    </div>

    <!-- 全局工具函数展示 -->
    <div class="section">
      <h3>3. 全局工具函数 $utils</h3>
      <div class="utils-grid">
        <div class="utils-item">
          <p class="utils-label">生成随机ID</p>
          <p class="utils-result">{{ randomId }}</p>
        </div>
        <div class="utils-item">
          <p class="utils-label">数组去重</p>
          <p class="utils-result">{{ uniqueArray }}</p>
        </div>
        <div class="utils-item">
          <p class="utils-label">深拷贝对象</p>
          <p class="utils-result">{{ deepCloneResult }}</p>
        </div>
      </div>
      <div class="debounce-section">
        <p class="utils-label">防抖测试（500ms）</p>
        <button @click="handleDebounceClick" class="debounce-btn">快速点击我</button>
        <p class="click-count">点击次数：{{ clickCount }}</p>
      </div>
    </div>

    <!-- 组合式API中使用全局属性 -->
    <div class="section">
      <h3>4. 在组合式API中使用全局属性</h3>
      <div class="composition-api-section">
        <p>使用 getCurrentInstance() 获取全局属性</p>
        <div class="code-block">
          <pre>import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
console.log(instance?.proxy?.$filters)</pre>
        </div>
        <p>从组合式API获取的应用名称：<strong>{{ appNameFromApi }}</strong></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'

const clickCount = ref(0)
const randomId = ref('')
const uniqueArray = ref<number[]>([])
const deepCloneResult = ref<{ name: string; value: number } | null>(null)
const appNameFromApi = ref('')

// 在组合式API中获取全局属性
const instance = getCurrentInstance()
if (instance?.proxy) {
  appNameFromApi.value = instance.proxy.$appName

  // 使用工具函数
  randomId.value = instance.proxy.$utils.generateId()

  // 数组去重
  const arr = [1, 2, 2, 3, 3, 3, 4]
  uniqueArray.value = instance.proxy.$utils.uniqueArray(arr)

  // 深拷贝
  const original = { name: '测试对象', value: 123 }
  deepCloneResult.value = instance.proxy.$utils.deepClone(original)
}

// 防抖点击处理
const handleDebounceClick = instance?.proxy?.$utils.debounce(() => {
  clickCount.value++
}, 500)
</script>

<style scoped>
.global-demo {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
}

.section h3 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 15px;
}

/* 全局变量 */
.variable-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.variable-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
}

.env-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.env-tag.development {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.env-tag.production {
  background-color: #ffebee;
  color: #c62828;
}

/* 过滤器 */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.filter-item {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.filter-label {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.filter-result {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #42b983;
}

/* 工具函数 */
.utils-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.utils-item {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.utils-label {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.utils-result {
  margin: 0;
  font-size: 14px;
  font-family: monospace;
  color: #333;
  word-break: break-all;
}

.debounce-section {
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.debounce-btn {
  padding: 10px 24px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.click-count {
  font-weight: bold;
  color: #666;
}

/* 组合式API */
.code-block {
  background-color: #2d2d2d;
  color: #ccc;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 15px;
}

.code-block pre {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}
</style>
