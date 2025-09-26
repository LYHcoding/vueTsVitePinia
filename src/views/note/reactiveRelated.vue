<template>
  <div>
    <div class="reactiveRelated">
      <div class="reactiveText border">
        <div class="object">
          <a class="titleText">reactive 基础用法:</a>
          <div class="nameText">{{ person }}</div>
          <div class="nameText">{{ person.name }}</div>
        </div>
        <a class="titleText">响应式对象 reactive:</a>

      </div>
      <hr />

      <div class="reactive border">
        <a class="titleText">响应式对象 reactive:</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// reactive 复杂数据类型的响应式对象
let person = reactive({
   name:"lyh"
})
person.name = "LYH"

</script>

<style scoped>
.border {
  border: 1px solid #cccccc;
}
.titleText {
  color: gray;
}
</style>
