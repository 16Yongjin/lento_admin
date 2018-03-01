import store from '../store'

export default (to, from, next) => {
  // console.log(to, from)
  if (store.getters.auth || to.path.includes('/login')) {
    next()
  } else {
    next('/login?to=' + to.path)
  }
}
