<template>
  <div id="card">
    <Row>
      <Col :xl="3" :lg="3" :md="2" :sm="1" :xs="0">
        <header>.</header>
      </Col>
      <Col :xl="13" :lg="13" :md="12" :sm="12" :xs="24">
        <div class="article-box">
          <div class="article-category">
            <Icon type="ios-bookmarks-outline" />文章列表
            <div class="article-num">
              共
              <span>{{ count }}</span> 篇
            </div>
          </div>
          <div class="card-left">
            <!-- 文章卡片 -->
            <article-item 
              v-for="(item, index) in articlelist" 
              :key="item.id"
              :title="item.title"
              :time="item.public_time"
              :lable="item.lable"
              :categroy="item.categroy"
              :abstract="item.abstract"
              :article_id="item._id"
              :read="item.read"
              :Itemimg="item.src"
              @viewqrticledetail='viewqrticledetail'
            />
            <Page
              ref="page"
              :total="count"
              :page-size="pageSize"
              class="page"
              v-show="pageShow"
              @on-change="getArticleList"
              show-total
            />
          </div>
        </div>
      </Col>
      <Col :xl="6" :lg="6" :md="8" :sm="10" :xs="0">
        <div class="right-box">
          <div class="card-right">
            <!-- 搜索框 -->
            <div class="search">
              <input
                type="text"
                placeholder="输入文章关键词搜索"
                v-model="likeSearch"
              />
              <button class="search-btn" @click="searchLike">搜索</button>
            </div>
            <!-- 分类区 -->
            <div class="article-categroy">
              <div class="title">
                <Icon type="ios-aperture-outline" /> 文章分类
                <!-- <span>更多</span> -->
              </div>
              <div class="categroy-item">
                <Badge
                  :count="item.count"
                  :type="categroyColor[index]"
                  v-for="(item, index) in categroysList"
                  :key="index"
                >
                  <p
                    @click="getCategroylist(item._id)"
                    class="demo-badge"
                  >
                    {{ item._id }}
                  </p>
                </Badge>
              </div>
            </div>
            <!-- 标签区 -->
            <div class="article-lable">
              <div class="title">
                <Icon type="ios-keypad" /> 文章标签
                <!-- <span>更多</span> -->
              </div>
              <Tag
                class="tag"
                @click.native="getlableInfo(item)"
                :color="bgColor[index]"
                v-for="(item, index) in lablesList"
                :key="index"
                >{{ item._id }}</Tag
              >
            </div>
            <!-- 最近文章区 -->
            <div class="time-article">
              <div class="title">
                <Icon type="ios-timer" /> 最近文章
                <!-- <span>更多</span> -->
              </div>
              <div
                class="ItemList"
                v-for="(item, index) in nearList"
                @click="timeArticle(item._id)"
                :key="index"
              >
                <Tooltip content="点击跳转到详情">{{ item.title }}</Tooltip>
                <span>
                  <Icon type="ios-clock-outline" />
                  {{ dateFilter(item.public_time)}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import ArticleItem from "../components/article/ArticleItem";
// import debounce from "../../assets/js/debounce";
import moment from 'moment'
import { store, mutations } from '../store/index'
export default {
  name: "Article",
  components: {
    ArticleItem,
  },
  data() {
    return {
      // count: 0,
      // articlelist: [],
      likeSearch: "",
      lablesList: [],
      categroysList: [],
      nearList: [],
      pageShow: true,
      pageSize: 10,
      categroyColor: [
        "primary",
        "success",
        "error",
        "warning",
        "primary",
        "success",
        "error",
        "warning"
      ],
      bgColor: [
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow",
        "magenta",
        "blue",
        "red",
        "cyan",
        "volcano",
        "yellow"
      ],
    };
  },
  computed: {
    
  },
  head () {
        return {
            title: `文章列表`,
        }
    },
  async asyncData (context) {
    // 由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象。 context 上下文代指this
      // console.log('正在加载文章列表1111111')
      mutations.LoadingTitleChange({isshow: true, title: '正在加载文章列表,请稍等...'})
      const asyncData = {};
      let res = await context.$axios.post('/article/getArticleList',{page: 1, pageSize: 10})
      console.log(res)
      if(res.data.result === 0) {
        mutations.LoadingTitleChange({isshow: false, title: ''})
        let data = res.data
        asyncData.count = data.total
        asyncData.articlelist = data.artcleList
      }else {
        alert('eee')
        mutations.LoadingTitleChange({isshow: false, title: ''})
        return this.$Message.error(res.data.error_info || '服务出错')
      }
      return asyncData
    },
  methods: { 
    viewqrticledetail(id){
      console.log(id)
      this.$router.push(`/${id}`)
    },
    // 转换时间格式 2020-07-09T08:04:42.977Z 
    dateFilter(V) {
      return moment(V).format("YYYY-MM-DD");
    },
    //搜索防抖
    searchLike() {
      if (!this.likeSearch) return this.$Message.error("搜索内容不能为空的呀~");
      console.log(this.likeSearch)
      this.likesearchTool(this.likeSearch);
    },

    // async await 让异步代码看起来像同步代码一样，让出线程，等待 await 执行完毕再执行后面的代码
    //搜索
    async likesearchTool(value) {
      let res = await this.$axios.post("/article/like_article_search",{value:value});
      console.log(res)
      if (res.data.result == 0) {
        this.articlelist = res.data.searchArticle
        this.count = res.data.count
      } else {
        this.$Message.error(res.data.message); // 未知错误
      }
    },

    // 获取文章列表
    async getArticleList (index) {
      console.log('正在加载文章列表')
      mutations.LoadingTitleChange({isshow: true, title: '正在加载文章列表,请稍等...'})
      let res = await this.$axios.post('/article/getArticleList',{page: index, pageSize: this.pageSize})
      console.log(res)
      if(res.data.result === 0) {
        mutations.LoadingTitleChange({isshow: false, title: ''})
        let data = res.data
        this.count = data.total
        this.articlelist = data.artcleList
      }else {
        alert('eee')
        mutations.LoadingTitleChange({isshow: false, title: ''})
        return this.$Message.error(res.data.error_info)
      }
      
    },

    // 获取文章分类
    async getCategroy () {
      let res = await this.$axios.get('/article/getcategroys')
      console.log(res)
      
      if(res.data.result === 0){
        this.categroysList = res.data.categroyData
      }
    },

    //获取分类文章列表
    async getCategroylist (value) {
      let res = await this.$axios.post('/article/getCategroylist',{categroyValue: value})
      console.log(res)
      this.articlelist = res.data.categroyList
      this.count = res.data.count
    },

    //获取标签
    async getLable () {
      let res = await this.$axios.get('/article/getlables')
      console.log(res)
      
      if(res.data.result === 0){
        this.lablesList = res.data.lableData
      }
    },
    //获取标签列表
    async getlableInfo (value) {
      let res = await this.$axios.post('/article/getLablelist',{lableValue: value})
      console.log(res)
      this.articlelist = res.data.lableList
      this.count = res.data.count
    },



    // 获取最近文章
    async getNeararticle () {
      let res = await this.$axios.get('/article/getNearList')
      console.log(res)
      if(res.data.result === 0) {
        this.nearList = res.data.nearData
      }else {
        this.$Message.error(this.data.error_info)
      }
    },

    timeArticle(path) {
      this.$router.push(`/detail/${path}`);
    },
  },
  created(){
    console.log('created')
    // this.getArticleList()
    this.getCategroy()
    this.getNeararticle ()
    this.getLable()

    // this.$http.get('/getArticleList').then( res => {
    //   console.log(JSON.stringify(res))
    // })
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "leileiFont";
  src: url("../assets/font/2012DingYongKangYingBiKaiShuXinBan-2.ttf");
}
#card {
  min-height: 1000px;
  .article-box {
    background: #fff;
    border-radius: 5px;
    margin: 2rem 0;
    .article-category {
      line-height: 20px;
      font-size: 15px;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-bottom: 1.5px solid #7195b8;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      .article-num {
        display: inline-block;
        float: right;
        color: #333;
        span {
          color: orange;
          font-size: 20px;
        }
      }
    }
    .card-left {
      // border: 1px solid #ccc;
      border-top: 0;
      // border-bottom-left-radius: 5px;
      // border-bottom-right-radius: 5px;
      .page {
        text-align: right;
        margin: 1rem;
      }
    }
  }
  @media screen and (max-width: 568px) {
    .article-box {
      margin: 2rem;
    }
  }
  .right-box {
    margin: 2rem 1rem;
    .card-right {
      .search {
        width: 100%;
        margin-bottom: 1rem;
        display: flex;
        input,
        .search-btn {
          outline: none;
          border: 1px solid #ccc;
        }
        input {
          width: 76%;
          border-right: none;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          padding: 4px 0;
          text-indent: 5px;
        }
        button.search-btn {
          cursor: pointer;
          width: 24%;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: #057df4;
          color: white;
          height: 32px;
          font-size: 13px;
        }
      }
      .article-lable,
      .article-categroy,
      .time-article {
        font-size: 14px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        border-radius: 5px;
        margin-bottom: 1rem;
        .title {
          line-height: 20px;
          padding: 0.5rem;
          border-bottom: 1.5px solid #7195b8;
          span {
            display: block;
            float: right;
            color: rgb(96, 96, 248);
            font-size: 13px;
            cursor: pointer;
          }
          span:hover {
            color: orange;
          }
        }
        .tag {
          white-space: pre-wrap;
          margin: 0.4rem;
          cursor: pointer;
        }
        .tag:hover {
          opacity: 0.8;
        }
      }
      .article-categroy {
        .ivu-badge {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin: 0.5rem;
          padding: 0.2rem;
          transition: opacity 0.6s;
        }
        .ivu-badge:hover {
          opacity: 0.8;
        }
        .categroy-item {
          margin-top: 0.8rem;
          .demo-badge {
            background: #fff;
            margin: 0.1rem;
            font-size: 13px;
            cursor: pointer;
          }
        }
      }
      .time-article {
        .ItemList {
          padding: 0.8rem 0.5rem;
          cursor: pointer;
          color: #555;
          border-bottom: 1px solid #ccc;
          transition: all 0.6s;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 12px;
            color: purple;
            font-weight: bold;
            white-space: nowrap;
          }
        }
        .ItemList:hover {
          background: #f2f2f2;
          color: lightgreen;
          padding-left: 0.8rem;
        }
        .ItemList:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
