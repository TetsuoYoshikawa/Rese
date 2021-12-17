<template>
  <div class="item-2 overlay-2" @click.self="$emit('close')">
    <div class="reviewCard">
      <div class="item-2">
        <div class="restaurant-card flex"  v-for="review in reviews" :key="review.id">
          <div class="restaurant-name" >
            <h2 class="restaurant-title">{{review.restaurant.name}}</h2>
          </div>
          <img :src=review.restaurant.image_url class="restaurant-pic">
          <div class="review-text">
            <p>レビューを書き直す</p>
            <textarea class="reviewText" v-model="review_content">
            </textarea>
          </div>
          <select class="reviewStars" v-model="num_of_stars">
            <option value="">星をつけてください</option>
            <option v-for="n in 5" :key="n">{{n}}</option>
          </select>
          <button @click="putReview(review)"  class="button btn btn-border-shadow btn-border-shadow--color2">レビューを再投稿
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props:["postItem"],
  data() {
    return {
      name:this.$store.state.user_id,
      modal: false,
      num_of_stars:"",
      reviews:""
    };
  },
  methods: {
    async getReview() {
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/auth/reviews/user/" + this.postItem)
        .then((response) => {
          this.reviews = response.data.data;
        });
    },
    putReview(review){
      axios.put('https://infinite-beyond-20743.herokuapp.com/api/auth/reviews',{
        id:review.id,
        user_id:this.$store.state.user_id,
        restaurant_id:review.restaurant_id,
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
    }
  },
  created(){
    this.getReview()
  },
};
</script>


<style scoped>
.review {
  display: flex;
  flex-wrap: wrap;
}
.item-2 {
  padding: 10px 0;
  position: relative;
}
.overlay-2 {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
/*////////////////
//    レビュー   //
////////////////*/
.reviewCard{
  width:70%;
}
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
  height:250px;
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
