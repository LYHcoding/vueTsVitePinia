<template>
  <div v-if="modelValue" class="dialog-overlay">
    <div class="dialog">
      <div class="dialog-header">
        <div>{{ title }}</div>
        <div @click="close" class="close-btn">x</div>
      </div>
      <div class="dialog-content">
        <p>{{ content }}</p>
        
        <!-- 输入框示例，演示 v-model 双向绑定 -->
        <div class="input-group">
          <label>输入内容：</label>
          <input 
            type="text" 
            :value="inputValue"
            @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)"
            class="dialog-input"
          />
        </div>
      </div>
      <div class="dialog-footer">
        <button @click="confirm" class="btn btn-primary">确定</button>
        <button @click="close" class="btn btn-secondary">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  modelValue: boolean
  title: string
  content?: string
  inputValue?: string
  // 自定义修饰符
  modelModifiers?: {
    [key: string]: boolean
  }
  titleModifiers?: {
    [key: string]: boolean
  }
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:title', 'update:inputValue', 'confirm'])

const close = () => {
  // 演示修饰符
  console.log('modelModifiers:', props.modelModifiers)
  console.log('titleModifiers:', props.titleModifiers)
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm', props.inputValue)
  emit('update:modelValue', false)
  // 修改标题
  emit('update:title', '已确认')
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.dialog-header {
  padding: 16px;
  background-color: #42b983;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.dialog-content {
  padding: 20px;
}

.input-group {
  margin-top: 16px;
}

.input-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.dialog-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.dialog-footer {
  padding: 12px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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
