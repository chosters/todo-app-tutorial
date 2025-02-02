// main.js - Coordinates the core functionality of our todo application
import { renderTodoList, renderDeleteAllButton } from './dom.js';
import { getTodosFromStorage } from './storage.js';

function initializeApp() {
  loadAndDisplayTodos();
}

export function loadAndDisplayTodos() {
  renderTodoList(getTodosFromStorage());
  renderDeleteAllButton();
}

document.addEventListener('DOMContentLoaded', initializeApp);