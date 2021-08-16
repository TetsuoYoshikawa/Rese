<template>
  <div class="app">
    <v-icon name="heart" scale="2" class="heart" color="#F05654" 
    v-if="storeData.user_id == this.$store.state.user_id"
    key="userFavorite"
    @click="favoritePost()"></v-icon>
    <v-icon name="heart" scale="2" class="heart" 
    v-else
    key="userFavorite"
    @click="favoriteDelete()"></v-icon>
  </div>
</template>

<script>
import VueStar from 'vue-star';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import axios from "axios";
export default{
  props:{
    storeData:{
      "id":Number,
      "store_name":String,
      "area_id":Number,
      "genre_id":Number,
      "image_url":String,
      "description":String,
      "user_id":Number,
      "prefecture":{
        "id":Number,
        "name":String
      },
      "genre":{
        "id":Number,
        "name":String
      },
      "select":Boolean
    },
  },
  mounted:{
    handleClick(){
      this.$refs.ThumsUp.$data.active = true;
      console.log(this.$refs.ThumsUp.$data);
    }
  },
  methods:{
    handleClick(){
      console.log(this.$refs.ThumbsUp.$data);
    },
    async favoriteDelete(){
      const favorite_data = {
        restaurant_id:this.stotrData.id
      };
      await axios.delete("http://127.0.0.1:8000/api/favorites",{
        params:favorite_data,
      });
      this.$emit("favoriteDelete", this.storeData.id);
    },
    async favoritePost(){
      const favorite_data = {
        store_id: this.storeData.id
      };
      await axios.post(
        "https://127.0.0.1:8000/api/favorites", 
        favorite_data, 
        {headers: { Authorization: 'Bearer ' + this.$store.state.token }}
      );
      this.$emit("favoritePost", this.storeData.id);
    }
  },
  components:{
    VueStar,
    'v-icon':Icon,
  }
}
</script>

<style scoped>
vue-star {
  position: relative;
}
vue-star .fa {
  font-size: 3em;
  cursor: pointer;
}
</style>
