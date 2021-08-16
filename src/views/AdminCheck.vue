<template>
  <div>
    <Header />
    <div class="mypage">
      <div  key="left" class="reserve">
        <h2 v-if="notReserve" >予約店舗はございません</h2>
        <h2 v-else >予約状況</h2>
        <div>
          <div class="reserve-info" v-for="(reserve,index) in reserves" :key="index">
            <div class="reserve-top flex">
              <img src="../assets/time.png" style="height:30px;width:30px;margin:0 20px;padding: 10px 0">
              <p class="reserve-title">予約 No.{{reserve.id}}</p>
              <img src="../assets/cross.png" @click="deleteReservation(reserve)" style="height:30px;width:30px;margin-left: auto;margin-right:20px;padding: 10px 0;">
            </div>
            <div class="flex">
              <img :src=reserve.restaurant.image_url style="width:40%;height:300px;padding: 10px 0;">
              <div class="reserve-list">
                <div class="reserve-name">
                  <p>NAME: {{reserve.restaurant.name}}</p>
                </div>
                <div class="reserve-prefecture">
                  <p>Prefecture: {{reserve.restaurant.prefecture.name}}</p>
                </div>
                <div class="reserve-genre">
                  <p>Genre: {{reserve.restaurant.genre.name}}</p>
                </div>
                <div class="reserve-date">
                  <p>DATETIME: {{reserve.datetime}}</p>
                </div>
                <div class="reserve-number">
                  <p>NUMBER:{{reserve.number_reservation}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  key="right" class="favorite">
        <h2 v-if="notFavorite">お気に入り店舗はございません</h2>
        <h2 v-else>お気に入り店舗</h2>
        <div >
          <div class="item">
            <div class="restaurant-card flex" v-for="(restaurant,index) in favorites" :key="index">
              <img :src=restaurant.restaurant.image_url class="restaurant-pic">
              <div class="restaurant-detail">
                <div class="restaurant-name">
                  <p>{{restaurant.restaurant.name}}</p>
                </div>
                <div class="tag">
                  <p>#{{restaurant.restaurant.prefecture.name}}  #{{restaurant.restaurant.genre.name}}</p>
                </div>
                <div class="flex">
                  <button @click="
                  $router.push({
                  path:'/detail/' + restaurant.id,
                  name:'Detail',
                  params:{id:restaurant.id}})">詳しく見る</button>
                  <img class="heart" src="../assets/heart_red.png"
                  @click="favoriteDelete(restaurant)"
                  style="height:40px;width:40px;"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Header from '../components/Header.vue';
export default {
  data() {
    return {
      name:this.$store.state.user_id,
      right: true,
      left: false,
      notFavorite:true,
      notReserve:true,
      reserves:[],
      favorites:[],
    };
  },
  methods: {
    async getFavorite(){
      await axios
        .get('http://127.0.0.1:8000/api/auth/favorites')
        .then((response) => {
          this.favorites = response.data.data;
          if(this.favorites == 0){
            this.notFavorite = true;
          }else{
            this.notFavorite = false;
          }
        })
        .catch((error) => {
          console.log(error)
        });
    },
    async getReservation(){
      await axios 
      .get('http://127.0.0.1:8000/api/auth/reservations')
      .then((response) => {
        this.reserves = response.data.data;
      if(this.reserves == 0){
          this.notReserve = true;
        }else{
          this.notReserve = false;
        }})  
      .catch((error) => {
        console.log(error)
      });
    },
    async favoriteDelete(restaurant){
      await axios
      .delete('http://127.0.0.1:8000/api/auth/favorites',{
        data:{
          user_id:restaurant.user_id,
          restaurant_id:restaurant.restaurant_id
        }
      })
      .then((response) => {
        console.log(response);
        alert('いいねを削除しました')
      })
    },
    async deleteReservation(reserve){
      await axios
      .delete('http://127.0.0.1:8000/api/auth/reservations',{
        data:{
          user_id:reserve.user_id,
          restaurant_id:reserve.restaurant_id
        }
      })
      .then((response) => {
        console.log(response);
        alert('予約を取り消しました')
      })
    },
    watchLeft() {
      this.left = true;
      this.right = false;
    },
    watchRight() {
      this.left = false;
      this.right = true;
    },
    
  },
  created(){
    this.getFavorite();
    this.getReservation();
  },
  components:{
    Header,
  },
};
</script>

<style scoped>
/*////////////////
    ページ全体
////////////////*/
.mypage {
  display: flex;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
img{
  height:30px;
  width:30px;
}
/*///////////////
    予約状況
///////////////*/
.reserve {
  width: 48%;
  font-size: 20px;
  padding-top:20px;
  margin: 0 auto;
}
.reserve h2{
  text-align: center;
  padding-bottom:20px;
}
.reserve-info {
  background-color: orange;
  border-radius: 5px;
  height: 400px;
  margin-bottom: 20px;
}
.reserve-top {
  background-color: rgb(255, 214, 101);
}
.title{
  text-align: center;
  font-size: 20px;
  padding-bottom: 20px;
}
.reserve-title{
  font-size:20px;
  line-height: 50px;
}
.reserve-list{
  width:50%;
  padding-left:20px;
  background-color: white;
  margin:0 auto;
  border-radius: 10px;
}
.reserve-list p{
  padding-top: 20px;
}
/*///////////////////
    お気に入り店舗
///////////////////*/
.favorite{
  font-size: 20px;
  padding-top: 20px;
  width: 48%;
}
.favorite h2{
  text-align: center;
}
.item{
  width:90%;
  margin:0 auto;
  display: flex;
  flex-wrap: wrap;
}
.restaurant-card{
  height:500px;
  width:280px;
  box-shadow: 2px 2px 2px black;
  margin:20px 10px;
}
.restaurant-name{
  font-size:25px;
  margin-left: 20px;
}
.tag{
  font-size:20px;
  padding:15px 0;
  margin-left: 20px;
}
.heart{
  padding-left:80px;
  color:#F05654;
}
img {
  display: block;
}
.restaurant-pic{
  width:100%;
  height:300px;
}
.flex{
  display: flex;
  flex-wrap: wrap;
}
.heart{
  padding-left:80px;
}
/*/////////////////
     ボタン詳細
/////////////////*/
button{
  padding:10px 20px;
  margin-left: 20px;
  background-color:#ff7300;
  border:none;
  border-radius: 10px;
}
vue-star {
position: relative;
}
vue-star .fa {
  font-size: 25px;
  cursor: pointer;
}
.fa{
  padding-left:80px;
}
</style>
