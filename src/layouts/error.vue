<template>
    <div class="container">
        <template v-if="error.statusCode == 404">
            <!-- <img src="/image/other/404.png"> -->
            <div class="content">
                你访问的页面不在地球上！
                <nuxt-link :to="{path: '/home'}">
                    请返回！
                </nuxt-link>
            </div>
        </template>
        <template v-else>
            <div>
                服务出错了！
                <nuxt-link :to="{path: '/home'}">
                    请返回！
                </nuxt-link>
                
            </div>
        </template>
    </div>
</template>

<script>
export default {
    props: ['error'],
    
    head () {
        return {
            title: `页面找不到了~~`
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
  padding: 100px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .red{
    color: red;
    font-weight: 800;
  }
  .pink{
    color: #ff0090;
    font-weight: 800;
  }
  .none{
    color: #ff0090;
    font-size: 12px;
    cursor: pointer;
  }
  .content{
    width: 480px;
    text-align: left;
    margin-top: 40px;
    font-size: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    ul{
      li{
        color: #303030;
        line-height: 22px;
        margin-bottom: 15px;
        list-style: arabic-indic;
      }
    }
  }
}
@media screen and (max-width: 600px) {
    .container{
        padding: 40px;
        width: 100%;
        img{
            max-width: 100%;
        }
        .content{
            width: 100%;
        }
    }
}
</style>