<template>
  <div :class="header" class="header flex">
    <!-- ヘッダー -->
    <img class="header-img" src="../assets/store.png" />
    <h2 class="header-title" @click="$router.push({path: '/'}, () => {})">RESE</h2>
      <div class="right text-area">
        <nav class="nav" id="nav" :class="{in:active}">
          <ul v-if="$store.state.auth === true" key="auth" class="menu" >
            <li class="moble-ul left">
              <a @click="$router.push({path: '/'}, () => {})">
              店舗一覧
              </a>
            </li>
            <li class="moble-ul ber" v-if="$store.state.administrator === 1">
              <a @click="$router.push({path: '/admin'}, () => {})">
              管理者ページ
              </a>
            </li>
            <li class="moble-ul ber" v-else>
              <a @click="$router.push({path: '/mypage'}, () => {})">
              マイページ
              </a>
            </li>
            <li class="moble-ul ber">
              <a @click="logout">
              ログアウト
              </a>
            </li>
          </ul>
          <ul v-else key="auth" class="menu" :class="menu">
            <li class="moble-ul left">
              <a @click="$router.push({path: '/'}, () => {})">
              店舗一覧
              </a>
            </li>
            <li class="moble-ul ber">
              <a @click="$router.push({path: '/register'}, () => {})">
              会員登録
              </a>
            </li>
            <li class="moble-ul ber">
              <a @click="$router.push({path: '/login'}, () => {})">
              ログイン
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <!-- ハンバーガーメニュー -->
      <div class="hamburger" @click="hamburger()" :class="{ active: menu }">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav :class="{ open: menu }" class="menu_content">
        <ul class="hamburger_memu" v-if="$store.state.auth === true">
          <li>
            <a @click="$router.push({path: '/'}, () => {})">
              店舗一覧
            </a>
          </li>
          <li>
            <a @click="$router.push({path: '/mypage'}, () => {})">
              マイページ
            </a>
          </li>
          <li v-if="$store.state.administrator === 1">
            <a @click="$router.push({path: '/admin'}, () => {})">
              管理者ページ
            </a>
          </li>
          <li @click="logout" v-else>
            ログアウト
          </li>
        </ul>
        <ul v-else class="hamburger_memu">
            <li>
              <a @click="$router.push({path: '/'}, () => {})">
              店舗一覧
              </a>
            </li>
            <li>
              <a @click="$router.push({path: '/register'}, () => {})">
              会員登録
              </a>
            </li>
            <li>
              <a @click="$router.push({path: '/login'}, () => {})">
              ログイン
              </a>
            </li>
          </ul>
      </nav>
    </div>
</template>

<script>
import $router from 'vue-router';
export default{
  data() {
    return {
      logo:"",
      menu :false,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      $router.replace("/");
    },
    hamburger() {
      this.menu = !this.menu;
    },
  }
};
</script>


<style scoped>
/* ====================
      ヘッダー
==================== */
  .header {
    height: 60px;
    line-height: 60px;
    justify-content: space-between;
    top: 0;
    width: 100%;
    background-color: #ff7300;
    display: flex;
  }
  img{
    height:30px;
    width:30px;
    margin:15px;
  }
  .text-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  height: 50px;
  width: 420px;
  border-radius: 30px;
  text-align: center;
  margin: 5px 20px 0 0 ;
}

.header-title {
  font-size: 25px;
  font-weight: bold;
  color: white;
  line-height: 60px;
  cursor: default;
}
.right {
  margin-left: auto;
}
.moble-ul {
  list-style-type: none;
  border-left: 1px solid black;
  margin-left: 20px;
}
.mobile-show {
  list-style-type: none;
  margin-right: 6px;
  border-left: 1px solid black;
  margin-left: 50px;
}
.left {
  border-left: 0;
  padding-left: 0;
}
.admin{
  width:600px;
}
.ber {
  padding-left: 30px;
}
.menu {
  display: flex;
  line-height: 25px;
}
.moble-ul-button {
  margin-top: -12px;
}
.menu a {
  cursor: pointer;
}
  .custom a {
    color: #ffa500;
  }
  h1 {
    font-size: 28px;
    cursor: pointer;
  }
  .nav,
  h1 {
    color: #fff;
    margin-left: 20px;
  }
  .nav {
    position: absolute;
    right: 0;
  }
  .nav ul li {
    padding-right: 30px;
    font-weight: bold;
    cursor: pointer;
  }
  .menu_content {
    display: none;
  }

/* ====================
      レスポンシブ
==================== */
@media screen and (max-width: 768px) {
  .nav {
    display: none;
  }
  .text-area{
    display: none;
  }
  .hamburger {
    width: 40px;
    height: 40px;
    cursor: pointer;
    z-index: 100;
    transition: 0.5s;
    margin-right: 15px;
  }
  .hamburger span {
    margin-top: 7px;
    display: inline-block;
    position: absolute;
    width: 35px;
    height: 3px;
    background-color: #fff;
    transition: 0.3s;
  }
  .hamburger span:nth-of-type(1) {
    top: 10px;
  }
  .hamburger span:nth-of-type(2) {
    top: 20px;
  }
  .hamburger span:nth-of-type(3) {
    top: 30px;
  }
  .hamburger.active span:nth-of-type(1) {
    top: 20px;
    transform: rotate(45deg);
  }
  .hamburger.active span:nth-of-type(2) {
    opacity: 0;
  }
  .hamburger.active span:nth-of-type(3) {
    top: 20px;
    transform: rotate(-45deg);
  }
  .menu_content {
    display: block;
    width: 50%;
    text-align: center;
    position: fixed;
    transition: 0.3s;
    top: 60px;
    right: calc(-100% - 80px);
    background: rgb(255, 255, 255);
    color: #333333;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.4);
    z-index: 999;
  }
  .menu_content li {
    color: #333333;
    margin: 15px;
    padding: 5px;
    border-bottom: 0.5px solid #ffa500;
    text-decoration: none;
    display: block;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  .menu_content.open {
    right: 0;
  }
  .menu_content li a {
    display: inline-block;
    text-decoration: none;
    color: #333333;
    display: block;
  }
  .hamburger_icon {
    margin-right: 3px;
  }
}
</style>
