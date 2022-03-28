<script setup lang='ts'>
import { computed, defineProps, PropType, ref, onUpdated } from "vue"
import { getBrowserHW } from "@/utils/utils"
import { DragNode } from "@/types/nodeTypes";
const nodeRef = ref<null | HTMLElement>(null)
const prefixCls = 'task-node'
const emit = defineEmits([
    "on-mouse",
    "on-select",
    "on-drag-ing",
    "on-drag-end",
    "on-drag-start",
    "updateTem"
  ])
const props = defineProps({
  node: Object as PropType<DragNode>,
  width: {
    type: Number,
    default: 140,
  },
  height: {
    type: Number,
    default: 30
  }
})
function selectNodeMethod(event: MouseEvent ) {
  emit("on-select", event, props.node, nodeRef.value)
}
function dragGing(event: DragEvent) {
  emit("on-drag-ing", event)
}
function dragStart(event: DragEvent) {
  event.dataTransfer?.setData("nodedata", JSON.stringify(props.node))
  console.log('on-drag-start')
  emit("on-drag-start", event, props.node)
}
function dragEnd(event: DragEvent) {
  emit("on-drag-end", event, props.node)
}
function mouseMenu(event: MouseEvent) {
  event.preventDefault()
  emit("on-mouse", event, props.node)
}
onUpdated(() => {
  emit('updateTem', 'VDOM加载完成')
})
const transform = computed(() => {
  let node = props.node!
  let x = node.x, y = node.y
  console.log(getBrowserHW().width, props.width)
  if (x <= 0) {
    x = 0
    node.x = 0
  } else if (x >= getBrowserHW().width) {
    x = getBrowserHW().width - props.width
    node.x = x
  }
  if (y <= 0) {
    x = 0
    node.y = 0
  } else if (x >= getBrowserHW().height) {
    x = getBrowserHW().height - props.height
    node.y = y
  }
  return `translate(${x}, ${y})`
})
const classes = computed(() => {
  return [
    `${prefixCls}`
  ]
})
</script>
<template>
  <g :transform="transform" :class="classes">
    <g transform="scale(1, 1)" class="pane-scalable">
      <foreignObject :width="width" :height="height">
        <body xmlns="http://www.w3.org/1999/xhtml">
            <div @click=selectNodeMethod($event) ref="nodeRef"  @drag='dragGing($event)' :draggable="true" @dragstart='dragStart($event)' @dragend="dragEnd($event)" @contextmenu.prevent="mouseMenu($event)">
              <slot></slot>
            </div>
        </body>
      </foreignObject>
    </g>
  </g>
</template>
<style>
 
</style>
