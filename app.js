// app.js
const path = require('node:path'); // for ejs

const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");
const session = require('express-session');
const passport = require("./auth"); // Adjust the path as necessary

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));


app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", usersRouter);

// makes css compatible
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.json())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
