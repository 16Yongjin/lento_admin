<template lang="pug">
  v-container(grid-list-lg)
    v-layout(row wrap)
      food-card(v-for="food in foods" :food="food" :key="food._id") 
      edit-dialog
      add-dialog
      v-btn(fixed dark fab bottom right color="orange" @click="openAddDialog()")
        v-icon add
        
</template>

<script>
import FoodCard from './Card'
import EditDialog from './EditDialog'
import AddDialog from './AddDialog'

export default {
  components: {
    FoodCard,
    EditDialog,
    AddDialog
  },
  data () {
    return {
      hovered: null,
      dialog: true
    }
  },
  computed: {
    foods () {
      return this.$store.getters.foods // .slice(0, 20)
    }
  },
  methods: {
    openAddDialog () {
      this.$store.dispatch('openAddDialog')
    }
  }
}
</script>

<style scoped>

</style>