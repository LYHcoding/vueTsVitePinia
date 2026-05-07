<template>
  <div class="tab-content tab-b">
    <h3>B 组件</h3>
    <p>这是第二个标签页的内容区域</p>
    <div class="stats">
      <div class="stat-item">
        <span class="stat-value">100+</span>
        <span class="stat-label">用户数量</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">50+</span>
        <span class="stat-label">功能模块</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-content {
  padding: 20px;
  min-height: 150px;
}

.tab-b {
  background-color: #fff5f5;
  border: 1px solid #ffcccc;
  border-radius: 4px;
}

h3 {
  margin-top: 0;
  color: #dc143c;
}

.stats {
  display: flex;
  gap: 30px;
  margin-top: 15px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #dc143c;
}

.stat-label {
  font-size: 14px;
  color: #666;
}
</style>
