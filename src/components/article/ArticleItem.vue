<template>
    <div id="artcileitem" @click="articleDetail(article_id)">
        <div>
          <!-- <img src="../../assets/images/logo.jpg" alt="封面"> -->
          <img class="itemImgurl " :src="Itemimg" alt="封面">
        </div>
        <div  class="card" style="width:80%">
          <!-- xl尺寸显示的三个小球 -->
          <div class="titleContainer xl-ball">
            <!-- 文章标题 -->
            <span class="title">{{title}}</span>
            <!-- <div class="ballcontainer">
              <span class="ball" :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
            </div> -->
          </div>
          <!-- 文章简介 -->
          <div>
            <p v-html="abstract" class="content"></p>
          </div>
            
            <!-- 文章发布时间，点赞数，访问量 -->
            <div class="article-item-icon">
              <div class="access_me">
                <img src="../../assets/images/headerlogo.jpg" alt="">
                </div>
                <div class='autho'>leah</div> 
                <div class="publictime">
                   <Icon size="20" type="ios-clock-outline" />
                </div>
                <span style="margin-left: 0.5rem">{{time | timeFilter}}</span>
                <div class="read">
                  <Icon size="25" type="ios-eye-outline" />
                </div>
                <span style="margin-left: 0.5rem">{{read}}</span>
                
            </div>
            <!-- 文章标签 -->
            <div class="tags">
                <Tag color="cyan">{{categroy}}</Tag>
                <!-- <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag> -->
                <Tag color="magenta">{{lable}}</Tag>
                <div class="readmore" color="blue">阅读更多...</div>
            </div>
    </div>
    </div>
</template>
<script>
export default {
    name: 'ArticleItem',
    props:{
      title:{
        type:String,default:'',required:true
      },
      time:{
        type:String,default:'',required:true
      },
      abstract:{
        type:String,default:'',required:true
      },
      read:{
        type: Number,default: 0
      },
      Itemimg:{
        type:String,default:'',required:true
      },
    //   visited:{
    //     type:Number,default:999,required:true
    //   },
    //   like:{
    //     type:Number,default:999,required:true
    //   },
    //   id:{
    //     type:Number,default:0,required:true
    //   },
      article_id:{
        type:String,default:'',required:true
      },
    //   accessPulish_count:{
    //     type:Number,default:0,required:true
    //   },
      lable:{
        type:String,default:''
      },
      categroy:{
        type:String,default:''
      }
    },
    data(){
        return {
             ballColor:['orangered', 'yellow', 'lightgreen'],
             bgColor:['magenta','blue','red','cyan','volcano','yellow']
        }
    },
    methods:{
        articleDetail (article_id) {
          console.log('....')
          // this.$emit('viewArticledetail',article_id)
          this.$router.push(`/${article_id}`)
        },
    },
    computed:{
      liked() {
        return function(id) {
          return localStorage.getItem(`like${id}`) == id
        }
      },
      lablesList() {
        const regExep = /\w\w*/g
        return this.title.match(regExep)
      }
   },
   filters:{
      timeFilter(V) {
        return V.toString().slice(0,10)
      }
    },
}
</script>
<style lang="scss" scoped>
  #artcileitem {
    width: 100%;
    font-family: Athelas, STHeiti, Microsoft Yahei, serif;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    // border-bottom: 1px solid #ccc;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); 
    margin: 20px 0;
    .md-title { 
      display: none; font-size: 16px;
      margin: 1rem 0;
      color: #333;
    }
      .md-ball {
        margin-right: 1rem;
        display: none;
      }
    .card {
      display: flex;
      // align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 1rem;
      border: 0;
      width: 80%;
      
      .titleContainer {
        display: flex;
        flex-direction: row;
        // justify-content: space-around;
        font-size: 16px;
        margin: 1rem 0;
        color: #333;
        font-weight: bold;
        .ballcontainer{
          position: absolute;
          right: 10px;
          .ball {
            display: inline-block;
            width: 12px;height: 12px;
            border-radius: 50%;
            margin: 0 0.2rem;
            border: 1px solid #f2f2f2;
            
          }
        }
        
      }
      .content {
        font-size: 14px;
      }
      .article-item-icon {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        height: 5rem;
        .publictime{
          white-space: nowrap;
          margin-left: 1rem;
          height: 3rem;
          line-height: 3rem;
          span {
            margin-left: 1rem;
          }
        }
        .read {
          white-space: nowrap;
          margin-left: 1rem;
          span {
            margin-left: 1rem;
          }
        }
        .access_me {
          text-align: center;
          // padding-top: 1rem;
          font-size: .8rem;
          color: skyblue;
          height: 3rem;
          line-height: 3rem;

          img {
            border-radius: 50%;
            width: 3rem;
            height: 3rem;
            padding: 0;
            margin: 0;
          }
        }
        .autho {
            display: inline;
          }
        .box {
          padding-left: 0.8rem;
          i {
            font-size: 13px;
            margin: 0 0.2rem;
            color: #333;
          }
          i:nth-child(1):hover {
            color: orange;
            cursor: pointer;
          }
        }
      }
    }
    .card:hover {
      transition: transform .6s;
      box-shadow: 0 0 0 #fff;
      transform: scale(0.95);
      cursor: pointer;
    }
    img {
      width: 14rem;
      padding: .4rem;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  @media screen and (max-width:992px) {
      #artcileitem {
        flex-direction: column;
        .md-ball {
          display: inline;
        }
        .xl-ball {
          display: none;
        }
        .md-title {
          display: block;
          p {
            margin-left: 1rem;
          }
        }
        .card {
          .title {
            display: none;
          }
        }
        img {
          width: 92%;
          margin: 0;
          margin:0 1rem;
        }
      }
  }
  .readmore {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    text-align: center;
    margin: 2px 4px 2px 0;
    padding: 0 8px;
    border: 1px solid #e8eaec;
    border-radius: 3px;
    background: #f7f7f7;
    font-size: 12px;
    vertical-align: middle;
    opacity: 1;
    overflow: hidden;
    background: #f7f7f7;
    color: #1890ff;
    // background: ;
  }
  .itemImgurl {
    width: 220px;
    height: 250px;
  }
</style>    