<template>
  <div class="app">
    <h1>全局函数和变量</h1>

    <!-- 概念说明 -->
    <div class="section intro">
      <h2>Vue 3 全局属性配置</h2>
      <p>Vue 3 不再使用 `Vue.prototype`，而是使用 `app.config.globalProperties` 来定义全局变量和函数。</p>

      <h3>Vue 2 vs Vue 3 对比</h3>
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
            <td>原型扩展</td>
            <td>`Vue.prototype.$xxx`</td>
            <td>`app.config.globalProperties.$xxx`</td>
          </tr>
          <tr>
            <td>过滤器</td>
            <td>支持 `filters` 选项</td>
            <td>移除，用全局函数替代</td>
          </tr>
          <tr>
            <td>类型声明</td>
            <td>无需额外声明</td>
            <td>需要扩展 `ComponentCustomProperties`</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 全局函数演示 -->
    <div class="section">
      <h2>全局函数和变量实战演示</h2>
      <GlobalFunctionsDemo />
    </div>

    <!-- 全局属性列表 -->
    <div class="section global-list">
      <h2>已注册的全局属性</h2>
      <div class="global-cards">
        <div class="global-card">
          <h4>$filters</h4>
          <p>全局过滤器集合</p>
          <ul>
            <li>formatCurrency - 格式化金额</li>
            <li>formatDate - 格式化日期</li>
            <li>formatTime - 格式化时间</li>
            <li>truncate - 截取字符串</li>
            <li>formatNumber - 千分位格式化</li>
          </ul>
        </div>
        <div class="global-card">
          <h4>$utils</h4>
          <p>全局工具函数集合</p>
          <ul>
            <li>generateId - 生成随机ID</li>
            <li>deepClone - 深拷贝</li>
            <li>debounce - 防抖</li>
            <li>throttle - 节流</li>
            <li>uniqueArray - 数组去重</li>
          </ul>
        </div>
        <div class="global-card">
          <h4>全局变量</h4>
          <p>应用级全局变量</p>
          <ul>
            <li>$appName - 应用名称</li>
            <li>$version - 版本号</li>
            <li>$env - 当前环境</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalFunctionsDemo from '@/components/GlobalFunctionsDemo.vue'
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

.global-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.global-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.global-card h4 {
  margin: 0 0 10px 0;
  color: #42b983;
}

.global-card p {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 14px;
}

.global-card ul {
  margin: 0;
  padding-left: 20px;
}

.global-card li {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}
</style>
