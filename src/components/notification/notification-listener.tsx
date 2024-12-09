"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { showEnhancedToast } from "../enhanced-toast";

// Initialize the Socket.IO client (adjust the URL as per your backend)
const socket = io(process.env.NEXT_PUBLIC_API_URL);

export default function NotificationListener() {
  useEffect(() => {
    const roomId = "1234";
    socket.emit("join_room", { messid: roomId });
    socket.on("message-recieve", (data) => {
      showEnhancedToast(data.title, data.body);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      socket.off("notification");
    };
  }, []);

  return null; // This component does not render anything visible
}
