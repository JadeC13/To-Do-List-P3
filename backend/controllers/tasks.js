const express = require('express');
const router = express.Router();
const db = require('../models');

// Create a new task
router.post('/', async (req, res) => {
    const { title, description, folder } = req.body;

    try {
        const newTask = new Task({ title, description, folder });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(400).json({ message: 'Failed to create task', error: error.message });
    }
});

// Route to get tasks and folders for a user
router.get('/', taskController.getTasksAndFolders);

// Route to add a standalone task
router.post('/standalone', taskController.addStandaloneTask);

// Route to update standalone tasks
router.put('/standalone', taskController.updateStandaloneTasks);

// Route to create a new folder
router.post('/folders', taskController.createFolder);

// Route to update tasks within a folder
router.put('/folders/:folderId', taskController.updateFolderTasks);

// Route to delete a task within a folder
router.delete('/folders/:folderId/tasks/:taskId', taskController.deleteFolderTask);

module.exports = router;


// // Add more routes as needed, for example, to get tasks
// router.get('/Tasks', async (req, res) => {
//     try {
//         const tasks = await Task.find();
//         res.status(200).json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
//     }
// });


// const db = require('../models');
// // const bcrypt = require('bcrypt'); // Add bcrypt for password hashing
// // const jwt = require('jsonwebtoken');

// // Tasks
// router.post('/', async (req, res) => {
//     const { title, description, folder } = req.body;

//     if (!title || !description || !folder) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const newTask = new db.Task({ title, description, folder });
        
//         await newTask.save();
//         res.status(201).send('Task');
        
//     } catch (error) {
//         console.error('Database error:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;