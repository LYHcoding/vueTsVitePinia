<template>
  <Teleport :to="targetElement" :disabled="disabled || !targetExists" :key="teleportKey">
    <div v-if="visible" class="modal-overlay" @click.self="handleClose">
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">{{ title }}</span>
          <button class="close-btn" @click="handleClose">×</button>
        </div>
        <div class="modal-body">
          <slot>默认内容</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-secondary" @click="handleClose">取消</button>
            <button class="btn btn-primary" @click="handleConfirm">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'

interface Props {
  visible: boolean
  title?: string
  to?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '提示',
  to: 'body',
  disabled: false
})

const teleportKey = ref(0)
const targetExists = ref(true)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const targetElement = computed(() => {
  if (!props.to) return 'body'
  return props.to
})

const checkTargetExists = () => {
  if (props.disabled || !props.to || props.to === 'body') {
    targetExists.value = true
    return
  }
  try {
    const element = document.querySelector(props.to!)
    targetExists.value = element !== null
  } catch {
    targetExists.value = true
  }
}

watch(() => props.visible, (newVal, oldVal) => {
  if (newVal) {
    // 打开时更新 key，确保每次都是新的 Teleport 实例
    teleportKey.value++
    checkTargetExists()
  } else if (oldVal && !newVal) {
    // 关闭时重置 key，避免下次打开时复用旧实例
    if (closeTimeout) clearTimeout(closeTimeout)
    closeTimeout = setTimeout(() => {
      teleportKey.value++
    }, 300)
  }
})

watch(() => props.to, () => {
  checkTargetExists()
})

checkTargetExists()

onUnmounted(() => {
  if (closeTimeout) clearTimeout(closeTimeout)
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleConfirm = () => {
  emit('update:visible', false)
  emit('confirm')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal {
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
}

.modal-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #666;
}

.modal-body {
  padding: 20px;
  min-height: 80px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid #e0e0e0;
  background-color: #fafafa;
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
