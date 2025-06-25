import React, {useState} from 'react';
import useTodos from "../context/useTodos.jsx";

function TodoInput() {
    const [task, setTask] = useState('');
    const { addTodo } = useTodos()
    const onInputChange = (task) => setTask(task)
    return (
        <>
            <input
                type="text"
                placeholder="What's on your mind ..."
                className="input input-bordered w-full"
                value={task}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTodo(task)
                        setTask('');
                    }
                }}
                onChange={(e) => onInputChange(e.target.value)}
            />
            <button className="btn btn-primary"
                    disabled={!task.trim()}
                    onClick={() => {
                addTodo(task)
                setTask('');
            }}> add
            </button>
        </>
    );
}

export default TodoInput;