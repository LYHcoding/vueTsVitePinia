<template>
  <div class="menu">
    <div class="titleText"> 菜单区域 {{ title }} </div>
    <div>{{ data }}</div>
  </div>
</template>

<script setup lang="ts">
// // 使用方法一：defineProps是无须引入的直接使用即可，直接定义props的类型即可（ts特有）
// defineProps<{
//   title:string,
//   data:number[]
// }>()
// // 使用方法二：ts特有默认值方式
// defineProps({
//     title:{
//         default:"",
//         type:String
//     },
//     data:Array
// })
// 使用方法二：defineProps 可以使用类型定义，也可以使用 withDefaults 定义默认值
type Props = {
  title?: string,
  data?: number[]
}
withDefaults(defineProps<Props>(), {
  title: "张三",
  data: () => [0, 1, 2]
})
</script>

<style scoped>
.titleText {
  color: gray;
}
.split {
  display: flex;
}
.split div {
  flex: 1;
}
</style>
