<template>
    <div id="detail">
        <!-- 标题 -->
        <header class="detail_header" :style="{color: Color}">
            <h2 style="font-size:1.7rem">
                <!-- <i class="iconfont icon-lianjie"></i> -->
                {{title}}
            </h2>
            <div class="stuff" :style="{color: Color}">
              <h3 class="publicTime" :style="{color: Color}">
                <Icon type="ios-timer" />
                {{time | dateFilter}}
              </h3>
              <h3 :style="{color: Color}">阅读 {{readNum}}</h3>
              <h3 :style="{color: Color}">评论 {{commentNum}}</h3>
              <!-- <h3>推荐 {{}}</h3> -->
            </div>
            
            <!-- 标签 -->
          <div class="tags">
            <Tag color="cyan">{{categroy}}</Tag>
            <Tag color="magenta">{{lable}}</Tag>
            <!-- <Tag :color="bgColor[index]" v-for="(item,index) in lablesList" :key="index">{{item}}</Tag> -->
          </div>
          <!-- 绚丽小球 -->
          <div class="ball">
                <span :style="{background: ballColor[index]}" v-for="(item, index) in 3" :key="index"></span>
          </div>
        </header>
        
      <!-- 需要渲染的html -->
        <Row class="Row">
            <Col :xl="3" :lg="2" :md="2" :sm="0" :xs="0">
                <p style="padding:1rem;font-family:cursive;">.</p>
            </Col>
            <Col :xl="18" :lg="20" :md="20" :sm="24" :xs="24">
                <!-- <div class="markdown-body">
                    <div ref="content" class="renderNav hljs" v-html="content" ></div>
                </div> -->
                <!-- 方式二 -->
                <!-- <article class="markdown-body" style="text-align:left" v-html="content"></article> -->
                <!-- 方式一 没有代码高亮 -->
                <mavon-editor
                  class="md"
                :value="content"
                :subfield = "prop.subfield"
                :defaultOpen = "prop.defaultOpen"
                :toolbarsFlag = "prop.toolbarsFlag"
                :editable="prop.editable"
                :scrollStyle="prop.scrollStyle"
              ></mavon-editor>
              <reply-comment
              :messageData="arrMesasgeList"
              publishURL="/note/accessPulish"
              replyURL="/note/replyInfo"
            />
            </Col>
        </Row>
    </div>
</template>
<script>
// import highlight from "highlight.js";
// import "highlight.js/styles/monokai-sublime.css";
// import marked from "marked";
// import QrcodeVue from "./components/Qrcode";

import moment from "moment";

// import 'github-markdown-css/github-markdown.css'

import ReplyComment from '../components/article/replaycomment'
import { store, mutations } from '../store/index'

export default {
    name: 'ArticleDetail',
    components:{
        // QrcodeVue
        ReplyComment
    },
    data(){
        return {
            content: "",
            share_brief: "",
            share_img: "",
            value: "",
            lable:'',
            categroy:'',
            title: "",
            time: "",
            arrMesasgeList: [],
            bgColor: ["magenta", "blue", "red", "cyan", "volcano", "yellow"],
            qrcode: false,
            ballColor:['orangered', 'yellow', 'lightgreen'],
            readNum: 0,
            commentNum:0,
            articleDetail:{},
        }
    },
    // https://blog.csdn.net/acgun00886/article/details/102099581
    head () {
        return {
            title: `${this.title}`,
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.title },
                { hid: 'description', name: 'description', content: this.title }
            ]
        }
    },
    filters: {
      dateFilter(val) {
        return moment(val).format("YYYY-MM-DD");
      }
    },
    computed: {
      detailURL() {
        return window.location.href;
      },
      Color(){
        return store.Color
      },
      //mavon-editor相关
       prop () {
          let data = {
            subfield: false,// 单双栏模式
            defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
            editable: false,
            toolbarsFlag: false,
            scrollStyle: true
          }
          return data
        }
    },
    methods:{
        //初始化markdown 编辑器 高亮代码
        lightEdite() {
          console.log('初始化markdown 编辑器')
            highlight.initHighlightingOnLoad();
            marked.setOptions({
                highlight: function(code) {
                  return highlight.highlightAuto(code).value;
                },
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false
            });
            // this.content = marked(this.content)
            // this.code = marked(this.code)
        },
    },
    async asyncData(context){
      console.log('22222')
      console.log('正在加载文章详情222')
      console.log(context.params)
          mutations.LoadingTitleChange({isshow: true, title: '正在加载文章详情,请稍等...'})
          let res = await context.$axios.get(`/article/getArticledetail/${context.params.artcileid}`)
          console.log(res)
          let asyncData = {}
          if(res.data.result === 0) {
            mutations.LoadingTitleChange({isshow: false, title: ''})
            const title = res.data.articleDetail.title
            const content = res.data.articleDetail.content
            const time = res.data.articleDetail.public_time
            const lable = res.data.articleDetail.lable
            const categroy = res.data.articleDetail.categroy
            const readNum = res.data.articleDetail.read
           return {
             title,
             content,
             time,
             lable,
             categroy,
             readNum
           }
          }else {
            mutations.LoadingTitleChange({isshow: false, title: ''})
            this.$Message.error("网络出错了,(ノへ￣、)！");
            
          }
          // this.articleDetail = asyncData
          // return asyncData
        },
    created(){  // 
      console.log('11111')
    },
}
</script>
<style lang="scss" scoped>
@import url("../assets/css/detail.css");
#detail {
  .detail_share {
    position: relative;
    z-index: 99;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .erweima {
      position: absolute;
      top: -130px;
      background: #fff;
      padding: 0.4rem 0.4rem 0 0.4rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
    }
    span {
      color: #333;
      margin-right: 1rem;
    }
    i {
      padding: 0.6rem 0.63rem;
      border-radius: 50%;
      font-size: 1.4rem;
      margin: 0 1rem;
      cursor: pointer;
      transition: all 0.6s;
    }
    i.icon-weibo {
      border: 1px solid rgb(255, 153, 0);
      color: rgb(255, 153, 0);
    }
    i.icon-weibo:hover {
      background: rgb(255, 153, 0);
      color: white;
    }
    i.icon-weixin {
      border: 1px solid lightgreen;
      color: lightgreen;
    }
    i.icon-weixin:hover {
      background: lightgreen;
      color: white;
    }
    i.icon-qq {
      border: 1px solid skyblue;
      color: skyblue;
    }
    i.icon-qq:hover {
      background: skyblue;
      color: white;
    }
    i.icon-qzone {
      border: 1px solid yellow;
      color: yellow;
    }
    i.icon-qzone:hover {
      background: yellow;
      color: white;
    }
  }
  .detail_header {
    height: 25rem;
    background: #34495e;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
      .ball {
        margin-top: 1rem;
        span {
          display: inline-block;
          width: 12px;height: 12px;
          border-radius: 50%;
          margin: 0 0.2rem;
        }
    }
    .tags {
      margin-top: 0.5rem;
    }
  }
  .Row {
    // position: absolute;
    margin-top: -5rem;
    z-index: 1;
  }

}
.btn {
  margin: 1rem;
}
.renderNav {
  font-size: 1.4rem;
  border-top: 1.5px dashed lightgreen;
  border-left: 1.5px dashed skyblue;
  border-right: 1.5px dashed lightsalmon;
  border-bottom: 1.5px dashed pink;
  padding: 1rem;
  background: #fff;
  position: relative;
  z-index: 5;
  border-radius: 5px;
}

.markdown-body {   //编写容器的一些css，根据需要进行调整，这里是我博客的，在github提供的.markdown-body基础上修改的
  box-sizing: border-box;
  min-width: 200px;
  /* max-width: 980px; */
  /* padding: 45px; */
  max-width: 98%;
  margin: 0 auto;
  box-shadow: 2px 4px 6px gray;
  padding-left: 20px;
  padding-right: 15px;
  padding-top: 40px;
  padding-bottom: 45px;
  margin-bottom: 100px;
  z-index: -10;
}

.markdown-body .highlight pre, .markdown-body pre {
  
    padding: 16px;
    overflow: auto;
    font-size: 120%!important;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
}
.stuff {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  h3 {
    margin: 0 0.5rem;
    color: #6a737d;
  }
}

// // github使用的是这个   根据自己的进行调整
// .markdown-body {
//     box-sizing: border-box;
//     width: 80%;
//     min-width: 500px;
//     max-width: 980px;
//     margin: 0 auto;
//     padding: 45px;
// }
 
//这个要配合移动端 不是很理解
@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>