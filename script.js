todoList = {
  todos: [],
  addTodos(event) {
    // press enter to create a new todo
    let addTodoTextInput = document.getElementById('textInput');
    if (event.keyCode === 13) {
      if (addTodoTextInput.value === "") {
        alert("Please add in a todo!")
      } else {
        this.todos.push({
        todoText: addTodoTextInput.value,
        completed: false
        });
      }
    // Reseting to empty string after user input
      addTodoTextInput.value = '';
      view.displayTodos();
    }
  },
  changeTodos(position, newTodo) {
    this.todos[position].todoText = newTodo
    view.displayTodos();
  },
  deleteTodos(position) {
    this.todos.splice(position, 1)
    view.displayTodos();
  },
  toggleCompleted(position) {
    this.todos[position].completed = !this.todos[position].completed;
    view.displayTodos();
  },
  toggleAll() {
  let totalTodos = this.todos.length;
  let completedTodos = 0;
  // get number of completed todos

    this.todos.forEach(function(todo) {
  // === true shorthand
     if (todo.completed) {
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
  displayTodos() {
    let todoUl = document.querySelector('ul')
    // sets to 0 so doesnt keep adding extra bullet points again
    todoUl.innerHTML = '';

    todoList.todos.forEach(function(todo, position) {
    // make sure todoLi is inside for loop!
        let todoLi = document.createElement('li')
        let todoTextInput = document.createElement('input');
        todoTextInput.type = "text";
        todoTextInput.id = 'todoTextInput';
        todoTextInput.disabled = true;

        if (todo.completed) {
          todoLi.innerHTML = '<i class="fas fa-check-circle" "circle"></i>'
          todoLi.className = 'toggle'
          todoLi.appendChild(todoTextInput)
          todoLi.id = position
          todoUl.appendChild(todoLi)
          // strike through text when completed
          let strikeThroughCompleted = document.getElementById(position).querySelector('input')
          strikeThroughCompleted.style.textDecoration = "line-through";
          strikeThroughCompleted.style.opacity = "0.4";
        } else {
          todoLi.innerHTML = '<i class="far fa-circle" "circle"></i>'
          todoLi.className = 'toggle'
          todoLi.id = position
          todoLi.appendChild(todoTextInput)
          todoUl.appendChild(todoLi)
        }
          todoTextInput.value = todo.todoText
          todoLi.appendChild(view.createDeleteButton());
          view.todosToday();
    })
  },
  todosToday() {
  // count how many completed todos there are
    completedTodos = 0;
    todoList.todos.forEach(function(todo) {
      if (todo.completed === false) {
        completedTodos++
      }
    })
    let todosToday = document.getElementById('todosToday')
    if (completedTodos > 1) {
      todosToday.textContent = `you have ${completedTodos} tasks to complete today`
    } else if (completedTodos === 1) {
      todosToday.textContent = 'you have 1 more task to complete today'
    } else {
      todosToday.textContent = 'congratulations! you have no tasks to complete!'
    }
  },
  createDeleteButton() {
    let createButton = document.createElement('button')
    createButton.innerHTML = '<i class="fas fa-times"></i>'
    createButton.className = 'deleteButton'
    return createButton;
  },
  eventListeners() {
    // click to delete button
    let deleteButton = document.addEventListener('click', function(event) {
      let deleteButtonId = event.target.parentNode.parentNode.id
      if (event.target.parentNode.className === 'deleteButton') {
          todoList.deleteTodos(deleteButtonId)
          view.todosToday();
         }
    })
    // click to toggle
    let clickToToggle = document.addEventListener('click', function(event) {
      let toggleId = event.target.parentNode.id
      if (event.target.nodeName=== 'I') {
        todoList.toggleCompleted(toggleId);
      }
    })
    // click to edit and enter to save
    let todoUl = document.querySelector('ul');
    todoUl.addEventListener('click', function(event) {
      let position = event.target.parentNode.id;
        if (event.target.tagName === 'INPUT') {
            let input = document.getElementById(position).querySelector('input');
            input.disabled = false;
            input.className = "activeTextInput";
            input.focus();
            // input.select();
            input.addEventListener('keyup', function(event) {
              if(event.keyCode === 13) {
                let newTodo = input.value;
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
