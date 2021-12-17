<template>
  <div>
    <Header />
    <div class="card">
      <h2 class="title">ご予約ありがとうございます</h2>
      <div class="message">
        <button type="submit" @click="$router.push('/mypage')">マイページに戻る</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default{
  components:{
    Header,
  }
}
</script>
<style scoped>
/*///////////////////
      予約画面       
////////////////////*/
.title{
  color:white;
  background: #ff7300;
  height:70px;
  line-height: 70px;
  text-align: center;
  border-radius: 5px 5px 0 0;
}
.card {
 margin: 200px auto;
 width: 350px;
 background: #fff;
 border-radius: 10px;
 text-align: center;
 box-shadow: 2px 2px 4px;
}
.message{
  padding-bottom:20px;
}
/*////////////////
    ボタン詳細  
///////////////// */
button{
  margin:30px 0 10px 0;
}
button{
  padding:10px 40px;
  margin-left: 20px;
  background-color:#ff7300;
  border:none;
  border-radius: 10px;
  color: white;
  margin:20px 0;
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
</style>
