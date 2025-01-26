// Select elements
const container = document.querySelector(".container");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
let deleteAllButton = null;

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText === "") return; // Don't add empty tasks
  
  const li = document.createElement("li");
  li.textContent = todoText;
  
  // Add the new task to the list
  todoList.appendChild(li);

  // Add a delete button to the new task
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  li.appendChild(deleteButton);
  
  // Function to delete a todo
  function deleteTodo() {
    li.remove();
  }

  // Event listener for the delete button
  deleteButton.addEventListener("click", deleteTodo);
  
  // Clear the input
  todoInput.value = "";

  // Add "Delete All" button if it doesn't exist
  if (!deleteAllButton) {
    deleteAllButton = document.createElement("button");
    deleteAllButton.textContent = "Delete All";
    container.append(deleteAllButton);
    deleteAllButton.addEventListener("click", deleteAll);
  }

  // Save todo to localStorage
  function saveTodos() {
    const todos = Array.from(todoList.children).map(li => li.firstChild.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

// Function to delete all todos
function deleteAll() {
    todoList.innerHTML = "";
    deleteAllButton.remove();
    deleteAllButton = null;
  }

// Event listener for the Add button
addButton.addEventListener("click", addTodo);