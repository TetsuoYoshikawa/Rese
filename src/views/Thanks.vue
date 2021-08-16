
<template>
  <div>
    <Header />
    <div class="card">
      <div class="card-title">
        <h2>Thank You! :)</h2>
      </div>
      <div class="message">
        <h2>登録会員ありがとうございます</h2>
        <button type="submit" @click="$router.push('/login')">ログインする</button>
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
/*////////////////
    ありがとう 
////////////////*/
.card {
 margin: 200px auto;
 width: 350px;
 background: #fff;
 border-radius: 10px;
 text-align: center;
 box-shadow: 2px 2px 4px;
}
.card-title h2 {
 color: white;
 font-weight: bold;
 font-size:20px;
 text-align: center;
 background-color:#ff7300;
 padding: 20px 0px;
 border-top-left-radius:10px;
 border-top-right-radius:10px;
}
.form {
  background-color: white;
  padding:20px 30px;
  border-radius: 20px;
  margin-top:0px;
}
input{
  margin-bottom: 20px;
  display:block;
  width:80%;
  border:solid 0px;
}
.img{
  width:20px;
  height: 20px;
  padding-right:20px;
}
.message{
  padding-top:30px;
}
button{
  padding:10px 20px;
  margin-left: 20px;
  background-color:#ff7300;
  border:none;
  border-radius: 10px;
  color: white;
  margin:30px 0;
}
button:active{
  border-bottom: solid 2px #fd9535;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
.label {
  width: 200px;
  height: 30px;
  font-size: 16px;
  border: none;
  outline: 0;
  border-bottom: 1px solid #d1d5db;
}
.underline {
  width: 200px;
  height: 2px;
  background: skyBlue;
  transform-origin: center center;
  transform: scaleX(0);
  transition: transform 0.18s ease-out;
}
</style>
