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
    this.todos.forEach(function(todo) {
     if (todo.completed === true) {
      completedTodos++
    }
  })
  // if everything is true make it false: toggles all completed to all uncompleted
    this.todos.forEach(function(todo) {
      if (totalTodos === completedTodos) {
        todo.completed = false;
  // otherwise make everything true: if some completed toggles all to completed
      } else {
        todo.completed = true;
      }
    })
    view.displayTodos();
  }
};

handlers = {
  displayTodos: function() {
    view.displayTodos();
  },
  addTodos: function() {
    var addTodos = document.getElementById('addTodoText')

    if (addTodos.value === '') {
      var noAddValue = document.getElementById('noValue');
      noAddValue.textContent = 'please add in a todo!'
    } else {
     var noAddValue = document.getElementById('noValue');
      noAddValue.textContent = ' '
      todoList.addTodos(addTodos.value)
      addTodos.value = '';
    }
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

    todoList.todos.forEach(function(todo, position) {
    // make sure todoLi is inside for loop!
      var todoLi = document.createElement('li')

     if (todo.completed === true) {
        todoLi.textContent = '(x)' + " " + todo.todoText + " "
        todoUl.appendChild(todoLi)
    // for loop todoLi.id = i
        todoLi.id = position
        var createButton = view.createButton();
        todoLi.appendChild(createButton);
        view.todosToday();
        } else {
        todoLi.textContent = '( )' + " " + todo.todoText + " "
        todoUl.appendChild(todoLi)
        todoLi.id = position
        var createButton = view.createButton();
        todoLi.appendChild(createButton);
        view.todosToday();
      }
    })
  },
  todosToday: function() {
  // count how many completed todos there are
    completedTodos = 0;
    todoList.todos.forEach(function(todo) {
      if (todo.completed === false) {
        completedTodos++
      }
    })

    var todosToday = document.getElementById('todosToday')
    if (completedTodos > 1) {
      todosToday.textContent = 'you have' + " " + completedTodos + " " + 'tasks to complete today'

    } else if (completedTodos === 1) {
      todosToday.textContent = 'you have 1 task to complete today'
    } else {
      todosToday.textContent = 'congratulations! you have no tasks to complete!'
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
          view.todosToday();
         }
    })
  }
};


view.eventListeners();

















