import { Form } from 'react-final-form'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import FormField from '../component/FormField'
import { getTodos } from '../api/todos'
import type { AppOutletContext } from '../App'
import { TodoFormValues } from '../hooks/useTodos'

const EditTodo = () => {
  const navigate = useNavigate()
  const { todos, updateTodo } = useOutletContext<AppOutletContext>()
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const loading = todosQuery.isLoading
  const error = todosQuery.error instanceof Error ? todosQuery.error.message : null

  const { id } = useParams<{ id: string }>()
  const todoId = id ? parseInt(id, 10) : null
  const todo = todos.find((t) => t.id === todoId)

  const validateTodo = (values: TodoFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.todo?.trim()) {
      errors.todo = 'Enter a todo item.'
    }
    return errors
  }

  if (loading) {
    return (
      <div className="app">
        <p className="status-message">Loading todo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <p className="status-message error-message">{error}</p>
      </div>
    )
  }

  if (!todo) {
    return (
      <div className="app">
        <p className="status-message error-message">Todo not found.</p>
        <button type="button" onClick={() => navigate('/')}>Back</button>
      </div>
    )
  }

  return (
    <div className="app">
      <h1>Edit Todo</h1>

      <Form<TodoFormValues>
        initialValues={{ todo: todo.text }}
        onSubmit={(values) => {
          if (values.todo) {
            updateTodo(todo.id, values.todo)
            navigate('/')
          }
        }}
        validate={validateTodo}
        render={({ handleSubmit, submitting, pristine }) => (
          <form className="add-todo" onSubmit={handleSubmit}>
            <FormField name="todo" placeholder="Edit todo..." autoComplete="off" />
            <button type="submit" disabled={submitting || pristine}>Update</button>
            <button type="button" onClick={() => navigate('/')}>Cancel</button>
          </form>
        )}
      />
    </div>
  )
}

export default EditTodo
