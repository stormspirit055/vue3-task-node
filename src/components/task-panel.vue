<script setup lang='ts'>
import { defineProps, computed, ref } from 'vue'
import { DragNode } from '@/types/nodeTypes'
import { getContainersTop, getContainersLeft } from '@/utils/utils'
const prefixCls = 'task-work-area'
const emit = defineEmits(["on-add-nodemodel"])
const props = defineProps({
  width: Number,
  height: Number,
  svgWidth: Number,
  svgHeight: Number,
})
const areaStyles = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
  }
})
const classes = computed(() => {
  return [
    `${prefixCls} workarea`,
  ]
})
function onAddNodeModel(event: DragEvent) {
  const node = event.dataTransfer?.getData('nodemodel')
  if (node) {
    const svgArea = ref<null | HTMLElement>(null)
    const parseNode = JSON.parse(node)
    const nodeObj: DragNode = {
      jobType: parseNode.id,
      positionX: +((event.clientX - getContainersLeft(svgArea.value!))).toFixed(1) - 90,
      positionY: +((event.clientY - getContainersTop(svgArea.value!))).toFixed(1) - 15,
      jobName: 'newJob',
      jobId: 0,
    }
    emit('on-add-nodemodel', event, nodeObj)
  }
    // this.$emit('on-add-nodemodel', event, nodeObj)
}
</script>
<template>
   <div  :class="classes" ref="svgArea" :style="areaStyles" @dragover.prevent @drop.prevent="onAddNodeModel">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" :width="svgWidth" :height="svgHeight" :id="id">
      <g :transform="'translate(0,0) scale(1, 1)'">
        <g>
          <slot></slot>
        </g>
      </g>
    </svg>
  </div>
</template>
<style>
 
</style>
