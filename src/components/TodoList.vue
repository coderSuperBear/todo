<template>
  <div class="todo_list">
    <ul>
      <li v-for="(todo, index) in localTodos" :key="index">
        <input type="checkbox" v-model="todo.completed" @change="updateTodo(todo, index)" />
        <p v-if="!todo.editing">{{ todo.text }}</p>
        <input v-else type="text" v-model="todo.text" @blur="finishEditing(todo, index)" @keyup.enter="finishEditing(todo, index)" />
        <button @click="toggleEditing(todo, index)">{{ todo.editing ? 'Сохранить' : 'Редактировать' }}</button>
        <button @click="removeTodo(index)">Удалить</button>
      </li>
    </ul>
    <button @click="addTodo">Добавить задачу</button>
  </div>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      localTodos: this.todos.map(todo => ({ ...todo, editing: false })),
    };
  },
  methods: {
    addTodo() {
      this.localTodos.push({ text: '', completed: false, editing: true });
      this.updateParent();
    },
    removeTodo(index) {
      this.localTodos.splice(index, 1);
      this.updateParent();
    },
    toggleEditing(todo, index) {
      todo.editing = !todo.editing;
      this.localTodos.splice(index, 1, { ...todo });
      this.updateParent();
    },
    finishEditing(todo, index) {
      todo.editing = false;
      this.localTodos.splice(index, 1, { ...todo });
      this.updateParent();
    },
    updateTodo(todo, index) {
      this.localTodos.splice(index, 1, { ...todo });
      this.updateParent();
    },
    updateParent() {
      this.$emit('update', this.localTodos);
    },
  },
};
</script>

<style scoped>
.todo_list {
  margin: 10px 0;
}
</style>