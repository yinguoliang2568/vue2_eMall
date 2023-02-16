<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 通过数据驱动来显示搜索信息的显示和隐藏 -->
            <!-- 当三级X的时候，我们不应该直接操作DOM，应该操作数据，进行重新路由跳转，进行数据来驱动页面显示 -->
            <li class="with-x" v-show="categroyname">
              {{ categroyname }}<i @click="clearCategory">×</i>
            </li>
            <li class="with-x" v-show="keyword">
              {{ keyword }}<i @click="routeKeyword">×</i>
            </li>
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="closeTradmake">×</i>
            </li>
            <!-- 通过遍历找出所有平台属性的值 -->
            <li
              class="with-x"
              v-for="(item, index) in searchParams.props"
              :key="item"
            >
              {{ item.split(":")[2] }}:{{ item.split(":")[1]
              }}<i @click="closeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          :trademarkList="trademarkList"
          :attrsList="attrsList"
          @chooseTrademark="chooseTrademark"
          @chooseAttrs="chooseAttrs"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: searchParams.order.split(':')[0] === '1' }"
                  @click="changeOrder('1')"
                >
                  <!-- 根据order里面的数据进行高亮和排序展示
                      利用v-show来显示和隐藏箭头
                    
                    -->
                  <a
                    >综合
                    <i
                      v-show="searchParams.order.split(':')[0] === '1'"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up':
                          searchParams.order.split(':')[1] === 'asc',
                        'icon-long-arrow-down':
                          searchParams.order.split(':')[1] === 'desc',
                      }"
                    ></i
                  ></a>
                </li>
                <li
                  :class="{ active: searchParams.order.split(':')[0] === '2' }"
                  @click="changeOrder('2')"
                >
                  <a
                    >价格
                    <i
                      v-show="searchParams.order.split(':')[0] === '2'"
                      class="iconfont"
                      :class="{
                        'icon-long-arrow-up':
                          searchParams.order.split(':')[1] === 'asc',
                        'icon-long-arrow-down':
                          searchParams.order.split(':')[1] === 'desc',
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="item in goodsList"
                :key="item.id"
                @click="toDetail(item.id)"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a><img v-lazy="item.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a> {{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            @changePage="changePage"
            :total="total"
            :totalPage="totalPages"
            :currentPage="searchParams.pageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from "./SearchSelector/SearchSelector";
  import { reqSearchList } from "@/api";
  export default {
    name: "Search",
    // 第三种：在路由表中通过props传参
    props: [
      "categroy1id",
      "categroy2id",
      "categroy3id",
      "categroyname",
      "keyword",
    ],
    data() {
      return {
        trademarkList: [],
        attrsList: [],
        goodsList: [],
        total: 0,
        totalPages: 0,

        // 定义一个post请求参数
        // data里面的数据只和views视图层进行响应式，当categroy1id这些数据改变的时候，并不能影响到searchParams的数据进行改变。导致每次发送的都是同一个参数，获取的也是通用数据，无法根据路由变化进行数据的变化
        searchParams: {
          categroy1id: null,
          categroy2id: null,
          categroy3id: null,
          categroyname: "",
          keyword: "",
          props: [],
          trademark: "",
          order: "1:desc",
          pageNo: 1,
          pageSize: 100,
        },
      };
    },
    components: {
      SearchSelector,
    },
    methods: {
      async getSearchList() {
        // 每次重新发送请求的时候，重新获取一下各个参数.
        this.searchParams = {
          ...this.searchParams,
          // searchParamsL里面属性的数据应该和接口的属性
          category1Id: this.categroy1id,
          category2id: this.categroy2id,
          category3Id: this.categroy3id,
          categoryName: this.categroyname,
          keyword: this.keyword,
        };
        console.log(this.searchParams, "111");
        // 发送请求
        const result = await reqSearchList(this.searchParams);
        console.log(result);
        this.trademarkList = result.trademarkList;
        this.attrsList = result.attrsList;
        this.goodsList = result.goodsList;
        this.total = result.total;
        this.totalPages = result.totalPages;
      },
      // 这个三级取消，那么在重新路由的时候，就不需要query参数
      clearCategory() {
        this.$router.push({
          name: "Search",
          params: {
            keyword: this.keyword,
          },
        });
      },
      // 搜索关键字取消，那么就不要params参数
      routeKeyword() {
        // 当函执行的时候，需要将Header输入框数据清除
        this.$bus.$emit("clearKeyword");
        this.$router.push({
          name: "Search",
          query: this.$route.query,
        });
      },

      // 品牌名称
      // 利用自定义事件进行子向父传参
      chooseTrademark(value) {
        this.searchParams.trademark = value;
        // 重新发起请求
        this.getSearchList();
      },

      // 取消选中品牌
      closeTradmake() {
        this.searchParams.trademark = "";
        // 重新发起请求
        this.getSearchList();
      },

      // 平台属性传参
      chooseAttrs(value) {
        // 当数组里面已经有了原有属性，我们需要判断一下是否存在，如果存在，则不会继续发送请求
        const isHas = this.searchParams.props.some((item) => item === value);
        if (isHas) return;
        //如果不存在，那么就继续发送请求
        this.searchParams.props.push(value);
        // 重新发起请求
        this.getSearchList();
      },

      // 取消props
      closeProps(index) {
        this.searchParams.props.splice(index, 1);
        // 重新发起请求
        this.getSearchList();
      },

      // 排序
      changeOrder(newType) {
        // 判断新老类型
        // 获取点击的项目的order信息
        const oldType = this.searchParams.order.split(":")[0];
        const oldOrder = this.searchParams.order.split(":")[1];
        // 如果当前点击的type和旧的相等，那么说明点击的是同一个，我们需要将排序取反
        if (oldType === newType) {
          this.searchParams.order = `${newType}:${
            oldOrder === "desc" ? "asc" : "desc"
          }`;
          // 如果当前点击的type和旧的不相等，说明换了一个排序条件，需要默认为降序排列
        } else {
          this.searchParams.order = `${newType}:desc`;
        }
        // 重新发起请求
        this.getSearchList();
      },

      // 根据页码请求数据
      changePage(page) {
        this.searchParams.pageNo = page;
        // 重新发起请求
        this.getSearchList();
      },

      // 跳转详情页
      toDetail(id) {
        this.$router.push({
          name: "Detail",
          params: {
            skuId: id,
          },
        });
      },
    },
    mounted() {
      this.getSearchList();
    },
    watch: {
      // 每次路由切换都需要重新发送请求，重新获取参数
      $route() {
        this.getSearchList();
      },
    },
  };
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                    // width: 50px;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
