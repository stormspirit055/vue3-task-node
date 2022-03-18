import { JOB_TYPE, JOB_STATUS} from './stateMap'
export interface Nodemodel {
  id: string
  key: string
  label: string
}
export interface Nodeport {
  id: string
  isConnected?: boolean
}
export interface DragNode {
  jobId: number
  positionX: number
  positionY: number
  inPort?: Nodeport
  outPort?: Nodeport
  jobName?: string
  jobStatus?: number
  jobType?: JOB_TYPE
  parents?: number[]
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
  positionX?: number
  positionY?: number
}
