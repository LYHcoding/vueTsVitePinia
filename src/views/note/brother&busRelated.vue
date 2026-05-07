<template>
  <div class="app">
    <h1>兄弟组件传参和 Event Bus</h1>
    <p class="description">通过 Event Bus 实现兄弟组件之间的通信</p>

    <!-- 兄弟组件区域 -->
    <div class="siblings-container">
      <SiblingA />
      <SiblingB />
    </div>

    <!-- 方案对比说明 -->
    <div class="comparison">
      <h2>两种兄弟组件通信方案对比</h2>
      <table>
        <thead>
          <tr>
            <th>方案</th>
            <th>优点</th>
            <th>缺点</th>
            <th>适用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>借助父组件传参</td>
            <td>简单直观，易于理解</td>
            <td>需要父组件中转，代码繁琐</td>
            <td>简单场景、少量组件</td>
          </tr>
          <tr>
            <td>Event Bus</td>
            <td>直接通信，组件解耦</td>
            <td>需要管理订阅/取消订阅</td>
            <td>复杂场景、跨层级通信</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import SiblingA from '@/components/SiblingA.vue'
import SiblingB from '@/components/SiblingB.vue'
</script>

<style scoped>
.app {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.siblings-container {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.siblings-container > * {
  flex: 1;
}

.comparison {
  margin-top: 40px;
}

.comparison h2 {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
