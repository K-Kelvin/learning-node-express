const { Sequelize } = require("sequelize"); // import { Sequelize } from "sequelize";

// https://sequelize.org/
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

// PostgreSQL setup
// const sequelize = new Sequelize({
//     dialect: "postgres",
//     database: "todos_app",
//     username: "dev",
//     password: "testing321",
//     host: "localhost",
// }); // Example for postgres

async function loadDb() {
    // await sequelize.sync();
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

loadDb();

module.exports = sequelize;
