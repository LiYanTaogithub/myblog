<template>
  <div id="tabbarLink">
    <a v-for="(item, index) in LinkList" :key="index"  @click="triggerPage(item.path)">
      <!-- <Icon :type="item.imageURL" /> {{item.name}} -->
      <i :class="item.icon">{{item.name}}</i>
    </a>
  </div>
</template>
<script>
import '../../assets/iconfont/iconfont.css'
import '../../assets/iconfont2/iconfont.css'
import '../../assets/iconfont3/iconfont.css'
import '../../assets/iconfont4/iconfont.css'
import '../../assets/iconfont5/iconfont.css'
 export default {
    name:'Nav',
    data () {
      return {
          LinkList:[
            {name:"首页",icon:'iconfont icon-shouyex',path:'/home'},
            {name:"文章列表",icon:'iconfont icon-wenzhang',path:'/article'},
            { name:' 个人简历',icon:'iconfont icon-guanyu', path:'/profile' },
            { name:' 爬坑日记',icon:'iconfont icon-data_selfservice', path:'https://www.cnblogs.com/lyt0207/' },
            { name:' 学习笔记',icon:'iconfont icon-lianjie', path:'http://codeleah.gitee.io/leah_blog/blog/frontend/js/this.html' },
           
            // { name:' 技术笔记',icon:'iconfont icon-wenzhang', path:'https://zhousiwei.gitee.io/' },
            {name:"GitHub",icon:'iconfont icon-GitHub',path:'https://github.com/Acmenlei'},
            
          ]
      };
    },
    methods: {
        triggerPage(path) {
          if(path == '/login') {
            if(localStorage.getItem('username')) {
              this.$router.push('/logined')
              return
            }
          } else if(path == 'https://github.com/LiYanTaogithub') {
            return window.open(path)
          }else if(path === 'https://zhousiwei.gitee.io/') {
                window.open(path)
          }else if(path === 'https://www.cnblogs.com/lyt0207/'){
                window.open(path)
            }else if(path === 'http://codeleah.gitee.io/leah_blog/blog/frontend/js/this.html'){
                window.open(path)
            }else {
              this.$router.push(path)
            } 
          
        },
    },
  }
</script>
<style lang="scss" scoped>
@font-face {
  font-family: 'codeleilei';
  src: url('../../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf');
}
#tabbarLink {
  display: flex;
  height: 3rem;
  justify-content: center;
  align-items: center;
  // font-family: 'Courier New', Courier, monospace;
  a {
    // font-family: 'codeleilei';
    color: #f2f2f2;
    margin: 0 1rem;
    padding: .3rem;
    font-size: 0.9rem;
    transition: all .5s;
  }
  a:hover {
    background: #222;
    border-radius: 5px;
    color: lightgreen;
  }
}
</style>