import {useEffect, useReducer, useState} from 'react';
import TodoList from "./components/TodoList.jsx";
import {TodoContext} from "./context/TodoContext.jsx";
import {todoReducer} from "./context/todoReducer.jsx";

function App() {

    const [task, setTask] = useState('');

    const [toggleList, setToggleList] = useState(
        JSON.parse(localStorage.getItem('toggleList')) ?? false);

    const [todos, dispatch] = useReducer(todoReducer, [], () => {
        const local = localStorage.getItem('todos');
        return local ? JSON.parse(local) : [];
    });

    const onInputChange = (task) => setTask(task)
    const toggleVisibility = () => setToggleList(prev => !prev);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('toggleList', JSON.stringify(toggleList));
    }, [toggleList]);

    return (
        <>
            <div className="bg-base-100 shadow-xl rounded-xl p-6">
                <h1 className="text-xl font-bold mb-4">📝 To-do List</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="What's on your mind ..."
                        className="input input-bordered w-full"
                        value={task}
                        onChange={(e) => onInputChange(e.target.value)}
                    />
                    <button onClick={() => {
                        dispatch({
                            type: 'ADD_TODO',
                            payload: {
                                id: crypto.randomUUID(),
                                text: task,
                                done: false,
                                time: new Date().toLocaleString()
                            }
                        });
                        setTask('');
                    }}>Add
                    </button>
                </div>
                <div className="mt-4">
                    <label className="label">
                        <input type="checkbox" checked={toggleList}
                               className="toggle toggle-primary" onChange={() => toggleVisibility(!toggleList)}/>
                        {toggleList ? 'Hide' : 'Show'}
                    </label>
                </div>
                {toggleList &&
                    <TodoContext.Provider value={{todos, dispatch}}>
                        <TodoList/>
                    </TodoContext.Provider>
                }
            </div>
        </>
    );
}

export default App;