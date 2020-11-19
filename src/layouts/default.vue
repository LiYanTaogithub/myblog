<template>
    <!-- <Nuxt /> -->
  <div id="app" :class="{adminCssstyle: $route.path.includes('admin')}">
    <!-- <div v-show="!TypeChange" class="moon"></div>
    <div v-show="TypeChange"  class="night"></div> -->
    <Header
      v-if="!$route.path.includes('admin')"
      :class="{active:$route.name != 'home'}"
      class="header"
    >
    </Header>
    <!-- <Light @changeColor="changeStoreColor"></Light> -->
    <!-- <keep-alive exclude="ArticleDetail,profile">
      <router-view :class="{router_content: $route.name !== 'home'}" :style="{minHeight: minHeight}" v-if="isRouterAlive"/>
    </keep-alive> -->
    <!-- 使用nuxt -->
    <nuxt keep-alive :keep-alive-props="{exclude: excludeArr}" v-if="isRouterAlive"></nuxt>
    <Loading class="LoadingStyle" v-show="LoadingShow"/>
    <Footer v-if="!$route.path.includes('admin')"></Footer>
    
  </div>
    
</template>

<script>
import Header from '../components/Header'
// import Light from '../components/light'
import Footer from '../components/Footer'
import Loading from '../components/loding/Loding'
import { store, mutations } from '../store/index'
export default {
  components:{
    Header,
    // Light,
    Footer,
    Loading
  },
  data() {
    return {
      isRouterAlive: true,
      excludeArr: ['ArticleDetail','profile']
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  computed:{
    LoadingShow(){
      return store.LoadingShow
    },
    TypeChange() {
      return store.switch
    }
  },
  methods:{
    reload () { 
      console.log('reload.....')
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    changeStoreColor(){
      mutations.updateColor(!store.switch)
    }
  }
}
</script>

<style lang="scss" scope>
*{
  list-style: none;
}
body,html {
  width: 100%;
  height: 100%;
  font-family: 'Courier New', Courier, monospace;
}
#app {
    font-family: Athelas, STHeiti, Microsoft Yahei, serif;
    display: flex;
    flex-direction: column;
    .moon,.night {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      z-index: -99;
    }
    .night {
      background: url('../assets/images/night.gif') center;
    }
    // .moon {
    //   background: url('../assets/images/light.jpg') center;
    // }
    .router_content {
       animation: animate 2s;
    }
    .header{
      width: 100%;
      height: 3rem;
      position: absolute;
      top: 0;
      z-index: 999;
      transition: all 0.6s;
    }
    .active,
    .current {
      position: sticky;
      // background: linear-gradient(#333, #456);
      background: #34495e;
      animation: animate 1s;
    }
    @keyframes animate {
      0% { opacity: 0; transform: translateY(-50px);}
      100% { opacity: 1; transform: translateY(0);}
    }
    .LoadingStyle {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,.6);
    }
  }
  .adminCssStyle {
    background: #fff!important;
  }
</style>
