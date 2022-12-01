const express = require('express');
const https = require('https');
const bp = require('body-parser');
const app = express();
app.use(bp.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const city = req.body.city;
    const apiKey = "43b50ef609d41ccc71493b5c01e42917";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;

    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            res.write("<h1>Open Weather Map API</h1>");
            res.write("<p>The weather is currently " + desc + ".</p>");
            res.write("<p>The temperature in " + city + " is " + temp + "d Celcius.</p>");
            res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
            res.send();
        })
    });
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
});