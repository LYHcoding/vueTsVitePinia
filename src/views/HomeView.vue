<script setup lang="ts">
</script>

<template>
  <div class="home-view">
    <div class="welcome-page">
      <div class="welcome-content">
        <h1>🎉 Vue 3 学习指南</h1>
        <p>从左侧导航栏选择一个学习主题开始探索</p>
        <div class="feature-cards">
          <div class="feature-card">
            <div class="card-icon">⚡</div>
            <h3>响应式系统</h3>
            <p>深入了解 ref、reactive、computed 等响应式 API</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">🔗</div>
            <h3>组件通信</h3>
            <p>掌握父子、兄弟组件通信及依赖注入</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">🎯</div>
            <h3>高级特性</h3>
            <p>探索 Teleport、Keep-alive、Transition 等高级功能</p>
          </div>
          <div class="feature-card">
            <div class="card-icon">✨</div>
            <h3>扩展能力</h3>
            <p>学习自定义指令、Hooks 和插件开发</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
}

.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.welcome-content {
  text-align: center;
  max-width: 800px;
}

.welcome-content h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 16px;
}

.welcome-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.feature-card {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
}

.feature-card p {
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .welcome-content h1 {
    font-size: 28px;
  }

  .feature-cards {
    grid-template-columns: 1fr;
  }
}
</style>
