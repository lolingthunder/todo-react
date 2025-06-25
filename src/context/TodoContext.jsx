import { createContext, useContext } from 'react';

export const TodoContext = createContext(undefined);

export const useTodo = () => useContext(TodoContext);