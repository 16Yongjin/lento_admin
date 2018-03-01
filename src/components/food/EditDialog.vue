<template lang="pug">
v-dialog(v-model="dialog" max-width="500px")
  v-card
    v-card-title
      span.headline 식당 정보 수정
      v-spacer
      v-menu(bottom left)
        v-btn(icon slot="activator")
          v-icon more_vert
        v-list
          v-list-tile(@click="deleteFood")
            v-list-tile-title 삭제하기

    v-card-text
      v-container(grid-list-md)
        v-layout(wrap)
          v-flex(xs12 sm6)
            v-text-field(label="이름" v-model="tmp.name" required)
          v-flex(xs12 sm6)
            v-text-field(label="영업시간" v-model="tmp.time" multi-line rows="1" persistent-hint)
          v-flex(xs12 sm4)
            v-text-field(label="종류" v-model="tmp.type" hint="example of helper text only on focus")
          v-flex(xs12 sm4)
            v-text-field(label="위도" v-model="tmp.lat" type="number")
          v-flex(xs12 sm4)
            v-text-field(label="경도" v-model="tmp.lng" type="number")
          v-flex(xs12)
            v-text-field(label="메뉴" v-model="tmp.menu" multi-line rows="3" hint="',' 로 메뉴를 구분합니다.")
          v-layout(v-if="food.images && food.images[0]" row style="overflow-x: auto")
            v-flex.relative.ma-1(v-for="image in food.images" :key="image")
              v-btn(icon absolute left color="white"  @click="deleteImage(image)") 
                v-icon close
              img.h150(:src="`http://localhost:3000/public/images/${image}`" style="height: 150px")

    v-card-actions
      v-btn(icon @click="onPickFile" :disabled="loading")
        v-icon add_a_photo
      input(type="file" ref="image" name="image" accept="image/*" @change="onFilePicked" multiple)
      v-spacer
      v-btn(color="blue darken-1" :disabled="loading" flat @click="close()") Close
      v-btn(color="blue darken-1" :disabled="loading" flat @click="close(tmp)") Save
</template>

<script>
export default {
  data () {
    return {
      tmp: this.food || {},
      imageUrl: ''
    }
  },
  computed: {
    dialog: {
      set () {
        this.$store.dispatch('closeEditDialog')
      },
      get () {
        return this.$store.getters.editDialog
      }
    },
    food () {
      return this.$store.getters.editFood || { }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    food () {
      const { name, type, time, menu, lat, lng } = this.food
      this.tmp = { name, type, time, menu, lat, lng }
    }
  },
  methods: {
    close (editedFood) { // or close + save
      this.$store.dispatch('closeEditDialog', editedFood)
    },
    onPickFile () {
      this.$refs.image.click()
    },
    onFilePicked (event) {
      const files = event.target.files || event.dataTransfer.files
      if (!files) return
      const id = this.food._id
      this.$store.dispatch('saveImages', { files, id })
    },
    deleteFood () {
      if (!confirm('식당을 삭제할까요?')) return
      const id = this.food._id
      this.$store.dispatch('deleteFood', id)
    },
    deleteImage (image) {
      if (!confirm('이미지를 삭제할까요?')) return
      const id = this.food._id
      this.$store.dispatch('deleteImage', { image, id })
    }
  }
}
</script>

<style scoped>
.h150 {
  height: 150px;
}

.relative {
  position: relative;
}

input[type='file'] {
  position: absolute;
  left: -99999px;
}
</style>