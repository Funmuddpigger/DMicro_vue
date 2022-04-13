import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import SearchInfo from '../components/SearchInfo.vue'
import Mine from '../components/Mine.vue'
import Create from '../components/Create.vue'
import ArticleAll from '../components/ArticleAll.vue'
import Register from '../components/Register.vue'
import Usr from '../components/Usr.vue'
import Commity from '../components/Commity.vue'
import Video from '../components/Video.vue'
import infiniteScroll from 'vue-infinite-scroll'
import Play from '../components/PlayVideo.vue'
import globalVariable from '../components/GlobalVaribal'
import Good from '../components/Good.vue'
import Info from '../components/Info.vue'
import AddGood from '../components/AddGood.vue'

Vue.prototype.GLOBAL = globalVariable

Vue.use(infiniteScroll)

Vue.use(VueRouter)

// 指定路由规则
const routes = [
  {
    path: '/',redirect: '/login'
  },
  {
    path: '/login',name:'login',component: Login
  },
  {
    path: '/home',name:'home',component: Home
  },
  {
    path: '/search-info',name:'search-info',component: SearchInfo
  },
  {
    path: '/mine',name:'mine',component: Mine
  },
  {
    path: '/create',name:'create',component: Create
  },
  {
    path: '/article-all',name:'article-all',component: ArticleAll
  },
  {
    path: '/register',name:'register',component: Register
  },
  {
    path: '/usr',name:'usr',component: Usr
  },
  {
    path: '/commity',name:'commity',component: Commity
  },
  {
    path: '/video',name:'video',component: Video
  },
  {
    path: '/play',name:'play',component: Play
  },
  {
    path: '/good',name:'good',component: Good
  },
  {
    path: '/add-good',name:'add-good',component: AddGood
  },
  {
    path: '/info',name:'info',component: Info
  }
]

const router = new VueRouter({
  routes
})



router.beforeEach((to, from ,next) =>{
  //to 将要访问的路径
  //from 从哪个路径跳转过来
  //next 是一个函,表示放行 其中next() 放行  next('/login')  强制跳转
  
  //直接登录页面
  if(to.path === '/login'|| to.path === '/register'||to.path === '/home'|| to.path === '/search-info'||to.path === '/article-all'||to.path === '/video'||to.path === '/good'||to.path === '/info'){ return next() }
  //get token
  const tokenStr = window.sessionStorage.getItem('token')
  if(tokenStr == null || tokenStr == ""||tokenStr=="undefined") { 
    return next('/login')
  }else{
    next();
  }

})

export default router 


 

