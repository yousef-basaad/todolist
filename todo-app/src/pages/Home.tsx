import { Link } from 'react-router-dom'
import { Todo } from '../hooks/useTodos'

interface HomeProps {
  todos: Todo[]
  toggleComplete: (id: number) => void
  deleteTodo: (id: number) => void
}

const Home: React.FC<HomeProps> = ({ todos, toggleComplete, deleteTodo }) => {
  return (
    <div className="app">
      <h1>TodoList</h1>

      <Link to="/add" className="add-button">Add Todo</Link>

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
              <Link to={`/edit/${todo.id}`}>Edit</Link>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home