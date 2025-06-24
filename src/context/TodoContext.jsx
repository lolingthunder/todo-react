import { createContext, useContext } from 'react';

export const TodoContext = createContext({
  todos: [],
  handleEdit: () => {},
  handleDelete: () => {},
});


export const useTodo = () => useContext(TodoContext);