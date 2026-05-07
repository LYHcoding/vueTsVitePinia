<template>
  <div class="directive-demo">
    <!-- 1. 拖拽指令 -->
    <div class="section">
      <h3>1. 自定义拖拽指令 v-move</h3>
      <div v-move class="draggable-box">
        <div class="drag-header"></div>
        <div class="drag-content">
          <p>点击头部拖动我</p>
        </div>
      </div>
    </div>

    <!-- 2. 权限控制指令 -->
    <div class="section">
      <h3>2. 权限控制指令 v-has-show</h3>
      <div class="btn-group">
        <button v-has-show="'shop:create'">创建（有权限）</button>
        <button v-has-show="'shop:edit'">编辑（有权限）</button>
        <button v-has-show="'shop:delete'">删除（有权限）</button>
        <button v-has-show="'shop:export'">导出（无权限）</button>
      </div>
      <p class="hint">当前用户：admin</p>
    </div>

    <!-- 3. 图片懒加载指令 -->
    <div class="section">
      <h3>3. 图片懒加载指令 v-lazy</h3>
      <div class="image-list">
        <img
          v-for="(img, index) in lazyImages"
          :key="index"
          v-lazy="img"
          class="lazy-image"
          :alt="`图片 ${index + 1}`"
        />
      </div>
    </div>

    <!-- 4. 背景色指令 -->
    <div class="section">
      <h3>4. 背景色指令 v-bg-color</h3>
      <div class="color-box">
        <div v-bg-color="'#42b983'" class="color-item">绿色</div>
        <div v-bg-color="'#1e90ff'" class="color-item">蓝色</div>
        <div v-bg-color="'#ff6347'" class="color-item">红色</div>
        <div v-bg-color="'#9370db'" class="color-item">紫色</div>
      </div>
    </div>

    <!-- 5. 防抖点击指令 -->
    <div class="section">
      <h3>5. 防抖点击指令 v-debounce</h3>
      <button v-debounce="debounceClick" class="debounce-btn">
        点击测试防抖（500ms）
      </button>
      <p class="click-count">点击次数：{{ clickCount }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vMove, vHasShow, vLazy, vBgColor, vDebounce } from '@/directives'

const clickCount = ref(0)

const lazyImages = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4'
]

const debounceClick = () => {
  clickCount.value++
  console.log('点击了！')
}

// 设置当前用户
localStorage.setItem('userId', 'admin')
</script>

<script lang="ts">
export default {
  name: 'DirectiveDemo'
}
</script>

<style scoped>
.directive-demo {
  padding: 20px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #eee;
}

.section h3 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 20px;
}

/* 拖拽样式 */
.draggable-box {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 100;
}

.drag-header {
  height: 30px;
  background: linear-gradient(135deg, #42b983, #3aa474);
  cursor: move;
}

.drag-content {
  padding: 20px;
  text-align: center;
}

.drag-content p {
  margin: 0;
  color: #666;
}

/* 权限按钮 */
.btn-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-group button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #42b983;
  color: #fff;
}

.btn-group button:hover {
  background-color: #3aa474;
}

.hint {
  margin-top: 15px;
  color: #999;
  font-size: 14px;
}

/* 懒加载图片 */
.image-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.lazy-image {
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
  object-fit: cover;
}

/* 背景色示例 */
.color-box {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.color-item {
  width: 100px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
}

/* 防抖按钮 */
.debounce-btn {
  padding: 10px 24px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.debounce-btn:hover {
  background-color: #3aa474;
}

.click-count {
  margin-top: 15px;
  font-weight: bold;
  color: #666;
}
</style>
