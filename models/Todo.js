const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Todo = sequelize.define("Todo", {
    title: DataTypes.STRING,
    isComplete: DataTypes.BOOLEAN,
});

Todo.sync()
    .then(() => {
        console.log("Todo table connected successfully!");
    })
    .catch((err) => {
        console.log("Failed to connect to the Todo table!", err);
    });

// async function syncTodo() {
//     try {
//         const output = await Todo.sync();
//         // the then section
//         console.log("Todo table connected successfully!");
//     } catch (error) {
//         console.log("Failed to connect to the Todo table!", error);
//     }
// }
// syncTodo()

module.exports = Todo; // export default Todo
