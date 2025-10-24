// src/shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // 用更严格的类型替代 {} 和 any
  const component: DefineComponent<
    object, // 替代 {}（表示 props 必须是对象类型，不允许原始值）
    object, // 替代 {}（表示 emits 必须是对象类型）
    Record<string, unknown> // 替代 any（表示 slots 是字符串到未知类型的映射）
  >
  export default component
}
