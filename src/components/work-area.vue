<script setup lang="ts">
import controlPanel from './control-panel.vue';
import taskPanel from './task-panel.vue';
import { ref } from 'vue'

</script>

<template>
  <div class="work_area">
    <control-panel />
    <task-panel />
  </div>
</template>

<style lang='less' scoped>
.work_area{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
}
</style>
