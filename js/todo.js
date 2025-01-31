// todo.js - Handles todo operations like adding and deleting
import { getTodosFromStorage, saveTodosToStorage } from './storage.js';

export function addTodo(todoText) {
    const todos = getTodosFromStorage();
    todos.push({
        id: Date.now(),
        text: todoText,
        completed: false
    });
    saveTodosToStorage(todos);
    return todos;
}

export function deleteTodoById(todoId) {
    const todos = getTodosFromStorage();
    const updatedTodos = todos.filter(todo => todo.id !== todoId);
    
    saveTodosToStorage(updatedTodos);
    return updatedTodos;
}