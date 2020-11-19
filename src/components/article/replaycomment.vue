<template>
  <div class="replayOrpublish">
   <div class="compile">
        <div class="input-box">
            <input type="text" placeholder="Name" v-model="nickname">
            <input type="text" placeholder="Email" v-model="email">
        </div>
         <textarea class="commenttextarea" v-model="commentValue"  
          show-word-limit 
          placeholder="有问题欢迎留言..." 
           />
          <Button 
            class="btn" 
            type="primary"
            @click="publish">发表</Button>
      </div>
        <List class="leaveContent">
            <!-- 留言 -->
            <Modal
              width="800px"
              title="回复内容"
              v-model="isshow"
              @on-ok="handelInputContent"
              :mask-closable="false">
              <div class="infoinput">
                <input  type="text" placeholder="Name" v-model="nickname">
                <input  type="text" placeholder="Email" v-model="email">
              </div>
              
              <Input v-model="replyValue" type="textarea" placeholder="输入回复内容..." />
            </Modal>
            
            <!-- 留言内容展示区 -->
            <div v-for="(item, index) in commentList" :key="index">
              <ListItem ref="contentItem" class="contentItem" :style="{color: Color}">
               <div class="head"> 
                   <!-- <span>{{item.commentValue}}</span> -->
                    <p v-show="publishURL == '/note/accessPulish'" class="number_id">{{index+1}} 楼</p>
                    <p v-show="publishURL == '/message/leavemessage'" class="number_id">{{item.id}} 楼</p>
                    <img src="../../assets/images/header.png" /> 
                    <!-- <Icon type="person"></Icon> -->
                    <a style="font-size: 1.5rem">{{item.nickname}}<span v-show="item.username === '972761675'" class="chief">站长</span></a>
               </div>
                <span style="font-size: 1.3rem">{{item.commentValue}}</span>
                <p>{{item.date | dateFilter}}</p>
                <p @click="SetReplyInfo(item, index)" class="reply">回复</p>
            </ListItem>
            <!-- 回复 -->
             <div class="replyContent" v-for="(replyitem, j) in item.replydata" :key="j">
                <ListItem :style="{background: bgcolor}" ref="replyItem" class="replyItem" >
                  <p :style="{color: Color}" class="number_id">{{j+1}} 楼</p>
                  <p class="reply_access">
                    <div :style="{color: Color}" class="content">
                      <img src="../../assets/images/girlheader.png" />
                      <div style="margin-left: 2.8rem">
                        回复<a> @{{replyitem.parent_nickname}}</a>
                       : {{replyitem.replyValue}}
                      </div>
                    </div>
                  </p>
                  <p class="reply_name">{{replyitem.reply_nickname}}</p>
                  <p :style="{color: Color}" class="reply_time">
                    {{replyitem.time | dateFilter}}
                    <span v-show="replyitem.username === '972761675'" class="chief">站长</span>
                  </p>
                  <p @click="SetPaddingReply(replyitem, item,  j)" class="reply">回复</p>
              </ListItem>
             </div>
            </div>
        </List>
  </div>
</template>

<script>
// import { PostMessage } from '../NetWork/request'
import moment from 'moment'
  export default {
    name:'ReplyComment',
    inject:['reload'],
    props:{
      messageData:{
        type:Array,
        default(){
          return []
        }
      },
      publishURL:{
        type:String,
        default:''
      },
      replyURL:{
        type:String,
        default:''
      }
    },
    data () {
      return {
          nickname:'',
          email:'',
          commentValue:'',

          isshow:false,
          replyInfo:{},
          replyValue:'',
          arrMesasgeList:[],
          obj:{},
          commentList:[],
          // artcileId: '',
      };
    },
    filters:{
      dateFilter(val) {
         return moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    computed:{
      Color() {
        return this.$store.state.Color
      },
      bgcolor() {
        return this.$store.state.Color == '#333' ? "#f2f2f2" : 'transparent'
      }
    },
    created(){
        this.getCommentValue()
    },
    methods: {
        // 获取评论数据
        async getCommentValue() {
          console.log('获取评论数据....')
            let res = await this.$axios.get(`/article/getComments/${this.$route.params.artcileid}`)
            console.log(res)
            this.commentList = res.data.comments
        },
        //第一层回复
        SetReplyInfo(item, index) {
        //   item.date = moment(item.date).format('YYYY-MM-DD HH:mm:ss')
          
          this.replyInfo.parent_nickname = item.nickname // 嵌套回复的祖先名字
          this.replyInfo.parent_id = item._id  //回复的哪条评论
          this.replyInfo.article_id = this.$route.params.artcileid //回复了哪篇文章
          this.replyInfo.index = index
          this.isshow = true
        },

        //嵌套回复
        SetPaddingReply(replyitem, parentItem, index) {
          this.replyInfo.parent_nickname = replyitem.reply_nickname // 嵌套回复的祖先名字
          this.replyInfo.parent_id = replyitem.parent_id         //回复的哪条评论
          this.replyInfo.article_id = this.$route.params.artcileid      // 回复了哪篇文章
          this.replyInfo.index = index
          this.isshow = true
        },
        //回复
        async handelInputContent() {
          if(!this.replyValue) return this.$Message.error('内容不能为空呀,请输入内容！')
          
          this.replyInfo.reply_nickname = this.nickname 
          this.replyInfo.reply_email = this.email  
          this.replyInfo.replyValue = this.replyValue
          let res = await this.$axios.post('/article/replyComments',this.replyInfo)
          console.log(res)
          if(res.data.result === 0) {
            this.$Message.success(res.data.message)
            // if(window) {
            //   console.log('window2')
            //   setTimeout(() => {
            //     location.reload()
            //   }, 1500);
            // }
            this.reload()
            this.getCommentValue()
            
          }else {
            this.$Message.error(res.data.error_info)
          }
        },
        async publish() {
            console.log('......')
             if(this.nickname === '') {
                 this.$Message.error('请输入您的昵称')
             }else if (this.email == ''){
                 this.$Message.error('请输入您的邮箱，方便回复您！')
             }else if (this.commentValue == '') {
                 this.$Message.error('评论内容不能为空哦~')
             } else{
            /* detail start */
            const article_id = this.$route.params.artcileid;
            const formdata = {
                article_id: article_id,
                nickname: this.nickname,
                commentValue: this.commentValue
            }
            console.log(formdata)
            let res = await this.$axios.post('/article/publicComment', formdata)
            console.log(res)
            if(res.data.result === 0) {
                this.$Message.success(res.data.message)
                this.reload()
                this.getCommentValue()
                // if(window) {
                //   console.log('window1')
                //   setTimeout(() => {
                //     location.reload()
                //   }, 100);
                // }
                
            }else {
                this.$Message.error('服务繁忙，请稍后重试')
            }
          }
        },
    },
  }

</script>
<style lang='scss' scoped>
  .replayOrpublish {
        border: 1px solid #eee;
        margin-bottom: 60px;
        border-radius: 6px;
        padding: 15px 12px;
        transition: all .3s;
        .input-box{
            display: flex;
            justify-content: space-between;
            input {
                width: 49%;
                height: 38px;
                font-size: 14px;
                padding-left: 10px;
                // margin-right: 12px;
                transition: all .3s;
                border: none;
                border-bottom: 1px dashed #bfbcbc;
                outline: none;
            }
        }
        .commenttextarea {
            width: 100%;
            height: 169px;
            margin: 10px 0;
            color: #333;
            border: 1px dashed #bfbcbc;
            transition: all .3s;
            border-radius: 4px;
            font-size: 14px;
            padding: 15px;
            outline: none;
            resize: none; 
        }
        .btn {
        margin:1rem;
        z-index: 5;
        position: relative;
    }
      .compile {
      margin:2rem;
      position: relative;
      z-index: 5;
    }
    .leaveContent {
      position: relative;
      z-index: 5;
      width: 800px;
      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }
      .infoinput {
        width: 1000px;
        input {
          width: 49%;
          border: none;
        }
      }
      .contentItem {
        padding:1rem;
        position: relative;
        border-bottom: 1px solid #eeeded;
        p,img,a{
          position: absolute;font-size: 0.8rem;
        }
        a{
          color: #ef6d57;
          left: 4rem;
          top: .6rem;      
          .chief {
            color: orange;
            white-space: nowrap;
            font-weight: bold;
            margin-left: .5rem;
          }  
        }
       span {
          margin-top: 1rem;
          padding:0 3rem;
          text-align: left;
          font-size: 0.8rem;
          padding-top: 0.5rem;
          color: black;
       }
        img {
          top: 0.5rem;left: 1.5rem;
        }
        p {
          top: 0.5rem;right: 1rem;;
        }
        p.number_id{
        right:10rem;
      }
      }
      
       p.reply {
          cursor: pointer;
          top: 2.3rem;
          color: rgb(0, 132, 255);
        }
        p.reply:hover {
          color: blue;
        }
        .replyContent {  
          padding-left:50px;
          font-size: 1rem;
          .replyItem {
            border-bottom: 1px solid #eee; 
            background: #fffefe;
            // border-left: 2.5px solid #eee;
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            align-items: flex-start;
            img {
                left: -2rem;
            }
          .reply {
            position: absolute;
            width: 2rem;
            white-space: nowrap;
            right: 0.8rem;
          }
          .reply_access {
            margin-top: 1rem;
            white-space: nowrap;
          }
          p.content {
            padding-left: 0.5rem;
            padding-right: 3rem;
            text-align: left;
            color: #333;
          }
          p.reply_name {
            position: absolute;
            left: 2.8rem;
            font-size: 1rem;
            color: #ef6d57;
          }
          p.reply_time {
            position: absolute;
            left: 9rem;
            font-size: 1rem;
            color: #333;
            .chief {
              color: orange;
              white-space: nowrap;
              font-weight: bold;
              margin-left: .5rem;
          }
          }
          p.number_id {
            position: absolute;
            right: 1rem;
            top: 1rem;
            color: #333;
          }
          }
        }
    }
  }
</style>