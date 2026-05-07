// 全局过滤器函数
export const filters = {
  // 格式化金额
  formatCurrency(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value
    return `¥${num.toFixed(2)}`
  },

  // 格式化日期
  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  },

  // 格式化时间
  formatTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  },

  // 截取字符串
  truncate(str: string, length: number): string {
    if (str.length <= length) return str
    return str.slice(0, length) + '...'
  },

  // 转换为大写
  toUpperCase(str: string): string {
    return str.toUpperCase()
  },

  // 转换为小写
  toLowerCase(str: string): string {
    return str.toLowerCase()
  },

  // 格式化数字（千分位）
  formatNumber(num: number | string): string {
    const n = typeof num === 'string' ? parseFloat(num) : num
    return n.toLocaleString()
  },

  // 布尔值转文字
  boolToText(value: boolean): string {
    return value ? '是' : '否'
  }
}

// 全局工具函数
export const utils = {
  // 生成随机ID
  generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  },

  // 深拷贝
  deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
  },

  // 防抖函数
  debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: Parameters<T>) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay)
    }
  },

  // 节流函数
  throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let lastTime = 0
    return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastTime >= delay) {
        fn(...args)
        lastTime = now
      }
    }
  },

  // 数组去重
  uniqueArray<T>(arr: T[]): T[] {
    return [...new Set(arr)]
  },

  // 对象数组去重
  uniqueByKey<T>(arr: T[], key: keyof T): T[] {
    const seen = new Set()
    return arr.filter(item => {
      const val = item[key]
      if (seen.has(val)) return false
      seen.add(val)
      return true
    })
  }
}
