import React, { useState, useEffect } from 'react';
import io from "socket.io-client";

import Messages from "./Messages";
import RoomInfo from './RoomInfo';
import Input from './Input';

import Paper from "@material-ui/core/Paper";
import "./TextChat.css";

let socket;

const TextChat = (props) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState("");

  useEffect(() => {
    const name = props.name;
    // console.log("props.name", name);
    // console.log("props", props);
    const room = props.roomID;

    socket = io.connect("/", { transforts: ['websocket'] }, { path: "/socket.io" });

    setName(name);
    setRoom(room);

    // console.log("name", name);
    // console.log("room", room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    })
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, setMessage(""));
    }
  };

  // console.log("message", message);
  // console.log("messages", messages);
  // console.log("users", users);

  return (
    <div className="chatScreen">
      <Paper className="chatScreenPaper">
        {/* <RoomInfo room={room} /> */}
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </Paper>
    </div>
  )
}

export default TextChat;