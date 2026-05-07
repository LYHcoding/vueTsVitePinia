<template>
  <div class="app">
    <a class="titleText">插槽组件示例</a><br />

    <!-- 示例1：使用默认插槽 -->
    <div class="border">
      <h4>1. 默认插槽</h4>
      <Dialog />
    </div>

    <!-- 示例2：使用具名插槽 -->
    <div class="border">
      <h4>2. 具名插槽 (header / footer)</h4>
      <Dialog>
        <!-- 插槽: v-slot:<slot-name>    插槽简写: #<slot-name> -->
        <!-- <template #header>自定义标题</template> -->
        <template v-slot:header>自定义标题</template>
        <template #default>这是自定义的正文内容</template>
        <template #footer>
          <button class="btn btn-success">保存</button>
          <button class="btn btn-danger">删除</button>
          <button class="btn btn-secondary">取消</button>
        </template>
      </Dialog>
    </div>

    <!-- 示例3：作用域插槽 -->
    <div class="border">
      <h4>3. 作用域插槽 (接收子组件数据)</h4>
      <Dialog>
        <template #header>作用域插槽示例</template>
        <template #default>自定义列表展示：</template>
        <template #list="{ items }">
          <div class="custom-list">
            <div v-for="item in items" :key="item.id" class="list-item">
              <span class="item-id">{{ item.id }}</span>
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
        </template>
        <template #footer>
          <button class="btn btn-primary">确认</button>
        </template>
      </Dialog>
    </div>

    <!-- 示例4：动态插槽名 -->
    <div class="border">
      <h4>4. 动态插槽名</h4>
      <button
        @click="dynamicSlotName = dynamicSlotName === 'header' ? 'footer' : 'header'"
        class="toggle-btn"
      >
        切换插槽: {{ dynamicSlotName }}
      </button>
      <Dialog>
        <template #[dynamicSlotName]>
          <span style="color: #42b983">动态插槽内容</span>
        </template>
      </Dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dialog from '@/components/Dialog.vue'

const dynamicSlotName = ref('header')
</script>

<style scoped>
.app {
  padding: 20px;
}

.border {
  border: 1px solid #cccccc;
  padding: 15px;
  margin: 15px 0;
}

.titleText {
  color: gray;
}

h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
}

.custom-list {
  margin-top: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.item-id {
  width: 30px;
  height: 30px;
  background-color: #42b983;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 12px;
}

.item-name {
  flex: 1;
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

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

.toggle-btn {
  margin-bottom: 15px;
  padding: 8px 16px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background-color: #1c86ee;
}
</style>
