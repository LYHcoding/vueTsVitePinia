# vueTsVitePinia

This template should help get you started developing with Vue3+Ts+Vite+Pinia.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Project Structure

```
vueTsVitePinia/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   ├── main.ts
│   ├── router.ts
│   ├── store.ts
│   ├── types.d.ts
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```

### Template and Note List about Vue3

```
src/assets/
├── main.css 主界面样式文件
src/components/
├── ChildComponent 子组件
├── Dialog 插槽子组件对话默认内容
├── DirectiveDemo 自定义指令演示组件
├── ErrorComponent 错误组件
├── GlobalFunctionsDemo 全局函数演示组件
├── GrandChildComponent 孙组件
├── GreatGrandChildComponent 曾孙组件
├── HooksDemo 自定义钩子组件
├── LoadingComponent 加载中组件
├── SiblingA 兄弟组件A
├── SiblingB 兄弟组件B
├── SidebarNav 主界面侧边栏导航组件
├── TabA 组件相关TabA
├── TabAbout 关于组件
├── TabB 组件相关TabB
├── TabC 组件相关TabC
├── TabHome 首页组件
├── TabSettings 设置组件
├── TeleportModal 传送模板
├── TreeItem 递归具体项
├── VModelDialog 对话组件
src/constants/
├── navigation.ts 导航项类型定义
src/directives/
├── index.ts 自定义指令文件
src/hooks/ 自定义Hooks文件
├── useDebounce.ts
├── useFetch.ts
├── useImageToBase64.ts
├── useLocalStorage.ts
├── useMousePosition.ts
├── useResize.ts
src/types/
├── global.d.ts 全局类型声明文件
src/utils/
├── bus.ts bus类
├── globalFunctions.ts 全局函数定义文件
src/views/note/
├── Component/
│   ├── componentRelated 组件相关主文件
│   ├── dynamicComponent 动态组件
│   ├── GlobalComponent 全局组件
│   ├── ParentComponent 递归父组件
├── parent_child/
│   ├── contentIndex 子组件
│   ├── headerIndex 子组件
│   ├── menuIndex 子组件
│   ├── parentChildComponent 主父组件
├── template/
│   ├── waterFall/
│       ├── waterFall 瀑布流父组件
│       ├── waterFallChild 瀑布流子组件
│   ├── dynamicEvent 动态事件
│   ├── shoppingCart 购物车
│   ├── vMemo
├── async&suspense 相关
├── basicCommand 基本命令
├── brother&bus 基本命令
├── computed 相关
├── directive 相关
├── globalFunctions 相关
├── hooks 相关
├── keepAlive 相关
├── map 相关
├── provide&inject 相关
├── reactive 相关
├── ref 相关
├── slot 相关
├── teleport 相关
├── to 相关
├── transitionGroup 相关
├── transition 相关
├── VModel 相关
├── watchEffect 相关
├── watch 相关
src/views/
├── CategoryView 分类视图组件
├── HomeView 首页组件
src/
├── App 导航主界面文件
├── main.ts 主程序文件+更新注册全局函数和变量
```
