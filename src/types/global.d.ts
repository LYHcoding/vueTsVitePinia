// 全局过滤器类型
export interface Filters {
  formatCurrency(value: number | string): string
  formatDate(date: Date | string): string
  formatTime(date: Date | string): string
  truncate(str: string, length: number): string
  toUpperCase(str: string): string
  toLowerCase(str: string): string
  formatNumber(num: number | string): string
  boolToText(value: boolean): string
}

// 全局工具函数类型
export interface Utils {
  generateId(): string
  deepClone<T>(obj: T): T
  debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void
  throttle<T extends (...args: unknown[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void
  uniqueArray<T>(arr: T[]): T[]
  uniqueByKey<T>(arr: T[], key: keyof T): T[]
}

// 声明要扩充 @vue/runtime-core 包的声明
declare module 'vue' {
  export interface ComponentCustomProperties {
    $filters: Filters
    $utils: Utils
    $appName: string
    $version: string
    $env: 'development' | 'production'
  }
}
