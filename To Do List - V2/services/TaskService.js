const Task = require(__dirname + "/../models/Task");

exports.getAllTasks = async () => {
    try {
        const res = await Task.find();
        //console.log("\nRequest: Get All Tasks\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.createTask = async (task) => {
    try {
        const res = await Task.create(task);
        console.log("\nRequest: Create Task\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.createTasks = async (tasks) => {
    try {
        const res = await Task.insertMany(tasks);
        console.log("\nRequest: Create Task\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.getTaskById = async (id) => {
    try {
        const res = await Task.findById(id);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.getTasksByType = async (type) => {
    try {
        const res = await Task.find({type: type});
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.updateTask = async (id, task) => {
    try {
        const res = await Task.findByIdAndUpdate(id, task);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.deleteTask = async (id) => {
    try {
        const res = await Task.findByIdAndDelete(id);
        console.log("\nDelete Task:\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.clearTasks = async () => {
    try {
        const res = await Task.deleteMany({});
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
    }
}