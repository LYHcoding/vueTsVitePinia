export interface NavItem {
  name: string
  label: string
  component: string
}

export interface NavCategory {
  name: string
  label: string
  expanded: boolean
  items: NavItem[]
}

export const navigationCategories: NavCategory[] = [
  {
    name: 'basic',
    label: '基础响应式',
    expanded: true,
    items: [
      { name: 'basicCommand', label: '基本指令', component: 'basicCommand.vue' },
      { name: 'refRelated', label: 'ref 相关', component: 'refRelated.vue' },
      { name: 'reactiveRelated', label: 'reactive 相关', component: 'reactiveRelated.vue' },
      { name: 'toRelated', label: 'toRef/toRefs/toRaw 相关', component: 'toRelated.vue' },
      { name: 'computedRelated', label: 'computed 相关', component: 'computedRelated.vue' },
      { name: 'mapRelated', label: 'map遍历', component: 'mapRelated.vue' },
      { name: 'watchRelated', label: 'watch 相关', component: 'watchRelated.vue' },
      { name: 'watchEffectRelated', label: 'watchEffect 相关', component: 'watchEffectRelated.vue' },
      { name: 'vModelRelated', label: 'v-model深入', component: 'vModelRelated.vue' }
    ]
  },
  {
    name: 'component',
    label: '组件通信',
    expanded: false,
    items: [
      { name: 'componentRelated', label: '全局/局部/递归组件相关', component: 'Component/componentRelated.vue' },
      { name: 'parentChild', label: '父子组件', component: 'parent_child/parentChildComponent.vue' },
      { name: 'brother&busRelated', label: '兄弟组件传参', component: 'brother&busRelated.vue' },
      { name: 'dynamicComponent', label: '动态组件', component: 'Component/dynamicComponent.vue' },
      { name: 'slotRelated', label: '插槽slot组件', component: 'slotRelated.vue' },
      { name: 'provide&injectRelated', label: '依赖注入', component: 'provide&injectRelated.vue' }
    ]
  },
  {
    name: 'advanced',
    label: '高级特性',
    expanded: false,
    items: [
      { name: 'async&suspenseRelated', label: '异步组件&Suspense', component: 'async&suspenseRelated.vue' },
      { name: 'teleportRelated', label: 'Teleport传送组件', component: 'teleportRelated.vue' },
      { name: 'keepAliveRelated', label: 'Keep-alive缓存组件', component: 'keepAliveRelated.vue' },
      { name: 'transitionRelated', label: 'Transition动画组件', component: 'transitionRelated.vue' },
      { name: 'transitionGroupRelated', label: 'Transition-group列表', component: 'transitionGroupRelated.vue' }
    ]
  },
  {
    name: 'extend',
    label: '扩展功能',
    expanded: false,
    items: [
      { name: 'directiveRelated', label: '自定义指令', component: 'directiveRelated.vue' },
      { name: 'hooksRelated', label: '自定义Hooks', component: 'hooksRelated.vue' },
      { name: 'globalFunctionsRelated', label: '全局函数变量', component: 'globalFunctionsRelated.vue' }
    ]
  },
  {
    name: 'template',
    label: '模板技巧',
    expanded: false,
    items: [
      { name: 'dynamicEvent', label: '动态事件', component: 'template/dynamicEvent.vue' },
      { name: 'vMemo', label: 'v-memo优化', component: 'template/vMemo.vue' },
      { name: 'waterFall', label: '瀑布流', component: 'template/waterFall/waterFall.vue' },
      { name: 'shoppingCart', label: '购物车', component: 'template/shoppingCart.vue' }
    ]
  },
  {
    name: 'demo',
    label: '演示',
    expanded: false,
    items: [
      { name: 'tabHome', label: '首页组件', component: '../components/TabHome.vue' },
      { name: 'tabSettings', label: '设置组件', component: '../components/TabSettings.vue' },
      { name: 'tabAbout', label: '关于组件', component: '../components/TabAbout.vue' },
      { name: 'errorComponent', label: '错误组件', component: '../components/ErrorComponent.vue' },
      { name: 'dialog', label: '对话框', component: '../components/Dialog.vue' },
      { name: 'childComponent', label: '子组件', component: '../components/ChildComponent.vue' },
      { name: 'grandChildComponent', label: '孙组件', component: '../components/GrandChildComponent.vue' },
      { name: 'greatGrandChildComponent', label: '曾孙组件', component: '../components/GreatGrandChildComponent.vue' },
      { name: 'siblingA', label: '兄弟组件A', component: '../components/SiblingA.vue' },
      { name: 'siblingB', label: '兄弟组件B', component: '../components/SiblingB.vue' },
      { name: 'tabA', label: '组件相关TabA', component: '../components/TabA.vue' },
      { name: 'tabB', label: '组件相关TabB', component: '../components/TabB.vue' },
      { name: 'tabC', label: '组件相关TabC', component: '../components/TabC.vue' },
      { name: 'globalFunctionsDemo', label: '全局函数演示组件', component: '../components/GlobalFunctionsDemo.vue' },
      { name: 'directiveDemo', label: '自定义指令演示组件', component: '../components/DirectiveDemo.vue' },
      { name: 'hooksDemo', label: '自定义钩子组件', component: '../components/HooksDemo.vue' }
    ]
  },
  {
    name: 'about',
    label: '关于',
    expanded: false,
    items: [
      { name: 'theWelcome', label: '欢迎页', component: '../components/TheWelcome.vue' },
      { name: 'helloWorld', label: 'HelloWorld', component: '../components/HelloWorld.vue' },
      { name: 'defaultApp', label: 'defaultApp', component: '../DefaultApp.vue' },
      { name: 'about', label: '关于', component: '../views/AboutView.vue' }
    ]
  }
]

export const findCategoryByItem = (itemName: string): string | undefined => {
  return navigationCategories.find(cat =>
    cat.items.some(item => item.name === itemName)
  )?.name
}
