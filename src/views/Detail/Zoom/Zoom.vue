<template>
  <div class="spec-preview">
    <img :src="skuImageList[defaultIndex]?.imgUrl" />
    <div class="event" @mousemove="maskMove"></div>
    <div class="big">
      <img :src="skuImageList[defaultIndex]?.imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ["skuImageList", "defaultIndex"],
    methods: {
      maskMove(e) {
        // 确定鼠标所在位置
        const mouseLocation = {
          // offset是确定鼠标位置距离事件触发元素的边界的距离。如果只有两div，那么在外面绑定事件，因为冒泡，其实里面小的也会进行触发，那么久不能获鼠标到外面的边界距离，得到的是到小mask的距离
          x: e.offsetX,
          y: e.offsetY,
        };
        //  确定mask需要移动的位置
        const maskLocation = {
          // offsetWidth获取的是元素带边框的宽度和高度
          // client获取的是元素不带边框的宽度和高度
          x: mouseLocation.x - this.$refs.mask.offsetWidth / 2,
          y: mouseLocation.y - this.$refs.mask.offsetHeight / 2,
        };

        // 判断临界值
        // 要想获取到目标元素，需要使用e.target获取事件触发的元素。一个e获取的其实是鼠标。
        if (maskLocation.x <= 0) {
          maskLocation.x = 0;
        } else if (
          maskLocation.x >=
          e.target.clientWidth - this.$refs.mask.offsetWidth
        ) {
          maskLocation.x = e.target.clientWidth - this.$refs.mask.offsetWidth;
        }

        if (maskLocation.y <= 0) {
          maskLocation.y = 0;
        } else if (
          maskLocation.y >=
          e.target.clientHeight - this.$refs.mask.offsetHeight
        ) {
          maskLocation.y = e.target.clientHeight - this.$refs.mask.offsetHeight;
        }

        // mask定位
        this.$refs.mask.style.left = maskLocation.x + "px";
        this.$refs.mask.style.top = maskLocation.y + "px";

        // 放大镜移动
        this.$refs.bigImg.style.left = -maskLocation.x * 2 + "px";
        this.$refs.bigImg.style.top = -maskLocation.y * 2 + "px";
      },
    },
  };
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
</style>
