import { useTodo } from "./TodoContext";

function useTodos() {
  const { todos, dispatch } = useTodo();

  const addTodo = async (text) => {
    const payload = {
      id: crypto.randomUUID(),
      text,
      done: false,
      time: new Date().toLocaleString()
    };

    await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    dispatch({type: 'ADD_TODO', payload: payload});
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    dispatch({
      type: 'DELETE_TODO',
      payload: {id}
    });
  };

  const editTodo = async (id, text, done) => {
    const payload = {
      text,
      done,
    };

    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    dispatch({type: 'EDIT_TODO',  payload: { id, ...payload }});
  };

  const toggleDone = async (id, done) => {
    const payload = {
      done,
    };

    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    dispatch({type: 'EDIT_TODO', payload: {id, ...payload}});
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleDone
  };
}

export default useTodos;