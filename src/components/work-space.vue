<script setup lang="ts">
import controlPanelVue from './control-panel.vue';
import taskPanelVue from './task-panel.vue';
import { ref } from 'vue'

</script>

<template>
  <div class="work_space">
    <control-panelVue />
    <task-panelVue />
  </div>
</template>

<style lang='less' scoped>
.work_space{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
}
</style>
