import { useEffect, useState } from 'react'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export interface TodoFormValues {
  todo?: string
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formInitialValues, setFormInitialValues] = useState<TodoFormValues>({})

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=2")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: trimmedText,
          completed: false,
        }),
      });

      const data = await res.json();

      const newTodo: Todo = {
        id: Date.now(),
        text: data.title,
        completed: data.completed,
      };

      setTodos(prev => [...prev, newTodo]);

    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(prev => prev.filter(todo => todo.id !== id));

    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTodo = async (id: number, updatedText: string) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: updatedText
        })
      });

      const data = await res.json();

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id
            ? { ...todo, text: data.title }
            : todo
        )
      );

    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setFormInitialValues({ todo: text })
  }

  const cancelEditing = () => {
    setEditingId(null)
    setFormInitialValues({})
  }

  return {
    todos,
    editingId,
    formInitialValues,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleComplete,
    startEditing,
    cancelEditing
  }
}