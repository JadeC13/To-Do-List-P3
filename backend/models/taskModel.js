const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;