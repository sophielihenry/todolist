todoList = {
  // todos: [],
  displayTodos: function() {
    todos.forEach(function(todo) {
      console.log(todo);
    });
  }
  addTodos: function(todo) {
  todos.push(todo)
  todoList.displayTodos();
  }
};
