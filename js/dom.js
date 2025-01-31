// dom.js - Handles all UI interactions and display logic
import { addTodo, deleteTodoById } from './todo.js';
import { sanitizeInputText } from './utils.js';

const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');

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
        deleteBtn.addEventListener('click', () => handleTodoDelete(todo.id));
        
        li.appendChild(todoContent);
        li.appendChild(deleteBtn);  
        todoList.appendChild(li);
    });
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

// Set up event listeners
addButton.addEventListener('click', handleAddNewTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAddNewTodo();
    }
});