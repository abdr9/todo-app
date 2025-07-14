// DOM Elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Load todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render all todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");
    li.innerHTML = `
      <span class="todo-text">${todo.text}</span>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    li.addEventListener('click', (e) => {
      // Prevent marking as completed when clicking delete
      if (e.target.classList.contains('delete-btn')) return;
      toggleTodo(index);
    });
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });
    todoList.appendChild(li);
  });
}

// Add a new todo
todoForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    updateLocalStorage();
    renderTodos();
    todoInput.value = '';
  }
});

// Toggle completed status
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  updateLocalStorage();
  renderTodos();
}

// Delete a todo
function deleteTodo(index) {
  todos.splice(index, 1);
  updateLocalStorage();
  renderTodos();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Initial render
renderTodos();