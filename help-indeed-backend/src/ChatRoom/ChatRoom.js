const { getMessagesFromDb, sendMessagesToDb } = require("./DbAccessor");

const ChatRoom = (io) => {
  io.on("connection", (socket) => {
    console.log(`helper connected ${socket.id}`);

    socket.on("join_room", (data) => {
      const { email, room } = data;
      socket.join(room);
      getMessagesFromDb(room)
        .then((messages) => {
          socket.emit("message_history", messages);
        })
        .catch((error) => {});
    });

    socket.on("send_message", (data) => {
      const { user_email, messageSent, room, __createdtime__ } = data;
      sendMessagesToDb(data);
      io.in(room).emit("recieve_message", data);
    });

    socket.on("leave_room", (data) => {
      let { user_email, room, __createdtime__ } = data;
      socket.leave(room);
      console.log(`${user_email} has left the chat`);
    });
  });
};

module.exports = ChatRoom;
