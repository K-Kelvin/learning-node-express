const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database.sqlite",
});

async function loadDb() {
    await sequelize.sync();
}

loadDb();

module.exports = sequelize;
