
require('dotenv').config()
const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const passportSetup = require("./passport")
const authRoute = require("./routes/auth")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const app = express();

// https://google-auth-backend-sg7z.onrender.com
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))

app.use(cookieParser("mine"));

app.use(
    cookieSession({
        secret: "mine",
        name: "session",
        keys: ["sushi"],
        maxAge: 24 * 60 * 60 * 100,
        httpOnly: true
    })
)

console.log('client url', process.env.CLIENT_URL);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
})