<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <!-- 从mock获取的数据，进行遍历将dom渲染出来 -->
      <div class="swiper-slide" v-for="item in swiperData" :key="item.id">
        <!-- 因为在代码会打包，而我们的banner需要在运行的时候才运行，那时候路径地址已经不对了。所以我们需要将图片放入静态资源中 -->
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from "swiper";
  import "swiper/css/swiper.min.css";
  export default {
    name: "Swiper",
    props: ["swiperData"],
    watch: {
      swiperData: {
        immediate: true,
        handler() {
          this.$nextTick(() => {
            new Swiper(this.$refs.mySwiper, {
              // direction: "horira", // 垂直切换选项
              loop: true, // 循环模式选项

              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
          });
        },
      },
    },
  };
</script>

<style></style>
