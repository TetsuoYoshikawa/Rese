<template>
  <div>
    <div  v-for="favorite in favorites" :key="favorite.id">
      <v-icon name="heart" scale="2" class="heart" @click="favoritePost(favorite)"
      v-if="favorite.length === 0">
      </v-icon>
      <img class="heart" src="../assets/heart_red.png" @click="favoriteDelete(favorite)" style="height:30px;width:30px;"
      v-else />
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
      name:this.$stote.state.user_id,
      favorites:[]
    }
  },
  methods:{
    async getFavorite(){
      await axios
        .get('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites/')
        .then((response) => {
          this.favorites = response.data.data;
        })
        .catch((error) => {
          console.log(error)
        });
    },
    favoritePost(restaurant){
      axios
      .post('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites',{
        user_id:this.$store.state.user_id,
        restaurant_id:restaurant.id,
      })
      .then((response) => {
        console.log(response);
        alert('いいねしました');
      })
      .catch((response) =>{
        console.log(response);
        alert('ログインしてください');
      })
    },
    favoriteDelete(restaurant){
      axios
      .delete('https://infinite-beyond-20743.herokuapp.com/api/auth/favorites',{
        data:{
          user_id:this.$store.state.user_id,
          restaurant_id:restaurant.id
        }
      })
      .then((response) => {
        console.log(response);
        alert('いいねを削除しました')
      })
    },
  },
    components:{
    'v-icon':Icon,
  },
  created(){
    this.getFavorite();
  }
}
</script>

<style scoped>

</style>

