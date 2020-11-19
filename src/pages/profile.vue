<template>
    <div class="aboutme">
        <div class="baseInfo_box">
            <div class="about_title">
                人生的苦难，终会被我们在无数个独自承受的夜里包裹起来，变成珍珠，择日择机，献给最爱的人。
            </div>
            <div class="base_info">
                <img src="../assets/images/nihong.jpg" alt="">
                <div>
                    <div>我叫 <strong>leah</strong>，一年半前端开发经验，努力学习充电，励志进大厂拧螺丝...</div>
                </div>
            </div>
        </div>
        <div class="workExperience">
            <div class="worktitle">工作经历</div>
            <div class="main">
                <div class="left">
                    <div>北京数知科技股份有限公司</div>
                    <div>web前端开发工程师</div>
                </div>
                <div class="right">
                    <div class="worktime">2018.12-至今</div>
                    <div class="workitem">
                        <li>负责前端项目实施</li>
                        <li>负责前端项目实施</li>
                        <li>负责前端项目实施</li>
                    </div>
                </div>
            </div>
        </div>
        <div class="skill">
            <div class="skilltitle">技术栈</div>
            <div class="main">
                <div class="left">Vue、React</div>
                <div class="right">
                    <p class="skillitem">熟悉软件开发的整个流程，喜欢技术，乐于学习！</p> 

                    <p class="skillitem">主要涉及的技术：Javascript前端开发，主要用的前端框架有Vue、React，熟悉一门后端语言NodeJs，熟悉数据库mongodb和mysql</p>

                    <!-- <p class="skillitem">● Github ➡️ https://github.com/JoeyBling</p> 
                    <p class="skillitem">● 技术笔记 ➡️ https://zhousiwei.gitee.io/ibooks/</p> -->
                    <p class="skillitem">接下来将会学习计算机基础相关知识...</p>
                </div>
            </div>
        </div>
        <div class="connectme">
            <div class="connecttitle">
                关于我
            </div>
            <div>
                <div style="font-size:1rem">
                    <!-- 毕业一年，北漂一年半，经历的有点多，总的来说就是被人按在地上摩擦，经历过感情的失败，工作的不顺，经常鼓励自己说，会好起来的，但心里却无比清楚，以后的每一天都要比当下艰难，迷茫过，彷徨过。
                    可时间不会为任何人停留，生活也不会因为你是女生就变得相对容易一些。还是要相信人生的苦难终会被我们在无数个独自承受的夜里包裹起来，变成珍珠，择日择机，献给最爱的人。为自己而存在，爱自己，支持自己！加油！ -->
                </div>
                <div class="space">一个人走的路，自由但也孤独</div>
                <img src="../assets/images/myvx.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.aboutme {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 100%;
    // margin: 10px 0;
    .baseInfo_box {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        z-index: 2;
        height: 500px;
        background: #34495e;
        // text-align: center;
        .about_title {
            color: #fff;
            position: absolute;
            font-size: 1.8rem;
            top: 20%;
            margin: 0;
            font-family: -webkit-pictograph;
        }
        .base_info {
            width: 1000px;
            min-height: 400px;
            padding: 40px 20px 20px;
            position: absolute;
            top: 40%;
            background: #fff;
            font-size: 1rem;
            color: #000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            img {
                width: 100%;
                height: 600px;
            }
        }
    }
    .workExperience {
        width: 1000px;
        min-height: 400px;
        margin: 500px 0 30px 0;
        padding: 40px 20px 20px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        .worktitle {
            font-size: 1.5rem;
            color: #000;
            margin-bottom: 10px;
        }
        .main {
            width: 100%;
            height: 300px;
            background: #34495e;
            display: flex;
            flex-direction: row;
            color: #fff;
            padding: 20px;
            .left {
                width: 40%;
                font-size: 1.3rem;
                

            }
            .right {
                width: 60%;
                
                .worktime {
                    font-size: 1.3rem;
                    margin-bottom: 10px;
                }
                .workitem {
                    font-size: 1rem;
                    li {
                        list-style: disc;
                        margin: 10px;
                    }
                }
            }
        }
    }
    .skill {
        width: 1000px;
        min-height: 400px;
        padding: 40px 20px 20px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        .skilltitle {
            font-size: 1.5rem;
            color: #000;
            margin-bottom: 10px;
        }
        .main {
            width: 100%;
            height: 300px;
            background: #34495e;
            display: flex;
            flex-direction: row;
            color: #fff;
            padding: 20px;
            .left {
                width: 40%;
                font-size: 1.3rem;
            }
            .right {
                width: 60%;
                .skillitem {
                    font-size: 1rem;
                    margin: 10px 0;
                }
                
            }
        }
    }
    .connectme {
        width: 1000px;
        min-height: 400px;
        padding: 40px 20px 20px;
        background: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        margin-top: 30px;
        .connecttitle {
            font-size: 1.5rem;
            color: #000;
            margin-bottom: 10px;
        }
    }
    .space {
        font-size: 1rem;
        color: #000;
    }
}
</style>