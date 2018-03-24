<template lang="pug">
v-flex(:key="food.name" lg3 md4 sm6 xs12 style="position: relative")
  v-card(@mouseover="hovered = true; fixPosition();" @mouseleave="hovered = false")
    v-card-media(:src="food.images[0] ? `https://api.lento.in/public/images/${food.images[0]}` : require('@/assets/logo.png')" alt="Vuetify.js" height="200px")
      my-chip(v-if="!food.time") 시간 X
      my-chip(v-if="!food.lat") 위치 X
    v-card-title(primary-title)
      div
        div.title(v-text="food.name")
        div(v-text="food.type")
    v-card-actions
      v-spacer
      v-btn(@click="openDialog" flat color="orange") 수정하기
  v-card.infos.infos-r.hidden-xs-only(v-show="hovered" :id="food.name")
    v-card-title
      div 
        div.mb-1.title(v-text="food.name")
        div.mb-2(v-text="food.type")
        my-chip(v-if="!food.time") 시간 없음
        div(v-else)
          v-icon.mr-1 access_time
          span 영업시간          
          p.lines.ml-4(v-text="food.time")
        my-chip(v-if="!food.lat") 위치 없음

    v-card-text(v-text="food.menu")
</template>

<script>
export default {
  props: ['food'],
  data () {
    return {
      hovered: false,
      positionFixed: false
    }
  },
  methods: {
    openDialog () {
      this.$store.dispatch('openEditDialog', this.food)
    },
    fixPosition () {
      if (this.positionFixed) return
      const elem = document.getElementById(this.food.name)
      const rect = elem.getBoundingClientRect()
      // console.log(rect)
      if (rect.x === 0) return
      if (rect.x + rect.width > window.innerWidth) {
        elem.classList.remove('infos-r')
        elem.classList.add('infos-l')
      }
      this.positionFixed = true
    }
  },
  components: {
    'my-chip': {
      template: '<v-chip color="green" text-color="white" style="height: 34px"><slot /></v-chip>'
    }
  }
}
</script>

<style scoped>
.lines {
  white-space: pre-line
}

.infos {
  position: absolute; 
  top: 0;
  z-index: 10; 
  width: 100%;
  box-sizing: border-box;
}

.infos::after {
    content: "";
    position: absolute;
    top: 50%;
    border: 0.6rem solid #ebebeb;
    border-color: transparent transparent #fff #fff;
    transform-origin: 0 0;
    box-shadow: -1px 1px 1px 0 #ebebeb;
}
.infos-r {
  left: 100%;
}

.infos-l {
  right: 100%;
}

.infos-r::after{
    transform: rotate(45deg); 
  }

.infos-l::after{
    left: 100%;
    transform: rotate(225deg);
  }
</style>