// main.js - Coordinates the core functionality of our todo application
import { renderTodoList } from './dom.js';
import { getTodosFromStorage } from './storage.js';

function initializeApp() {
  loadAndDisplayTodos();
}

export function loadAndDisplayTodos() {
  renderTodoList(getTodosFromStorage());
}

document.addEventListener('DOMContentLoaded', initializeApp);