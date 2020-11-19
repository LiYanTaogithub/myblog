import Vue from 'vue'


export const store = Vue.observable({
    isshow:false,
    switch: false, // 控制切换颜色
    clockback:'#000000', //钟摆背景颜色
    Color:'#fff', 
    LoadingShow: false,
    LoadingTitle:'正在加载内容请稍后...'
})

export const mutations = {
  updateShow(data) {
    store.isshow = data
  },
  updateColor(data) {
    console.log(data)
    console.log('mmmmm')
    store.switch = data
    data ? store.Color = '#fff': store.Color = '#333'
    data ? store.clockback = '#fff' : store.clockback = '#000000'
  },
  LoadingTitleChange(data) {
    store.LoadingTitle = data.title;
    store.LoadingShow = data.isshow;
  }
}
