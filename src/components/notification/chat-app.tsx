"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { senderId: string; message: string }[]
  >([]);
  const newSocket = io(process.env.NEXT_PUBLIC_API_URL);

  function join_room() {
    console.log("Joining room");
    newSocket.on("connect", () => {
      newSocket.emit("join_room", { messid: 1234 });
    });
  }

  useEffect(() => {
    newSocket.on("message-recieve", (data) => {
      console.log(`Message received in client: ${JSON.stringify(data)}`);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      newSocket.off("message-recieve");
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const messageData = { messid: "lucc", message, senderId: "You" }; // Replace senderId dynamically
    newSocket.emit("message", messageData);

    setMessages((prevMessages) => [
      ...prevMessages,
      { senderId: "You", message },
    ]);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            {msg.senderId}: {msg.message}
          </p>
        ))}
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <input type='text' />
      <button onClick={join_room}>Send</button>
    </div>
  );
};

export default ChatApp;
