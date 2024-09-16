<template>
  <div v-if="note" class="note_card">
    <div class="marker" :style="{ backgroundColor: note.color }"></div>
    <div style="display: flex; align-items: center;">
      <h2 class="title_note">{{ note.content }}</h2> <img class="img_home" src="/home.png"  @click="goToHome"/>
    </div>

    <div>
      <input class="main_input" v-model="newTodo" @keyup.enter="addTodo" placeholder="Новая задача">
      <button class="btn_input" :disabled="!newTodo" @click="addTodo">Добавить</button>
    </div>
    <ul>
      <li v-for="(todo, index) in incompleteTodos" :key="index">
        <label class="custom_checkbox">
          <input type="checkbox" v-model="todo.completed">
          <span class="checkmark" :class="{ completed: todo.completed }"></span>
        </label>
        <span class="note_value" :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <img class="img_edit" src="/edit_pen.png" @click="openEditModal(index)"/>
        <img class="img_delete" src="/delete.png" @click="showDeleteModal(index)"/>
      </li>
    </ul>
    <div class="completed_section">
      <h3 @click="toggleCompletedSection" class="done">
        Готово
        <span :class="`arrow ${showCompletedSection ? 'down' : 'up'}`"></span>
      </h3>
      <ul v-if="showCompletedSection">
        <li v-for="(todo, index) in completedTodos" :key="index" @mouseover="hoverIndex = index" @mouseleave="hoverIndex = -1">
          <label class="custom_checkbox">
            <input type="checkbox" v-model="todo.completed" disabled>
            <span class="checkmark" :class="{ completed: todo.completed }"></span>
          </label>
          <span class="el_done">{{ todo.text }} <img class="img_delete_done" src="/delete.png" @click="deleteCompletedTodo(index)"></span>
        </li>
      </ul>
    </div>

    <div v-if="deleteModalVisible" class="modal">
      <div class="modal_content">
        <p>Вы уверены в своем решении?</p>
        <div class="modal_btns">
          <button class="modal_btn_y" @click="confirmDelete">Да</button>
          <button class="modal_btn_n" @click="cancelDelete">Нет</button>
        </div>
      </div>
    </div>

    <div v-if="editModalVisible" class="modal">
      <div class="modal_content">
        <p>Редактирование</p>
        <input class="main_input_edit"  v-model="editTodoText" placeholder="Новый текст задачи">
        <div class="modal_btns_edit">
        <button class="modal_btn_edit " @click="saveEdit">Сохранить</button>
        <button class="modal_btn_edit_r" @click="cancelEdit">Отмена</button>
      </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Заметка не найдена</p>
  </div>
</template>

<script>
export default {
  props: ['notes', 'id'],
  data() {
    return {
      newTodo: '',
      deleteModalVisible: false,
      editModalVisible: false,
      todoToEditIndex: null,
      todoToDeleteIndex: null,
      editTodoText: '',
      showCompletedSection: true,
      hoverIndex: -1,
    };
  },
  computed: {
    note() {
      const foundNote = this.notes.find(note => note.id === parseInt(this.id));
      console.log('Found note:', foundNote); 
      return foundNote;
    },
    incompleteTodos() {
      return this.note.todos.filter(todo => !todo.completed);
    },
    completedTodos() {
      return this.note.todos.filter(todo => todo.completed);
    },
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.note.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
      }
    },
    openEditModal(index) {
      this.todoToEditIndex = index;
      this.editTodoText = this.note.todos[index].text;
      this.editModalVisible = true;
    },
    saveEdit() {
      if (this.editTodoText.trim()) {
        this.note.todos[this.todoToEditIndex].text = this.editTodoText;
      }
      this.editModalVisible = false;
    },
    cancelEdit() {
      this.editModalVisible = false;
    },
    showDeleteModal(index) {
      this.todoToDeleteIndex = index;
      this.deleteModalVisible = true;
    },
    confirmDelete() {
      this.note.todos.splice(this.todoToDeleteIndex, 1);
      this.deleteModalVisible = false;
    },
    cancelDelete() {
      this.deleteModalVisible = false;
    },
    goToHome() {
      this.$router.push('/');
    },
    toggleCompletedSection() {
      this.showCompletedSection = !this.showCompletedSection;
    },
    deleteCompletedTodo(index) {
      const completedTodos = this.completedTodos;
      const todoToDelete = completedTodos[index];
      this.note.todos = this.note.todos.filter(todo => todo !== todoToDelete);
    },
  },
};
</script>

<style scoped>
.note_card {
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  max-width: 620px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 12px 1px #83828246;
}
.done {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #575555;
  margin: 0;
}
.img_edit {
  width: 20px;
  margin-right: 5px;
  cursor: pointer;
}
.img_delete {
  width: 20px;
  cursor: pointer;
}
.img_delete_done {
  width: 20px;
  cursor: pointer;
  margin-left: 5px;
}
.img_home {
  width: 20px;
  cursor: pointer;
  margin-bottom: 25px;
}
.el_done {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.title_note {
  font-weight: 700;
    font-size: 18px;
    margin: 0;
    padding: 0;
    text-align: start;
    width: 100%;
    padding-left: 31px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;
    /* width: 50%; */
    word-break: break-all;
}

.marker {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
  position: absolute;
  top: 20px;
  left: 20px;
}

.completed {
  text-decoration: line-through;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}


.modal_content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  min-width: 350px;

}
.modal_btns {
  display: flex;
  justify-content: center;
}
.modal_btns_edit {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.modal_btn_y {
  border: 1px solid red;
  border-radius: 20px;
  padding: 5px 20px;
  margin-right: 15px;
  color: red;
  background: #fff;
  margin-left: 15px;
  cursor: pointer;
}
.modal_btn_n {
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px 20px;
  margin-right: 15px;
  background: #fff;
  cursor: pointer;
}
.modal_btn_edit {
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px 20px;
  margin-right: 15px;
  background: #fff;
  cursor: pointer;
}
.modal_btn_edit_r {
  border: 1px solid black;
  border-radius: 20px;
  padding: 5px 20px;
  background: #fff;
  cursor: pointer;
}
.main_input {
  border-radius: 30px;
  margin-right: 20px;
  border: none;
  outline: none;
  box-shadow: 0 1px 5px 1px #55555546;
  padding: 5px 30px;
  width: 50%;
  transition: all ease .5s;
}
.main_input:focus {
  box-shadow: 0 1px 12px 1px #33333346;
}
.main_input_edit {
  border-radius: 30px;
  border: none;
  outline: none;
  box-shadow: 0 1px 5px 1px #55555546;
  padding: 5px 30px;
  width: 50%;
  transition: all ease .5s;
}
.main_input_edit:focus {
  box-shadow: 0 1px 12px 1px #33333346;
}
.note_value {
  margin-right: 30px;
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
  top: -2px;
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

.completed_section {
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  background-color: #ccc9c9;
  padding:10px 20px;
  border-radius: 10px;
}

.completed_section h3 {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.arrow {
  border: solid #575555;
  border-width: 0 1px 1px 0;
  display: inline-block;
  padding: 3px;
  margin-left: 10px;
}

.arrow.down {
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}

.arrow.up {
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
}

.delete_button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
}
ul {
    padding: 0;
  }
  ul > li {
    list-style-type: none;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    word-break: break-all;
  }
</style>