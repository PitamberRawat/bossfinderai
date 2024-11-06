import React, { useState, useEffect } from "react";
import { db } from "./config/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
} from "firebase/firestore";

const ChatApp = ({ uid }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/messages/${uid}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }

  //     const data = await response.json();

  //     // Deduplicate messages based on ID and timestamp
  //     setMessages(data);
  //     console.log(data);
  //   } catch (err) {
  //     setError("Failed to fetch messages");
  //     console.error("Fetch error:", err);
  //   }
  // };

  useEffect(() => {
    const messagesRef = collection(db, "users", uid, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc")); // Order messages by timestamp

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMessages(fetchedMessages); // Update state with new messages
      },
      (error) => {
        console.error("Error fetching messages: ", error);
        setError("Failed to fetch messages");
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [uid]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      // Save message to backend with userId and message Text

      const response = await fetch(
        "https://bossfinderai1.onrender.com/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: uid, text: newMessage }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const sentMessage = await response.json();
      setMessages((prev) => [...prev, sentMessage]);

      setNewMessage("");
    } catch (err) {
      setError("Failed to send message");
      console.error("Send error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A"; // Return "N/A" if timestamp is null or undefined

    // Check if the timestamp has _seconds and _nanoseconds properties
    if (timestamp && typeof timestamp === "object" && "seconds" in timestamp) {
      const milliseconds =
        timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
      const date = new Date(milliseconds);

      return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    }

    return "Invalid timestamp";
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md">
        {/* Messages Container */}
        <div className="message-container h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={`${msg.timestamp}-0.1`}
              className={`p-3 rounded-lg ${
                msg.fromAdmin
                  ? "bg-green-200 max-w-[80%]"
                  : "bg-blue-200 ml-auto max-w-[80%]"
              }`}
            >
              <p className="text-sm font-bold  text-gray-600">
                {msg.fromAdmin ? "Admin" : "You"}
              </p>
              <p className="mt-1 text-gray-900 ">{msg.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(msg.timestamp)}
              </p>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 text-black p-2 border rounded-md"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>

        {/* Error Alert */}
        {error && (
          <div variant="destructive" className="mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
