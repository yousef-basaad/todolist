import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import AddTodo from './pages/AddTodo'
import EditTodo from './pages/EditTodo'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'add', element: <AddTodo /> },
      { path: 'edit/:id', element: <EditTodo /> },
    ],
  },
])

export default router
