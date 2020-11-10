var fs = require('fs');
var cors = require("cors");
const express = require("express");
const https = require("https");
const app = express();
// const corsOptions = {
//   origin: 'https://localhost:3000',
//   credentials: true,
// }
// app.use(cors(corsOptions));
app.use(cors());
const serverOption = {
  key: fs.readFileSync("./cert/server.key"),
  cert: fs.readFileSync("./cert/server.crt"),
};
const server = https.createServer(serverOption, app);
// const socket = require("socket.io");
// const io = socket(server);
const io = require('socket.io')(https, {
    origins: '*:*'
  });
  
const users = {};

const socketToRoom = {};

// users.js
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

io.on('connection', socket => {
  console.log('connection');
  socket.on("join room", roomID => {
    console.log('join room');
    if (users[roomID]) {
      const length = users[roomID].length;
      if (length === 4) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
  });

  socket.on("returning signal", payload => {
    io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
  });

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      room = room.filter(id => id !== socket.id);
      users[roomID] = room;
    }
  });

  socket.on("join", ({ name, room }, callback) => {
    // console.log(name, room);
    // console.log(socket.id, "socketid");
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error); // username taken
    // 해당 유저 방에 접속처리
    socket.join(user.room);
    // console.log(user.room);
    // 관리자(서버)에서 소켓으로 보내는 이벤트
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    // 같은 방에 있는 유저에게 보내는 서버측 전달
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
    // const error = true;
    // if (error) {
    //   callback({ error: "error" });
    // }
  });
  // 유저가 생성한 이벤트에 대한 처리 `on`
  socket.on("sendMessage", (message, callback) => {
    // console.log(socket.id, "socket.id");
    const user = getUser(socket.id);
    // console.log(user); //
    // 해당 방으로 메세지를
    io.to(user.room).emit("message", { user: user.name, text: message });

    // callback();
  });

  socket.on("disconnect chat", () => {
    const user = removeUser(socket.id);
    console.log("유저가 떠났습니다..");

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

});

server.listen(9999, () => console.log('server is running on port 9999'));


