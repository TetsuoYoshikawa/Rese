<template>
  <div>
    <div  v-for="favorite in favorites" :key="favorite">
    <v-icon name="heart" scale="2" class="heart" @click="favoritePost(favorite)"
      v-if="restaurant.favorites.length === 0">
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
  data(){
    return{
      favorites:[]
    }
  },
    async getFavorite(){
      await axios
        .get('http://127.0.0.1:8000/api/auth/favorites/' + 
          this.name
        )
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
    favoritePost(restaurant){
      axios
      .post('http://127.0.0.1:8000/api/auth/favorites',{
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
      .delete('http://127.0.0.1:8000/api/auth/favorites',{
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
    components:{
    'v-icon':Icon,
  },
}
</script>

<style scoped>

</style>

