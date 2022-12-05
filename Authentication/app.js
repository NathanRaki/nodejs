require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

const db = require(__dirname + '/database');
const User = require(__dirname + '/services/userService');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

db.connect();

app.route("/")
    .get(async (req, res) => {
        const users = await User.getAllUsers();
        console.log(users);
        res.render('home');
    });

app.route("/register")
    .get(async (req, res) => {
        res.render('register');
    })
    .post(async (req, res) => {
        const { username, password } = req.body;

        let user = await User.findUserByEmail(username);
        if (user) return res.status(400).send("User already registered.");

        /*user = {
            email: username,
            password: await bcrypt.hash(password, 10)
        }*/
        user = {
            email: username,
            password: password
        }
        await User.createUser(user);
        res.redirect('secrets');
    });

app.route("/login")
    .get(async (req, res) => {
        res.render('login');
    })
    .post(async (req, res) => {
        const { username, password } = req.body;

        let user = await User.findUserByEmail(username);
        if (!user) return res.status(400).send("No user found with this email address.");

        /*if (bcrypt.compareSync(password, user.password))
            res.redirect('secrets');
        else
            res.status(400).send("Invalid credentials.");*/

        if (user.password === password)
            res.redirect('secrets');
        else
            res.status(400).send("Invalid credentials.");
    });

app.route("/secrets")
    .get(async (req, res) => {
        res.render('secrets');
    });

app.listen(4000, () => {
    console.log("Server is running on port 4000.");
})

process.on('SIGINT', () => db.close());