<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userMessage.nickName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link to="/register" class="register"
                >免费注册</router-link
              >
            </p>
            <p v-if="userMessage.nickName">
              <span>欢迎</span>
              <span>{{ userMessage.nickName }}</span>
              <span @click="logout">退出登录</span>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center">我的订单</router-link>
            <router-link to="/shopCart">我的购物车</router-link>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <a class="logo" title="尚品汇" href="###" target="_blank">
            <!-- <router-link to="/home" src="./images/logo.png" tag="img" /> -->
            <router-link to="/home"
              ><img src="./images/logo.png" alt=""
            /></router-link>
          </a>
        </h1>
        <div class="searchArea">
          <form class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button
              @click="toSearch"
              class="sui-btn btn-xlarge btn-danger"
              type="button"
            >
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  // import store from "@/store";
  import { mapState, mapMutations } from "vuex";
  import { reqLogout } from "@/api";
  export default {
    name: "Header",
    data() {
      return {
        keyword: "",
      };
    },
    methods: {
      ...mapMutations("User", ["removeToken"]),
      // 点击按钮，将params数据和query数据都进行传输
      toSearch() {
        console.log(this.$route);
        const { query } = this.$route;
        this.$router.push({
          name: "Search",
          params: {
            keyword: this.keyword || null,
          },
          query,
        });
      },

      // 退出登录
      async logout() {
        await reqLogout();
        alert("退出成功");
        this.removeToken();
        this.$router.push({
          name: "Login",
        });
      },
    },
    computed: {
      ...mapState("User", ["userMessage"]),
    },
    // Header是接受数据的一方，需要在初始化就进行事件注册
    // 当注册的名字调用的时候吗，执行后面的回调函数
    mounted() {
      this.$bus.$on("clearKeyword", () => {
        this.keyword = "";
      });
    },
  };
</script>

<style lang="less" scoped>
  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }

    & > .bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>
