<template>
  <div class="grand-child-component" :style="componentStyle">
    <h4>孙组件（第二层）</h4>
    <div class="info">
      <p><strong>当前用户：</strong>{{ userName }}</p>
      <p><strong>主题色：</strong><span class="color-box" :style="{ backgroundColor: themeColor }"></span></p>
      <p><strong>深色模式：</strong>{{ isDark ? '开启' : '关闭' }}</p>
    </div>

    <div class="actions">
      <input
        type="text"
        v-model="newName"
        placeholder="输入新用户名"
        class="name-input"
      />
      <button @click="updateName" class="update-btn">修改用户名</button>
      <button @click="reset" class="reset-btn">重置设置</button>
    </div>

    <!-- 曾孙组件 -->
    <GreatGrandChildComponent />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import type { Ref } from 'vue'
import GreatGrandChildComponent from './GreatGrandChildComponent.vue'

// 使用 inject 接收数据（保留 ref 对象，保持响应式）
const userName = inject<Ref<string>>('userName', ref(''))
const themeColor = inject<Ref<string>>('themeColor', ref('#42b983'))
const isDark = inject<Ref<boolean>>('isDark', ref(false))

// 使用 inject 接收方法
const updateUserName = inject<(name: string) => void>('updateUserName')
const resetSettings = inject<() => void>('resetSettings')

const newName = ref('')

// 计算样式（使用 ref.value 获取值）
const componentStyle = computed(() => ({
  backgroundColor: isDark.value ? '#444' : '#f9f9f9',
  color: isDark.value ? '#fff' : '#333',
  borderColor: themeColor.value || '#ddd'
}))

const updateName = () => {
  if (newName.value && updateUserName) {
    updateUserName(newName.value)
    newName.value = ''
  }
}

const reset = () => {
  if (resetSettings) {
    resetSettings()
  }
}
</script>

<style scoped>
.grand-child-component {
  padding: 15px;
  border: 2px dashed;
  border-radius: 8px;
  margin-top: 15px;
}

.grand-child-component h4 {
  margin-top: 0;
}

.info {
  margin-bottom: 15px;
}

.color-box {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  vertical-align: middle;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.name-input {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.update-btn {
  padding: 6px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-btn:hover {
  background-color: #3aa474;
}

.reset-btn {
  padding: 6px 16px;
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
