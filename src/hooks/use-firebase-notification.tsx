import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { showEnhancedToast } from "@/components/enhanced-toast";

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Custom hook for Firebase Notifications
export function useFirebaseNotifications() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Handle notification display
    function displayNotification(title: string, body: string) {
      // Check if the page is visible (in focus)
      if (document.visibilityState === "visible") {
        // Use react-hot-toast for in-site notifications
        showEnhancedToast(title, body);
      } else {
        // Use native push notification when site is not active
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification(title, {
            body: body,
            icon: "/images/logo.png", // Optional: Add your app's icon
          });
        }
      }
    }

    // Request notification permission and get token
    async function requestNotificationPermission() {
      try {
        // Request permission
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
          const messaging = getMessaging(app);

          // Get registration token
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          });

          if (currentToken) {
            setToken(currentToken);
            // Send token to your backend to save for future notifications
            const response = await fetch("/api/fcmToken", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: currentToken }),
            });
            console.log("Token sent to server:", response.ok);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Notification permission denied");
        }
      } catch (error) {
        console.error("Error getting notification token:", error);
      }
    }

    // Listen for incoming messages
    async function setupMessageListener() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        // Handle incoming messages
        const title = payload.notification?.title || "New Notification";
        const body = payload.notification?.body || "You have a new message";

        // Display notification based on page visibility
        displayNotification(title, body);
      });
    }

    // Only run in browser environment
    if (typeof window !== "undefined") {
      requestNotificationPermission();
      setupMessageListener();
    }

    // Cleanup
    return () => {
      // Any cleanup logic if needed
    };
  }, []);

  return { token };
}
