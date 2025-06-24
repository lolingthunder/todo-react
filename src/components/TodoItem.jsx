import React, {useState} from 'react';
import {useTodo} from "../context/TodoContext.jsx";

function TodoItem({todo, index}) {
    const {handleEdit, handleDelete} = useTodo();
    const [toggleInput, setToggleInput] = useState(false)
    const [editedInput, setEditedInput] = useState('')

    const handleEditItem = (toggled, text) => {
        setToggleInput(toggled)
        setEditedInput(text)
    }

    return (
        <>
            <li className="list-row">
                <div className="pb-2 ">
                    <div className="text-xs uppercase font-semibold opacity-60">
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleEdit(index, todo.text, !todo.done)}
                            className="checkbox checkbox-sm mr-2 mb-1"
                        />
                        <span { ...todo.done && { className: 'line-through'} }>{todo.time}</span>
                        <button className="btn-circle btn-primary btn btn-xs ml-2 mb-1 text-white p-1"
                                onClick={() => handleEditItem(!toggleInput, todo.text)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                            </svg>
                        </button>
                        <button className="btn-circle btn-error btn btn-xs ml-2 mb-1 text-white p-1"
                                onClick={() => handleDelete(index)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                            </svg>
                        </button>
                    </div>
                    <>
                        {toggleInput ?
                            <div className="flex ist-col-wrap text-xs mt-2">
                                <input type="text" placeholder="Small" className="input input-sm"
                                       value={editedInput}
                                       onChange={(e) => setEditedInput(e.target.value)}/>
                                <button className="btn btn-soft btn-info btn-sm"
                                        onClick={() => {
                                            handleEdit(index, editedInput, todo.done);
                                            setToggleInput(!toggleInput);
                                        }}>Confirm
                                </button>
                            </div>
                            : <p className={`list-col-wrap text-xs ${todo.done ? 'line-through' : ''}`}>
                                {todo.text}
                              </p> }
                    </>
                </div>
            </li>
        </>

    );
}

export default TodoItem;