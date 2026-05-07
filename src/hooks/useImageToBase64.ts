import { onMounted } from 'vue'

type Options = {
  el: string
}

type Return = {
  baseUrl: string | null
  loading: boolean
  error: string | null
}

export function useImageToBase64(option: Options): Return {
  const baseUrl = { value: null as string | null }
  const loading = { value: true }
  const error = { value: null as string | null }

  const toBase64 = (el: HTMLImageElement): string => {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    canvas.width = el.width
    canvas.height = el.height
    ctx.drawImage(el, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  }

  onMounted(() => {
    const file: HTMLImageElement | null = document.querySelector(option.el)
    if (file) {
      file.onload = (): void => {
        try {
          baseUrl.value = toBase64(file)
          loading.value = false
        } catch {
          error.value = '转换失败'
          loading.value = false
        }
      }
    } else {
      error.value = '未找到图片元素'
      loading.value = false
    }
  })

  return {
    get baseUrl() { return baseUrl.value },
    get loading() { return loading.value },
    get error() { return error.value }
  }
}
