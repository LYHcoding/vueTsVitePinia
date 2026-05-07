<template>
  <div class="dialog">
    <div class="dialog-header">
      <slot name="header">默认标题</slot>
    </div>
    <div class="dialog-body">
      <slot>默认内容</slot>
      <!-- 作用域插槽示例 -->
      <div class="list-section">
        <slot name="list" :items="listData">
          <!-- 默认列表内容 -->
          <ul>
            <li v-for="item in listData" :key="item.id">{{ item.name }}</li>
          </ul>
        </slot>
      </div>
    </div>
    <div class="dialog-footer">
      <slot name="footer">
        <button class="btn btn-primary">确定</button>
        <button class="btn btn-secondary">取消</button>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const listData = reactive([
  { id: 1, name: '项目一' },
  { id: 2, name: '项目二' },
  { id: 3, name: '项目三' }
])
</script>

<script lang="ts">
export default {
  name: 'DialogComponent'
}
</script>

<style scoped>
.dialog {
  width: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dialog-header {
  padding: 16px;
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  font-size: 16px;
}

.dialog-body {
  padding: 16px;
  min-height: 100px;
}

.list-section {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #eee;
}

.dialog-footer {
  padding: 12px 16px;
  background-color: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.btn {
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #42b983;
  color: #fff;
}

.btn-primary:hover {
  background-color: #3aa474;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #d0d0d0;
}
</style>
