import React, { useState } from 'react';
import '../src/styles/app.css';
import '../src/styles/responsive.css';

function Todo({ task, deleteTodo, toggleTodo, editTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        if (editText.trim().length === 0) return;

        editTodo(task.id, editText.trim());
        setIsEditing(false);
    };

    return (
        <div className={`todo-item ${task.status === 'completed' ? 'complete' : ''}`}>
            <div className="todo-left">
                <input
                    type="checkbox"
                    checked={task.status === 'completed'}
                    onChange={() => toggleTodo(task.id)}
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                ) : (
                    <span>{task.text}</span>
                )}
            </div>

            <div className="todo-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleEdit}>Save</button>
                        <button onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(task.id)}>
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Todo;