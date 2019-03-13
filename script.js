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
      noAddValue.textContent = 'please add in a todo'
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
    // var label = document.querySelector('label')
    // var changeTodoText = label.textContent

    // todoList.changeTodos(0, changeTodoText);
    // clears the bar
  },
  toggleCompleted: function() {
    todoList.toggleCompleted()
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
        todoLi.innerHTML = '<i class="fas fa-check-circle"></i>'
        todoLi.className = 'toggle'
        var todoTextInput = document.createElement('input');
        todoTextInput.type = "text";
        todoTextInput.id = 'textInput';
        todoTextInput.value = todo.todoText
        todoTextInput.disabled = true;
        todoLi.id = position
        todoUl.appendChild(todoLi)
        var createDeleteButton = view.createDeleteButton();
        var createEditButton = view.createEditButton();
        todoLi.appendChild(createEditButton);
        todoLi.appendChild(createDeleteButton);
        view.todosToday();
        } else {
        todoLi.innerHTML = '<i class="far fa-circle"></i>'
        todoLi.className = 'toggle'
        var todoTextInput = document.createElement('input');
        todoTextInput.type = "text";
        todoTextInput.id = 'textInput';
        todoTextInput.value = todo.todoText;
        todoTextInput.disabled = true;
        todoLi.id = position
        todoLi.appendChild(todoTextInput)
        todoUl.appendChild(todoLi)
        var createDeleteButton = view.createDeleteButton();
        var createEditButton = view.createEditButton();
        todoLi.appendChild(createEditButton);
        todoLi.appendChild(createDeleteButton)
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
  createDeleteButton: function() {
    var createButton = document.createElement('button')
    // createButton.textContent = 'Delete'
    createButton.innerHTML = '<i class="fas fa-times"></i>'
    createButton.className = 'deleteButton'
    return createButton;
  },
  createEditButton: function() {
    var createEditButton = document.createElement('button')
    createEditButton.innerHTML = '<i class="far fa-edit"></i>'
    createEditButton.className = 'editButton'
    return createEditButton
  },
  eventListeners: function() {
    // click to delete button
    var deleteButton = document.addEventListener('click', function(event) {
      var deleteButtonId = event.target.parentNode.parentNode.id
      if (event.target.parentNode.className === 'deleteButton') {
          handlers.deleteTodos(deleteButtonId)
          view.todosToday();
         }
    })
    // enter to add todo
    var enterToAdd = document.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        handlers.addTodos();
      }
    })
    // click to toggle
    var clickToToggle = document.addEventListener('click', function(event) {
      var toggleId = event.target.parentNode.id
      if (event.target.nodeName=== 'I') {
        todoList.toggleCompleted(toggleId);
      }
    })
    // click to edit todo
    var editButton = document.addEventListener('click', function(event) {
      var changeTodoId = event.target.parentNode.id
      if (event.target.parentNode.className === 'editButton') {
        event.target.parentElement.previousSibling.isContentEditable = true;
        event.target.parentElement.previousSibling.contentEditable = true;
      }
      })
      // handlers.changeTodos();
  }
 }




view.eventListeners()
















