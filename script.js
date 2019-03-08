todoList = {
  // todos: [],
  displayTodos: function() {
    todos.forEach(function(todo) {
      console.log(todo);
    });
  },
  addTodos: function(todo) {
    todos.push(todo)
    todoList.displayTodos();
  },
  changeTodos: function(position, newTodo) {
    todos[position] = newTodo
    todoList.displayTodos();
},
  deleteTodos: function(position) {
    todos.splice(position, 1)
    todoList.displayTodos();
  }

};
