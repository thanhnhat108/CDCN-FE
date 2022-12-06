import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminLogin from "../admin/AdminLogin";
import Layout from '../admin/Layout';
import Category from '../admin/Category'
import Product from "../admin/Product";
import User from "../admin/User";
import Rating from "../admin/Rating";
import Home from  "../component/Home"
import Register from "../component/Register";
import Login from "../component/Login"
import CategoryPage from '../component/CategoryPage'
import Container from "../component/Container";
import Profile from "../component/Profile";
import ProductPage from "../component/ProductPage";
import SearchPage from "../component/SearchPage";
import Pay from "../component/Pay";
import MyRating from "../component/MyRating"
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
    path:'/user',
    name:'user',
    component:Profile,
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
  {
    path:'/admin/login',
    name:'admin',
    component:AdminLogin
  },
  {
    path: '/admin',
    name: 'manage',
    component: Layout,
    children: [
      {
        path: '/admin',
        name: 'category_mng',
        component: Category
      },
      {
        path: '/admin/product',
        name: 'product_mng',
        component: Product
      },
      {
        path: '/admin/rating',
        name: 'rating_mng',
        component: Rating
      },
      {
        path: '/admin/user',
        name: 'user_mng',
        component: User
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
