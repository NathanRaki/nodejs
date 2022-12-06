require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const db = require(__dirname + '/database');
const userService = require(__dirname + '/services/userService');
const User = require(__dirname + '/models/User');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets"
    },
    async (accessToken, refreshToken, profile, cb) => {
        let user = await userService.getUserByFilter({ $or: [{googleId: profile.id}, {username: profile._json.email}] });
        if (!user)
            user = await userService.createUser({googleId: profile.id, username: profile._json.email});
        else
            await userService.updateUser(user._id, {googleId: profile.id});
        return cb("", user);
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    const user = await userService.getUserById(id);
    cb(null, user);
});

db.connect();

app.route("/")
    .get(async (req, res) => {
        res.render('home');
    });

app.route("/auth/google")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

app.route("/auth/google/secrets")
    .get(passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

app.route("/register")
    .get(async (req, res) => {
        if (req.isAuthenticated())
            res.redirect('/secrets');
        else {
            res.render('register', { ctx: req.session.context });
        }
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        User.register({username: username}, password, function(err, user){
            if (err) {
                req.session.context = err;
                res.redirect("/register");
            } else {
                console.log(user);
                passport.authenticate("local")(req,res,function(){
                    res.redirect("/secrets");
                });
            }
        });
    });

app.route("/login")
    .get(async (req, res) => {
        if (req.isAuthenticated())
            res.redirect('/secrets');
        else
            res.render('login');
    })
    .post(passport.authenticate('local', {failureRedirect: '/login'}),
        async (req, res) => {
            res.redirect('/secrets');
    });

app.route("/secrets")
    .get(async (req, res) => {
        const data = await userService.getUsersByFilter({secret: {$ne: null}}, {_id: 0, secret: 1});
        res.render('secrets', {data: data, logged: req.isAuthenticated()});
    });

app.route("/submit")
    .get(ensureAuthenticated,
        async (req, res) => {
            res.render('submit');
    })
    .post(async (req, res) => {
        const secret = req.body.secret;
        await userService.updateUser(req.user._id, {secret: secret});
        res.redirect('secrets');
    })

app.route("/logout")
    .get(async (req, res) => {
        req.logout(err => {
            res.redirect('/');
        });
    });

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.listen(3000, () => {
    console.log("Server is running on port 3000.");
})

process.on('SIGINT', () => db.close());