<script setup lang='ts'>
import { computed, defineProps, PropType, ref } from 'vue'
import { Nodemodel, TransferNodeModel } from '@/types/nodeTypes'
const props = defineProps({
  node: Object as PropType<Nodemodel>,
})
const taskNodeModelRef = ref<HTMLElement>()
const id = ref('task_node_model' + props.node!.id)
function dragStart(event: DragEvent) {
  const nodeRect = taskNodeModelRef.value!.getBoundingClientRect()
  const node: TransferNodeModel = {
    offsetX: event.clientX - nodeRect.x,
    offsetY: event.clientY - nodeRect.y,
    id:  props.node?.id!,
  }
  event.dataTransfer?.setData("nodemodel", JSON.stringify(node))
}
</script>
<template>
  <div class="task_node_model" :id="id" ref="taskNodeModelRef" draggable="true" @dragstart='dragStart($event)'>
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
