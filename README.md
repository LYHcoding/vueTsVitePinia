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
src/views/note
├── parent_child/
│   ├── parentChildComponent 主父组件
│   ├── menuIndex 子组件
│   ├── headerIndex 子组件
│   ├── contentIndex 子组件
├── template/
│   ├── 瀑布流
│       ├── 瀑布流父组件
│       ├── 瀑布流子组件
│   ├── 动态事件
│   ├── 购物车
│   ├── vMemo
├── 基本命令
├── computed 相关
├── map 相关
├── reactive 相关
├── ref 相关
├── to 相关
├── watchEffect 相关
├── watch 相关
```