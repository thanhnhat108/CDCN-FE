import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from  "../component/Home"

import Container from "../component/Container";

import SearchPage from "../component/SearchPage";

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'hello',
    component:Container,
    children:[
      {
        path:'/',
        name: 'home',
        component: Home
      },

      {
        path:'/search',
        name:'search',
        component:SearchPage,
      },
    ]
  },
  
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../admin/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
