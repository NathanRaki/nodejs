const express = require('express');
const bp = require('body-parser');

const app = express();
app.use(bp.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    let calculation = Number(req.body.num1) + Number(req.body.num2);
    res.send("Result: " + calculation);
});

app.get("/bmicalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
    let weight = Number(req.body.weight);
    let height = Number(req.body.height);
    res.send("BMI is " + weight/Math.pow(height, 2));
});

app.listen(3000, function() {
    console.log("Server started on port 3000.");
});