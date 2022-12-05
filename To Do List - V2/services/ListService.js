const List = require(__dirname + "/../models/List");

exports.getAllLists = async () => {
    try {
        const res = await List.find();
        //console.log("\nRequest: Get All Lists\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.getListById = async (id) => {
    try {
        return await List.findById(id);
    } catch (err) {
        console.log(err);
    }
}

exports.getListByName = async (name) => {
    try {
        return await List.findOne({name: name});
    } catch (err) {
        console.log(err);
    }
}

exports.createList = async(list) => {
    try {
        return await List.create(list);
    } catch (err) {
        console.log(err);
    }
}

exports.addTask = async (id, task) => {
    try {
        const res = await List.updateOne({_id:id}, {$push: {tasks: task}});
        console.log("\nRequest: Add Task\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.addTasks = async (id, tasks) => {
    try {
        const res = await List.updateOne({_id:id}, {$push: {tasks: { $each: tasks }}});
        console.log("\nRequest: Add Tasks\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}

exports.getListByTaskId = async (id) => {
    try {
        return await List.findOne({"tasks": {$elemMatch: {_id: id}}});
    } catch (err) {
        console.log(err);
    }
}

exports.deleteTaskById = async (id) => {
    try {
        const res = await List.findOneAndUpdate({"tasks": {$elemMatch: {_id: id}}}, {$pull: {tasks: { _id: id }}});
        console.log("\nRemoved task\n" + res);
        return res;
    } catch (err) {
        console.log(err);
    }
}