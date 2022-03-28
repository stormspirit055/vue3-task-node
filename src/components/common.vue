<script setup lang='ts'>
import node from "./node.vue"
import { JOB_TYPE_MAP } from '@/config'
import { defineProps, PropType, ref, computed, onMounted } from "vue";
import { DragNode } from "@/types/nodeTypes";
import InPort from './inport.vue'
import OutPort from "./outport.vue";
const prefixCls = 'task-common-node'
const props = defineProps({
  node: Object as PropType<DragNode>,
  updateFunc: Function as PropType<() => void>
})
const id = computed(() => `${prefixCls}-${props.node?.jobId}`)
const classes = computed(() => [
  `${prefixCls}`,
])
const iconCls = computed(() => [
  `${prefixCls}-icon`,
])
const nameCls = computed(() => [
  `${prefixCls}-name`,
])
onMounted(() => console.log(props.node))
const statusColor = computed(() => {
  console.log(!props.node?.projectHistoryId)
  if (!props.node?.projectHistoryId)  {
    if (props.node?.jobStatus === 2) {
      return 'var(--disabled)'
    }
    return 'var(--warning)'
  } else {
    if (props.node?.jobStatus === 1) { return 'var(--success)' }
    if (props.node?.jobStatus === 2) { return 'var(--error)' }
    if (props.node?.jobStatus === 6) { return 'var(--info)' }
    return 'var(--warning)'
  }
})
const emit = defineEmits([
  "on-drag-start",
  "on-drag-ing",
  "on-select",
  "on-drag-end",
  "on-mouse",
  "on-add-path"
])
const projectStatus = ref(0)
function selectNodeMethod(event: MouseEvent) {
  emit("on-select", event, props.node)
}
function dragGing(event: DragEvent) {
  emit("on-drag-ing", event)
}
function dragStart(event: DragEvent) {
  event.dataTransfer?.setData("nodedata", JSON.stringify(props.node))
  console.log('dragStart', props.node)
  emit("on-drag-start", event, props.node)
}
function dragEnd(event: DragEvent) {
  emit("on-drag-end", event, props.node)
}
function mouseMenu(event: MouseEvent) {
  event.stopPropagation()
  emit("on-mouse", event, props.node)
}
function addPath(event: DragEvent, outPortId: string, inPortId: string) {
  console.log('on-add-path')
  emit("on-add-path", event, outPortId, inPortId)
}
function updateTemp() {
  props.updateFunc!()
}
</script>
<template>
  <node :node="props.node" :projectStatus='projectStatus'  @on-select="selectNodeMethod" @on-drag-ging="dragGing" @on-drag-start="dragStart" @on-drag-end="dragEnd" @updateTem="updateTemp"  @on-mouse="mouseMenu">
    <div :id='id' :class="classes" class="nodeStyle">
      <span :class="iconCls" class="iconBg">{{JOB_TYPE_MAP[props.node!.jobType].label}}</span>
      <div  :class="nameCls">{{props.node!.jobName}}</div>
      <in-port :portId="props.node!.inPort?.id" @on-add-path="addPath"></in-port>
      <out-port :portId="props.node!.outPort?.id"></out-port>
    </div>
  </node>
</template>
<style scoped lang="less">
.nodeStyle{
  border: 1px solid v-bind(statusColor) !important;
  background: v-bind(statusColor);
  &:hover{
    opacity: 0.8 !important;
  }
}
.iconBg{
  background-color: v-bind(statusColor);
}

</style>
