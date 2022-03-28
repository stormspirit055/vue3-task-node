type ExecuteTypeMap = {
  [key: string]: {
    id: number,
    label: string,
  }
}
export const EXECUTE_TYPE_MAP: ExecuteTypeMap = {
  MANUAL : {
    id: 0,
    label: '手动执行',
  },
  SCHEDULER: {
    id: 1,
    label: '定时执行',
  },
  CUSTOM_SQL: {
    id: 2,
    label: '自定义执行',
  },
}
type RunProjectStatusMap = {
  [key: string]: {
    id: number,
    label: string,
  }
}
export const RUN_PROJECT_STATUS_MAP: RunProjectStatusMap = {
  INIT: {
    id: 0,
    label: '初始化',
  },
  SUCCESS: {
    id: 1,
    label: '成功',
  },
  FAILED: {
    id: 2,
    label: '失败',
  },
  RUNNING: {
    id: 3,
    label: '运行中',
  },
  WAIT: {
    id: 6,
    label: '等待中',
  },
}
type JobTypeMap = {
  [key: number]: {
    key: string,
    label: string,
  }
}
export const JOB_TYPE_MAP: JobTypeMap = {
  3: {
    key: 'hive',
    label: 'hive',
  },
  12: {
    key: 'spark',
    label: 'spark sql',
  },
  20: {
    key: 'python',
    label: 'python',
  },
}
export const JOB_TYPE_MAP_SORT = ['3', '12', '20']
export function judgeJobType(id: number, target: string): boolean {
  return JOB_TYPE_MAP[id].key === target
}
export const baseUrl = ''
