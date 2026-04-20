import { useState } from 'react'
import { Field, Form } from 'react-final-form'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
}

interface AddFormValues {
  todo?: string
}

interface EditFormValues {
  edit?: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')

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

  const startEdit = (id: number, text: string) => {
    setEditingId(id)
    setEditValue(text)
  }

  const saveEdit = (text: string) => {
    const trimmedText = text.trim()
    if (editingId === null || !trimmedText) return

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === editingId ? { ...todo, text: trimmedText } : todo
      )
    )
    setEditingId(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditValue('')
  }

  const toggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const validateAdd = (values: AddFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.todo?.trim()) {
      errors.todo = ''
    }
    return errors
  }

  const validateEdit = (values: EditFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.edit?.trim()) {
      errors.edit = 'Enter a todo item.'
    }
    return errors
  }

  return (
    <div className="app">
      <h1>TodoList</h1>

      <Form<AddFormValues>
        onSubmit={(values, form) => {
          if (values.todo) {
            addTodo(values.todo)
            form.reset()
          }
        }}
        validate={validateAdd}
        render={({ handleSubmit, submitting, pristine }) => (
          <form className="add-todo" onSubmit={handleSubmit}>
            <Field name="todo">
              {({ input, meta }) => (
                <div className="field-row">
                  <input
                    {...input}
                    type="text"
                    placeholder="Add a new todo"
                    autoComplete="off"
                  />
                  {meta.touched && meta.error && (
                    <span className="error">{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <button type="submit" disabled={submitting || pristine}>Add</button>
          </form>
        )}
      />

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}>
            {editingId === todo.id ? (
              <Form<EditFormValues>
                initialValues={{ edit: editValue }}
                onSubmit={(values) => saveEdit(values.edit ?? '')}
                validate={validateEdit}
                render={({ handleSubmit, form, submitting, pristine }) => (
                  <form className="edit-mode" onSubmit={handleSubmit}>
                    <Field name="edit">
                      {({ input, meta }) => (
                        <div className="field-row">
                          <input
                            {...input}
                            type="text"
                            autoFocus
                          />
                          {meta.touched && meta.error && (
                            <span className="error">{meta.error}</span>
                          )}
                        </div>
                      )}
                    </Field>
                    <button type="submit" disabled={submitting || pristine}>Save</button>
                    <button
                      type="button"
                      onClick={() => {
                        cancelEdit()
                        form.reset()
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                )}
              />
            ) : (
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