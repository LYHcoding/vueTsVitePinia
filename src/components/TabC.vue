<template>
  <div class="tab-content tab-c">
    <h3>C 组件</h3>
    <p>这是第三个标签页的内容区域</p>
    <div class="progress-bar">
      <div class="progress" style="width: 75%"></div>
    </div>
    <p class="progress-text">完成进度：75%</p>
  </div>
</template>

<style scoped>
.tab-content {
  padding: 20px;
  min-height: 150px;
}

.tab-c {
  background-color: #f0fff0;
  border: 1px solid #90ee90;
  border-radius: 4px;
}

h3 {
  margin-top: 0;
  color: #228b22;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15px;
}

.progress {
  height: 100%;
  background-color: #32cd32;
  border-radius: 10px;
  transition: width 0.3s ease;
}

.progress-text {
  margin-top: 8px;
  font-size: 14px;
  color: #228b22;
}
</style>
