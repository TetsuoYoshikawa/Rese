import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    auth: "",
    user_id: "",
    user_name:"",
    email:"",
    token:"",
    administrator: false,
  },
  mutations: {
    auth(state, payload) {
      state.auth = payload;
    },
    user_id(state, payload) {
      state.user_id = payload;
    },
    user_name(state,payload){
      state.user_name = payload;
    },
    email(state,payload){
      state.email = payload;
    },
    token(state,payload){
      state.token = payload;
    },
    administrator(state, payload) {
      state.administrator = payload;
    },
    logout(state, payload) {
      state.auth = payload;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const responseLogin = await axios
        .post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        })
        .catch(() => {
          alert('ログインできませんでした');
        });
      commit("token",responseLogin.data.access_token);
      commit("auth", responseLogin.data.auth);
      commit("user_id", responseLogin.data.user.id);
      commit("user_name", responseLogin.data.user.name);
      commit("email", responseLogin.data.user.email);
      commit("administrator", responseLogin.data.user.administrator);
      router.replace("/");
    },
    async logout({ commit }) {
      commit("auth",false);
      const responseLogout = await axios
        .post("https://infinite-beyond-20743.herokuapp.com/api/auth/logout", 
        { data: ""},
        { headers: { Authorization: 'Bearer ' + this.state.token } }
      )
        .then((response) => {
          console.log(response);
          alert('ログアウトしました。');
          commit("logout", responseLogout.data.auth);
          commit("user_id", "");
          commit("user_name", "");
          commit("email", "");
          commit("token", "");
          commit("administrator", false);
          router.replace("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
