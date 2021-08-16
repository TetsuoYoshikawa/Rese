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
  margin:30px 0 10px 0;
  position: relative;
  display: inline-block;
  padding: 0.25em 2.0em;
  text-decoration: none;
  color: #FFF;
  background: #ff7300;
  border-bottom: solid 2px #d27d00;
  border-radius: 4px;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  font-weight: bold;
}
button:active{
  border-bottom: solid 2px #fd9535;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>
