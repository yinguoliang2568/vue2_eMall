<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="mouseIsNav = true" @mouseleave="mouseIsNav = false">
        <h2 class="all">全部商品分类</h2>
        <div
          class="sort"
          @mouseenter="mouseInCategoryFlag = true"
          @mouseleave="mouseInCategoryFlag = false"
          v-show="isShow"
        >
          <div class="all-sort-list2" @mouseleave="mouseInCategoryIndex = -1">
            <div
              class="item"
              v-for="(category1, index) in category1List"
              :key="category1.id"
              @mouseenter="getCategory23Throttle(category1.id, index)"
              :class="{ active: mouseInCategoryIndex === index }"
              @click="toSearch"
            >
              <h3>
                <a
                  :data-category1id="category1.id"
                  :data-categoryname="category1.name"
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
                        :data-category2id="category2.id"
                        :data-categoryname="category2.name"
                        >{{ category2.name }}</a
                      >
                    </dt>
                    <dd>
                      <em
                        v-for="category3 in category2.children"
                        :key="category3.id"
                      >
                        <a
                          :data-category3id="category3.id"
                          :data-categoryname="category3.name"
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
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import { throttle } from "lodash";
  export default {
    name: "TypeNav",
    data() {
      return {
        // 鼠标移入移除
        mouseInCategoryIndex: -1,
        // 鼠标是否在三级分类列表中
        mouseInCategoryFlag: false,
        // 是否在nav中
        mouseIsNav: false,
      };
    },
    computed: {
      ...mapState("category", ["category1List"]),
      isShow() {
        if (this.$route.name === "Home") return true;
        return this.mouseIsNav;
      },
    },
    methods: {
      // 获取一级分类的数据
      ...mapActions("category", ["getCategory1List", "getCategory2List"]),
      getCategory2Index(id, index) {
        //如果鼠标已经移出，就不要再执行获取数据的请求了。
        if (!this.mouseInCategoryFlag) return;

        this.mouseInCategoryIndex = index;
        this.getCategory2List(id);
      },
      // 节流函数占位，起到一个响应式的作用
      getCategory23Throttle() {},

      // 跳转
      toSearch(e) {
        const { category1id, category2id, category3id, categoryname } =
          e.target.dataset;
        this.$router.push({
          name: "Search",
          query: {
            category1id,
            category2id,
            category3id,
            categoryname,
          },
        });
      },
    },
    mounted() {
      // 获取一级分类的数据
      this.getCategory1List();
      // 我们需要执行节流函数返回的函数。
      // [options.leading=true] (boolean): 指定调用在节流开始前。
      // [options.trailing=true] (boolean): 指定调用在节流结束后。
      this.getCategory23Throttle = throttle(this.getCategory2Index, 200, {
        // 鼠标移入后是否立即执行第一次
        leading: false,
        // 鼠标移出后是否还执行最后一次节流时间为接受的。
        trailing: true,
      });
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
