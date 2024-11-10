import { useState, useEffect } from "react";

import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:8000/api/';
  
  useEffect(() => {
    axios
    .get(url).then(response => {
      setTodos(response.data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);
  
  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p className="text-danger text-center mt-5">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Todo List</h1>
      <ul className="list-group">
        {todos.map((todo) => (
          <li className="list-group-item" key={todo.id}>
            <h5 className="mb-1">{todo.title}</h5>
            <p className="mb-0 text-muted">{todo.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
