// dom.js - Handles all UI interactions and display logic
import { addTodo, deleteTodoById, deleteAllTodos } from './todo.js';
import { sanitizeInputText } from './utils.js';

// Move element queries into functions to ensure DOM is ready
function getElements() {
  return {
    todoList: document.getElementById('todo-list'),
    todoInput: document.getElementById('todo-input'),
    addButton: document.getElementById('add-button'),
    buttonContainer: document.getElementById('button-container')
  };
}

// Input field operations
export function getUserInputText() {
    const { todoInput } = getElements();
    return todoInput ? todoInput.value : '';
}

export function clearInputField() {
    const { todoInput } = getElements();
    if (todoInput) {
        todoInput.value = '';
    }
}

// Renders the list of todos to the DOM
export function renderTodoList(todos) {
    const { todoList } = getElements();
    if (!todoList) return;
    
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
    const { buttonContainer, todoList } = getElements();
    if (!buttonContainer || !todoList) return;
    
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
export function initializeEventListeners() {
    const { addButton, todoInput } = getElements();
    if (addButton && todoInput) {
        addButton.addEventListener('click', handleAddNewTodo);
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleAddNewTodo();
            }
        });
    }
}

// Call it only if we're in a browser environment
if (typeof window !== 'undefined') {
    initializeEventListeners();
}