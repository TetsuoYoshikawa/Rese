<template>
  <div>
    <Header />
    <ReservationUpdate v-if="modal" @close="closeModal" :reserve="reserves" class="reserveUpdate"/>
    <div class="mypage">
      <div  key="left" class="reserve">
        <h2 class="h2" v-if="notReserve" >予約店舗はございません</h2>
        <h2 class="h2" v-else >予約状況</h2>
        <div>
          <div class="reserve-info" v-for="(reserve,index) in reserves" :key="index">
            <div class="reserve-top flex">
              <img src="../assets/time.png" style="height:30px;width:30px;margin:0 20px;padding: 10px 0">
              <p class="reserve-title">予約</p>
            </div>
            <div class="flex">
              <img :src=reserve.restaurant.image_url style="width:40%;height:300px;padding: 20px 0;">
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
                  <p>DATETIME: {{reserve.time}}</p>
                </div>
                <div class="reserve-number">
                  <p>NUMBER:{{reserve.number_reservation}}</p>
                </div>
                <button
                  class="button"
                  id="booking_update_button"
                  @click="openModal(reserve)"
                  >予約変更
                </button>
                <button class="button" src="../assets/cross.png" @click="deleteReservation(reserve)">予約取り消し</button>
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
                  path:'/detail/' + restaurant.restaurant_id,
                  params:{id:restaurant.restaurant_id}})">詳しく見る</button>
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
import ReservationUpdate from "../components/ReservationUpdate.vue";
import Header from '../components/Header.vue';
export default {
  data() {
    return {
      name:this.$store.state.user_id,
      right: true,
      left: false,
      modal: false,
      notFavorite:true,
      notReserve:true,
      reserves:[],
      favorites:[],
    };
  },
  methods: {
    async getFavorite(){
      await axios
        .get('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites/' + this.name)
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
      .get('https://infinite-beyond-20743.herokuapp.com/api/auth/reservations/'  + 
          this.name
        )
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
    favoriteDelete(restaurant){
      axios
      .delete('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites',{
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
    deleteReservation(reserve){
      axios
      .delete('https://infinite-beyond-20743.herokuapp.com/api/auth/reservations',{
        data:{
          user_id:reserve.user_id,
          restaurant_id:reserve.restaurant_id
        }
      })
      .then((response) => {
        console.log(response);
        alert('予約を取り消しました');
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true,
        });
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
    openModal(reserve) {
      this.modal = true;
      this.postItem = reserve;
    },
    closeModal() {
      this.modal = false;
      this.getMyBooking();
    },
  },
  created(){
    this.getFavorite();
    this.getReservation();
  },
  components:{
    Header,
    ReservationUpdate,
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
  height: 480px;
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
  padding-bottom: 20px;
  background-color: white;
  margin:20px auto;
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
.button{
  margin-top: 30px;
}
button{
  padding:10px 20px;
  margin-right: 20px;
  background-color:#ff7300;
  border:none;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  box-shadow: 5px 5px rgb(37, 49, 55);
}
button:active{
  box-shadow: none;
  position: relative;
  top: 5px;
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

@media screen and (max-width:768px) {
  .mypage{
    display: block;
  }
  .reserve{
    width:80%;
  }
  .favorite{
    width: 80%;
    margin: 0 auto;
  }
}
@media screen and (max-width:320px){
  .heart{
  padding-left:10px;
  color:#F05654;
}
}
</style>
