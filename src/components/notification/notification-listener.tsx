"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { showEnhancedToast } from "../enhanced-toast";

// Initialize the Socket.IO client (adjust the URL as per your backend)
const socket = io(process.env.NEXT_PUBLIC_API_URL);

const handleMessageReceive = (data: { message: string }) => {
  console.log(data.message);
  const { title, body } = JSON.parse(data.message);
  showEnhancedToast(title, body);
};
export default function NotificationListener() {
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_room", { messid: "1234" });
    });
    socket.on("message-recieve", handleMessageReceive);
    return () => {
      socket.off("message-recieve", handleMessageReceive);
      socket.disconnect();
    };
  });

  return null; // This component does not render anything visible
}
