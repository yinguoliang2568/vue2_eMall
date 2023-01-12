<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "@comp/Header";
  import Footer from "@comp/Footer";
  export default {
    name: "App",
    components: { Header, Footer },
  };
</script>

<style lang="less" scoped>
  // vue里面内置了less包，只需要下载less-loader包就行
  .box {
    font-size: 100px;
  }
</style>
