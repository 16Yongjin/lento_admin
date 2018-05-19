import store from '../store'

export default (to, from, next) => {
  if (store.getters.auth || to.path.includes('/login')) {
    next()
  } else {
    next('/login?to=' + to.path)
  }
}
