const sequelize = require("sequelize");
const sequelizeInstance = new sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    dialect: "postgres",
    pool: {
      max: 10,
      idle: 3000,
    },
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  }
);

const db = {};
db.sequelizeInstance = sequelizeInstance;
db.helper_details = require("./helperDetails")(sequelizeInstance);
// db.trust_list = require("./trustList")(sequelizeInstance);
db.chat_rooms = require("./chatRoom")(sequelizeInstance);

module.exports = db;
