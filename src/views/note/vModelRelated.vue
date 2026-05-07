<template>
  <div class="app">
    <h1>深入 v-model 用法</h1>

    <!-- 单个 v-model 示例 -->
    <div class="section">
      <h2>1. 单个 v-model（控制显示隐藏）</h2>
      <button @click="showDialog = !showDialog" class="toggle-btn">
        开关对话框 {{ showDialog ? '显示' : '隐藏' }}
      </button>
      <VModelDialog v-model="showDialog" title="单个 v-model" content="这是一个简单的对话框" />
    </div>

    <!-- 多个 v-model 示例 -->
    <div class="section">
      <h2>2. 多个 v-model（绑定多个值）</h2>
      <p>标题：<strong>{{ dialogTitle }}</strong></p>
      <p>输入内容：<strong>{{ dialogInput }}</strong></p>
      <button @click="showMultiDialog = !showMultiDialog" class="toggle-btn">
        打开多 v-model 对话框
      </button>
      <VModelDialog
        v-model="showMultiDialog"
        v-model:title="dialogTitle"
        v-model:inputValue="dialogInput"
        content="可以同时绑定多个 v-model"
        @confirm="handleConfirm"
      />
    </div>

    <!-- v-model 语法糖说明 -->
    <div class="section explanation">
      <h2>v-model 语法糖解析</h2>
      <div class="code-block">
        <p><strong>v-model 其实是以下代码的简写：</strong></p>
        <pre>&lt;Component
  :modelValue="value"
  @update:modelValue="value = $event"
/&gt;</pre>
      </div>
      <div class="code-block">
        <p><strong>多个 v-model 的写法：</strong></p>
        <pre>&lt;Component
  v-model="show"                  // 等价于 :modelValue + @update:modelValue
  v-model:title="title"           // 等价于 :title + @update:title
  v-model:inputValue="input"      // 等价于 :inputValue + @update:inputValue
/&gt;</pre>
      </div>
    </div>

    <!-- v-model 变更对比 -->
    <div class="section">
      <h2>Vue 2 vs Vue 3 v-model 对比</h2>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>Vue 2</th>
            <th>Vue 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>默认 prop</td>
            <td>value</td>
            <td>modelValue</td>
          </tr>
          <tr>
            <td>默认事件</td>
            <td>input</td>
            <td>update:modelValue</td>
          </tr>
          <tr>
            <td>多个 v-model</td>
            <td>不支持</td>
            <td>支持</td>
          </tr>
          <tr>
            <td>自定义修饰符</td>
            <td>不支持</td>
            <td>支持</td>
          </tr>
          <tr>
            <td>.sync 修饰符</td>
            <td>支持</td>
            <td>移除（用 v-model:xxx 替代）</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VModelDialog from '@/components/VModelDialog.vue'

// 单个 v-model
const showDialog = ref(false)

// 多个 v-model
const showMultiDialog = ref(false)
const dialogTitle = ref('我是标题')
const dialogInput = ref('')

const handleConfirm = (value: string | undefined) => {
  alert(`确认内容：${value}`)
}
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.section h2 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.toggle-btn {
  padding: 10px 24px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.toggle-btn:hover {
  background-color: #3aa474;
}

.explanation {
  background-color: #fff;
  border: 1px solid #e0e0e0;
}

.code-block {
  background-color: #2d2d2d;
  color: #ccc;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.code-block p {
  margin: 0 0 10px 0;
  color: #8cd0d3;
}

.code-block pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  color: #333;
}

tr:hover {
  background-color: #f9f9f9;
}
</style>
