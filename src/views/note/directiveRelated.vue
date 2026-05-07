<template>
  <div class="app">
    <h1>自定义指令 Directive</h1>

    <!-- 指令钩子函数说明 -->
    <div class="section hooks-info">
      <h2>Vue 3 指令钩子函数</h2>
      <table>
        <thead>
          <tr>
            <th>钩子函数</th>
            <th>说明</th>
            <th>调用时机</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>created</td>
            <td>元素初始化时</td>
            <td>绑定时，属性或事件监听器被应用之前</td>
          </tr>
          <tr>
            <td>beforeMount</td>
            <td>指令绑定到元素后调用</td>
            <td>只调用一次</td>
          </tr>
          <tr>
            <td>mounted</td>
            <td>元素插入父 DOM 时调用</td>
            <td>只调用一次</td>
          </tr>
          <tr>
            <td>beforeUpdate</td>
            <td>元素更新之前调用</td>
            <td>每次更新前</td>
          </tr>
          <tr>
            <td>updated</td>
            <td>元素更新之后调用</td>
            <td>每次更新后</td>
          </tr>
          <tr>
            <td>beforeUnmount</td>
            <td>元素被移除前调用</td>
            <td>只调用一次</td>
          </tr>
          <tr>
            <td>unmounted</td>
            <td>指令被移除后调用</td>
            <td>只调用一次</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 指令参数说明 -->
    <div class="section params-info">
      <h2>钩子函数参数</h2>
      <ul>
        <li><strong>el</strong> - 当前绑定的 DOM 元素</li>
        <li><strong>binding</strong> - 包含指令信息的对象（value、oldValue、arg、modifiers）</li>
        <li><strong>vnode</strong> - 当前元素的虚拟 DOM</li>
        <li><strong>prevNode</strong> - 上一个虚拟节点（仅 beforeUpdate/updated）</li>
      </ul>
    </div>

    <!-- 自定义指令演示 -->
    <div class="section">
      <h2>自定义指令实战演示</h2>
      <DirectiveDemo />
    </div>

    <!-- Vue 2 vs Vue 3 指令对比 -->
    <div class="section">
      <h2>Vue 2 vs Vue 3 指令钩子对比</h2>
      <table>
        <thead>
          <tr>
            <th>Vue 2</th>
            <th>Vue 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>bind</td>
            <td>beforeMount</td>
          </tr>
          <tr>
            <td>inserted</td>
            <td>mounted</td>
          </tr>
          <tr>
            <td>update</td>
            <td>beforeUpdate</td>
          </tr>
          <tr>
            <td>componentUpdated</td>
            <td>updated</td>
          </tr>
          <tr>
            <td>unbind</td>
            <td>unmounted</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import DirectiveDemo from '@/components/DirectiveDemo.vue'
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

.params-info ul {
  list-style: none;
  padding: 0;
}

.params-info li {
  padding: 8px 0;
  border-bottom: 1px dashed #eee;
}

.params-info li:last-child {
  border-bottom: none;
}
</style>
