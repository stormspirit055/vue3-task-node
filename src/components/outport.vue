<script setup lang='ts'>
import { computed, defineProps, ref } from "vue"
import { useDagStore } from '@/store'
import { getDomPosition } from '@/utils/utils'
type Pos = {
  x: number,
  y: number
}
const props = defineProps({
  portId: String
})
const prefixCls = 'task-port'
const dagStore = useDagStore()
let Mxy: Pos = {
  x: 0,
  y: 0,
}
const classes = computed(() => [
  `${prefixCls}`,
  `${prefixCls}-out`,
])
const magnetCls = computed(() => [
  `${prefixCls}-magnet`,
])
function dragPortStart(event: DragEvent) {
  console.log(props.portId)
  const port = document.getElementById(props.portId!) as HTMLElement
  const portPosition = getDomPosition(port, 'workId')
  // 微调, 将起点调至port的中心
  Mxy = {
    x: portPosition.x + 5,
    y: portPosition.y + 2
  }
  event.dataTransfer?.setData('portStart', props.portId!)
}
function dragPortEnd(event: DragEvent) {
  dagStore.setViPathingData({
    isShow: false
  })
}
function dragPortGing(event: DragEvent) {
  const Txy = {
    x: event.clientX,
    y: event.clientY
  }
  dagStore.setViPathingData({
    Mxy,
    Txy,
    isShow: true
  })
}
</script>
<template>
  <div :class="classes" :id="props.portId" @drag.stop='dragPortGing($event)' @dragstart.stop='dragPortStart($event)' @dragend.stop="dragPortEnd($event)" draggable="true" >
    <span :class="magnetCls"></span>
  </div>
</template>
<style>
 
</style>
