const express = require('express');
const https = require('https');
const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
    apiKey: "bfe10bf8045ffed98e76106450439ef3-us21",
    server: "us21",
});

const app = express();
app.use(express.urlencoded( { extended: true } ));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    const run = async () => {
        const response = await client.lists.batchListMembers("9a5f9b5379", {
            members: [
                    {
                        email_address: email,
                        status: "subscribed",
                        merge_fields: {
                            FNAME: firstName,
                            LNAME: lastName
                        }
                    }
                ],
        });
        console.log(response);
        res.sendFile(__dirname + (response.total_created === 1 ? "/success.html" : "/error.html"));
    };
    run();
});

app.post("/success", function (req, res) {
    res.redirect("/");
});

app.post("/error", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});