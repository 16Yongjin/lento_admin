<template lang="pug">
v-container(grid-list-lg)
  v-layout(row wrap)
    image-card(v-for="image in userImages" :image="image" :key="image.image")
 
</template>

<script>
import ImageCard from './ImageCard'

export default {
  components: {
    ImageCard
  },
  computed: {
    userImages () {
      console.log(this.$store.getters.userImages)
      return this.$store.getters.userImages
    }
  },
  created () {
    if (!this.userImages.length) {
      this.$store.dispatch('loadUserImages')
    }
  }
}
</script>

<style scoped>

</style>