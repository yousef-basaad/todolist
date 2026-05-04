import { Form } from 'react-final-form'
import { useNavigate, useParams } from 'react-router-dom'
// import { useEffect } from 'react'
import FormField from '../component/FormField'
import { TodoFormValues } from '../hooks/useTodos'

interface EditTodoProps {
  todos: { id: number; text: string; completed: boolean }[]
  updateTodo: (id: number, text: string) => void
}

const EditTodo: React.FC<EditTodoProps> = ({ todos, updateTodo }) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const todoId = id ? parseInt(id) : null
  const todo = todos.find(t => t.id === todoId)

  const validateTodo = (values: TodoFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.todo?.trim()) {
      errors.todo = 'Enter a todo item.'
    }
    return errors
  }

  if (!todo) {
    return <div>Todo not found</div>
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
            <button
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </form>
        )}
      />
    </div>
  )
}

export default EditTodo