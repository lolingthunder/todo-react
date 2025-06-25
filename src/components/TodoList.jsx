import React from 'react';
import TodoItem from "./TodoItem.jsx";
import {useTodo} from "../context/TodoContext.jsx";

function TodoList() {
    const { todos } = useTodo();
    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md mt-4">
                {todos.map((todo, i) => (
                    <TodoItem key={i} todo={todo}/>
                ))}
            </ul>
        </>
    );
}

export default TodoList;