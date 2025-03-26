const express = require("express"); // import express from "express";
const bodyParser = require("body-parser");
const users = require("./db/users");
const posts = require("./db/posts");
const { findUser } = require("./helpers");
const database = require("./db/database");
const Todo = require("./models/Todo");

// REST API -> Representational State Transfer, Application Programmable Interface
// REST APIs return data in JSON format

// REST Patterns -> CRUD (Create, Read, Update, Delete)

const app = express();
const port = 3020; // http://localhost:3020

// parse application/json
app.use(bodyParser.json());

// Define an index route (GET -> Read)
app.get("/", (req, res) => {
    const user = {
        id: 1,
        name: "John Doe",
        age: 30,
    };
    res.json(user);
});

// POST -> Create
app.post("/", (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({
        message: "Successfully POST",
        data,
    });
});

// PUT -> Update
app.put("/", (req, res) => {
    const data = req.body;
    // Perform a complete update
    res.json({
        message: "Successfully PUT",
        data,
    });
});

// PATCH -> Update
app.patch("/", (req, res) => {
    const data = req.body;
    // Perform a partial update
    res.json({
        message: "Successfully PATCH",
        data,
    });
});

app.delete("/", (req, res) => {
    // Perform some delete operation
    res.json({ message: "Deleted Successfully!" });
});

app.route("/users")
    .get((req, res) => {
        const limit = req.query.limit;
        // fetch users from database
        let results = users;
        if (limit) {
            results = users.slice(0, limit);
        }
        res.status(200).json(results); // 200 -> OK
    })
    .post((req, res) => {
        const user = req.body;
        // Add user to the database
        users.push(user);
        res.status(201).json(user); // 201 -> Created
    });
app.route("/users/:userId(\\d+)")
    .get((req, res) => {
        const userId = parseInt(req.params.userId);
        // Find user with id = userId
        const user = findUser(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // 404 -> Not Found
        }

        res.status(200).json(user);
    })
    .put((req, res) => {
        const userId = parseInt(req.params.userId);
        // Find user with id = userId
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // 404 -> Not Found
        }

        const index = users.indexOf(user);
        users[index] = req.body; // complete update

        res.status(200).json({ message: "Successfully updated", data: users[index] });
    })
    .patch((req, res) => {
        const userId = parseInt(req.params.userId);
        // Find user with id = userId
        const user = users.find((user) => user.id === userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // 404 -> Not Found
        }

        const index = users.indexOf(user);
        users[index] = {
            ...user,
            ...req.body,
        }; // partial update

        res.status(200).json({ message: "Successfully updated", data: users[index] });
    })
    .delete((req, res) => {
        const userId = parseInt(req.params.userId);
        // Find user with id = userId
        const user = findUser(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // 404 -> Not Found
        }

        // Delete user from the database
        const index = users.indexOf(user);
        users.splice(index, 1);
        // users = users.filter((user) => user.id !== userId);

        res.status(204).json({ message: "User deleted successfully" }); // 204 -> Deleted (No Content)
    });

app.route("/todos")
    .post(async (req, res) => {
        const { title } = req.body;

        const todo = await Todo.create({ title, isComplete: false });

        res.json(todo);
    })
    .get(async (req, res) => {
        const todos = await Todo.findAll();

        res.json(todos);
    });

// start our REST API server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
