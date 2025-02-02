// dom.js - Handles all UI interactions and display logic
import { addTodo, deleteTodoById, deleteAllTodos } from './todo.js';
import { sanitizeInputText } from './utils.js';

const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const buttonContainer = document.getElementById('button-container');

// Input field operations
export function getUserInputText() {
    return todoInput.value;
}

export function clearInputField() {
    todoInput.value = '';
}

// Renders the list of todos to the DOM
export function renderTodoList(todos) {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const todoContent = document.createElement('span');
        todoContent.textContent = todo.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
          handleTodoDelete(todo.id);
          renderDeleteAllButton();
        });
  
        li.appendChild(todoContent);
        li.appendChild(deleteBtn);  
        todoList.appendChild(li);
        
        renderDeleteAllButton();
    });
}

// Renders Delete All Button
export function renderDeleteAllButton() {
  if (!buttonContainer) return;
  if (todoList.children.length === 0) {
    removeDeleteAllButton();
    return;
  }

  if(!document.getElementById('delete-all-btn')) {
    const deleteAllBtn = document.createElement('button');
    deleteAllBtn.textContent = 'Delete All';
    deleteAllBtn.id = 'delete-all-btn';
    deleteAllBtn.addEventListener('click', () => handleDeleteAllTodos());
    buttonContainer.appendChild(deleteAllBtn);
  }

}

// Helper function to remove the delete all button
function removeDeleteAllButton() {
  const deleteAllBtn = document.getElementById('delete-all-btn');
  if (deleteAllBtn) {
    deleteAllBtn.remove();
  }
}

// Event handler functions
function handleAddNewTodo() {

    const todoText = sanitizeInputText(getUserInputText());
    if (todoText === '') {
        return;
    }
    
    renderTodoList(addTodo(todoText));   
    clearInputField();
}

function handleTodoDelete(todoId) {
    renderTodoList(deleteTodoById(todoId));
}

function handleDeleteAllTodos() {
  renderTodoList(deleteAllTodos());
  removeDeleteAllButton();
}

// Set up event listeners
addButton.addEventListener('click', handleAddNewTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddNewTodo();
    }
});