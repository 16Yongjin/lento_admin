<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'label'],
  mounted () {
    this.renderChart({
      labels: Object.keys(this.data),
      datasets: [{
        label: this.label,
        backgroundColor: '#88D1F1',
        data: Object.values(this.data)
      }] },
      {
        responsive: true,
        maintainAspectRatio: false
      })
  }
}
</script>

<style scoped>

</style>