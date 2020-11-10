var fs = require('fs');
var cors = require('cors');
const express = require("express");
const https = require("https");
const app = express();
app.use(cors());
// const serverOption = {
//   key: fs.readFileSync("./cert/server.key"),
//   cert: fs.readFileSync("./cert/server.crt"),
// };
// const server = https.createServer(serverOption, app);
const server = https.createServer(app);
const socket = require("socket.io");
// const io = socket(server);
const io = require('socket.io')(https, {
    origins: '*:*'
  });
  
const users = {};

const socketToRoom = {};



io.on('connection', socket => {
  socket.on("join room", roomID => {
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

});

server.listen(9999, () => console.log('server is running on port 9999'));


