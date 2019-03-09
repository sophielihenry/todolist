todoList = {
  todos: [],
  displayTodos: function() {
    todos.forEach(function(todo) {
      if (todo.completed === true) {
        console.log('(x)', todo.todoText)
      } else {
        console.log('( )', todo.todoText)
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
  },
  toggleAll: function() {
  var totalTodos = todos.length;
  var completedTodos = 0;

  // get number of completed todos
  for (var i = 0; i < totalTodos; i++) {
    if (todos[i].completed === true) {
      completedTodos++
    }
  }
  // if everything is true make it false
  if (totalTodos === completedTodos) {
    for (var i = 0; i < totalTodos; i++) {
      todos[i].completed = false;
    }
    // otherwise make everything true
  } else {
    for (var i = 0; i < totalTodos; i++) {
      todos[i].completed = true;
      }
    }
    todoList.displayTodos();
  }
}




