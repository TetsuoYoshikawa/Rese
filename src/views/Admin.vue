<template>
  <div id="app">
    <HeaderAdmin />
    <div class="admin">
      <div class="card right" >
        <div class="card-title" style="display: flex;">
          <h2 @click="isSelect('1')" v-bind:class="{'active': isActive === '1'}">店舗情報変更</h2>
          <h2 @click="isSelect('2')" v-bind:class="{'active': isActive === '2'}">新規店舗登録</h2>
        </div>
        <div class="restaurant" v-if="isActive === '1'" key="right">
          <div>
            <div class="flex">
              <p>Change Restaurant:</p>
              <select v-model="restaurant_id">
                <option value="">Restaurants ....</option>
                <option v-for="(restaurant,index) in restaurants" :key="index"
                :value="restaurant.id">{{restaurant.name}}</option>
              </select>
            </div>
            <div class="flex">
              <p >Restaurant Name:</p>
              <input class="label" v-model="restaurant_name"/>
            </div>
            <div class="flex">
              <p>Prefectures:</p>
              <select v-model="prefecture_id">
                <option value="">Prefecture select</option>
                <option v-for="(prefecture,index) in prefectures" :key="index" :value="prefecture.id">{{prefecture.name}}</option>
              </select>
            </div>
            <div class="flex">
              <p>Genres:</p>
              <select v-model="genre_id">
                <option value="">Genre select</option>
                <option v-for="(genre,index) in genres" :key="index" :value="genre.id">{{genre.name}}</option>
              </select>
            </div>
            <div class="flex">
              <p>Description:</p>
              <textarea class="label" v-model="restaurant_description"></textarea>
            </div>
            <button type="submit" @click="putRestaurant()">店舗情報変更</button>
          </div>
        </div>
        <div class="restaurant"  v-if="isActive === '2'" key="left">
          <div class="flex">
            <p>Restaurant Name:</p>
            <input class="label" v-model="restaurant_name" />
          </div>
          <div class="flex">
            <p>Prefectures:</p>
            <select v-model="prefecture_id">
              <option value="">Prefecture select</option>
              <option v-for="(prefecture,index) in prefectures" :key="index" :value="prefecture.id">{{prefecture.name}}</option>
            </select>
          </div>
          <div class="flex">
            <p>Genres:</p>
            <select v-model="genre_id">
              <option value="">Genre select</option>
              <option v-for="(genre,index) in genres" :key="index" :value="genre.id">{{genre.name}}</option>
            </select>
          </div>
          <div class="flex">
            <p>Description:</p>
            <textarea class="label" v-model="restaurant_description"></textarea>
          </div>
          <div class="flex">
            <p>Restaurant Picture:</p>
            <select v-model="picture_id">
              <option value="">Pictures select</option>
              <option v-for="(picture,index) in pictures" :key="index" :value="picture.image_url">{{picture.name}}</option>
            </select>
            <div class="image" v-if="picture_id">
              <img :src="picture_id"  style="height:150px;width:150px"/>
            </div>
          </div>
          <button type="submit" @click="postRestaurant()">新規店舗登録</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderAdmin from "../components/HeaderAdmin.vue";
export default{
  data() {
    return {
      isActive: '1',
      preview:"",
      restaurant_name: "",
      prefecture_id: "",
      genre_id: "",
      picture_id:"",
      restaurant_description: "",
      restaurant_id:"",
      restaurants:[],
      prefectures: [],
      genres: [],
      pictures:[]
    }
  },
  methods: {
    isSelect(num) {
      this.isActive = num;
    },
    async getRestaurant(){
      await axios
        .get("http://127.0.0.1:8000/api/restaurants")
        .then((response => {
          this.restaurants = response.data.data.restaurant;
        }))
        .catch(error => {
          console.log(error)});
    },
    async getPrefecture(){
      await axios
        .get("http://127.0.0.1:8000/api/prefectures")
        .then((response) => {
          this.prefectures = response.data.data;
        })
    },
    async getGenre(){
      await axios
        .get("http://127.0.0.1:8000/api/genres")
        .then((response) => {
          this.genres = response.data.data;
          this.pictures = response.data.data;
        })
    },
    putRestaurant() {
       axios
        .put('http://127.0.0.1:8000/api/auth/admin/restaurants', {
          id: this.restaurant_id,
          name: this.restaurant_name,
          prefecture_id: this.prefecture_id,
          genre_id: this.genre_id,
          description: this.restaurant_description
        })
        .then((response) => {
        console.log(response);
        alert('店舗情報を変更いたしました。')
        })
        .catch((error) => {
        console.log(error);
        alert('店舗登録できませんでした。もう一度、お試しください');
        });
    },
    postRestaurant() {
      axios
        .post('http://127.0.0.1:8000/api/auth/admin/restaurants', {
          name: this.restaurant_name,
          prefecture_id: this.prefecture_id,
          genre_id: this.genre_id,
          image_url: this.picture_id,
          description:this.restaurant_description
        })
        .then((response) => {
          console.log(response);
          alert('店舗情報を追加いたしました')
        })
        .catch((err) => {
          console.log(err);
          alert("更新できませんでした。お手数ですが再度お試しください。");
        })
    },
  },
  components:{
    HeaderAdmin
  },
  created(){
  this.getRestaurant();
  this.getPrefecture();
  this.getGenre();
  },
}
</script>

<style scoped>
/*///////////////
    ページ全体  
///////////////*/
.admin{
  text-align: center;
  padding-top:100px;
}
.card {
  margin: 50px auto;
  width: 800px;
  background: #fff;
  box-shadow: 2px 2px 4px;
}
.card-title{
  background-color: #ff7300;
}
.card-title h2 {
  color: white;
  font-weight: bold;
  font-size: 20px;
  background-color: #ff7300;
  padding: 20px 20px;
  margin: 0 auto;
  border-radius: 10px;
  cursor: pointer;
  float: left;
}
.card-title h2:not(:first-child) {
  border-left: none;
}
.card-title h2.active{
  background-color: #ff1e00fa;
}
.restaurant {
  border-bottom: black;
}
input {
  display: block;
  border: solid 0px;
}
.label {
  width: 400px;
  font-size: 16px;
  border: none;
  outline: 0;
  border-bottom: 1px solid #d1d5db;
}
img {
  display: inline-block;
  padding-left: 20px;
}
.flex {
  display: flex;
  margin-left: 100px;
  padding-bottom: 20px;
  padding-top: 30px;
}
.flex p {
  width: 200px;
  margin-top:18px;
}
select{
  width:300px;
  height:50px;
}
.top{
  align-items:initial;
}
button {
  padding: 10px 20px;
  background-color: #ff7300;
  border: none;
  border-radius: 10px;
  color: white;
  margin: 30px 0;
}
</style>
