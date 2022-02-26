<template>
  <div>
    <navigation></navigation>
    <carousel></carousel>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Carousel from "@/components/carousel";
export default {
  name: "Home",
  components: {Carousel, Navigation}
}
</script>

<style scoped>

</style>