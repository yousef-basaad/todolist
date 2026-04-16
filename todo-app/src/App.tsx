import { useState } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditValue(text)
  }

  const saveEdit = () => {
    if (editingId !== null && editValue.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editValue.trim() } : todo
      ))
      setEditingId(null)
      setEditValue('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="app">
      <h1>TodoList</h1>
      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {editingId === todo.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div className="view-mode">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                <span>{todo.text}</span>
                <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
