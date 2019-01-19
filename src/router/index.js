import Vue from 'vue'
import Router from 'vue-router'
import recommend from '../components/recommend/recommend.vue'
import rank from '../components/rank/rank.vue'
import singer from '../components/singer/singer.vue'
import singerDetail from '../components/singerDetail/singerDetail.vue'
import rankDetail from '../components/rankDetail/rankDetail.vue'
import user from '../components/user/user.vue'
import search from '../components/search/search.vue'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
},
  routes: [{
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [{
          path: 'singerDetail',
          name: 'singerDetail',
          component: singerDetail
        },
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [{
          path: 'rankDetail',
          name: 'rankDetail',
          component: rankDetail
        },
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/search',
      name: 'search',
      component: search,
    },
  ]
})
