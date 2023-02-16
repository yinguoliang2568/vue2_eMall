<template>
  <div>
    <TypeNav></TypeNav>
    <List></List>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 
      1,因为有多个floor，且floor是在Home进行展示的，所以我们需要在Home里面获取数据
      2,floor需要传参过去，我们直接将floor直接传值过去
   -->
    <Floor
      v-for="floor in mockFloorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
  import Brand from "./Brand";
  import Floor from "./Floor";
  import Like from "./Like";
  import List from "./List";
  import Rank from "./Rank";
  import Recommend from "./Recommend";
  import { reqMockFloorList } from "@/api";
  export default {
    name: "Home",
    data() {
      return {
        mockFloorList: [],
      };
    },
    components: {
      Brand,
      Floor,
      Like,
      List,
      Rank,
      Recommend,
    },
    methods: {
      async getMockFloorList() {
        const result = await reqMockFloorList();
        this.mockFloorList = result;
        console.log(result, "floor");
      },
    },
    mounted() {
      this.getMockFloorList();
    },
  };
</script>

<style></style>
