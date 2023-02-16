<template>
  <div class="pagination">
    <!-- 判断当前页在上面地方，如果是第一页或者最后一页，那么久无法点击按钮 -->
    <button
      :disabled="currentPage === 1"
      @click="$emit('changePage', currentPage - 1)"
    >
      上一页
    </button>
    <!-- 使用条件判断，当start>1的时候，1才会显示，不然直接使用连续的数据 -->
    <button v-if="startEndPage.start > 1" @click="$emit('changePage', 1)">
      1
    </button>
    <!-- 需要大于2 才会显示，如果=2.那么就会没必要，1和2 之间不应该有。。。 -->
    <button v-if="startEndPage.start > 2">···</button>

    <button
      v-for="page in filterPage"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="$emit('changePage', page)"
    >
      {{ page }}
    </button>
    <!-- 相同道理，连续的有total的时候，就不需要在单独展示total了 -->
    <button v-if="startEndPage.end < totalPage - 1">···</button>
    <button
      v-if="startEndPage.end < totalPage"
      @click="$emit('changePage', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="currentPage === totalPage"
      @click="$emit('changePage', currentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">{{ total }}</button>
    <!-- {{ startEndPage }} -->
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: ["total", "totalPage", "currentPage"],
    data() {
      return {
        continuePage: 5,
      };
    },
    computed: {
      startEndPage() {
        let start, end;
        // 首先判断totalpage和continuepage的长度比较。
        if (this.continuePage > this.totalPage) {
          start = 1;
          end = this.totalPage;
          //   当确定totalpage一定大于continpage的时候再考虑其他的东西
        } else {
          start = this.currentPage - Math.floor(this.continuePage / 2);
          end = this.currentPage + Math.floor(this.continuePage / 2);
          if (start < 1) {
            start = 1;
            end = this.continuePage;
          }
          if (end > this.totalPage) {
            end = this.totalPage;
            start = this.totalPage - this.continuePage + 1;
          }
        }
        console.log(start, end);
        return {
          start,
          end,
        };
      },

      // 因为v-for和v-if不能同时使用，使用计算属性进行
      filterPage() {
        const arr = [];
        for (var i = 1; i <= this.startEndPage.end; i++) {
          if (i >= this.startEndPage.start) {
            arr.push(i);
          }
        }
        return arr;
      },
    },
  };
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
