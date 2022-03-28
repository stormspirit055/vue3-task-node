<script setup lang='ts'>
import { ref, defineProps, computed } from 'vue'
const emit = defineEmits(['on-add-path'])
let className = ref('')
const prefixCls = 'task-port'
const props = defineProps({
  projectStatus: {
    type: Number,
    default: 1
  },
  portId: String,
  isConnected: Boolean,
})
const isDisabled = computed(() => props.projectStatus === 2)
const magnetCls = computed(() => [
  `${prefixCls}-magnet`,
])
const classes = computed(() => [
  `${prefixCls}`,
  `${prefixCls}-in`,
  props.isConnected ? 'is-connected' : ''
])
function inDropPort(event: DragEvent) {
  if (isDisabled.value) return
  if (className.value) {
    const _this = (event.target as HTMLElement).parentNode
    if (!_this) return
    (_this as HTMLElement).className = className.value
  }
  const startData = event.dataTransfer!.getData('portStart')
  if (startData.split('_')[0] === props.portId!.split('_')[0]) {
    console.log('不可首位相连')
    return
  }
  if (startData) {
    emit('on-add-path', event, startData, props.portId)
  }
}
function dragEnter(event: DragEvent) {
  if (isDisabled.value) return
  const _this = (event.target as HTMLElement).parentNode
  className.value = (_this as HTMLElement).className;
  (_this as HTMLElement).className = 'task-port task-in-out task-port-in'
}
function dragLeave(event: DragEvent) {
  if (isDisabled.value) return
  const _this = (event.target as HTMLElement).parentNode;
  (_this as HTMLElement).className = className.value
}
</script>
<template>
  <div :class="classes" :id="portId" @drop.prevent='inDropPort($event)' @dragenter="dragEnter" @dragleave="dragLeave">
      <span :class="magnetCls"></span>
  </div>
</template>
<style>
</style>
