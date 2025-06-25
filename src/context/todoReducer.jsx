export function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text, done: action.payload.done }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    case 'SELECT_DONE_TODO':
      return state.map(todo => {
        return { ...todo, done: todo.id === action.payload.id ? action.payload.done : state.done }
      });
    default:
      return state;
  }
}