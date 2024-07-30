import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle } from 'lucide-react';
import { Input } from './components/ui/input.tsx';
import { Button } from './components/ui/button.tsx';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1 className="todo-title">Interactive Todo List</h1>
        <div className="todo-input-container">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo"
            className="todo-input"
          />
          <Button onClick={addTodo} className="todo-add-button">
            <PlusCircle className="w-5 h-5 mr-1" />
            Add
          </Button>
        </div>
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleTodo(todo.id)}
                className="todo-toggle-button"
              >
                <CheckCircle className="w-6 h-6" />
              </Button>
              <span className="todo-text">{todo.text}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeTodo(todo.id)} 
                className="todo-delete-button"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;