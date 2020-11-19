<template>
  <div id="Header">
     <Row type="flex">
      <!-- logo介绍 -->
        <Col class="logo" :xl="6" :lg="4" :md="24" :sm="24" :xs="24" order="1">
            <Logo/>
        </Col>
        <!-- 顶部导航菜单 -->
        <Col v-show="active" class="link_meta" :xl="18" :lg="20" :md="0" :sm="0" :xs="0" order="2">
            <Nav/>
        </Col>
    </Row>
  </div>
</template>
<script>
import Nav from './header/Nav'
import Logo from './header/Logo'
  export default {
    name:'Header',
    computed: {
      active() {
        return this.$route.name !== 'home'
      }
    },
    components: {Nav,Logo},
  }

</script>