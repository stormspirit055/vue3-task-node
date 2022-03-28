<script setup lang="ts">
import { DragNode, Path, Nodeport } from '@/types/nodeTypes'
import controlPanel from './control-panel.vue';
import taskPanel from './task-panel.vue';
import { ref, computed } from 'vue'
import { useDagStore } from '@/store';
import taskCurvePath from '@/components/curvepath.vue'
import taskCommonNode from '@/components/common.vue'
const workId = ref('workId')
const startNode = ref<DragNode | null>(null)
const curveRef = ref()
const dagStore = useDagStore()
function _handleAddNodeModel(event: DragEvent, nodeObj: DragNode) {
  console.log(nodeObj)
  let newNode: DragNode
  newNode = nodeObj
  newNode.jobId = new Date().getTime()
  newNode.x = nodeObj.x
  newNode.y = nodeObj.y
  newNode.inPort = {
    id:newNode.jobId + "_in",
    isConnected: false,
  }
  dagStore.addJobPositionItem({ id: newNode.jobId, x: newNode.x, y: newNode.y })
  newNode.outPort =  {
    id: newNode.jobId + "_out",
    isConnected: false,
  }
  nodes.value.push(newNode)
}
const projectInfo = dagStore.getProjectInfo
const paths = ref<Path[]>([])
const nodes = ref<DragNode[]>([])
function mouseFn(event: MouseEvent, portData: { startPort: string, endPort: string}) {
  console.log("mouseFn", "on-mouse", "鼠标右击路径事件", event, portData);
  const parentId = +portData.startPort.split('_')[0]
  const jobId = +portData.endPort.split('_')[0]
  _jobEditParents(parentId, jobId, false)
}
function _jobEditParents(parentId: number, jobId: number, add: boolean, startData?: string, endData?: string) {

}
function addPath(event: DragEvent, outPortId: string, inPortId: string) {
  console.log('addpath',)
  paths.value.push({
    startPort: outPortId,
    endPort: inPortId,
  });
}
function dragStart(event: DragEvent) {
  console.log(event)
  const nodedata = JSON.parse(event.dataTransfer?.getData("nodedata")!)
  console.log('dragStart', nodedata)
  startNode.value = {
    jobId:nodedata.jobId,
    x: event.clientX,
    y: event.clientY,
    jobType: nodedata.jobType
  }
}
function dragEnd(event: DragEvent, node: DragNode) { 
  nodes.value.forEach((item) => {
    if (item.jobId === node.jobId) {
      item.x = node.x + (event.clientX - startNode.value!.x)
      item.y = node.y + (event.clientY - startNode.value!.y)
      dagStore.modifyJobPositionItem({
        id: node.jobId,
        x: item.x < 0 ? 0 : item.x,
        y: item.y < 0 ? 0 : item.y
      })
    }
  })
}
function updateCompleted() {
  console.log('updateCompleted', curveRef.value)
  curveRef.value.vReload()
}
function _handleCount() {
  dagStore.increment()
  console.log(dagStore.getCount)
}
function mouseNodeMenu(event: MouseEvent, id: number) {
  console.log("mouseMenu", "on-mouse", "工作区右击事件", event, id);
}
</script>

<template>
  <div class="work_area">
    <control-panel />
    <task-panel id="workId" @on-add-nodemodel="_handleAddNodeModel" width="100%"
          height="100%">
      <task-curve-path
        :projectStatus='projectInfo.projectStatus'
        :areaId="workId"
        :paths="paths"
        ref="curveRef"
        v-on:on-mouse="mouseFn"
      ></task-curve-path>
      <task-common-node
        v-for="node in nodes"
        :projectStatus='projectInfo.projectStatus'
        :key="node.jobId"
        :node="node"
        v-on:on-add-path="addPath"
        v-on:on-drag-start="dragStart"
        v-on:on-drag-end="dragEnd"
        :updateFunc="updateCompleted"
        v-on:on-mouse="mouseNodeMenu"
      ></task-common-node>
    </task-panel>
  </div>
</template>

<style lang='less' scoped>
.work_area{
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  position: absolute;
}
</style>
