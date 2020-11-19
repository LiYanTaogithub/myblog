import Vue from 'vue'
// import App from './App.vue'
// import router from '../router'
// import store from './store'

// import MyHttpServer from '../network/http'
// Vue.use(MyHttpServer)
// import ViewUI from 'view-design'
// import 'view-design/dist/styles/iview.css'

// import './assets/iconfont/iconfont.css'
// import './assets/iconfont2/iconfont.css'
// import './assets/iconfont3/iconfont.css'
// import './assets/iconfont4/iconfont.css'
// import './assets/iconfont5/iconfont.css'

// import { store, mutations } from '../store/index'


// import Vuelazyload from 'vue-lazyload'
// // 图片懒加载
// Vue.use(Vuelazyload,{
//   loading:'./assets/images/loading.png'
// })


//使用mavonEditor编辑器插件
// import mavonEditor from 'mavon-editor'  //引入mavon-editor 就是上面所安装的
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)  //让Vue使用mavonEditor

Vue.config.productionTip = false
// Vue.use(ViewUI)

// 一插件的方式引入axios



// Vue.prototype.bus = new Vue()

new Vue({
  // router,
  // store,
  render: h => h(App)
}).$mount('#app')


