todoList = {
  todos: [],
  // displayTodos: function() {
  //   console.log('My todo list:')
  //   this.todos.forEach(function(todo) {
  //     if (todo.completed === true) {
  //       console.log('(x)', todo.todoText)
  //     } else {
  //       console.log('( )', todo.todoText)
  //     }
  //   });
  // },
  addTodos: function(todo) {
    this.todos.push({ todoText: todo,
               completed: false })
    view.displayTodos();
  },
  changeTodos: function(position, newTodo) {
    this.todos[position].todoText = newTodo
    view.displayTodos();
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1)
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    this.todos[position].completed = !this.todos[position].completed;
    view.displayTodos();
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
    view.displayTodos();
  }
};

handlers = {
  displayTodos: function() {
    view.displayTodos();
  },
  addTodos: function() {
    var addTodos = document.getElementById('addTodoText')
    todoList.addTodos(addTodos.value)
    addTodos.value = '';
  },
  deleteTodos: function(position) {
    todoList.deleteTodos(position);
  },
  changeTodos: function() {
    var changeTodoText = document.getElementById('changeTodoText')
    var todoTextPosition = document.getElementById('todoTextPosition')
    todoList.changeTodos(todoTextPosition.valueAsNumber, changeTodoText.value);
    // clears the bar
    changeTodoText.value = '';
    todoTextPosition.value = '';
  },
  toggleCompleted: function() {
    var togglePosition = document.getElementById('togglePosition');
    todoList.toggleCompleted(togglePosition.valueAsNumber)
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

view = {
  displayTodos: function() {
    var todoUl = document.querySelector('ul')
    // sets to 0 so doesnt keep adding extra bullet points again
    todoUl.innerHTML = '';

    for (var i=0; i<todoList.todos.length; i++) {
    // make sure todoLi is inside for loop!
      var todoLi = document.createElement('li')

      if (todoList.todos[i].completed === true) {
        todoLi.textContent = '(x)' + " " + todoList.todos[i].todoText + " "
        todoUl.appendChild(todoLi)
        todoLi.id = i
        var createButton = view.createButton();
        todoLi.appendChild(createButton);
        view.tasksToday();
      } else {
        todoLi.textContent = '( )' + " " + todoList.todos[i].todoText + " "
        todoUl.appendChild(todoLi)
        todoLi.id = i
        var createButton = view.createButton();
        todoLi.appendChild(createButton);
        view.tasksToday();

      }
    }
  },
  tasksToday: function() {
    amountTodos = todoList.todos.length
    var tasksToday = document.querySelector('p')

    if (amountTodos === 0) {
      tasksToday.textContent = 'you have no tasks to complete!'
    } else if (amountTodos === 1) {
      tasksToday.textContent = 'you have 1 task to complete today'
    } else {
      tasksToday.textContent = 'you have' + " " + amountTodos + " " + 'tasks to complete today'
    }
  },
  createButton: function() {
    var createButton = document.createElement('button')
    createButton.textContent = 'Delete'
    createButton.className = 'deleteButton'
    return createButton;
  },
  eventListeners: function() {
    var deleteButton = document.addEventListener('click', function(e) {
      var deleteButtonId = e.target.parentNode.id
      if (e.target.className === 'deleteButton') {
          handlers.deleteTodos(deleteButtonId)

        }
    })
  }
};

view.eventListeners();

















