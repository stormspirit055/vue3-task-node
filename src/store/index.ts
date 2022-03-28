import { defineStore } from "pinia"
import { ViPath, MenuInfo, Job, ProjectInfo, JobPositionMap, Path, Tab, Positionitem, Mode } from './types'
import { PROJECT_STATUS, EXECUTE_TYPE, COMMAND_TYPE, STORE_TYPE, JOB_STATUS, JOB_TYPE } from '@/types/stateMap'
import Vue from 'vue'
export type dagState = {
  count: number,
  mode: Mode,
  split: number,
  viPathingData: ViPath,
  menuInfo: MenuInfo,
  jobs: Job[],
  projectInfo: ProjectInfo,
  currentTab: Tab,
  currentJob: Job,
  tabs: Tab[],
  jobPositionMap: JobPositionMap,
  paths: Path[]
}
export const useDagStore = defineStore('dag',{
  state: () => ({
    mode: 'SQL',
    count: 1,
    split: 2,
    viPathingData: {
      isShow: false
    },
    menuInfo: {
      isShow: false
    },
    jobs: [],
    projectInfo: {
      projectId: 0,
      userId: 0,
      projectStatus: PROJECT_STATUS.START,
      projectName: '',
      comment: '',
      dag: '',
      executeType: EXECUTE_TYPE.MANUAL,
    },
    currentTab: {
      type: 'dag',
      id: 0,
      title: 'dag',
      unionKey: 'dag_0',
    },
    currentJob: {
      projectId: 0,
      id: 0,
      jobName: '',
      command: '',
      commandType: COMMAND_TYPE.HIVE,
      storeType: STORE_TYPE.MYSQL,
      storeMeta: '',
      requestParam: '',
      jobStatus: JOB_STATUS.ENABLED,
      jobType: JOB_TYPE.hive,
      jobDesc: '',
      parents: [],
    },
    tabs: [],
    jobPositionMap: {},
    paths: []
  } as dagState),
  getters: {
    getCount: (state) => state.count,
    getViPathingData: (state): ViPath => state.viPathingData,
    getMode: (state): Mode => state.mode,
    getMenuInfo: (state): MenuInfo => state.menuInfo,
    getCurrentJob: (state): Job => state.currentJob,
    getProjectInfo: (state): ProjectInfo => {
      return state.projectInfo ? JSON.parse(JSON.stringify(state.projectInfo)) : {}
    },
    getJobs: (state): Job[] => state.jobs,
    getTabs: (state): Tab[] => state.tabs,
    getCurrentTab: (state): Tab => state.currentTab,
    getPaths: (state): Path[] => state.paths,
    getJobPositionMap: (state): JobPositionMap => state.jobPositionMap,
    getSplit: (state): number => state.split
  },
  actions: {
    increment() {
      this.count++
    },
    setMode(data: Mode) {
      this.mode = data
    },
    setSplit(data: number) {
      this.split = data
    },
    setViPathingData(data: ViPath) {
      this.viPathingData = data
    },
    setMenuInfo(obj: MenuInfo) {
      this.menuInfo = obj
    },
    setCurrentJob(id: number) {
      const job = this.jobs.filter(v => v.id === id)[0]
      this.currentJob = job
    },
    setProjectInfo(obj: ProjectInfo) {
      this.projectInfo = obj
    },
    setTabs(tabs: Tab[]) {
      this.tabs = tabs
    },
    setCurrentTab(unionKey: string) {
      const index = this.tabs.findIndex(v => v.unionKey === unionKey)
      this.currentTab = this.tabs[index]
    },
    setJobs(jobs: Job[]) {
      this.jobs = jobs
    },
    deleteJobPositionItem(id: number) {
      delete this.jobPositionMap[id]
    },
    addJobPositionItem(obj: Positionitem) {
      this.jobPositionMap[obj.id] = {
        x: obj.x,
        y: obj.y,
      }
    },
    modifyJobPositionItem(obj: Positionitem) {
      this.jobPositionMap[obj.id] = {
        x: obj.x,
        y: obj.y,
      }
    },
    initJobPositionItem(map: JobPositionMap) {
      this.jobPositionMap = map
    },
    getProjectDetail(projectId: number) {

    },
    getJobsAction(porjectId:number) {
      
    }
  }
})