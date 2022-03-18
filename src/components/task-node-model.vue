<script setup lang='ts'>
import { computed, defineProps } from 'vue'

function dragStart(event: DragEvent) {
  console.log(event)
}
</script>
<template>
  <div class="task_node_model"  @dragstart='dragStart($event)'>
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
.task_node_model{
  width: 100px;
  cursor: grab;
  .Tcvh(30px);
  border: 1px solid var(--primary);
  border-radius: 4px;
  color: var(--black);
}
</style>
