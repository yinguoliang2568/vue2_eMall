<template>
  <div>
    <TypeNav></TypeNav>
    <List></List>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
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
  import { req_FloorList } from "@/api";
  export default {
    name: "Home",
    data() {
      return {
        floorList: [],
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
      async getFloorList() {
        const result = await req_FloorList();
        this.floorList = result;
      },
    },
    mounted() {
      this.getFloorList();
    },
  };
</script>

<style></style>
