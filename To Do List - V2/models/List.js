const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require(__dirname + "/Task");

const listSchema = new Schema({
    name: String,
    tasks: [Task.schema],
});

module.exports = mongoose.model("List", listSchema);