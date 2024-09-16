import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import NoteList from './components/NoteList.vue';
import Note from './components/Note.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: NoteList },
  { path: '/note/:id', component: Note, props: true },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');