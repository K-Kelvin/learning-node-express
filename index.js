// import the express framework we just installed
const express = require("express"); // import express from "express";
const path = require("path");

const app = express();
const port = 3020; // http://localhost:3020

// Register ejs as .html. If we did
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.
app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views
app.set('views', path.join(__dirname, 'views'));

// Return HTML files (if server is paired with frontend (html, css, js))
// app.use('/static', express.static('public'));
// Path to our public directory
app.use("/static", express.static(path.join(__dirname, "public")));

var users = [
    { name: 'tobi', email: 'tobi@learnboost.com' },
    { name: 'loki', email: 'loki@learnboost.com' },
    { name: 'jane', email: 'jane@learnboost.com' }
];

// define a home/index route
// Handles GET requests to http://localhost:3020
app.get("/", (req, res) => {
    const name = "John Doe";
    // res.send(`<h1>Hello Browser [Change Added]! name=${name}</h1>`);
    res.render('users.ejs', { users: users, title: 'All Users' })
});

// define a contact route
// Handles GET requests to http://localhost:3020/contact
app.get("/contact", (req, res) => {
    // handle search parameters
    console.log(req.params);
    // res.send(`<h2>You have reached the contact endpoint!</h2>`);
    res.render('contact.ejs', { users: users, title: 'All Contacts' })
});

// start our backend server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
