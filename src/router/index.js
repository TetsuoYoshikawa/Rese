import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import MyPage from '../views/MyPage.vue';
import RestaurantDetail from '../views/RestaurantDetail.vue';
import Done from '../views/Done.vue';
import Thanks from '../views/Thanks.vue';
import RestaurantList from '../views/RestaurantList.vue';
import Review from '../views/Review.vue';
import Admin from '../views/Admin.vue';
import RestaurantListAdmin from '../views/RestaurantlistAdmin.vue';
import AdminCheck from '../views/AdminCheck.vue';
import store from '../store/index';
//import A from '../views/A.vue';

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'RestaurantList',
    component:RestaurantList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component:MyPage,
    meta:{
      userAuth:true,
    }
  },
  {
    path: '/detail/:id',
    name: 'RestaurantDetail',
    component:RestaurantDetail,
    props: true,
    meta:{
      userAuth:true,
    }
  },
  {
    path:'/review/:id',
    name:'Review',
    component:Review,
    props: true,
  },
  {
    path:'/done',
    name:'done',
    component:Done
  },
  {
    path:'/thanks',
    name:'thanks',
    component:Thanks
  },
//  {
//    path:'/a',
//    name:'a',
//   component:A,
//  },
  {
    path:'/admin',
    name:'admin',
    component:Admin,
    meta:{
      administratorAuth:true,
    }
  },
  {
    path:'/adminList',
    name:'adminList',
    component:RestaurantListAdmin,
    meta:{
      administratorAuth:true,
    }
  },
  {
    path:'/admincheck',
    name:'admincheck',
    component:AdminCheck,
    meta:{
      administratorAuth:true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to,from,next) => {
  if(
    (to.matched.some((record) => record.meta.userAuth) &&
    !store.state.auth) ||
    (to.matched.some((record) => record.meta.administratorAuth) && 
    !store.state.administrator)
    ){
    next({
      path:"/login",
      query:{
        redirect:to.fullPath,
      },
    });
  }else{
    next();
  }
});

export default router;
