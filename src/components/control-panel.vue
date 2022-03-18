<script setup lang='ts'>
import task_node_model from './task-node-model.vue'
</script>
<template>
  <div class="control_panel_wrap" @dragover.prevent>
    <task_node_model>sql</task_node_model>
  </div>
</template>
<style lang="less" scoped>
.control_panel_wrap{
  background: rgb(184, 181, 181);
  width: 200px;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
