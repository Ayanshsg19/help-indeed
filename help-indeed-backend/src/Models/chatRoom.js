const { DataTypes } = require("sequelize");

module.exports = (sequelizeInstance) => {
  const chat_rooms = sequelizeInstance.define("chat_rooms", {
    room_name: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.BIGINT,
    },
  });

  return chat_rooms;
};
