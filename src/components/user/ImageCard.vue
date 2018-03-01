<template lang="pug">
  v-flex(lg3 md4 sm6 xs12)
    v-card
      v-card-media(height="200px" :src="`http://localhost:3000/public/images/${image.image}`" :key="image.image")
      v-card-title.title {{ image.name }}
      v-card-actions
        v-spacer
        v-btn(flat color="red" @click="deleteImage") 삭제
        v-btn(flat color="blue" @click="saveImage") 저장
</template>

<script>
export default {
  props: ['image'],
  created () {
    console.log(this.image)
  },
  methods: {
    saveImage () {
      const { _id, image, to } = this.image

      this.$store.dispatch('saveUserImage', { _id, image, to })
    },
    deleteImage () {
      if (!confirm('사진을 삭제할까요?')) return
      const { _id, image } = this.image
      console.log(_id, image)
      this.$store.dispatch('deleteUserImage', { _id, image })
    }
  }
}
</script>