<template lang="pug">
v-dialog(v-model="dialog" max-width="500px")
  v-card
    v-card-title
      span.headline 식당 정보 생성
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
          v-flex(xs12 sm4)
            v-text-field(label="혼밥지수" v-model="tmp.honbob" type="number")
          v-flex(xs12 sm8)
            v-text-field(label="혼밥비급" v-model="tmp.honmono")

    v-card-actions
      v-spacer
      v-btn(color="blue darken-1" :disabled="loading" flat @click="close()") Close
      v-btn(color="blue darken-1" :disabled="loading" flat @click="close(tmp)") Save
</template>

<script>
export default {
  data () {
    return {
      tmp: {},
      imageUrl: ''
    }
  },
  computed: {
    dialog: {
      set () {
        this.$store.dispatch('closeAddDialog')
      },
      get () {
        return this.$store.getters.addDialog
      }
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    close (newFood) {
      this.$store.dispatch('closeAddDialog', newFood)
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