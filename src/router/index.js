import Vue from 'vue'
import Router from 'vue-router'
import CurrentlyPlaying from '@/components/CurrentlyPlaying'
import MovieDetail from '@/components/MovieDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CurrentlyPlaying',
      component: CurrentlyPlaying
    },
    {
      path: '/movie_detail',
      name: 'MovieDetail',
      component: MovieDetail
    }
  ]
})
