import { onUnmounted } from 'vue'

export function useResize(
  el: HTMLElement | null,
  callback: (cr: DOMRectReadOnly, resize: ResizeObserver) => void
): () => void {
  let resizeObserver: ResizeObserver | null = null

  if (el) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect
        callback(cr, resizeObserver!)
      }
    })
    resizeObserver.observe(el)
  }

  const stopObserve = () => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  }

  onUnmounted(() => {
    stopObserve()
  })

  return stopObserve
}
