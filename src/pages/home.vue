<template>
    <div class="home">
        <Center class="center"></Center>
        <ul class="bg-bubbles">
            <li v-for="i in 10" :key="i"></li>
        </ul>
    </div>
</template>
<script>
import Center from '../components/home/center'
export default {
    name:'Home',
    components:{
        Center
    }
}
</script>
<style lang="scss" scoped>
.home {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    z-index: 5;
   .center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: linear-gradient(135deg,#8e44ad,#2980b9,#633bd3,#192f44,#27ae60); //linear-gradient（背景颜色线性渐变）
    background-size: 800%;
    z-index: -5;
    li {
        position: absolute;
        bottom: -160px;
        width: 60px;
        height: 60px;
        background-color: rgba(255, 255, 255, 0.15);
        list-style: none;
        animation: square 10s infinite;
        transition-timing-function: linear;
        &:nth-child(1) {
            left: 10%;
        }
        &:nth-child(2) {
            left: 20%;
            width: 90px;
            height: 90px;
            animation-delay: 2s;
            animation-duration: 7s;
            border-radius: 50%;
        }
        &:nth-child(3) {
            left: 25%;
            animation-delay: 4s;
        }
        &:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;
            animation-duration: 8s;
            background-color: rgba(255, 255, 255, 0.3);
        }
        &:nth-child(5) {
            left: 70%;
            border-radius: 50%;
        }
        &:nth-child(6) {
            left: 80%;
            width: 100px;
            height: 100px;
            animation-delay: 3s;
            background-color: rgba(255, 255, 255, 0.2);
        }
        &:nth-child(7) {
            left: 32%;
            width: 120px;
            height: 120px;
            animation-delay: 2s;
        }
        &:nth-child(8) {
            left: 55%;
            width: 40px;
            height: 40px;
            animation-delay: 4s;
            animation-duration: 15s;
            border-radius: 50%;
        }
        &:nth-child(9) {
            left: 25%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 12s;
            background-color: rgba(255, 255, 255, 0.3);
        }
        &:nth-child(10) {
            left: 85%;
            width: 120px;
            height: 120px;
            animation-delay: 5s;
            border-radius: 50%;
        }
    }
    // 自定义 square 动画；
    @keyframes square {
        0% {
            opacity: 0.5;
            transform: translateY(0px) rotate(0);
        }
        50%{
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100vh) rotate(360deg);
        }
    }
  }
}
</style>