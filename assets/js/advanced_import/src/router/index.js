import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash', // hash|history
    // base: process.env.BASE_URL,
    base: location.hostname==='localhost' ? '/' : location.pathname,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        const authorized = true
        if(authorized===true) {
            next()
        }else {   
            next({
                path: '/',
                // query: { redirect: to.fullPath }
            })
        }
    }else {
        next() // make sure to always call next()!
    }
  })

export default router