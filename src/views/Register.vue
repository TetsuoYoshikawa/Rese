<template>
  <div>
    <Header />
    <div class="card">
      <div class="card-title">
        <h2>Registration</h2>
      </div>
      <div class="form">
        <div>
          <img class="img" src="../assets/username.png"/>
          <input placeholder="UserName" type="text" v-model="name" class="label"/>
          <div class ="under-line"></div>
        </div>
        <div>
          <img class="img" src="../assets/email.png"/>
          <input placeholder="Email" type="email" v-model="email" class="label"/>
          <div class ="under-line"></div>
        </div>
        <div>
          <img class="img" src="../assets/password.png" />
          <input placeholder="Password" type="password" v-model="password" class="label"/>
          <div class ="underline"></div>
        </div>
        <button class="button" @click="register">登録</button>
        <p>会員登録がお済みな方は<a href="/login">こちら</a>から</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import axios from "axios";
export default {
  data(){
    return {
      name:"",
      email:"",
      password:""
    };
  },
  methods:{
    register(){
      axios
      .post('https://infinite-beyond-20743.herokuapp.com/api/register',{
        name:this.name,
        email:this.email,
        password:this.password,
      })
      .then((response) =>{
        console.log(response);
        this.$router.push("/thanks");
      })
      .catch(() => {
        alert("会員登録ができませんでした。お手数ですが再度お試しください");
      });
    }
  },
    components:{
    Header,
  }
};
</script>

<style scoped>
/*///////////
   登録画面
///////////*/
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
a{
  color:blue;
}
@media screen and (max-width:320px){
  .card{
    width:300px;
  }
}
</style>
