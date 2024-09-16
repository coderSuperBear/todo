<template>
  <div id="app">
    <h1 class="title">Мои заметки</h1>
    <div v-if="!isNotePage" class="input_box">
      <input class="main_input" v-model="newNoteTitle" placeholder="Введите заголовок заметки">
      <button class="btn_input" :disabled="!newNoteTitle" @click="createNote">Создать</button>
    </div>
    <router-view :notes="notes" @delete-note="deleteNote" class="wrapper_note"></router-view>
    <Notifications :notifications="notifications" />
  </div>
</template>

<script>
import Notifications from './components/Notifications.vue';

export default {
  components: {
    Notifications,
  },
  data() {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      newNoteTitle: '',
      notifications: [],
    };
  },
  computed: {
    isNotePage() {
      return this.$route.path.startsWith('/note');
    },
  },
  methods: {
    createNote() {
      if (this.newNoteTitle.trim()) {
        const newNote = {
          id: Date.now(),
          content: this.newNoteTitle,
          todos: [],
          color: this.getRandomColor(),
        };
        this.notes.push(newNote);
        this.saveNotes();
        this.newNoteTitle = '';
        this.addNotification('Заметка создана', 'success');
        console.log('Новая заметка создана:', JSON.stringify(newNote));
      }
    },
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
      this.saveNotes();
      this.addNotification('Заметка удалена', 'error');
    },
    addNotification(message, type) {
      this.notifications.push({ message, type });
      setTimeout(() => {
        this.notifications.shift();
      }, 3000);
    },
  },
  watch: {
    notes: {
      handler() {
        this.saveNotes();
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
* {
  font-family: 'Roboto', sans-serif;
}
html {
  background-color: rgb(189, 181, 169, .1);
}
#app {
  background-color: rgb(189, 181, 169, .1);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  background-color: rgb(189, 181, 169, .1);
}
.wrapper_note {
  /* display: grid;
  grid-template-columns: repeat(3, 300px);
  justify-content:center; */
}
.input_box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
}
.title {
  text-align: center;
  margin-top: 0;
}
.main_input {
  border-radius: 30px;
  margin-right: 20px;
  border: none;
  outline: none;
  box-shadow: 0 1px 5px 1px #55555546;
  padding: 5px 30px;
  width: 20%;
  transition: all ease .5s;
}
.main_input:focus {
  box-shadow: 0 1px 12px 1px #33333346;
}
.btn_input {
  border-radius: 25px;
  border: 1px solid transparent;
  outline: none;
  padding: 5px 10px;
  background-color: tomato;
  color: #fff;
  cursor: pointer;
  transition: all ease .5s;
}
.btn_input:hover {
  box-shadow: 0 1px 12px 1px #33333346;
}
.btn_input:hover {
  background-color: rgb(252, 62, 28);
}
</style>