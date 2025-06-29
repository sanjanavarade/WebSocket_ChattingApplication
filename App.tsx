import React, { useEffect, useRef, useState } from "react";

type Message = {
  text: string;
  sender: "me" | "them";
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socket = useRef<WebSocket | null>(null);

  const ROOM_ID = "room-1"; // Can be dynamic

  useEffect(() => {
    // Connect to WebSocket server
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onopen = () => {
      console.log("Connected to WebSocket");

      // Join a room
      socket.current?.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: ROOM_ID,
          },
        })
      );
    };

    // Receive messages
    socket.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      if (parsed?.text) {
        setMessages((prev) => [...prev, { text: parsed.text, sender: "them" }]);
      }
    };

    return () => {
      socket.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socket.current) return;

    const messageObj = {
      type: "chat",
      payload: {
        text: input,
        roomId: ROOM_ID,
      },
    };

    socket.current.send(JSON.stringify(messageObj));

    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800 font-sans">
      {/* Top Bar */}
      <div className="h-16 bg-white shadow flex items-center px-6 text-lg font-semibold text-blue-700">
        Chat Room: {ROOM_ID}
      </div>

      {/* Chat Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="h-16 bg-white flex items-center px-4 shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
