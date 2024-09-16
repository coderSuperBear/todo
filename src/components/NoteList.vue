<template>
    <div >
      <div v-if="notes.length === 0" class="no_notes">
        Тут пока ничего нет
      </div>
      <div v-else class="wrapper_list_note">
        <div v-for="(note, index) in notes" :key="note.id" class="note_card" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1">
        <div class="title_note_wrapper">
          <div class="marker" :style="{ backgroundColor: note.color }"></div>
          <p class="title_note">{{ note.content }}</p>
        </div>
          <div class="list">
          <ul>
            <li v-if="note.todos.length === 0" class="no_todos">
              Создайте первую задачу
            </li>
            <li v-for="(todo, index) in sortedTodos(note.todos)" :key="index">
              <label class="custom_checkbox">
                <input type="checkbox" v-model="todo.completed" disabled>
                <span class="checkmark"></span>
              </label>
              {{ todo.text }}
            </li>
          </ul>
        </div>
          <router-link class="router_link" :to="`/note/${note.id}`">{{note.todos.length === 0? 'Создать' : 'Открыть'}}</router-link>
          <button v-if="hoverIndex === index" class="delete_button" @click="deleteNote(note.id)">✕</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['notes'],
    data() {
      return {
        hoverIndex: -1,
      };
    },
    methods: {
      deleteNote(id) {
        this.$emit('delete-note', id);
      },
      sortedTodos(todos) {
        return todos.slice().sort((a, b) => a.completed - b.completed);
      },
    },
    mounted() {
      console.log('NoteList mounted with notes:', this.notes);
    },
  };
  </script>
  
  <style scoped>

  .note_card{
    padding: 20px;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 1px 12px 1px #83828246;
    transition: all ease .5s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 200px;
    max-width: 200px;
    min-height: 280px;
    background-color: #fff;
  }
  .note_card:hover{
    box-shadow: 0 1px 12px 1px #33333346;
  }
  .wrapper_list_note{
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: center;
    max-width: 900px;
  }
  .title_note {
    font-weight: 700;
    font-size: 18px;
    margin: 0;
    padding: 0;
    text-align: start;
    width: 100%;
    /* padding-left: 75px; */
    word-break: break-all;
  }
  .router_link {
    text-decoration: none;
    font-weight: 700;
    color: rgb(173, 171, 171);
    transition: all ease .5s
  }
  .router_link:hover {
    color: rgb(117, 115, 115)
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 230px;
    width: 100%;
  }
  .marker {
    width: 24px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .title_note_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  }
  
  .delete_button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }
  
  .custom_checkbox {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .custom_checkbox input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: transparent;
    border: 1px solid #6b6a6a;
    border-radius: 50%;
  }
  
  .custom_checkbox input:checked ~ .checkmark {
    background-color: transparent;
    border: none;
  }
  
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  
  .custom_checkbox input:checked ~ .checkmark:after {
    display: block;
  }
  
  .custom_checkbox .checkmark:after {
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid #353434;
    border-width: 0 1px 1px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  
  .no_notes {
    text-align: center;
    font-size: 1.5em;
    color: #888;
  }
  
  .no_todos {
    color: #888;
    margin-top: 90px;
    text-align: center;
  }
  ul {
    padding: 0;
  }
  ul > li {
    list-style-type: none;
    margin-bottom: 5px;
    word-break: break-all;
  }
  </style>