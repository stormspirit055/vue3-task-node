<script setup lang='ts'>
import { ref, defineProps, PropType, computed, onMounted, watch, onBeforeUpdate } from 'vue'
import Line from '@/utils/line'
import { Path } from '@/store/types'
const emit = defineEmits([
  'on-mouse-over',
  'on-mouse-out',
  'on-mouse'
])
const prefixCls = 'task-tline'
const lpath = ref('M0 0 Q 0 0, 0 0 T 0 0')
const isDraw = ref(false)
const conRef = ref<null | HTMLElement>()
const wrapRef = ref<null | HTMLElement>()
const props = defineProps({
  portData: Object as PropType<Path>,
})
const classes = computed(() => [
  `${prefixCls}`,
])
const conCls = computed(() => [
  `${prefixCls}-con`,
])
const conWrapCls = computed(() => [
  `${prefixCls}-con-wrap`,
])
const conWrapHoverCls = computed(() => [
  `${prefixCls}-hover`,
])
function drawCurvePath() {
  if (props.portData!.Mxy && props.portData!.Txy) {
    lpath.value = Line.drawCurvePath(props.portData!.Mxy, props.portData!.Txy)
  }
  return lpath.value
}
onBeforeUpdate(() => {
  if (!isDraw.value) {
    drawCurvePath()
  }
  isDraw.value = false
})
onMounted(() => {
  drawCurvePath()
  isDraw.value = true
  const _this = conRef.value as HTMLElement
  const wrap = wrapRef.value as HTMLElement
  _this.addEventListener('mouseover', () => {
    wrap.classList.add(conWrapHoverCls.value[0])
    emit('on-mouse-over', wrap, props.portData)
  })
  _this.addEventListener('mouseout', () => {
    wrap.classList.remove(conWrapHoverCls.value[0])
    emit('on-mouse-out', wrap, props.portData)
  })
})
function mouseFn(event: MouseEvent) {
  event.stopPropagation()
  emit('on-mouse', event, props.portData)
}
watch(
  () => props.portData,
  (newV, oldV) => {
    if (!isDraw.value) {
      drawCurvePath()
    }
    isDraw.value = false
  }
)
</script>
<template>
  <g :class="classes">
    <path :class="conWrapCls" ref="wrapRef" :d="lpath">
    </path>
    <path :class="conCls" ref="conRef" :d="lpath" @contextmenu.prevent="mouseFn">
    </path>
  </g>
</template>
<style>
 
</style>
