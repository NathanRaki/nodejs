const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports.schema = taskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task", taskSchema);