// tests/todo.test.js
import { jest } from '@jest/globals';
import { addTodo, deleteTodoById } from '../js/todo.js';
import * as storage from '../js/storage.js';

// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn()
};
global.localStorage = localStorageMock;

describe('Todo Operations', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        // Start with empty todos
        localStorageMock.getItem.mockReturnValue('[]');
        // Mock Date.now() to return a consistent value
        jest.spyOn(Date, 'now').mockImplementation(() => 2);
    });

    afterEach(() => {
        // Restore Date.now()
        jest.restoreAllMocks();
    });

    test('addTodo creates new todo with correct structure', () => {
        const todoText = 'Buy milk';
        const todos = addTodo(todoText);
        
        expect(todos).toHaveLength(1);
        expect(todos[0]).toEqual({
            id: 2,
            text: todoText,
            completed: false
        });
    });

    test('deleteTodoById removes correct todo', () => {
        // Set up initial todos in mock storage
        const initialTodos = [
            { id: 1, text: 'Buy milk', completed: false },
            { id: 2, text: 'Walk dog', completed: false }
        ];
        localStorageMock.getItem.mockReturnValue(JSON.stringify(initialTodos));

        const updatedTodos = deleteTodoById(1);
        
        expect(updatedTodos).toHaveLength(1);
        expect(updatedTodos[0].id).toBe(2);
    });
});