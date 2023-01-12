<template>
  <div>
    <TypeNav></TypeNav>
    <List></List>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
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
  import TypeNav from "./TypeNav";
  export default {
    name: "Home",
    components: {
      Brand,
      Floor,
      Like,
      List,
      Rank,
      Recommend,
      TypeNav,
    },
  };
</script>

<style></style>
