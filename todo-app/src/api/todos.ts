import api from './axios'
import type { Todo } from '../redux/todoSlice'

interface ApiTodo {
  id: number
  text: string
  completed: boolean
}

const TODOS_URL = '/todos'

const toTodo = (item: ApiTodo): Todo => ({
  id: item.id,
  text: item.text,
  completed: item.completed,
})

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await api.get<ApiTodo[]>(TODOS_URL)
    return response.data.map(toTodo)
  } catch (error) {
    throw new Error('Failed to fetch todos')
  }
}

export const addTodo = async (text: string): Promise<Todo> => {
  const trimmedText = text.trim()

  if (!trimmedText) {
    throw new Error('Todo text cannot be empty')
  }

  try {
    const response = await api.post<ApiTodo>(TODOS_URL, {
      text: trimmedText,
      completed: false,
    })

    return {
      id: response.data.id,
      text: response.data.text,
      completed: response.data.completed,
    }
  } catch (error) {
    throw new Error('Failed to add todo')
  }
}

export const deleteTodo = async (id: number): Promise<number> => {
  try {
    await api.delete(`${TODOS_URL}/${id}`)
    return id
  } catch (error) {
    throw new Error('Failed to delete todo')
  }
}

export const updateTodo = async ({ id, text }: Pick<Todo, 'id' | 'text'>): Promise<Pick<Todo, 'id' | 'text'>> => {
  const trimmedText = text.trim()

  if (!trimmedText) {
    throw new Error('Todo text cannot be empty')
  }

  try {
    const response = await api.patch<ApiTodo>(`${TODOS_URL}/${id}`, {
      text: trimmedText,
    })

    return {
      id,
      text: response.data.text,
    }
  } catch (error) {
    throw new Error('Failed to update todo')
  }
}

export const toggleTodo = async ({ id, completed, text }: Pick<Todo, 'id' | 'completed' | 'text'>): Promise<Todo> => {
  try {
    const response = await api.patch<ApiTodo>(`${TODOS_URL}/${id}`, {
      completed: !completed,
    })

    return {
      id,
      text,
      completed: response.data.completed,
    }
  } catch (error) {
    throw new Error('Failed to toggle todo')
  }
}
