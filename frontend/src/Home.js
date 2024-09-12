import React, { useState } from 'react';


function Home() {
    // State to manage the input value and the list of tasks
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState([]);

    // Handler for adding a new task
    const handleAddTask = () => {
        if (taskInput.trim()) {
            setTasks([...tasks, taskInput]);
            setTaskInput(''); // Clear input field
        } else {
            alert('Please enter a task!');
        }
    };

    // Handler for deleting a task
    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h1>MY TO-DO LIST</h1>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button onClick={() => handleDeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
