export function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'EDIT_TODO':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? {...todo, text: (action.payload.text ?? todo.text), done: action.payload.done ?? todo.done}
                    : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.payload.id);
        case 'SET_TODOS':
            return action.payload;
        default:
            return state;
    }
}