<template>
  <!-- 组件：全局组件，局部组件，递归组件 -->
  <div class="componentRelated">
    <div class="component border">
      <a class="titleText">component:</a><br />
      <div class="globalComponent split">
        <div>Global Component 全局组件</div>
        <div></div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script setup lang="ts">

//

</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
  padding: 5px;
}
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
