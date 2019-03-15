todoList = {
  todos: [],
  addTodos: function(event) {
    // press enter to create a new todo
    if (event.keyCode === 13) {
      var addTodoTextInput = document.getElementById('addTodoText');
      this.todos.push({
      todoText: addTodoTextInput.value,
      completed: false
    });

    //    if (addTodoTextInput.value === '') {
    //   var noAddValue = document.getElementById('noValue');
    //   noAddValue.textContent = 'please add in a todo'
    // } else {
    //  var noAddValue = document.getElementById('noValue');
    //   noAddValue.textContent = ' '


    // Reseting to empty string after user input
      addTodoTextInput.value = '';
      view.displayTodos();
    }
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

view = {
  displayTodos: function() {
    var todoUl = document.querySelector('ul')
    // sets to 0 so doesnt keep adding extra bullet points again
    todoUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position) {
    // make sure todoLi is inside for loop!
        var todoLi = document.createElement('li')
        var todoTextInput = document.createElement('input');
        todoTextInput.type = "text";
        todoTextInput.id = 'todoTextInput';
        todoTextInput.disabled = true;

     if (todo.completed === true) {
        todoLi.innerHTML = '<i class="fas fa-check-circle"></i>'
        todoLi.className = 'toggle'
        todoTextInput.value = todo.todoText
        todoLi.id = position
        todoLi.appendChild(todoTextInput)
        todoUl.appendChild(todoLi)
        var createDeleteButton = view.createDeleteButton();
        // var createEditButton = view.createEditButton();
        // todoLi.appendChild(createEditButton);
        todoLi.appendChild(createDeleteButton);
        view.todosToday();
        } else {
        todoLi.innerHTML = '<i class="far fa-circle"></i>'
        todoLi.className = 'toggle'
        todoTextInput.value = todo.todoText;
        todoLi.id = position
        todoLi.appendChild(todoTextInput)
        todoUl.appendChild(todoLi)
        var createDeleteButton = view.createDeleteButton();
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
  // createEditButton: function() {
  //   var createEditButton = document.createElement('button')
  //   createEditButton.innerHTML = '<i class="far fa-edit"></i>'
  //   createEditButton.className = 'editButton'
  //   return createEditButton
  // },
  eventListeners: function() {
    // click to delete button
    var deleteButton = document.addEventListener('click', function(event) {
      var deleteButtonId = event.target.parentNode.parentNode.id
      if (event.target.parentNode.className === 'deleteButton') {
          todoList.deleteTodos(deleteButtonId)
          view.todosToday();
         }
    })
    // click to toggle
    var clickToToggle = document.addEventListener('click', function(event) {
      var toggleId = event.target.parentNode.id
      if (event.target.nodeName=== 'I') {
        todoList.toggleCompleted(toggleId);
      }
    })
    // click to edit and enter to save
    var todoUl = document.querySelector('ul');
    todoUl.addEventListener('click', function(event) {
      var position = event.target.parentNode.id;
        if (event.target.tagName === 'INPUT') {
            var input = document.getElementById(position).querySelector('input');
            input.disabled = false;
            input.className = "activeTextInput";
            input.focus();
            // input.select();

            input.addEventListener('keyup', function(event) {
              if(event.keyCode === 13) {
                var newTodo = input.value;
                input.disabled = true;
                input.classList.remove("activeTextInput");
                todoList.changeTodos(position, newTodo);
              };
          });
          };
      });
    }
 }

view.eventListeners()
















