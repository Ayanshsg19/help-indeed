const models = require("../Models/index");
const { QueryTypes } = require("sequelize");
models.sequelizeInstance.sync();
const sequelizeInstance = models.sequelizeInstance;

const getMessagesFromDb = async (room) => {
  try {
    const messages = await sequelizeInstance.query(
      `
                SELECT message, email, time
                FROM chat_rooms
                WHERE room_name = $1
                ORDER BY time
            `,
      {
        bind: [room],
        type: QueryTypes.SELECT,
      }
    );
    return messages;
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

const sendMessagesToDb = async ({
  user_email,
  messageSent,
  room,
  __createdtime__,
}) => {
  try {
    await sequelizeInstance.query(
      `
            INSERT INTO chat_rooms ( room_name, message, email, time )
            VALUES ( $1, $2, $3, $4 )
        `,
      {
        bind: [room, messageSent, user_email, __createdtime__],
        type: QueryTypes.UPSERT,
      }
    );
  } catch (error) {
    return Promise.reject(new Error(error));
  }
};

module.exports = {
  getMessagesFromDb,
  sendMessagesToDb,
};
