import {useEffect, useState} from 'react';
import TodoList from "./components/TodoList.jsx";
import {TodoContext} from "./context/TodoContext.jsx";

function App() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) ?? []);
    const [toggleList, setToggleList] = useState(
        JSON.parse(localStorage.getItem('toggleList')) ?? false);

    const handleAdd = () => {
        if (!task.trim()) return;
        setTodos([...todos, {text: task, done: false, time: new Date().toLocaleString()}]);
        setTask('');
    };

    const handleEdit = (index, value, isDone) => {
        const updatedTodos = [...todos];
        updatedTodos[index] = {...updatedTodos[index], text: value, done: isDone};
        setTodos(updatedTodos);
    };
    const handleDelete = (index) => {
        const filtered = todos.filter((_, i) => i !== index);
        setTodos(filtered);
    };
    const onInputChange = (task) => {
        setTask(task)
    }
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
                    <button className="btn btn-primary" onClick={handleAdd} disabled={!task.trim()}>
                        Add
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
                    <TodoContext.Provider value={{todos, handleEdit, handleDelete}}>
                        <TodoList/>
                    </TodoContext.Provider>
                }
            </div>
        </>
    );
}

export default App;