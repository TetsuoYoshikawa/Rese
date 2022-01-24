<template>
  <div>
    <Header />
      <div class="card">
        <div class="card-title">
          <h2>Login</h2>
        </div>
        <div class="form">
          <div>
            <img class="img" src="../assets/email.png"/>
            <input placeholder="Email" type="email" v-model="email" class="label" />
            <div class="under-line"></div>
          </div>
          <div>
            <img class="img" src="../assets/password.png"/>
            <input placeholder="Password" type="password" v-model="password" class="label" />
            <div class="underline"></div>
          </div>
          <button class="button" @click="login">ログイン</button>
          <div>
            <button class="button" @click="guestlogin">ゲストログイン</button>
          </div>
          <p>会員登録がまだな方は<a href="/register">こちら</a>から</p>
        </div>
      </div>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  data(){
    return {
      email:"",
      password:""
    };
  },
  components:{
    Header
  },
  methods:{
    login(){
      this.$store.dispatch("login",{
        email:this.email,
        password:this.password
      });
    },
    guestlogin(){
      this.$store.dispatch("login",{
        email:"test@test.com",
        password:"testtest"
      });
    }
  }
};
</script>


<style scoped>
/*///////////////
   ログイン画面
///////////////*/
.card {
 margin: 120px auto;
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
  margin-bottom: 10px;
  border:solid 0px;
}
.img{
  width:20px;
  height: 20px;
  padding-right:20px;
}
.label {
  width: 200px;
  height: 30px;
  font-size: 16px;
  border: none;
  outline: 0;
  border-bottom: 1px solid #d1d5db;
}
.under-line {
  width: 200px;
  height: 2px;
  background: skyBlue;
  transform-origin: center center;
  transform: scaleX(0);
  transition: transform 0.18s ease-out;
}
button{
  padding:10px 20px;
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
a{
  color:blue;
}
@media screen and (max-width:320px){
  .card{
    width:300px;
  }
}
</style>
