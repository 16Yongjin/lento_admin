<template lang="pug">
  v-container
    v-layout(row wrap)
      v-flex(xs12)
        v-card.ma-1(v-if="logs")
          v-card-title
            h2 총 서버 요청 수: {{ all }}회
            h4 
      v-flex(xs12 sm6 v-for="log in logs" :key="log[0]")
        v-card.pa-3.ma-1
          line-chart(:label="`Server request by ${log[0]}`" :data="log[1]")
</template>

<script>
import LineChart from './Chart.vue'

export default {
  computed: {
    logs () {
      return this.$store.getters.logs
    },
    all () {
      if (this.logs) {
        return Object.values(this.logs[0][1]).reduce((a, v) => a + v, 0)
      }
    }
  },
  created () {
    this.$store.dispatch('loadLogs')
  },
  components: {
    LineChart
  }
}
</script>

<style scoped>

</style>