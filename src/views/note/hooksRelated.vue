<template>
  <div class="app">
    <h1>自定义 Hooks</h1>

    <!-- Hooks 概念说明 -->
    <div class="section intro">
      <h2>什么是自定义 Hooks？</h2>
      <p>Vue 3 的自定义 Hooks 是一种复用代码逻辑的方式，相当于 Vue 2 的 Mixins，但更加清晰和灵活。</p>

      <h3>Hooks vs Mixins 对比</h3>
      <table>
        <thead>
          <tr>
            <th>特性</th>
            <th>Mixins</th>
            <th>Hooks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>变量来源</td>
            <td>隐式传入，不明确</td>
            <td>显式返回，清晰明确</td>
          </tr>
          <tr>
            <td>命名冲突</td>
            <td>容易出现</td>
            <td>不会出现</td>
          </tr>
          <tr>
            <td>类型支持</td>
            <td>较差</td>
            <td>优秀</td>
          </tr>
          <tr>
            <td>代码组织</td>
            <td>分散</td>
            <td>集中</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Hooks 演示 -->
    <div class="section">
      <h2>自定义 Hooks 实战演示</h2>
      <HooksDemo />
    </div>

    <!-- Hooks 列表 -->
    <div class="section hooks-list">
      <h2>创建的 Hooks</h2>
      <div class="hook-cards">
        <div class="hook-card">
          <h4>useMousePosition</h4>
          <p>追踪鼠标位置</p>
        </div>
        <div class="hook-card">
          <h4>useLocalStorage</h4>
          <p>响应式本地存储</p>
        </div>
        <div class="hook-card">
          <h4>useDebounce</h4>
          <p>防抖函数</p>
        </div>
        <div class="hook-card">
          <h4>useResize</h4>
          <p>元素尺寸监听</p>
        </div>
        <div class="hook-card">
          <h4>useFetch</h4>
          <p>数据请求封装</p>
        </div>
        <div class="hook-card">
          <h4>useImageToBase64</h4>
          <p>图片转 Base64</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HooksDemo from './components/HooksDemo.vue'
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 900px;
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

.section h3 {
  color: #333;
  margin-top: 20px;
}

.intro p {
  line-height: 1.6;
  color: #666;
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

.tr:hover {
  background-color: #f9f9f9;
}

.hook-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.hook-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
  text-align: center;
}

.hook-card h4 {
  margin: 0 0 10px 0;
  color: #42b983;
}

.hook-card p {
  margin: 0;
  color: #666;
  font-size: 14px;
}
</style>
