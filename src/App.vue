<template lang="pug">
v-app
  v-navigation-drawer(:mini-variant="miniVariant" v-model="drawer" fixed app)
    v-toolbar(flat)
      v-list
        v-list-tile
          v-list-tile-title.title
            | Lento
      v-divider
    v-list
      v-list-group(v-for="item in items" :value="item.active" :key="item.title")
        v-list-tile(slot="item" @click="mini" :to="item.to")
          v-list-tile-action
            v-icon {{ item.action }}
          v-list-tile-content
            v-list-tile-title {{ item.title }}
          v-list-tile-action(v-if="item.items")
            v-icon keyboard_arrow_down
        v-list-tile(v-for="subItem in item.items" :key="subItem.title" @click="" :to="subItem.to")
          v-list-tile-content
            v-list-tile-title {{ subItem.title }}
          v-list-tile-action
            v-icon {{ subItem.action }}
          
  v-toolbar(app fixed clipped-left).elevation-1
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-btn(icon @click.stop="miniVariant = !miniVariant")
      v-icon {{ miniVariant ? 'chevron_right' : 'chevron_left' }}
    v-toolbar-title(v-text="title")
    v-spacer
    v-toolbar-items.hidden-sm-and-down
    div(v-if="auth")
      v-btn(@click="refresh" flat)
        v-icon refresh  
      v-btn(@click="logout" flat) 로그아웃
    v-btn(v-else flat to="login") 로그인

  v-content
    router-view
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      items: [
        {
          action: 'dashboard',
          title: 'Dashboard',
          to: '/'
        }, {
          action: 'restaurant',
          title: 'Foods',
          to: '/list',
          items: [
            { title: 'Card', to: '/list' },
            { title: 'Table', to: '/table' },
            { title: 'Sushi' }
          ]
        }, {
          action: 'group',
          title: 'Users',
          to: '/users',
          items: [
            { title: 'List', to: '/users' },
            { title: 'Photo', to: '/users/images' }
          ]
        }],
      miniVariant: false,
      title: 'Admin Dashboard'
    }
  },
  computed: {
    auth () {
      return this.$store.getters.auth
    }
  },
  methods: {
    mini () {
      if (this.miniVariant) {
        this.miniVariant = !this.miniVariant
        this.drawer = true
      }
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    refresh () {
      const route = this.$route.name
      if (route === 'Dashboard') {
        this.$store.dispatch('loadLogs')
      } else if (route.startsWith('Food')) {
        this.$store.dispatch('loadFoods')
      } else if (route.startsWith('User')) {
        this.$store.dispatch('loadUserImages')
      }
    }
  }
}
</script>

<style>
.fade-enter-active,.fade-leave-active{transition:opacity .3s}.fade-enter,.fade-leave-active,.fade-leave-to{opacity:0}.jump-enter-active{animation:jump .2s}.jump-leave-active{animation:jump .2s reverse}@keyframes jump{0%{transform:translateY(10px)}50%{transform:translateY(-10px)}100%{transform:translateY(0)}}.slide-fade-leave-active,.slide-left-enter-active{transition:all .3s ease}.slide-left-enter{transform:translateX(10px)}.slide-left-leave,.slide-left-leave-to{transform:translateX(10px)}
</style>

