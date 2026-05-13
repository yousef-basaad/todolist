import { Link, useOutletContext } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../api/todos'
import type { AppOutletContext } from '../App'

const Home = () => {
  const { todos, toggleComplete, deleteTodo } = useOutletContext<AppOutletContext>()
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const loading = todosQuery.isLoading
  const error = todosQuery.error instanceof Error ? todosQuery.error.message : null

  return (
    <div className="app">
      <h1>TodoList</h1>

      <Link to="/add" className="add-button">Add Todo</Link>

      {loading && <p className="status-message">Loading todos...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && todos.length === 0 && (
        <p className="status-message">No todos yet.</p>
      )}

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item${todo.completed ? 'completed' : ''}`}>
            <div className="view-mode">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#888' : 'inherit',
                }}
              >
                {todo.text} <small>({String(todo.completed)})</small>
              </span>
              <Link to={`/edit/${todo.id}`}>Edit</Link>
              <button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
