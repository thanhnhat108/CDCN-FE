import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from  "../component/Home"
import Register from "../component/Register";
import Login from "../component/Login"
import CategoryPage from '../component/CategoryPage'
import ProductPage from "../component/ProductPage";
import Container from "../component/Container";
import SearchPage from "../component/SearchPage";
import MyRating from "../component/MyRating"
import Pay from "../component/Pay";

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
        path:'/category',
        name:'category',
        component:CategoryPage
      },
      {
        path:'/book',
        name:'product',
        component:ProductPage
      },
      {
        path:'/search',
        name:'search',
        component:SearchPage,
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path:'/ratingbyuser',
    name:'ratingbyuser',
    component:MyRating,
  },
  {
    path:'/pay',
    name:'payment',
    component:Pay,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
