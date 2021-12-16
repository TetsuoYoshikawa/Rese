<template>
  <div>
    <Headers />
    <div class="review">
      <div class="item">
        <div class="restaurant-card flex"  v-for="restaurant in restaurants" :key="restaurant.id">
          <div class="restaurant-name" >
            <img class="img" src="../assets/Back.png" @click="$router.push('/')">
            <h2 class="restaurant-title">{{restaurant.name}}</h2>
          </div>
          <img :src=restaurant.image_url class="restaurant-pic">
          <div class="review-text">
            <p>レビューを書く</p>
            <textarea class="reviewText" v-model="review_content">
            </textarea>
          </div>
          <select class="reviewStars" v-model="num_of_stars">
            <option value="">星をつけてください</option>
            <option v-for="n in 5" :key="n">{{n}}</option>
          </select>
          <button @click="postReview(restaurant)"  class="button btn btn-border-shadow btn-border-shadow--color2">レビューを投稿
          </button>
        </div>
      </div>
      <div class="item">
        <div class="reviewCard">
          <div>
            <table>
              <tr>
                <th>ユーザー</th>
                <th>コメント</th>
                <th>評価</th>
              </tr>
              <tr v-for="review in reviews" :key="review.id">
                <td>{{review.user.name}}</td>
                <td>{{review.review_content}}</td>
                <td v-if="review.num_of_stars === 5">
                  <div>★★★★★</div>
                </td>
                <td v-else-if="review.num_of_stars === 4">
                  <div>★★★★☆</div>
                </td>
                <td v-else-if="review.num_of_stars === 3">
                  <div>★★★☆☆</div>
                </td>
                <td v-else-if="review.num_of_stars === 2">
                  <div>★★☆☆☆</div>
                </td>
                <td v-else-if="review.num_of_stars === 1">
                  <div>★☆☆☆☆</div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Headers from '../components/Headers.vue';
export default {
  props:["id"],
  data () {
    return {
      reviews:"",
      restaurants:"",
      reviewCard:false,
      review_content:"",
      num_of_stars:""
    };
  },
  methods:{
    async getReview() {
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/auth/reviews/" + this.$route.params.id)
        .then((response) => {
          this.reviews = response.data.data;
        });
    },
    async getRestaurantDetail() {
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/restaurants/" + this.$route.params.id)
        .then((response) => {
          this.restaurants = response.data.data;
        });
    },
    postReview(restaurant){
      axios
        .post("https://infinite-beyond-20743.herokuapp.com/api/auth/reviews",{
          user_id:this.$store.state.user_id,
          restaurant_id:restaurant.id,
          review_content:this.review_content,
          num_of_stars:this.num_of_stars,
        })
        .then((response) => {
        console.log(response);
        this.$router.replace("/");
        })
        .catch((response) => {
          console.log(response);
          alert('予約できません。もう一度、お試しください');
        });
    },
    reviewOpen() {
      this.reviewCard = true;
    },
  },
  created(){
    this.getReview(),
    this.getRestaurantDetail()
  },
  components: {
    Headers,
  },
}
</script>

<style scoped>
.review {
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 20px 10px;
  width: 48%;
  justify-content: space-between;
  position: relative;
}
/*////////////////
//    レビュー   //
////////////////*/
table{
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

table tr{
  border-bottom: solid 1px #eee;
  cursor: pointer;
}

table tr:hover{
  background-color: #d4f0fd;
}

table th,table td{
  text-align: center;
  width: 25%;
  padding: 15px 0;
}

table td.icon{
  background-size: 35px;
  background-position: left 5px center;
  background-repeat: no-repeat;
  padding-left: 30px;
}

/*////////////////
//    レビュー   //
////////////////*/

.restaurant-card{
  background-color: white;
  color: black;
  box-shadow: 2px 2px 4px;
  padding-bottom: 20px;
}
.img {
  width:30px;
  height:30px;
  padding-left:20px;
}

.restaurant-pic {
  display: inline-block;
  width: 80%;
  height:300px;
  margin: 0 10%;
}
.review-text{
  margin: 10px 10px; 
  font-size: 20px;
}
.reviewText{
  width:98%;
  height:150px;
  margin: 10px 10px; 
}

.reviewStars{
  width:95%;
  margin: 0 20px; 
}

.restaurant-name{
  padding:20px 0;
  display: flex;
  line-height: 20px;
  background-color:#ff7300;
}

.restaurant-title{
  padding:5px 0 0 20px;;
}

h2{
  font-size:20px;
}

button{
  padding:10px 40px;
  margin-top:20px;
  margin-left: 10px;
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


@media  screen and (max-width:1000px) {
    .item{
    width:70%;
    margin:0 auto;
  }
}
@media screen and (max-width:768px) {
  .item{
    width:100%;
  }
}
</style>
