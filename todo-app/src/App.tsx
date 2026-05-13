import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, getTodos, toggleTodo, updateTodo } from './api/todos'
import type { Todo } from './redux/todoSlice'
import './App.css'

export interface AppOutletContext {
  todos: Todo[]
  addTodo: (text: string) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
  toggleComplete: (id: number) => void
}

function App() {
  const queryClient = useQueryClient()

  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })

  const todos = useMemo(() => todosQuery.data ?? [], [todosQuery.data])

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toggleTodoMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const handleAddTodo = (text: string) => {
    addTodoMutation.mutate(text)
  }

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id)
  }

  const handleUpdateTodo = (id: number, text: string) => {
    updateTodoMutation.mutate({ id, text })
  }

  const handleToggleComplete = (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    if (!currentTodo) {
      return
    }

    toggleTodoMutation.mutate({
      id,
      completed: !currentTodo.completed,
      text: currentTodo.text,
    })
  }

  return (
    <Outlet
      context={{
        todos,
        addTodo: handleAddTodo,
        deleteTodo: handleDeleteTodo,
        updateTodo: handleUpdateTodo,
        toggleComplete: handleToggleComplete,
      }}
    />
  )
}

export default App
