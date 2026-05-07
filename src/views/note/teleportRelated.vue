<template>
  <div class="app">
    <a class="titleText">Teleport 传送组件示例</a><br />

    <!-- 示例1：传送至 body -->
    <div class="border">
      <h4>1. 传送至 body</h4>
      <button @click="openModal('modal1')" class="toggle-btn">
        打开模态框（传送至 body）
      </button>
      <TeleportModal
        v-model:visible="showModal1"
        title="传送至 body"
        to="body"
      >
        <p>此模态框的 DOM 会被传送到页面的 body 元素下，不受父组件样式影响。</p>
      </TeleportModal>
    </div>

    <!-- 示例2：传送至自定义容器 -->
    <div class="border">
      <h4>2. 传送至自定义容器</h4>
      <div id="custom-container" class="custom-container"></div>
      <button @click="openModal('modal2')" class="toggle-btn">
        打开模态框（传送至自定义容器）
      </button>
      <TeleportModal
        v-model:visible="showModal2"
        title="传送至自定义容器"
        to="#custom-container"
      >
        <p>此模态框的 DOM 会被传送到页面中指定的 #custom-container 元素下。</p>
      </TeleportModal>
    </div>

    <!-- 示例3：动态控制 disabled -->
    <div class="border">
      <h4>3. 动态控制 disabled</h4>
      <label>
        <input type="checkbox" v-model="teleportDisabled" />
        禁用传送（disabled）
      </label>
      <button @click="openModal('modal3')" class="toggle-btn">
        打开模态框（可禁用传送）
      </button>
      <TeleportModal
        v-model:visible="showModal3"
        title="动态控制传送"
        to="body"
        :disabled="teleportDisabled"
      >
        <p>当 disabled 为 true 时，模态框不会被传送，会渲染在当前位置。</p>
        <p>当 disabled 为 false 时，模态框会被传送至 body。</p>
      </TeleportModal>
    </div>

    <!-- 示例4：多个 Teleport -->
    <div class="border">
      <h4>4. 多个 Teleport 使用场景</h4>
      <button @click="openModal('modal4')" class="toggle-btn">
        打开模态框 A
      </button>
      <button @click="openModal('modal5')" class="toggle-btn">
        打开模态框 B
      </button>
      <TeleportModal
        v-model:visible="showModal4"
        title="模态框 A"
        to="body"
      >
        <p>这是第一个模态框</p>
      </TeleportModal>
      <TeleportModal
        v-model:visible="showModal5"
        title="模态框 B"
        to="body"
      >
        <p>这是第二个模态框</p>
      </TeleportModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TeleportModal from '@/components/TeleportModal.vue'

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)
const showModal5 = ref(false)
const teleportDisabled = ref(false)

const openModal = (modal: 'modal1' | 'modal2' | 'modal3' | 'modal4' | 'modal5') => {
  // 关闭所有其他模态框
  showModal1.value = false
  showModal2.value = false
  showModal3.value = false
  showModal4.value = false
  showModal5.value = false

  // 打开目标模态框
  switch (modal) {
    case 'modal1':
      showModal1.value = true
      break
    case 'modal2':
      showModal2.value = true
      break
    case 'modal3':
      showModal3.value = true
      break
    case 'modal4':
      showModal4.value = true
      break
    case 'modal5':
      showModal5.value = true
      break
  }
}
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

.toggle-btn {
  padding: 8px 16px;
  background-color: #1e90ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 15px;
}

.toggle-btn:hover {
  background-color: #1c86ee;
}

.custom-container {
  width: 300px;
  height: 200px;
  border: 2px dashed #1e90ff;
  border-radius: 8px;
  margin-bottom: 15px;
  overflow: hidden;
}
</style>
