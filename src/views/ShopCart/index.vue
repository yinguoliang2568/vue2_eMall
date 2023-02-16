<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartList" :key="good.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :Checked="good.isChecked === 1"
              @input="changeChecked(good.skuId, good.isChecked === 1 ? 0 : 1)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="addNum(good, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="changeText(good, $event)"
              @keyup.enter="changeblur($event)"
            />
            <a class="plus" @click="addNum(good, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuNum * good.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteItem(good.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="allCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deletAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    reqShopCartList,
    reqCartChange,
    reqCartAllChange,
    reqCartDelete,
    reqCartAllDelete,
    reqAddOrUpdateCart,
  } from "@/api";
  export default {
    name: "ShopCart",
    data() {
      return { cartList: [], isReq: false };
    },

    methods: {
      async getShopCartList() {
        const result = await reqShopCartList();
        // 对于每个列表中的每个对象都需要一个isReq属性，互相之间不打扰。使用map给每一个想、对象添加一个属性，同时map返回相同长度的数组。
        this.cartList =
          result[0]?.cartInfoList.map((item) => {
            item.isReq = false;
            return item;
          }) || [];
        // console.log(result, 999);
      },

      // 修改单个选中的状态
      async changeChecked(skuId, isChecked) {
        await reqCartChange(skuId, isChecked);
        // 重新获取请求
        // console.log(4444);
        this.getShopCartList();
      },
      // 删除单个数据
      async deleteItem(skuId) {
        await reqCartDelete(skuId);
        // 重新获取请求
        this.getShopCartList();
      },

      // 批量删除购物车
      async deletAll() {
        const skuIdList = this.cartList.reduce(
          (p, c) => (c.isChecked === 1 ? [...p, c.skuId] : p),
          []
        );
        await reqCartAllDelete(skuIdList);
        // 重新获取请求
        this.getShopCartList();
      },

      // 增加数量
      async addNum(good, num) {
        // 第一遍判断是否还在请求中,如果还在请求中，那算了，拜拜，不管
        if (good.isReq) return;

        //一旦拦路狗无法拦住，那么就是我没有请求，但是我现在要请求了
        good.isReq = true;
        // 设置num的临界值.当skuNum为1的时候，就不应该继续发送请求了。同时这次请求也完成了，需要将isReq设置为false
        // 只有当num===-2说明是是在往下减少的时候不能=1，在加的时候，值可以是1的
        if (num === -1 && good.skuNum <= 1) return (good.isReq = false);
        await reqAddOrUpdateCart(good.skuId, num);
        // 重新获取请求
        // 我们必须等所有请求访问完成以后才能设置isReq，因为getShopCartList是async，返回的是promise，所有可以使用await
        await this.getShopCartList();
        // 一定要确保请求全部成功，后台数据已经回到浏览器并且修改了cartList.请求成功以后就将请求变成false
        good.isReq = false;
      },

      // 输入框发生改变
      async changeText(good, e) {
        // 判断输入框的数是不是数字
        const imputNum = parseInt(e.target.value);
        if (isNaN(imputNum)) {
          // 如果输入的不是数字，就需要返回原来的值。同时结束请求
          e.target.value = good.skuNum;
          return;
        } else {
          if (imputNum < 1) {
            e.target.value = good.skuNum;
            return;
          }
          // 如果数数字，就需要将这个数字重新写入输入框，去掉一些字符串。
          e.target.value = imputNum;
        }
        // 因为更新的请求是往上累加传入的参数的，所以需要计算一下
        await reqAddOrUpdateCart(good.skuId, imputNum - good.skuNum);
        // 重新获取请求
        await this.getShopCartList();
      },
      // 输入框失去焦点
      changeblur(e) {
        e.target.blur();
      },
    },
    computed: {
      // 获取总价钱
      allPrice() {
        return this.cartList.reduce((p, c) => p + c.skuNum * c.skuPrice, 0);
      },
      // 获取总数量
      allNum() {
        return this.cartList.reduce((p, c) => p + c.skuNum, 0);
      },
      // 全选
      allCheck: {
        get() {
          if (this.cartList.length === 0) return false;
          return this.cartList.every((item) => item.isChecked === 1);
        },
        async set(value) {
          const skuIdList = this.cartList.map((item) => item.skuId);
          await reqCartAllChange(value ? 1 : 0, skuIdList);
          // 重新获取请求
          // console.log(4444);
          this.getShopCartList();
        },
      },
    },
    mounted() {
      this.getShopCartList();
    },
  };
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 4.1667%;
          }

          .cart-list-con2 {
            width: 25%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 12.5%;
          }

          .cart-list-con5 {
            width: 12.5%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 12.5%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 12.5%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
