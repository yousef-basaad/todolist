import { useState } from 'react'
import { Form } from 'react-final-form'
import './App.css'
import FormField from './component/FormField'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface TodoFormValues {
  todo?: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formInitialValues, setFormInitialValues] = useState<TodoFormValues>({})

  const addTodo = (text: string) => {
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTodo: Todo = {
      id: Date.now(),
      text: trimmedText,
      completed: false
    }

    setTodos(prevTodos => [...prevTodos, newTodo])
  }

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const validateTodo = (values: TodoFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.todo?.trim()) {
      errors.todo = editingId ? 'Enter a todo item.' : ''
    }
    return errors
  }

  return (
    <div className="app">
      <h1>TodoList</h1>

      <Form<TodoFormValues>
        key={editingId ?? 'new'} // Reset form when editingId changes
        initialValues={formInitialValues}
        onSubmit={(values, form) => {
          if (editingId !== null) {
            const trimmedText = values.todo?.trim() || ''
            if (trimmedText) {
              setTodos(prevTodos =>
                prevTodos.map(todo =>
                  todo.id === editingId ? { ...todo, text: trimmedText } : todo
                )
              )
            }
            setEditingId(null)
            setFormInitialValues({})
            form.reset()
          } else {
            if (values.todo) {
              addTodo(values.todo)
              form.reset()
            }
          }
        }}
        validate={validateTodo}
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form className="add-todo" onSubmit={handleSubmit}>
            <FormField name="todo" placeholder={editingId ? "Edit todo..." : "Add a new todo"} autoComplete="off" />
            <button type="submit" disabled={submitting || pristine}>{editingId ? "Update" : "Add"}</button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormInitialValues({})
                  form.reset()
                }}
              >
                Cancel
              </button>
            )}
          </form>
        )}
      />

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}>
            <div className="view-mode">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'inherit'
                }}
              >
                {todo.text} <small>({String(todo.completed)})</small>
              </span>
              <button onClick={() => { setEditingId(todo.id); setFormInitialValues({ todo: todo.text }) }}>Edit</button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App