import { Form } from 'react-final-form'
import { useNavigate, useOutletContext } from 'react-router-dom'
import FormField from '../component/FormField'
import type { AppOutletContext } from '../App'
import { TodoFormValues } from '../hooks/useTodos'

const AddTodo = () => {
  const navigate = useNavigate()
  const { addTodo } = useOutletContext<AppOutletContext>()

  const validateTodo = (values: TodoFormValues) => {
    const errors: Record<string, string> = {}
    if (!values.todo?.trim()) {
      errors.todo = 'Enter a todo item.'
    }
    return errors
  }

  return (
    <div className="app">
      <h1>Add Todo</h1>

      <Form<TodoFormValues>
        onSubmit={(values, form) => {
          if (values.todo) {
            addTodo(values.todo)
            form.reset()
            navigate('/')
          }
        }}
        validate={validateTodo}
        render={({ handleSubmit, submitting, pristine }) => (
          <form className="add-todo" onSubmit={handleSubmit}>
            <FormField name="todo" placeholder="Add a new todo" autoComplete="off" />
            <button type="submit" disabled={submitting || pristine}>Add</button>
          </form>
        )}
      />
    </div>
  )
}

export default AddTodo