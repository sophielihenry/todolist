todoList = {
  todos: [],
  displayTodos: function() {
    console.log('My todo list:')
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        console.log('(x)', todo.todoText)
      } else {
        console.log('( )', todo.todoText)
      }
    });
  },
  addTodos: function(todo) {
    this.todos.push({ todoText: todo,
               completed: false })
    this.displayTodos();
  },
  changeTodos: function(position, newTodo) {
    this.todos[position].todoText = newTodo
    this.displayTodos();
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1)
    this.displayTodos();
  },
  toggleOne: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
    this.displayTodos();
  },
  toggleAll: function() {
  var totalTodos = this.todos.length;
  var completedTodos = 0;

  // get number of completed todos
  for (var i = 0; i < totalTodos; i++) {
    if (this.todos[i].completed === true) {
      completedTodos++
    }
  }

  // if everything is true make it false. toggles all completed to all uncompleted
  if (totalTodos === completedTodos) {
    for (var i = 0; i < totalTodos; i++) {
      this.todos[i].completed = false;
    }
    // otherwise make everything true, if some completed toggles all to completed
  } else {
    for (var i = 0; i < totalTodos; i++) {
      this.todos[i].completed = true;
      }
    }
    this.displayTodos();
  }
};

handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  addTodos: function() {
    var addTodos = document.getElementById('addTodoText')
    todoList.addTodos(addTodos.value)
    addTodos.value = '';
  },
  changeTodos: function() {
    var changeTodoText = document.getElementById('changeTodoText')
    var todoTextPosition = document.getElementById('todoTextPosition')
    todoList.changeTodos(todoTextPosition.valueAsNumber, changeTodoText.value);
    // clears the bar
    changeTodoText.value = '';
    todoTextPosition.value = '';
  },
  deleteTodos: function() {
    var deleteTodoPosition = document.getElementById('deleteTodoPosition');
    todoList.deleteTodos(deleteTodoPosition.valueAsNumber);
    deleteTodoPosition.value = '';
  },
  toggleOne: function() {
    var togglePosition = document.getElementById('togglePosition');
    todoList.toggleOne(togglePosition.valueAsNumber)
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
}




