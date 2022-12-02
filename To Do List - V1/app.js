const express = require('express');
const date = require(__dirname + "/date.js");
const app = express();

const todos = [];

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render('list', { day: date.getDate(), todos: todos });
});

app.post("/", (req, res) => {
    todos.push(req.body.newToDo);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});