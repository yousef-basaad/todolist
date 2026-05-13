import { Link } from 'react-router-dom'

const ErrorPage = () => (
  <div className="app">
    <h1>Something went wrong</h1>
    <p>Sorry, we couldn't load the page.</p>
    <Link to="/">Return home</Link>
  </div>
)

export default ErrorPage
