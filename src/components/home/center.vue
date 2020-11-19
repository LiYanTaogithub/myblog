<template>
    <div id="center">
        <div class="wrapper">
            <div class="slash"></div>
            <div class="sides">
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
            </div>
            <div class="text">
                <div class="text--backing">CODING</div>
                <div class="text--left">
                    <div class="inner">CODING</div>
                </div>
                <div class="text--right">
                    <div class="inner">CODING</div>
                </div>
            </div>
        </div>
        <div class="loading">
            <span class="status online"></span>
            <span class="status invisible"></span>
            <span class="status idle"></span>
            <span class="status offline"></span>
        </div>
        <div class="navgation">
            <div v-for="(item, index) in navgation" :key="index" @click="triggerPage(item.path)">
                <i :class="item.icon">{{item.name}}</i>
            </div>
        </div>
        <div class="talk-method">
            <i class="iconfont icon-weixin"> : vxidleah</i>
            <i class="iconfont icon-qq"> : 1742319556</i>
        </div>
        <!-- <div class="motto">逆袭随时可能发生，亡羊补牢什么时候都不晚！</div> -->
    </div>
</template>
<script>
import '../../assets/iconfont/iconfont.css'
import '../../assets/iconfont2/iconfont.css'
import '../../assets/iconfont3/iconfont.css'
import '../../assets/iconfont4/iconfont.css'
import '../../assets/iconfont5/iconfont.css'
export default {
    name:'Center',
    data() {
        return {
            navgation:[
                { name:' 文章',icon:'iconfont icon-wenzhang', path:'/article' },
                { name:' 个人简历',icon:'iconfont icon-guanyu', path:'/profile' },
                { name:' 爬坑日记',icon:'iconfont icon-data_selfservice', path:'https://www.cnblogs.com/lyt0207/' },
                { name:' 学习笔记',icon:'iconfont icon-lianjie', path:'http://codeleah.gitee.io/leah_blog/blog/frontend/js/this.html' },
                { name:' Github',icon:'iconfont icon-GitHub', path:'https://github.com/LiYanTaogithub' },
            ]
        }
    },
    methods:{
        triggerPage(path){
            if (path === 'https://github.com/LiYanTaogithub') {
                window.open(path)
            }else if(path === 'https://zhousiwei.gitee.io/') {
                window.open(path)
            }else if(path === 'https://www.cnblogs.com/lyt0207/'){
                window.open(path)
            }else if(path === 'http://codeleah.gitee.io/leah_blog/blog/frontend/js/this.html'){
                window.open(path)
            } else {
                this.$router.push(path)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/css/lizi.css');
#center {
    font-family: Athelas, STHeiti, Microsoft Yahei, serif;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   .navgation,
   .talk-method {
       margin: 2rem 0;
       white-space: nowrap;
       display: flex;
       .iconfont {
           color: white;
           margin: 0.3rem;
           font-size: 0.9rem;
           transition: all 0.6s;
           cursor: pointer;
       }
       .iconfont:hover {
           color: rgb(66, 245, 135);
           opacity: .8;
       }
   }
   .talk-method {
       margin:0;
   }
   .loading {
       margin: 2rem 0 0 0;
    .status {
        position: relative;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        margin: 10px;
        }
        .status.online, .status.online:before {
        background: #72ff7d;
        }
        .status.offline, .status.offline:before {
        background: #ff4242;
        }
        .status.invisible, .status.invisible:before {
        background: #42e5ff;
        }
        .status.idle, .status.idle:before {
        background: #ffda72;
        }
        .status:before {
        content: '';
        display: block;
        position: absolute;
        left: -5px;
        top: -5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        animation: pulse 1.5s infinite ease-in;
        }
        @keyframes pulse {
        from {
            transform: scale(0.5);
            opacity: 1;
        }
        to {
            transform: scale(1.5);
            opacity: 0;
        }
        }
   }
   .container_img {
       margin-bottom: 2rem;
   }
   h3 {
       margin-bottom: 4rem;
       color: #f2f2f2;
       font-size: 2rem;
   }
   @media screen and(max-width:568px) {
       .container_img {
           border-radius: 50%;
           width: 100px;
           height: 100px;
           overflow: hidden;
       }
       img {
           margin-left: -2rem;
       }
   }
   .motto {
       margin: 50px auto;
       color: #fff;
       font-size: 0.5rem;
   }
}
//   body {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     background-color: #000;
//     overflow: hidden;
// }

</style>