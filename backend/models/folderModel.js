const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
