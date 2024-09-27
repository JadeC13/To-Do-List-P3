import React, { useState } from 'react';

function Home() {
    const [taskInput, setTaskInput] = useState(''); // Standalone task input
    const [folderInput, setFolderInput] = useState(''); // Folder name input
    const [folderTaskInputs, setFolderTaskInputs] = useState({}); // To track task inputs for each folder
    const [editIndex, setEditIndex] = useState(null); // To track which task is being edited
    const [folders, setFolders] = useState([]); // List of folders
    const [standaloneTasks, setStandaloneTasks] = useState([]); // List of standalone tasks

    // Handler for adding a new task or editing an existing task within a folder
    const handleAddOrEditTaskInFolder = (folderIndex) => {
        const folderTaskInput = folderTaskInputs[folderIndex] || ''; // Get current input for this folder
        if (folderTaskInput.trim()) {
            const updatedFolders = [...folders];
            if (editIndex !== null) {
                // Editing an existing task
                const updatedTasks = updatedFolders[folderIndex].tasks.map((task, index) =>
                    index === editIndex ? folderTaskInput : task
                );
                updatedFolders[folderIndex].tasks = updatedTasks;
                setEditIndex(null); // Reset edit index
            } else {
                // Adding a new task
                updatedFolders[folderIndex].tasks.push(folderTaskInput);
            }
            setFolders(updatedFolders);
            setFolderTaskInputs({ ...folderTaskInputs, [folderIndex]: '' }); // Clear input for this folder
        } else {
            alert('Please enter a task!');
        }
    };

    // Handler for adding or editing standalone tasks
    const handleAddOrEditStandaloneTask = () => {
        if (taskInput.trim()) {
            if (editIndex !== null) {
                // Editing an existing standalone task
                const updatedTasks = standaloneTasks.map((task, index) =>
                    index === editIndex ? taskInput : task
                );
                setStandaloneTasks(updatedTasks);
                setEditIndex(null); // Reset edit index
            } else {
                // Adding a new standalone task
                setStandaloneTasks([...standaloneTasks, taskInput]);
            }
            setTaskInput(''); // Clear standalone task input
        } else {
            alert('Please enter a task!');
        }
    };

    // Handler for creating a new folder
    const handleCreateFolder = () => {
        if (folderInput.trim()) {
            setFolders([...folders, { name: folderInput, tasks: [] }]);
            setFolderInput('');
        } else {
            alert('Please enter a folder name!');
        }
    };

    // Handler for deleting a task within a folder
    const handleDeleteTask = (folderIndex, taskIndex) => {
        const updatedFolders = [...folders];
        updatedFolders[folderIndex].tasks.splice(taskIndex, 1); // Remove the specific task
        setFolders(updatedFolders);
    };

    // Handler for deleting a standalone task
    const handleDeleteStandaloneTask = (index) => {
        setStandaloneTasks(standaloneTasks.filter((_, i) => i !== index));
    };

    // Handler for editing a task within a folder
    const handleEditTask = (folderIndex, taskIndex) => {
        const task = folders[folderIndex].tasks[taskIndex];
        setFolderTaskInputs({ ...folderTaskInputs, [folderIndex]: task }); // Set input to the current task value
        setEditIndex(taskIndex); // Set the edit index to the current task index
    };

    return (
        <div className="container">
            <h1>MY TO-DO LIST</h1>

            <h2>Standalone Tasks</h2>
            <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Add or edit a standalone task"
            />
            <button onClick={handleAddOrEditStandaloneTask}>
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
            <ul>
                {standaloneTasks.map((task, index) => (
                    <li key={index} style={{ textAlign: 'center' }}>
                        <div>{task}</div>
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => { setTaskInput(task); setEditIndex(index); }}>Edit</button>
                            <button onClick={() => handleDeleteStandaloneTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div>
                <h2>Create Folder</h2>
                <input
                    type="text"
                    value={folderInput}
                    onChange={(e) => setFolderInput(e.target.value)}
                    placeholder="Enter folder name"
                />
                <button onClick={handleCreateFolder}>Create Folder</button>
            </div>

            {folders.map((folder, folderIndex) => (
                <div key={folderIndex}>
                    <h2>{folder.name}</h2>
                    <input
                        type="text"
                        value={folderTaskInputs[folderIndex] || ''} // Each folder has its own task input
                        onChange={(e) => setFolderTaskInputs({ ...folderTaskInputs, [folderIndex]: e.target.value })}
                        placeholder="Add or edit a task"
                    />
                    <button onClick={() => handleAddOrEditTaskInFolder(folderIndex)}>
                        {editIndex !== null ? 'Update Task' : 'Add Task'}
                    </button>
                    <ul>
                        {folder.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} style={{ textAlign: 'center' }}>
                                <div>{task}</div>
                                <div style={{ marginTop: '10px' }}>
                                    <button onClick={() => handleEditTask(folderIndex, taskIndex)}>Edit</button>
                                    <button onClick={() => handleDeleteTask(folderIndex, taskIndex)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Home;