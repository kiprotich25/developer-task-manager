const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }//create ownership of task by linking task to user by is
});

module.exports = mongoose.model("Task", taskSchema);