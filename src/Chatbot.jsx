import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import "./Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef(null);

  // Function to auto-scroll chatbox
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server.");
      }

      const data = await response.json();
      const aiMessage = { sender: "ai", text: data.response };

      setMessages([...newMessages, aiMessage]);
    } catch (error) {
      console.error("❌ Error fetching response:", error);
      setMessages([...newMessages, { sender: "ai", text: "⚠️ Error fetching response" }]);
    }

    setLoading(false);
    setUserInput("");
  };

  return (
    <div className="chat-container">
      <div className="chatbox" ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>

            {msg.text}
          </div>
        ))}
        {loading && <div className="message ai">⏳ Generating response...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="input"
        />
        <button onClick={sendMessage} disabled={loading} className="send-button">
          <FaPaperPlane size={15} color="white" />
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
