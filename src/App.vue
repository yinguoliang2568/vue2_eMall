<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <hr />
    <Footer v-if="footerIsShow"></Footer>
  </div>
</template>

<script>
  import Header from "@comp/Header";
  import Footer from "@comp/Footer";
  export default {
    name: "App",
    components: { Header, Footer },
    // mounted() {
    //   console.log(this);
    // },
    // updated() {
    //   console.log(this, 222);
    // },
    computed: {
      footerIsShow() {
        return !this.$route.meta.footIsHidden;
      },
    },
  };
</script>

<style></style>
