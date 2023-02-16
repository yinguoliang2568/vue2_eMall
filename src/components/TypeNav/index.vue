<template>
  <div class="type-nav">
    <div class="container">
      <!-- 当鼠标在三级列表中和全部分类的的时候，需要三级列表都显示。所以把三级列表和全部分类装进一个div中 -->
      <div @mouseenter="mouseInNav = true" @mouseleave="mouseInNav = false">
        <h2 class="all">全部商品分类</h2>
        <div
          class="sort"
          @mouseenter="catagoryInItem = true"
          @mouseleave="catagoryInItem = false"
          v-show="isNavShow"
        >
          <div class="all-sort-list2" @mouseleave="catagoryEnterIndex = -1">
            <div
              class="item"
              v-for="(category1, index) in cateGory1List"
              :key="category1.id"
              @mouseenter="EnterIndexThrottle(index, category1.id)"
              :class="{ active: catagoryEnterIndex === index }"
              @click="toSearch"
            >
              <h3>
                <a
                  :data-categroy1id="category1.id"
                  :data-categroyname="category1.name"
                  >{{ category1.name }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="category2 in category1.children"
                    :key="category2.id"
                  >
                    <dt>
                      <a
                        :data-categroy2id="category2.id"
                        :data-categroyname="category2.name"
                        >{{ category2.name }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="category3 in category2.children"
                        :key="category3.id"
                      >
                        <a
                          :data-categroy3id="category3.id"
                          :data-categroyname="category3.name"
                          >{{ category3.name }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 判断鼠标是否还在三级分类里面 -->
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  // 映入lodash里面的节流函数，用于控制鼠标移入三级分类列表
  import { throttle } from "lodash";
  export default {
    name: "TypeNav",
    data() {
      return {
        // 判断鼠标移入的下标
        catagoryEnterIndex: -1,

        // 判断鼠标是否还在三级分类中.
        catagoryInItem: false,

        // 判断鼠标是否还在三级分类nav中.
        mouseInNav: false,
      };
    },
    computed: {
      ...mapState("Category", ["cateGory1List"]),
      // 判断三级分类列表是否展示
      isNavShow() {
        if (this.$route.name === "Home") return true;
        return this.mouseInNav;
      },
    },
    methods: {
      ...mapActions("Category", ["getCategory1List", "getCategory2List"]),

      // 当鼠标移入的时候，需要修改catagoryEnterIndex的值为当前移入元素的下标
      EnterIndex(index, id) {
        // 取反就是鼠标已经移出，如果鼠标已经移出三级分类，那么就不会再触发请求
        if (!this.catagoryInItem) return;
        this.catagoryEnterIndex = index;
        this.getCategory2List(id);
      },
      //节流函数占位
      EnterIndexThrottle() {},
      // 路由到search页面
      // 通过data-给标签加上自定义属性，然后通过dataset获取
      toSearch(e) {
        const { categroy1id, categroy2id, categroy3id, categroyname } =
          e.target.dataset;
        this.$router.push({
          // 用name不用path，因为params用不了path
          name: "Search",
          query: {
            categroy1id: categroy1id,
            categroy2id: categroy2id,
            categroy3id: categroy3id,
            categroyname: categroyname,
          },
        });
      },
    },
    mounted() {
      this.getCategory1List();
      // 节流函数触发的是节流函数的返回值，在节流函数里面使用call来替换this指向和触发实际要触发的函数
      // this.EnterIndexThrottle就是返回的函数，我们要触发的就是这个函数

      // leading=true: 指定调用在节流开始前。用来控制第一次的函数是否调用
      // trailing=true: 指定调用在节流结束后。用来控制最后一次的函数是否调用
      this.EnterIndexThrottle = throttle(this.EnterIndex, 200, {
        leading: false,
        trailing: true,
      });
    },
    watch: {
      // 当路由变化的时候，隐藏nav，显示搜索页面。不需要每次鼠标移出才把nav页面隐藏起来
      $route() {
        this.mouseInNav = false;
      },
    },
  };
</script>

<style lang="less" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 461px;
        position: absolute;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }
            // &:hover {
            //   .item-list {
            //     display: block;
            //   }
            // }
            &.active {
              background: #ccc;
              .item-list {
                display: block;
              }
            }
          }
        }
      }
    }
  }
</style>
