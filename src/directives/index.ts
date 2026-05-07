import type { Directive } from 'vue'

// 自定义拖拽指令
export const vMove: Directive = {
  mounted(el: HTMLElement) {
    const moveEl = el.firstElementChild as HTMLElement || el
    const mouseDown = (e: MouseEvent) => {
      const X = e.clientX - el.offsetLeft
      const Y = e.clientY - el.offsetTop

      const move = (e: MouseEvent) => {
        el.style.left = `${e.clientX - X}px`
        el.style.top = `${e.clientY - Y}px`
      }

      const mouseUp = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', mouseUp)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', mouseUp)
    }

    moveEl.addEventListener('mousedown', mouseDown)
  }
}

// 权限控制指令
export const vHasShow: Directive<HTMLElement, string> = (el, binding) => {
  // Mock 权限数据
  const userId = localStorage.getItem('userId') || 'guest'
  const permissions = [
    'admin:shop:create',
    'admin:shop:edit',
    'admin:shop:delete',
    'guest:shop:view'
  ]

  if (!permissions.includes(`${userId}:${binding.value}`)) {
    el.style.display = 'none'
  }
}

// 图片懒加载指令
export const vLazy: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.unobserve(el)
        }
      })
    }, {
      rootMargin: '100px'
    })

    observer.observe(el)
  }
}

// 自定义背景色指令
export const vBgColor: Directive<HTMLElement, string> = (el, binding) => {
  el.style.backgroundColor = binding.value
}

// 防抖点击指令
export const vDebounce: Directive<HTMLElement, () => void> = {
  mounted(el, binding) {
    let timer: ReturnType<typeof setTimeout> | null = null
    el.addEventListener('click', () => {
      if (timer) return
      timer = setTimeout(() => {
        binding.value()
        timer = null
      }, 500)
    })
  }
}
