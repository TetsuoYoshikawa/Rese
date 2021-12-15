<template>
  <div class="items overlay" @click.self="$emit('close')"> 
    <div class="reservation-detail">
      <h2 class="title">予約の変更</h2>
      <div class="reservation" >
        <div class="card" v-for="reserve in reserve" :key="reserve.id">
          <div class="flex">
            <img :src="reserve.restaurant.image_url" 
            style="width:40%;height:300px;padding: 10px 0;"/>
            <form>
              <p class="name">{{reserve.restaurant.name}}</p>
              <ul class="col-3 mx-auto" style="width: 300px;">
                <li class="date" >
                <datetime
                  label="日付を選択してください"
                  format="YYYY-MM-DD"
                  formatted="MM月DD日"
                  only-date
                  v-model="reserve.date"
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
                v-model="reserve.time"
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
                  <select  v-model="reserve.number_reservation">
                    <option value="">人数を入力してください</option>
                    <option v-for="n in 20" :key="n">{{n}}</option>
                  </select>
                </li>
              </ul>
            </form>
          </div>
          <button @click="putReservation(reserve)"  class="button btn btn-border-shadow btn-border-shadow--color2">予約を変更</button>
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
import moment from "moment";
export default {
  props: ["reserve"],
  data() {
    return {
      loading: true
    };
  },
  components: {
    datetime,
    'vuejs-timepicker': VueTimepicker,
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
  methods: {
    // 予約更新
    putReservation(){
      axios
        .put("https://infinite-beyond-20743.herokuapp.com/api/auth/reservations",{
          id:35,
          user_id:this.$store.state.user_id,
          restaurant_id:this.id,
          date:this.date,
          time:this.time,
          number_reservation:this.number,
        })
        .then((response) => {
        console.log(response);
        alert('予約を変更しました');
        this.$emit("close");
        })
        .catch((response) => {
          console.log(response);
          alert('予約できません。もう一度、お試しください');
        });
    },
  },
};
</script>

<style scoped>
/*///////////////////
//   店舗情報詳細   //
///////////////////*/
.flex{
  display:flex;
  font-size: 20px;
}
.restaurant-list {
  display: flex;
  flex-wrap: wrap;
}
.name{
  padding: 20px;
}
.item {
  padding: 20px 10px;
  position: relative;
}
.reservation-detail{
  background-color: #fff;
  width:80%;
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
.overlay {
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
/*/////////////
    予約内容
//////////// */
.reservation-detail{
  box-shadow: 2px 2px 2px;
  height:590px;
  width:70%;
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
  left: 60%;
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
  width:75%;
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
