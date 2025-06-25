import {useEffect, useReducer, useState} from 'react';
import TodoList from "./components/TodoList.jsx";
import {TodoContext} from "./context/TodoContext.jsx";
import {todoReducer} from "./context/todoReducer.jsx";
import TodoInput from "./components/TodoInput.jsx";

function App() {

    const [toggleList, setToggleList] = useState(
        JSON.parse(localStorage.getItem('toggleList')) ?? false);

    const [todos, dispatch] = useReducer(todoReducer, []);
    const toggleVisibility = () => setToggleList(prev => !prev);

    useEffect(() => {
        fetch('http://localhost:3000/todos', {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                dispatch({type: 'SET_TODOS', payload: data});
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('toggleList', JSON.stringify(toggleList));
    }, [toggleList]);

    return (
        <>
            <TodoContext.Provider value={{todos, dispatch}}>
                <div className="bg-base-100 shadow-xl rounded-xl p-6">
                    <h1 className="text-xl font-bold mb-4">📝 To-do List</h1>
                    <div className="flex gap-2">
                        <TodoInput/>
                    </div>
                    <div className="mt-4">
                        <label className="label">
                            <input type="checkbox" checked={toggleList}
                                   className="toggle toggle-primary" onChange={() => toggleVisibility(!toggleList)}/>
                            {toggleList ? 'Hide' : 'Show'}
                        </label>
                    </div>
                    { toggleList && <TodoList/> }
                </div>
            </TodoContext.Provider>
        </>
    );
}

export default App;