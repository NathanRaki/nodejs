const express = require("express");
const app = express();
const _ = require("lodash");

const db = require(__dirname + "/database");
const Task = require(__dirname + "/models/Task");
const List = require(__dirname + "/models/List");
const taskService = require(__dirname + "/services/TaskService");
const listService = require(__dirname + "/services/ListService");
const {getListByTaskId} = require("./services/ListService");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

db.connect();

const task1 = new Task({
    description: "Welcome to your to do list!",
});
const task2 = new Task({
    description: "Click the + button to add a new task",
});
const task3 = new Task({
    description: "<-- Click here to delete a task",
});

async function init() {
    const tasks = await taskService.getAllTasks();
    if (tasks.length === 0) {
        await taskService.createTasks([task1, task2, task3]);
    }
}
init().catch(console.dir);

app.get("/", async (req, res) => {
    const tasks = await taskService.getAllTasks();
    for (let i = 0; i < tasks.length; i++) {
        const list = await listService.getListByTaskId(tasks[i]._id);
        if (list) {
            tasks[i].description += " <a href='/" + list.name + "'>" + "[<strong>" + _.startCase(list.name) + "</strong>]</a>";
        }
    }
    res.render('list', { day: "Today", listName: "To Do List", tasks: tasks, listUrl: "" });
});

app.post("/", async (req, res) => {
    const newTask = req.body.newTask;
    if (req.body.list) {
        const list = await listService.getListByName(req.body.list);
        const task = await taskService.createTask({description: newTask});
        await listService.addTask(list._id, task);
    } else {
        await taskService.createTask({description: newTask});
    }
    res.redirect("/" + req.body.list);
});

app.post("/delete", async (req, res) => {
    const id = req.body.completedCheck;
    await listService.deleteTaskById(id);
    await taskService.deleteTask(id);
    res.redirect("/" + req.body.listUrl);
});

app.get("/:customListName", async (req, res) => {
    const listName = _.kebabCase(req.params.customListName);
    const list = await listService.getListByName(listName);
    if (list) {
        res.render('list', { day: "Today", listName: _.startCase(listName), listUrl: listName, tasks: list.tasks });
    }
    else {
        const newList = await listService.createList({name: listName});
        await listService.addTasks(newList._id, [task1, task2, task3]);
        res.redirect("/" + listName);
    }
})

app.listen("4000", () => {
    console.log("Server started on port 4000.");
})

process.on("SIGINT", () => db.close());