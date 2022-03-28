<script setup lang='ts'>
import { computed } from 'vue'
import task_node_model from './task-node-model.vue'
import { Nodemodel } from '@/types/nodeTypes'
const nodeModels: Nodemodel[] = [
  {
    id: 3,
    label: 'sql',
  }, {
    id: 12,
    label: 'hive'
  }
]
</script>
<template>
  <div class="control_panel_wrap" @dragover.prevent>
    <task_node_model v-for="item in nodeModels" :node="item" :key="item.id">{{item.label}}</task_node_model>
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
