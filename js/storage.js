// storage.js - Handles saving and loading todos from localStorage
export function getTodosFromStorage() {
  try {
      return JSON.parse(localStorage.getItem('todos')) || [];
  } catch (error) {
      console.error('Error loading todos:', error);
      return [];
  }
}

export function saveTodosToStorage(todos) {
  try {
      localStorage.setItem('todos', JSON.stringify(todos));
  } catch (error) {
      console.error('Error saving todos:', error);
  }
}