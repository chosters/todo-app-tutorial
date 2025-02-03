// tests/dom.test.js
import { jest } from '@jest/globals';
import { getUserInputText, clearInputField, renderTodoList } from '../js/dom.js';

describe('DOM Operations', () => {
    // Set up DOM elements before each test
    beforeEach(() => {
        // Clear the document body
        document.body.innerHTML = `
            <div class="container">
                <input type="text" id="todo-input" />
                <div id="button-container">
                    <button id="add-button">Add Task</button>
                </div>
                <ul id="todo-list"></ul>
            </div>
        `;
    });

    test('getUserInputText returns input field value', () => {
        const input = document.getElementById('todo-input');
        input.value = 'Buy milk';
        
        expect(getUserInputText()).toBe('Buy milk');
    });

    test('clearInputField clears the input field', () => {
        const input = document.getElementById('todo-input');
        input.value = 'Buy milk';
        
        clearInputField();
        
        expect(input.value).toBe('');
    });

    test('renderTodoList creates correct todo elements', () => {
        const todos = [
            { id: 1, text: 'Buy milk', completed: false }
        ];
        
        renderTodoList(todos);
        
        const todoList = document.getElementById('todo-list');
        expect(todoList.children).toHaveLength(1);
        expect(todoList.children[0].textContent).toContain('Buy milk');
    });
});