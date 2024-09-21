import React, { useRef, useState } from 'react';


function Home() {
    // State to manage the input value, the list of tasks, and the index of the task being edited
    const [standaloneTasksInput, setStandaloneTasksInput] = useState('');
    const [taskInput, setTaskInput] = useState('');
    const [folderTaskInput, setFolderTaskInput] = useState('');
    const [folderInput, setFolderInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [folders, setFolders] = useState([]);
    const [standaloneTasks, setStandaloneTasks] = useState([]);

    const taskListRef = useRef(null);

    // Handler for adding a new task or editing an existing task
    const handleAddOrEditTaskinFolder = (folderIndex) => {
        if (folderTaskInput.trim()) {
            const updatedFolders = [...folders];
            if (editIndex !== null) {
                // Editing an existing task
                updatedFolders[folderIndex].tasks[editIndex] = folderTaskInput;
                setEditIndex(null); // Reset edit index
            } else {
                // Adding a new task
                updatedFolders[folderIndex].tasks.push(folderTaskInput);
            }
            setFolders(updatedFolders);
            setFolderTaskInput(''); // Clear input field
        } else {
            alert('Please enter a task!');
        }
    };
    //Handler for adding a new standalone task or editing an existing one
    const handleAddOrEditStandaloneTask = () => {
        if (standaloneTasksInput.trim()) {
            if (editIndex !== null) {
                //Editing an existing standalone task
                standaloneTasks[editIndex] = standaloneTasksInput;
                setEditIndex(null); //Reset edit index
            } else {
                //Adding a new standalone task
                setStandaloneTasks([...standaloneTasks, standaloneTasksInput]);
            }
            setStandaloneTasksInput(''); //Clear input field
        } else {
            alert('Please enter a task!')
        }
    };

    const handleCreateFolder = () => {
        if (folderInput.trim()) {
            setFolders([...folders, { name: folderInput, tasks: [] }]); //Each folder has it's own tasks
            setFolderInput(''); // Clear folder inpu
        } else {
            alert('Please enter a folder name!')
        }
    };

    // Handler for deleting a task
    const handleDeleteTask = (folderIndex, taskIndex) => {
        const updatedFolders = [...folders];
        updatedFolders(folderIndex).tasks.splice(taskIndex, 1);//Removes the specific task
        setFolders(updatedFolders);
    };

    //Handler for deleting a standaloone task
    const handleDeleteStandaloneTask = (index) => {
        setStandaloneTasks(standaloneTasks.filter((_, i) => i !== index));
    };

    // Handler for editing a task
    const handleEditTask = (folderIndex, taskIndex) => {
        setFolderTaskInput(folders[folderIndex]); // Set the input to the task's current value
        setEditIndex(taskIndex); // Set the edit index to the current task's index
    };

    const handleEditStandaloneTask = (index) => {
        setStandaloneTasksInput(standaloneTasks[index]);
        setEditIndex(index);
    };

    return (
        <div className="container" style={{ overflowY: 'auto'}}>
            <h1>MY TO-DO LIST</h1>

            <h2>Tasks</h2>
            <input
                type="text"
                value={standaloneTasksInput}
                onChange={(e) => setStandaloneTasksInput(e.target.value)}
                placeholder="Add or edit a task"
            />
            <button onClick={handleAddOrEditStandaloneTask}>
                {editIndex !== null ? 'Update Task' : 'Add Task'}
            </button>
            <ul ref={taskListRef}>
                {standaloneTasks.map((task, index) => (
                    <li key={index} style={{ textAlign: 'center' }}>
                        <div>{task}</div>
                        {/* // Buttons for edit and Delete for the Standalone Tasks */}
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => handleEditStandaloneTask(index)}>Edit</button>
                            <button onClick={() => handleDeleteStandaloneTask(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            {/* <button onClick={handleCreateFolder}>Create Folder</button> */}
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
                        value={folderTaskInput}
                        onChange={(e) => setFolderTaskInput(e.target.value)}
                        placeholder="Add or edit a task"
                    />

                    <button onClick={() => handleAddOrEditTaskinFolder(folderIndex)}>
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
