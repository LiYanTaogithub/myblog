<template>
    <div id="lampadario" @click="changeBgColor">
        <!-- <input type="radio" name="switch" value="on" />
        <input type="radio" name="switch" value="off" checked="checked" />
        <label  for="switch">
          time
        </label> -->
        <div class="clock-box">
          <div class="clock" :style="{background:clockback}">
            <div class="time">
              <div>{{time.year}}</div>
              <div>{{time.date}}</div>
            </div>
            
          </div>
          <!-- <div>
            
          </div> -->
        </div>
        <!-- <div id="filo"></div> -->
        <div id="lampadina">
            <div  id="sorpresa">
                <div id="footer">.</div>
            </div>
        </div>
    </div>
</template>
<script>
import {store} from '../store/index'
export default {
    name:'Light',
    data(){
      return {
        time:{},
        timer:''
      }
    },
    methods:{
        changeBgColor() {
            this.$emit('changeColor')
        },
        date(){
            const date = new Date();
            const year = date.getFullYear();
            const target = new Date(year, 11, 31, 23, 59, 59);
            const time = (target - date)/1000;

            const day = Math.floor(time/(24*60*60));
            const hour = Math.floor(time%(24*60*60)/(60*60));
            const minute = Math.floor(time%(24*60*60)%(60*60)/60);
            const second = Math.floor(time%(24*60*60)%(60*60)%60);

            this.time = {
                year: `${year}年倒计时`,
                date: `${day} 天 ${hour} 时 ${minute} 分 ${second}秒`
            }
        },
    },
    computed:{
      clockback() {
        return store.clockback
      }
    },
    mounted(){
      this.timer = setInterval(this.date, 1000)
    }
}
</script>
<style scoped>
#lampadario {
  position: fixed;
  left: 5%;
  top: 0;
  cursor: pointer;
  z-index: 1;
  
}
.clock-box {
   width:120px;
   height:120px;
   /* margin:100px auto; */
   position: fixed;
   left: 65px;
   /* border:1px solid #00ff90; */
}

.clock {
   width: 2px;
   height: 100px;
   background: #000000;
   margin: 40px auto;
   position: relative;
 }

.clock::after {
   content: "";
   position: absolute;
   bottom: -130px;
   left: -65px;
   width: 130px;
   height: 130px;
   border-radius: 50%;
   background: #ff3b00;
}
.time {
  position: absolute;
   bottom: -120px;
   left: -60px;
   width: 120px;
   height: 120px;
   z-index: 100;
   padding: 25px 5px;
   color: #fff;
   font-family: 'Courier New', Courier, monospace;
   font-weight: bold;
   font-size: 1rem;
}

.clock {
   -webkit-animation: go 1.5s ease-in-out alternate infinite;
   -moz-animation: go 1.5s ease-in-out alternate infinite;
   animation: go 1.5s ease-in-out alternate infinite;
}
@keyframes go {
   0% {
       -webkit-transform: rotate(30deg);
       -webkit-transform-origin: top center;
       -moz-transform: rotate(30deg);
       -moz-transform-origin: top center;
       transform: rotate(30deg);
       transform-origin: top center;
    }
    100% {
       -webkit-transform: rotate(-30deg);
       -webkit-transform-origin: top center;
       -moz-transform: rotate(-30deg);
       -moz-transform-origin: top center;
       transform: rotate(-30deg);
       transform-origin: top center;
    }
}

</style>