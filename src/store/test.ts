import { defineStore } from 'pinia'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须，在所有 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state: () => ({
    count: 1,
    data: {
      name: 'Jerry',
      sex: '男'
    }
  }),
  // getter 第一个参数是 state，是当前的状态，也可以使用 this 获取状态
  // getter 中也可以访问其他的 getter，或者是其他的 Store
  getters: {
    // 通过 state 获取状态
    doubleCount: (state) => state.count * 2,
    // 通过 this 获取状态（注意this指向）
    tripleCount(): any {
      return this.count * 3
    }
  },
  actions: {
    updateData (newData: any, count: any) {
      // 使用 this 直接修改
      this.data = { ...newData }
      this.count = count
      
      // 使用 $patch 修改多个值
      this.$patch({
        data: { ...newData },
        count
      })
    }
  }
})