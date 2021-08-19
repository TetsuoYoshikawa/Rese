
<template>
  <div>
    <Header />
    <div class="mypage">
      <div key="left" class="reserve">
        <h2 v-if="notReserve">予約された店舗はございません</h2>
        <h2 v-else>予約状況</h2>
        <div>
          <div class="reserve-info">
            <table class="reserve-table"  border="1">
              <tr>
                <th>Reserve No.</th> 
                <th>USER NAME</th>
                <th>RESTAURANT NAME</th>
                <th>PREFECTURE</th>
                <th>GENRE</th>
                <th>DATETIME</th>
                <th>NUMBER</th>
              </tr>
              <tr  v-for="(reserve,index) in reserves" :key="index">
                <td>{{reserve.id}}</td>
                <td>{{reserve.user_name}}</td>
                <td>{{reserve.name}}</td>
                <td>{{reserve.prefecture}}</td>
                <td>{{reserve.genre}}</td>
                <td>{{reserve.datetime}}</td>
                <td>{{reserve.number_reservation}}</td>
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
    };
  },
  methods: {
    async getReservation(){
      await axios 
      .get('https://infinite-beyond-20743.herokuapp.com/api/auth/reservations')
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
table{
  border-radius: 10px;
}
table th{
  padding:20px;
  text-align: center;
  background-color: #ff7300
}
table td{
  padding:20px 20px;
  text-align: center;
  border-bottom: 1px solid rgb(194, 194, 194);
}
/*///////////////
    予約状況
///////////////*/
.reserve {
  font-size: 20px;
  padding-top: 20px;
  margin: 0 auto;
}
.reserve h2 {
  text-align: center;
  padding-bottom: 20px;
}
@media screen and (max-width:900px) {
  .reserve-table{
    width:80%
  }
}
</style>
