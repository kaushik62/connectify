import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import BASE_URL from "../config";
import { SendHorizonal } from "lucide-react";

export default function Messaging() {
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const roomId = (u1, u2) => [u1, u2].sort().join("_");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const userData = decodeJWT(token);
    const username = userData?.sub;
    if (!username) return;

    setCurrentUser(username);

    // Fetch all users
    fetch(`${BASE_URL}/auth/all-user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((u) => u.username !== username);
        setAllUsers(filtered);
      });

    // WebSocket connection
    const socket = new SockJS(`${BASE_URL}/ws-chat?token=${encodeURIComponent(token)}`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        stompClientRef.current = client;
      },
    });

    client.activate();
  }, []);

  const joinChat = (partner) => {
    if (!isConnected) {
      alert("WebSocket not connected yet.");
      return;
    }

    const client = stompClientRef.current;
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    const rid = roomId(currentUser, partner);
    setCurrentChatUser(partner);
    setMessages([]);

    subscriptionRef.current = client.subscribe(`/topic/chat/${rid}`, (msg) => {
      const parsed = JSON.parse(msg.body);
      setMessages((prev) => [...prev, parsed]);
    });

    fetch(`${BASE_URL}/api/chat/all-content/${rid}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data || []));
  };

  const sendMessage = () => {
    const client = stompClientRef.current;
    if (!client?.connected || !content.trim() || !currentChatUser) return;

    const message = {
      recipient: currentChatUser,
      content: content.trim(),
    };

    client.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(message),
    });

    // Optimistic update: only content
    setMessages((prev) => [...prev, { content: content.trim() }]);
    setContent("");
  };

  const sanitizeMessage = (text) => {
    if (!text || typeof text !== "string") return "";
    const bannedWords = [currentUser.toLowerCase(), currentChatUser.toLowerCase()];
    const containsName = bannedWords.some((word) =>
      text.toLowerCase().includes(word)
    );
    return containsName && text.length <= 25 ? "" : text;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r border-gray-200 px-8 py-6 overflow-y-auto shadow-md">
        <h2 className="text-2xl font-bold text-emerald-600 mb-6">All Users</h2>

        <div className="space-y-3">
          {allUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => joinChat(user.username)}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition border shadow-sm ${
                currentChatUser === user.username
                  ? "bg-emerald-200 border-emerald-400"
                  : "bg-white hover:bg-emerald-100 border-gray-100"
              }`}
            >
              <img
                src={user.url}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
              />
              <span className="text-gray-800 text-sm font-semibold">
                {user.username}
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <div className="flex flex-col w-2/3 relative  mt-16">
        {/* Header */}
        <header className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500  px-8 py-5 font-semibold text-lg text-white shadow sticky top-0 z-10">
          {currentChatUser ? `Chat with ${currentChatUser}` : "Select a user to start chatting"}
        </header>

        {/* Messages */}
        <main className="flex-1 px-8 py-5 overflow-y-auto space-y-4 bg-emerald-50">
          {messages.map((msg, idx) => {
            const isSender = msg.sender === currentUser || msg.sender === undefined;
            const text = sanitizeMessage(msg.content);
            return text ? (
              <div key={idx} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-6 py-3 rounded-2xl shadow-sm text-sm break-words max-w-[75%] ${
                    isSender ? "bg-emerald-200 text-right" : "bg-white text-left"
                  }`}
                >
                  {text}
                </div>
              </div>
            ) : null;
          })}
          <div ref={messagesEndRef} />
        </main>

        {/* Input */}
        <footer className="flex items-center gap-3 px-8 py-5 border-t bg-white shadow-md">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected || !currentChatUser}
            className={`p-2 rounded-full ${
              isConnected && currentChatUser
                ? "bg-emerald-500 hover:bg-emerald-600"
                : "bg-gray-300 cursor-not-allowed"
            } text-white`}
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </footer>
      </div>
    </div>
  );
}
