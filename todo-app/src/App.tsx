import { Routes, Route } from 'react-router-dom'
import { useTodos } from './hooks/useTodos'
import Home from './pages/Home'
import AddTodo from './pages/AddTodo'
import EditTodo from './pages/EditTodo'
import './App.css'

function App() {
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleComplete
  } = useTodos()

  return (
    <Routes>
      <Route path="/" element={
        <Home
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      } />
      <Route path="/add" element={<AddTodo addTodo={addTodo} />} />
      <Route path="/edit/:id" element={
        <EditTodo
          todos={todos}
          updateTodo={updateTodo}
        />
      } />
    </Routes>
  )
}

export default App