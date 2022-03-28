<script setup lang='ts'>
import { ref, defineProps, PropType, computed, onMounted, watch, defineExpose } from 'vue';
import { Path, ViPath } from '@/store/types'
import { useDagStore } from '@/store'
import TLine from './tline.vue'
defineExpose({
  vReload
})
type Pos = {
  x: number,
  y: number
}
const emit = defineEmits([
  'on-mouse',
  'on-mouse-over',
  'on-mouse-out'
])
const dagStore = useDagStore()
const con = ref<Path[]>([])
const props = defineProps({
  paths: Array as PropType<Path[]>,
  areaId: String,
})
const path = computed(() => {
  const pa = dagStore.getViPathingData
  if (pa.Mxy) return {
    ...pa,
    ...computeXY(pa.Mxy, pa.Txy)
  }
  return null
})
watch(
  () => props.paths,
  (newV, oldV) => {
    console.log(newV)
    vReload()
  },
  {
    deep: true
  }
)
onMounted(() => {
  vReload()
})
function mouseFn(event: MouseEvent) {
  emit('on-mouse', event)
}
function mouseOverFn(event: MouseEvent) {
  emit('on-mouse-over', event)
}
function mouseOutFn(event: MouseEvent) {
  emit('on-mouse-out', event)
}
function vReload() {
  con.value = []
  props.paths?.forEach(v => {
    const vstart = document.getElementById(v.startPort)
    const vend = document.getElementById(v.endPort)
    const startPort = v.startPort.split('_')[0]
    const endPort = v.endPort.split('_')[0]
    console.log(dagStore.getJobPositionMap)
    if (vend && vstart) {
      const obj: Path = computeXY2(dagStore.getJobPositionMap[+startPort],
                                        dagStore.getJobPositionMap[+endPort],
                                        startPort,
                                        endPort)
      obj.startPort = v.startPort
      obj.endPort = v.endPort
      con.value.push(obj)
    }
  })
  console.log(con.value)
}
function computeXY(vStart: any, vEnd: any): Path {
  let obj: Path
  const area = document.getElementById(props.areaId!) as HTMLElement
  console.log(props.areaId)
  obj = {
    Mxy: {
      x: vStart.x,
      y: vStart.y,
    },
    Txy: {
      x: vEnd.x - area.getBoundingClientRect().left,
      y: vEnd.y - area.getBoundingClientRect().top,
    },
    startPort: '',
    endPort: '',
  }
  return obj
}
function computeXY2(startPos: Pos, endPos: Pos, startPort: string, endPort: string): Path {
    const startPortDom = document.querySelector(`#task-common-node-${startPort}`) as HTMLElement
    const endPortDom = document.querySelector(`#task-common-node-${endPort}`) as HTMLElement
    const taskLineStrokeWidth = Number(getComputedStyle(document.documentElement).getPropertyPriority('--task-tline-stroke-width').split('px')[0])
    console.log(startPos, endPos)
    console.log('computeXY2', startPos)
    let obj: Path
    obj = {
      Mxy: {
        x: startPos.x + startPortDom.offsetWidth / 2 + taskLineStrokeWidth / 2,
        y: startPos.y + startPortDom.offsetHeight,
      },
      Txy: {
        x: endPos.x + endPortDom.offsetWidth / 2  + taskLineStrokeWidth / 2,
        y: endPos.y,
      },
      startPort: '',
      endPort: '',
    }
    return obj
  }
</script>
<template>
  <g ref="gss">
    <t-line v-for="(item,index) in con" :key="index" :portData="item" v-on:on-mouse="mouseFn" v-on:on-mouse-over="mouseOverFn" v-on:on-mouse-out="mouseOutFn">
    </t-line>
    <t-line v-if="path && path.isShow" :portData="path">
    </t-line>
  </g>
</template>
<style>
 
</style>
