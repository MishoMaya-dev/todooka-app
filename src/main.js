import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Loader from './components/loader'
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import '@/plugin';
import '@/styles/main.scss'

Vue.use(Vuelidate)
Vue.component('Loader', Loader);
Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyCuPy8Q4tBNQfpq15iaNEdZewtaUV-fKd8",
  authDomain: "todooka.firebaseapp.com",
  databaseURL: "https://todooka.firebaseio.com",
  projectId: "todooka",
  storageBucket: "todooka.appspot.com",
  messagingSenderId: "43727130902",
  appId: "1:43727130902:web:6373afde764d4d6fdf8037",
  measurementId: "G-FDDVT4YSFM"
});

firebase.auth().onAuthStateChanged(user => {
  if (user) store.dispatch('onAuthUser', user);
  init();
});

function init() {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

