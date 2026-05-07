import { ref, watch } from 'vue'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const debouncedValue = ref<T>(value)
  let timer: ReturnType<typeof setTimeout> | null = null

  watch(() => value, (newValue) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedValue.value = newValue
    }, delay)
  })

  return debouncedValue.value
}
