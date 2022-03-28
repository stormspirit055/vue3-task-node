import { COMMAND_TYPE, STORE_TYPE, JOB_STATUS, JOB_TYPE, PROJECT_STATUS, EXECUTE_TYPE } from '@/types/stateMap'
interface Position {
  x: number
  y: number
}
export interface ViPath {
  Mxy?: Position
  Txy?: Position
  isShow: boolean
}
export interface MenuInfo {
  jobType?: number
  id?: number
  x?: number
  y?: number
  isShow: boolean
  title?: string
  jobStatus?: number
}
export interface Job {
  projectId: number
  id: number
  jobName: string
  command: string
  commandType: COMMAND_TYPE
  storeType: STORE_TYPE
  storeMeta: string
  requestParam: string
  jobStatus: JOB_STATUS
  jobType: JOB_TYPE
  jobDesc: string
  parents: number[]
  field?: string
}

export interface ProjectInfo {
  projectId: number
  userId: number
  projectStatus: PROJECT_STATUS
  projectName: string
  comment: string
  dag: string
  executeType: EXECUTE_TYPE
}
export interface JobPositionMap {
  [key: number]: {
    x: number,
    y: number,
  }
}
/*
startPort: `${id}_out`
endPort: `${id}_in`
*/
export interface Path {
  startPort: string
  endPort: string
  Mxy?: Position
  Txy?: Position
}
export interface Tab {
  id: number
  title: string
  type: string
  index?: number
  unionKey: string
}
export interface Positionitem {
  id: number
  x: number
  y: number
}
export type Mode = 'SQL' | 'PYTHON' | 'CLOUD_DESK' | 'BASE'