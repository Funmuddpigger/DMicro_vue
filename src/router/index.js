import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import SearchInfo from '../components/SearchInfo.vue'
import Mine from '../components/Mine.vue'
import Create from '../components/Create.vue'
import ArticleAll from '../components/ArticleAll.vue'

Vue.use(VueRouter)

// 指定路由规则
const routes = [
  {
    path: '/',redirect: '/login'
  },
  {
    path: '/login',component: Login
  },
  {
    path: '/home',component: Home
  },
  {
    path: '/search-info',component: SearchInfo
  },
  {
    path: '/mine',component: Mine
  },
  {
    path: '/create',component: Create
  },
  {
    path: '/article-all',component: ArticleAll
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
  if(to.path === '/login'){ return next() };
  //get token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) { 
    return next('/login')
  }else{
    next();
  }
})

export default router 
