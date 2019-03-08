todoList = {
  todos: [],
  displayTodos: function() {
    todos.forEach(function(todo) {
      if (this.todos.completed === true) {
        console.log('(x)', todo)
      } else {
        console.log('( )', todo)
      }
    });
  },
  addTodos: function(todo) {
    todos.push({ todoText: todo,
               completed: false })
    this.displayTodos();
  },
  changeTodos: function(position, newTodo) {
    todos[position] = newTodo
    this.displayTodos();
  },
  deleteTodos: function(position) {
    todos.splice(position, 1)
    this.displayTodos();
  },
  toggleOne: function(position) {
    todos[position].completed = !todos[position].completed;
    this.displayTodos();
  }
};
