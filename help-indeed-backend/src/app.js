const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const { port } = require("../config");
const { reviseError } = require("./Common/Utility");
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const HelperDetails = require("./HelperDetails/HelperRoute");
const TrustList = require("./TrustList/TrustListRoute");
const ChatRoom = require("./ChatRoom/ChatRoom");

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(morgan("combined"));

app.use(HelperDetails);
app.use(TrustList);

app.use((err, req, res, next) => {
  if (err) {
    [errorStatusCode, errorMessage] = reviseError(err);
    console.log(JSON.stringify(err));
    return res.status(errorStatusCode).send({ errorMessage: errorMessage });
  }
  return res.status(404).send({ errorMessage: "Not Found" });
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

ChatRoom(io);

server.listen(port, () => {
  console.log(`Server is listening on Port: `, port);
});
