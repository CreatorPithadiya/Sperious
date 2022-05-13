import "./Chat.css";
import io from "socket.io-client";
import { useState } from "react";
import Main from "./Main";
import { Button, TextField } from '@mui/material';

const socket = io.connect("");

export default function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="Chat">
      {!showChat ? (
        <div>
          <h1 style={{marginTop: '5%'}}>Chat With Us</h1>
          <TextField
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br/>
          <br/>
          <TextField
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
            />
            <br/>
            <br/>
          <Button variant="outlined" onClick={joinRoom}>Join</Button>
        </div>
      ) : (
        <Main socket={socket} username={username} room={room} />
      )}
    </div>
  );
}