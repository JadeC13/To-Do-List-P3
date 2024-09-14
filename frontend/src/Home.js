import React, { useState } from 'react';


function Home() {
    // State to manage the input value, the list of tasks, and the index of the task being edited
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // To track which task is being edited

    // Handler for adding a new task or editing an existing task
    const handleAddOrEditTask = () => {
        if (taskInput.trim()) {
            if (editIndex !== null) {
                // Editing an existing task
                const updatedTasks = tasks.map((task, index) => 
                    index === editIndex ? taskInput : task
                );
                setTasks(updatedTasks);
                setEditIndex(null); // Reset edit index
            } else {
                // Adding a new task
                setTasks([...tasks, taskInput]);
            }
            setTaskInput(''); // Clear input field
        } else {
            alert('Please enter a task!');
        }
    };

    // Handler for deleting a task
    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Handler for editing a task
    const handleEditTask = (index) => {
        setTaskInput(tasks[index]); // Set the input to the task's current value
        setEditIndex(index); // Set the edit index to the current task's index
    };

    return (
        <div className="container">
            <h1>MY TO-DO LIST</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add or edit a task"
            />
            <button onClick={handleAddOrEditTask}>
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} style={{ textAlign: 'center' }}>
                        <div>{task}</div>
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => handleEditTask(index)}>Edit</button>
                            <button onClick={() => handleDeleteTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
