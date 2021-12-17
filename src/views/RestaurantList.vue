<template>
  <div>
    <div class="header">
      <img class="header-img" src="../assets/store.png" />
      <h2 class="header-title" @click="$router.push({path: '/'}, () => {})">RESE</h2>
      <div class="right  nav" id="nav" :class="{in:active}">
        <select v-model="searchData_prefecture">
          <option value="">All Prefecutes</option>
          <option v-for="prefecture in prefectures" :key="prefecture.name">{{prefecture.name}}</option>
        </select>
        <select v-model="searchData_genre">
          <option value="">All Genre</option>
          <option v-for="genre in genres" :key="genre.name">{{genre.name}}</option>
        </select>
        <input type="text" placeholder="Restaurant Name" v-model="searchData_restaurant">
      </div>
      <div class="mypage ">
        <button type="submit" @click="$router.push({path: '/mypage'}, () => {})">マイページ</button>
      </div>
    </div>
    <div class="restaurant-list contents">
      <div class="item">
        <div class="restaurant-card flex" v-for="restaurant in filterRestaurants" :key="restaurant.id">
          <img :src=restaurant.image_url class="restaurant-pic">
          <div class="restaurant-detail">
            <div class="restaurant-name">
              <p>{{restaurant.name}}</p>
            </div>
            <div class="tag">
              <p>#{{restaurant.prefecture.name}} #{{restaurant.genre.name}}</p>
            </div>
            <div class="flex-2 button">
              <button @click="
                $router.push({
                path:'/detail/' + restaurant.id,
                params:{id:restaurant.id}})"
                style="color:white"
                >詳しく見る
              </button>
              <div class="flex-2">
                <v-icon name="heart" scale="2" class="heart" @click="favoritePost(restaurant)"
                  v-if="restaurant.favorites.length === 0">
                </v-icon>
                <img class="heart" src="../assets/heart_red.png" @click="favoriteDelete(restaurant)" style="height:30px;width:30px;"
                v-else />
                <p class="tag-2" v-if="$store.state.auth === false">{{restaurant.favorites.length}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import axios from "axios";
export default{
  props:['id'],
  data(){
    return{
      name:this.$store.state.user_id,
      active :false,
      restaurants: [],
      prefectures:[],
      genres:[],
      favorites:[],
      searchData_prefecture:"",
      searchData_genre:"",
      searchData_restaurant:"",
    }
  },
  computed:{
    filterRestaurants(){
      let restaurants = [];
      for(let i in this.restaurants){
        let restaurant = this.restaurants[i];
        if(restaurant.genre.name.indexOf(this.searchData_genre) !== -1 )
        if(restaurant.prefecture.name.indexOf(this.searchData_prefecture) !== -1 )
        if(restaurant.name.indexOf(this.searchData_restaurant) !== -1 ){
          restaurants.push(restaurant)
        }
      }
      console.log(restaurants);
      return restaurants;
    }
  },
  methods:{
    hamburger() {
      this.active = !this.active
    },
    async getRestaurant(){
      if(this.$store.state.auth === true){
        await axios
          .get("https://infinite-beyond-20743.herokuapp.com/api/restaurants/user/" + this.name)
          .then((response => {
            this.restaurants = response.data.data.restaurant;
          }))
          .catch(error => {
          console.log(error)});
      }else{
        await axios
          .get("https://infinite-beyond-20743.herokuapp.com/api/restaurants")
          .then((response => {
            this.restaurants = response.data.data.restaurant;
          }))
          .catch(error => {
          console.log(error)});
      }
    },
    async getFavorite(){
      await axios
        .get('https://infinite-beyond-20743.herokuapp.com/api/favorites')
        .then((response) => {
          this.favorites = response.data.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    async favoritePost(restaurant){
      if(this.$store.state.auth == true){
      await axios
      .post('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites',{
        user_id:this.$store.state.user_id,
        restaurant_id:restaurant.id,
      })
      .then((response) => {
        console.log(response);
        alert('いいねしました');
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true,
        });
      })
      .catch((response) =>{
        console.log(response);
        alert('ログインしてください');
      })
      }else{
        alert('ログインしてください');
        this.$router.replace('/login');
      }
    },
    async favoriteDelete(restaurant){
      await axios
      .delete('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites',{
        data:{
          user_id:this.$store.state.user_id,
          restaurant_id:restaurant.id
        }
      })
      .then((response) => {
        console.log(response);
        alert('いいねを削除しました');
        this.$router.go({
          path: this.$router.currentRoute.path,
          force: true
        });
      })
    },
    async getPrefecture(){
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/prefectures")
        .then((response) => {
          this.prefectures = response.data.data;
        })
    },
    async getGenre(){
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/genres")
        .then((response) => {
          this.genres = response.data.data;
        })
    },
  },
  components:{
    'v-icon':Icon,
  },
  created(){
    this.getRestaurant();
    this.getFavorite();    
    this.getPrefecture();
    this.getGenre();
  }
};
</script>

<style scoped>
/*////////////////
    ヘッダー
////////////////*/
.header{
  display:flex;
  height:70px;
  align-items: center;
  background-color:#ff7300;
}
.header-img{
  width:30px;
  height: 30px;
  margin:0 20px;
}
.header-title{
  color:white;
  font-size:25px;
}
.right{
  align-items:center;
  margin: 0 auto;
}
.right p {
  margin-right:20px;
  cursor: pointer;
}
.logo{
  width:150px;
  cursor: pointer;
}
select{
  padding:15px;
  border:none;
  font-size: 16px;
}
input{
  padding:17px;
  border:none;
}
.search{
  background-color:white;
  padding:17px;
  border:none;
  margin-top:1px;
}
.mypage{
  margin:0 20px;
  border-radius: 10px;
}
.mypage button{
  border-radius: 30px;
  background-color:white;
}
/*////////////////
    店舗情報
////////////////*/
.item{
  width:100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.restaurant-card{
  height:450px;
  width:280px;
  box-shadow: 2px 2px 2px black;
  margin:20px 20px;
}
.restaurant-pic{
  width:100%;
  height:300px;
}
.restaurant-name{
  padding:15px 20px;
  font-size:25px;
}
.tag{
  padding-left:20px;
  font-size:20px;
  padding-bottom: 15px;
}
.tag-2{
  padding-left:10px;
  font-size:20px;
  padding-bottom: 15px;
  margin-top: 5px;
}
.heart{
  padding-left:300%;
  color:#F05654;
}
.left {
  border-left: 0;
  padding-left: 0;
}
.ber {
  padding-left: 30px;
}
.menu {
  display: flex;
  line-height: 25px;
}
.moble-ul-button {
  margin-top: -12px;
}
.menu a {
  cursor: pointer;
}
.flex-2{
  display: flex;
}
.hamburger {
  display: none;
}
button{
  padding:10px 5px;
  margin-left: 20px;
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

@media screen and (max-width:966px){
  .restaurant-card{
    width:240px;
  }
  .item{
    width:100%;
  }
}
@media screen and (max-width:320px){
  .restaurant-card{
    height:450px;
    box-shadow: 2px 2px 2px black;
    margin:20px 20px;
  }
  select{
    padding:5px;
  }
  .mypage{
    display: none;
  }
  .heart{
    padding-left: 200%;
  }
}
</style>
