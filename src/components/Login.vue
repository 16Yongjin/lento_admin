<template lang="pug">
v-container.h100
  v-layout.h100(align-center)
    v-layout(column align-center)
      v-alert.max500(block color="error" icon="warning" :value="error" v-text="error")
      v-flex.max500
        v-card
          v-card-title
            span.headline 로그인
          v-card-text
            v-container(grid-list-md)
              v-layout(wrap)
                v-flex(xs12)
                  v-text-field(label="아이디" v-model="username" required)
                v-flex(xs12)
                  v-text-field(@keyup.enter="login" label="비밀번호" v-model="password" type="password" required)
                v-flex
                  v-btn(@click="login" block color="grey" :disabled="hasBlank") 로그인


</template>

<script>
export default {
  props: ['to'],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    hasBlank () {
      return !this.username || !this.password
    }
  },
  methods: {
    go (to) {
      this.$router.push(to || '/')
    },
    login () {
      const { username, password, go, to, hasBlank } = this
      if (hasBlank) return
      this.$store.dispatch('login', { username, password, go: () => go(to) })
    }
  },
  created () {
    const localAuth = localStorage.getItem('auth')
    if (localAuth) {
      const { go, to } = this
      this.$store.dispatch('login', { localAuth, go: () => go(to) })
    }
  }
}
</script>

<style scoped>
.max500 {
  max-width: 500px;
}

.h100 {
  height: 100%;
}

</style>