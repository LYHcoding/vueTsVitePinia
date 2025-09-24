<template>
  <div class="dynamic-events-demo">
    <h3>动态事件绑定示例</h3>

    <!-- 选择要绑定的事件类型 -->
    <div class="event-selector">
      <label>选择事件类型：</label>
      <select v-model="selectedEvent">
        <option value="click">单击事件 (click)</option>
        <option value="dblclick">双击事件 (dblclick)</option>
        <option value="keyup.enter">回车事件 (keyup.enter)</option>
      </select>
    </div>

    <!-- 动态绑定事件的元素 -->
    <div class="event-targets">
      <!-- 根据选择的事件类型动态绑定事件 -->
      <div
        v-if="selectedEvent !== 'keyup.enter'"
        class="box"
        @[selectedEvent]="handleEvent"
      >
        点击或双击我（当前：{{ eventLabels[selectedEvent] }}）
      </div>

      <input
        v-else
        type="text"
        class="input-field"
        @keyup.enter="handleEvent"
        placeholder="在这里按回车键试试"
      >
    </div>

    <!-- 事件日志 -->
    <div class="event-log">
      <h4>事件日志：</h4>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index" :class="{ recent: index === 0 }">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 事件标签映射
type EventLabels = {
  click: string
  dblclick: string
  'keyup.enter': string
}
const eventLabels:EventLabels = {
  click: "单击事件",
  dblclick: "双击事件",
  'keyup.enter': "回车事件"
}
const selectedEvent = ref<'click' | 'dblclick' | 'keyup.enter'>('click')
const eventLogs = ref<string[]>([])

// 事件处理函数
const handleEvent = (event: Event) => {
  const now = new Date().toLocaleTimeString()
  // 根据事件类型添加不同的日志信息
  let logMessage = ''
  switch(selectedEvent.value) {
    case 'click':
      logMessage = `[${now}] 单击事件触发`
      break
    case 'dblclick':
      logMessage = `[${now}] 双击事件触发`
      break
    case 'keyup.enter':
      // 不能省略掉该行句尾的‘;’，避免解析器将如下两行错误合并解析
      logMessage = `[${now}] 回车键触发，输入内容: ${(event.target as HTMLInputElement).value}`;
      (event.target as HTMLInputElement).value = ''
      break
  }
  // 添加到日志并限制日志数量
  if (logMessage) {
    eventLogs.value.unshift(logMessage)
    if (eventLogs.value.length > 5) {
      eventLogs.value.pop()
    }
  }
}
</script>

<style scoped>
.dynamic-events-demo {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-selector {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
}

select {
  margin-left: 0.5rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.event-targets {
  margin-bottom: 1.5rem;
}

.box {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #42b983;
  color: white;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.box.active {
  background-color: #359e75;
  transform: scale(1.02);
}

.input-field {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.event-log {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.event-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-log li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
}

.event-log li:last-child {
  border-bottom: none;
}

.event-log li.recent {
  color: #42b983;
  font-weight: bold;
}
</style>
