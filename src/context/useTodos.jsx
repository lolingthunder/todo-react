import { useTodo } from "./TodoContext";

function useTodos() {
  const { todos, dispatch } = useTodo();

  const addTodo = (text) => {
    dispatch({
      type: 'ADD_TODO',
      payload: {
        id: crypto.randomUUID(),
        text,
        done: false,
        time: new Date().toLocaleString()
      }
    });
  };

  const deleteTodo = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: { id }
    });
  };

  const editTodo = (id, text, done) => {
    dispatch({
      type: 'EDIT_TODO',
      payload: { id, text, done }
    });
  };

  const toggleDone = (id, done) => {
    dispatch({
      type: 'SELECT_DONE_TODO',
      payload: { id, done }
    });
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