<script setup lang='ts'>
import { defineProps, computed, ref, onMounted } from 'vue'
import { DragNode, TransferNodeModel } from '@/types/nodeTypes'
import { getContainersTop, getContainersLeft, isCssInUnit, transferCss, getBrowserHW } from '@/utils/utils'
const prefixCls = 'task-work-area'
const emit = defineEmits(["on-add-nodemodel"])
const svgArea = ref<null | HTMLElement>()
const props = defineProps({
  width: String,
  height: String,
})
const svgWidth = ref(0)
const svgHeight = ref(0)
const areaStyles = computed(() => {
  const style = {} as any
  if (isCssInUnit(props.width + '') >= 0) {
    style.width = props.width
  } else {
    style.width = `${props.width}px`
  }
  if (isCssInUnit(props.height + '') >= 0) {
    style.height = props.height
  } else {
    style.height = `${props.height}px`
  }
  console.log(style)
  return style
})
const classes = computed(() => {
  return [
    `${prefixCls} workarea`,
  ]
})
onMounted(() => {
  setSvgHW()
  window.onresize = () => {
    setSvgHW()
  }
})
function setSvgHW() {
  const width = transferCss(props.width + '')
  const height = transferCss(props.height + '')
  if (getBrowserHW().width < width) {
    svgWidth.value = width
  } else {
    svgWidth.value = getBrowserHW().width
  }
  if (getBrowserHW().height < height) {
    svgHeight.value = height
  } else {
    svgHeight.value = getBrowserHW().height - 170
  }
}
function onAddNodeModel(event: DragEvent) {
  console.log(event)
  const node = event.dataTransfer?.getData('nodemodel')
  if (node) {
    console.log(svgArea.value)
    const transferNodeModel: TransferNodeModel = JSON.parse(node)
    // 若没有完全拖入task-panel, 则将其坐标置为0
    const nodeObj: DragNode = {
      jobType: transferNodeModel.id,
      x: event.clientX - getContainersLeft(svgArea.value!) - transferNodeModel.offsetX < 0 ? 0 : event.clientX - getContainersLeft(svgArea.value!) - transferNodeModel.offsetX,
      y: event.clientY - getContainersTop(svgArea.value!) - transferNodeModel.offsetY < 0 ? 0 : event.clientY - getContainersTop(svgArea.value!) - transferNodeModel.offsetY,
      jobName: 'newJob',
      jobId: 0,
    }
    console.log(nodeObj)
    emit('on-add-nodemodel', event, nodeObj)
  }
}
</script>
<template>
   <div  :class="classes" ref="svgArea" :style="areaStyles" @dragover.prevent @drop.prevent="onAddNodeModel">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="100%" height="100%" >
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
