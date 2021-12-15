<template>
  <div>
    <Header />
    <div class="restaurant-list">
      <div class="item">
        <div class="restaurant-card flex"  v-for="restaurant in restaurants" :key="restaurant.id">
          <div class="restaurant-name" >
            <img class="img" src="../assets/Back.png" @click="$router.push('/')">
            <h2 class="restaurant-title">{{restaurant.name}}</h2>
          </div>
          <img :src=restaurant.image_url class="restaurant-pic">
          <div class="restaurant-detail">
            <div class="tag" style="padding:20px;font-size:20px"> 
              <p>#{{restaurant.prefecture.name}} #{{restaurant.genre.name}}</p>
            </div>
            <div class="description" style="padding-left:20px;font-size:16px">
              <p>{{restaurant.description}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="reservation-detail">
          <h2 class="title">予約{{data}}</h2>
          <div class="reservation" >
            <div class="card">
              <form>
                <ul class="col-3 mx-auto" style="width: 300px;">
                  <li class="date" >
                    <datetime
                      label="日付を選択してください"
                      format="YYYY-MM-DD"
                      formatted="MM月DD日"
                      only-date
                      v-model="date"
                      :no-header="true"
                      :min-date="startDate"
                      :max-date="endDate"
                      color="#ffa500"
                      button-color="#ffa500"
                      class="date"
                    ></datetime>
                  </li>
                </ul>
                <ul>
                  <li class="time" style="width: 300px;">
                    <vuejs-timepicker
                    v-model="time"
                    placeholder="時間を入力してください"
                    format="H:mm" 
                    hour-label="時"
                    minute-label="分"
                    id="timepicker" 
                    name="time" 
                    input-class="form-control" 
                    input-width="100%"
                    :hour-range="[[10, 23]]"
                    minute-interval="15"
                    hide-disabled-hours
                    style="width:300px">
                    </vuejs-timepicker>
                  </li>
                </ul>
                <ul>
                  <li class="number">
                    <select  v-model="number">
                      <option value="">人数を入力してください</option>
                      <option v-for="n in 20" :key="n">{{n}}</option>
                    </select>
                  </li>
                </ul>
              </form>
              <button @click="postReservation()"  class="button btn btn-border-shadow btn-border-shadow--color2">予約する</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueTimepicker from 'vue2-timepicker';
import datetime from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import 'vue2-timepicker/dist/VueTimepicker.css';
import 'vue2-datepicker/index';
import {ja} from 'vuejs-datepicker/dist/locale';
import Header from '../components/Header.vue';
import moment from "moment";
export default {
  props:["id"],
  data () {
    return {
      date:"",
      time:"",
      number:"",
      DatePickerFormat: 'yyyy-MM-dd',
      ja:ja,
      restaurants:"",
      disabledDates: {
        to: new Date(2021, 4, 11),
    },
    selectFerryDay: new Date(2020, 4, 12),
    };
  },
  // カレンダー日付設定
  computed: {
    startDate() {
      // 明日からの日付を指定
      const start = moment().add(1, "days");
      return start.format("YYYY-MM-DD");
    },
    endDate() {
      // 3ヶ月後までを指定
      const start = moment(this.start);
      const end = start.add(3, "months").endOf("day");
      return end.format("YYYY-MM-DD");
    },
  },
  methods:{
    async getRestaurantDetail() {
      await axios
        .get("https://infinite-beyond-20743.herokuapp.com/api/restaurants/" + this.id)
        .then((response) => {
          this.restaurants = response.data.data;
        });
    },
    postReservation(){
      axios
        .post("https://infinite-beyond-20743.herokuapp.com/api/auth/reservations",{
          user_id:this.$store.state.user_id,
          restaurant_id:this.id,
          date:this.date,
          time:this.time,
          number_reservation:this.number,
        })
        .then((response) => {
        console.log(response);
        this.$router.replace("/done");
        })
        .catch((response) => {
          console.log(response);
          alert('予約できません。もう一度、お試しください');
        });
    },
  },
  created(){
    this.getRestaurantDetail(),
    this.getReservation()
  },
  components: {
    Header,
    datetime,
    'vuejs-timepicker': VueTimepicker,
    //'vuejs-datepicker':vueDatepicker
  },
}
</script>
 
<style scoped>
/*///////////////////
//   店舗情報詳細   //
///////////////////*/
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  padding: 20px 10px;
  width: 48%;
  justify-content: space-between;
  position: relative;
}
.restaurant-card {
  background-color: white;
  color: black;
  box-shadow: 2px 2px 4px;
  padding-bottom: 20px;
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
.restaurant-pic {
  width: 100%;
  height:400px;
}
.restaurant-detail {
  margin: 0 20px;
}
.img {
  width:30px;
  height:30px;
  padding-left:20px;
}
/*/////////////
    予約内容
//////////// */
.reservation-detail{
  box-shadow: 2px 2px 2px;
  height:590px;
}
.title{
  background-color:#ff7300;
  height: 80px;
  line-height: 80px;
  padding-left: 20px;
}
.reservation {
  width:90%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform : translate(-50%,-50%);
  transform : translate(-50%,-50%);
}
ul{
  padding:20px;
}
.card {
  padding: 20px 40px;
}
.form {
  background-color: white;
  padding:20px 30px;
  border-radius: 20px;
  margin-top:30px;
}
select {
  display: inline-block;
  width: 300px;
  height:30px;
  margin-bottom:30px;
}
/*//////////////////////
//   ボタンオプション   //
//////////////////////*/
.button{
  margin-top:20px;
  width:100%;
}
.btn,
a.btn,
button.btn {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
}
button.btn-border-shadow {
  padding: calc(1.5rem - 12px) 3rem 1.5rem;
  background: #fff;
}
button.btn-border-shadow:before {
  position: absolute;
  top: -6px;
  left: -6px;
  width: 100%;
  height: 100%;
  content: "";
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  border: 3px solid #000;
  border-radius: 0.5rem;
}
button.btn-border-shadow:hover {
  padding: calc(1.5rem - 6px) 3rem;
}
button.btn-border-shadow:hover:before {
  top: 0;
  left: 0;
}
button.btn-border-shadow--color2 {
  border-radius: 100vh;
}
button.btn-border-shadow--color2:before {
  border-radius: 100vh;
  -webkit-box-shadow: 3px 3px 0 #78e5e5;
  box-shadow: 3px 3px 0 #78e5e5;
}

.card ul {
  list-style-type: none;
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
