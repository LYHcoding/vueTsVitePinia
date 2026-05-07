<template>
  <div class="app">
    <h1>Provide / Inject 依赖注入示例</h1>

    <!-- 父组件控制区 -->
    <div class="parent-control">
      <h2>父组件（数据提供者）</h2>
      <div class="control-group">
        <label>
          用户名：
          <input v-model="userName" type="text" class="input" />
        </label>
      </div>
      <div class="control-group">
        <label>
          主题颜色：
          <select v-model="themeColor" class="input">
            <option value="#42b983">绿色</option>
            <option value="#1e90ff">蓝色</option>
            <option value="#ff6347">红色</option>
            <option value="#9370db">紫色</option>
          </select>
        </label>
      </div>
      <div class="control-group">
        <label>
          <input type="checkbox" v-model="isDark" />
          深色模式
        </label>
      </div>
      <button @click="resetSettings" class="reset-btn">重置设置</button>
    </div>

    <!-- 子组件 -->
    <ChildComponent />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, reactive } from 'vue'
import ChildComponent from '@/components/ChildComponent.vue'

// 响应式数据
const userName = ref('张三')
const themeColor = ref('#42b983')
const isDark = ref(false)

// 使用 reactive 创建响应式对象
const appSettings = reactive({
  userName,
  themeColor,
  isDark
})

// 提供数据给后代组件
provide('userName', userName)
provide('themeColor', themeColor)
provide('isDark', isDark)
provide('appSettings', appSettings)

// 提供方法给后代组件
provide('updateUserName', (newName: string) => {
  userName.value = newName
})

provide('resetSettings', () => {
  userName.value = '张三'
  themeColor.value = '#42b983'
  isDark.value = false
})

const resetSettings = () => {
  userName.value = '张三'
  themeColor.value = '#42b983'
  isDark.value = false
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
  margin-bottom: 30px;
  text-align: center;
}

.parent-control {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.parent-control h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #42b983;
}

.control-group {
  margin-bottom: 15px;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.input {
  padding: 8px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.reset-btn {
  padding: 8px 20px;
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-btn:hover {
  background-color: #e55a3d;
}
</style>
