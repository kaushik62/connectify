import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import BASE_URL from "../config";

export default function Messaging() {
  const [currentUser, setCurrentUser] = useState("");
  const [partnerList, setPartnerList] = useState([]);
  const [currentChatUser, setCurrentChatUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [manualPartner, setManualPartner] = useState(""); // input field

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

    const socket = new SockJS(`http://localhost:8080/ws-chat?token=${encodeURIComponent(token)}`);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClientRef.current = client;

        // Fetch all room IDs (partners)
        fetch(`${BASE_URL}/api/chat/all-roomid/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            const partners = data
              .map((room) => room.split("_").find((name) => name !== username))
              .filter(Boolean);
            setPartnerList(partners);
          });

        // Load messages from Shubham_kaushik_gupta_256 (optional preload)
        fetch(`${BASE_URL}/api/chat/all-content/Shubham_kaushik_gupta_256`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => setMessages(data || []));
      },
    });

    client.activate();
  }, []);

  const joinChat = (partner) => {
    const client = stompClientRef.current;
    if (!client?.connected) {
      alert("WebSocket not connected yet.");
      return;
    }

    if (!partner) {
      alert("Enter a username to chat with.");
      return;
    }

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

    // Fetch message history
    fetch(`${BASE_URL}/api/chat/all-content/${rid}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data || []));
  };

  const handleManualJoin = () => {
    joinChat(manualPartner.trim());
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

    setMessages((prev) => [...prev, { sender: currentUser, content }]);
    setContent("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#f0f2f5]">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white border-r border-gray-300 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-emerald-600 mb-4">💬 Chats</h2>

        {/* Manual Join Input */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Chat with:</label>
          <div className="flex mt-1">
            <input
              type="text"
              value={manualPartner}
              onChange={(e) => setManualPartner(e.target.value)}
              placeholder="Enter username"
              className="flex-1 border border-gray-300 px-3 py-1 rounded-l-md text-sm"
            />
            <button
              onClick={handleManualJoin}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 rounded-r-md text-sm"
            >
              Join
            </button>
          </div>
        </div>

        {/* Partner List */}
        {partnerList.map((name) => (
          <div
            key={name}
            onClick={() => joinChat(name)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-emerald-100 transition ${
              currentChatUser === name ? "bg-emerald-200" : "bg-white"
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shadow">
              {name[0]?.toUpperCase()}
            </div>
            <div className="text-gray-800 font-medium">{name}</div>
          </div>
        ))}
      </aside>

      {/* Chat Window */}
      <section className="w-2/3 flex flex-col mt-14">
        {/* Header */}
        <header className="bg-emerald-600 text-white px-6 py-4 font-semibold text-lg shadow sticky top-0 z-10">
          {currentChatUser ? `Chat with ${currentChatUser}` : "Select or enter a chat"}
        </header>

        {/* Messages */}
        <main className="flex-1 px-6 py-4 overflow-y-auto space-y-2 bg-emerald-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] px-4 py-2 rounded-xl shadow-sm text-sm ${
                msg.sender === currentUser
                  ? "self-end bg-emerald-200 text-right ml-auto"
                  : "self-start bg-white"
              }`}
            >
              {msg.content}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </main>

        {/* Input */}
        <footer className="flex items-center gap-3 px-6 py-4 border-t bg-white">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={sendMessage}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full font-medium text-sm"
          >
            Send
          </button>
        </footer>
      </section>
    </div>
  );
}
