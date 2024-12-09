"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { showEnhancedToast } from "../enhanced-toast";

const roomId = 1234;

export default function NotificationListener() {
  useEffect(() => {
    // Create socket inside useEffect to ensure it's only created once
    const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const handleConnect = () => {
      console.log("Socket connected");
      socket.emit("join_room", { messid: roomId });
    };

    const handleMessageReceive = (data: { message: string }) => {
      try {
        console.log("Received message:", data.message);
        const { title, body } = JSON.parse(data.message);
        showEnhancedToast(title, body);
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };

    const handleConnectError = (error: Error) => {
      console.error("Socket connection error:", error);
    };

    socket.on("connect", handleConnect);
    socket.on("message-recieve", handleMessageReceive); // Kept original typo for consistency
    socket.on("connect_error", handleConnectError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("message-recieve", handleMessageReceive);
      socket.off("connect_error", handleConnectError);
      socket.disconnect();
    };
  }, []); // Empty dependency array ensures this runs only once

  return null;
}
