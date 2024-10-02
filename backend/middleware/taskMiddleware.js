const Task = require('../models/taskModel');
const Folder = require('../models/folderModel');

// Create a new task (standalone or inside a folder)
const createTask = async (req, res) => {
    const { name, folderId } = req.body;
    try {
        // Check if the task is standalone or in a folder
        const task = await Task.create({
            name,
            folder: folderId || null,
            user: req.user.id,
        });

    // If the task belongs to a folder, add it to the folder's task list
    if (folderId) {
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: 'Folder not found' });
        }

        folder.tasks.push(task._id);
        await folder.save();
    }

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all standalone tasks (not in any folder) for the authenticated user
const getStandaloneTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id, folder: null });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update task status (mark as completed or pending)
const updateTaskStatus = async (req, res) => {
    const { completed } = req.body;

    try {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    task.completed = completed;
    await task.save();
    res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a task by its ID
const deleteTask = async (req, res) => {
    try {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
        return res.status(401).json({ message: 'User not authorized' });
    }

    // If the task is part of a folder, remove it from the folder's task list
    if (task.folder) {
        const folder = await Folder.findById(task.folder);
        folder.tasks = folder.tasks.filter((taskId) => taskId.toString() !== task._id.toString());
        await folder.save();
    }

        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    createTask,
    getStandaloneTasks,
    updateTaskStatus,
    deleteTask,
};