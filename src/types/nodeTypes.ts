import { JOB_TYPE, JOB_STATUS} from './stateMap'
export interface Nodemodel {
  id: number
  label: string
}
export type TransferNodeModel = {
  offsetY: number, // 开始拖拽时, 光标位置与dom坐标的偏移
  offsetX: number,
  id: number
}
export interface Nodeport {
  id: string
  isConnected?: boolean
}
export interface DragNode {
  jobId: number
  x: number
  y: number
  inPort?: Nodeport
  outPort?: Nodeport
  jobName?: string
  jobStatus?: number
  jobType: JOB_TYPE
  parents?: number[]
  projectHistoryId?: number
}
export interface Path {
  startPort: string
  endPort: string
  startPos?: number[]
  endPos?: number[]
}
export interface JobAndRelationVOListItem {
  jobId: number
  jobStatus: JOB_STATUS
  jobName: string
  jobParentIds: number[]
  jobHistoryId: number
  projectHistoryId: number
  jobType: JOB_TYPE
  name?: string
  inPort?: Nodeport
  outPort?: Nodeport
  x?: number
  y?: number
}
