import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // User message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:8000/chat", {
        message: input
      });

      const botReply = res.data.reply;

      setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error contacting chatbot!" }]);
    }

    setInput("");
  };

  return (
    <>
    <h3>Chatbot</h3>
    <div style={{ width: "350px", padding: "15px", border: "1px solid #ccc" }}>
      <div style={{ height: "250px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <p key={i} style={{ textAlign: m.sender === "user" ? "right" : "left" }}>
            <strong>{m.sender}:</strong> {m.text}
          </p>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything…"
        style={{ width: "70%" }}
        />
      <button onClick={sendMessage} style={{ width: "25%", marginLeft: "5px" }}>
        Send
      </button>
    </div>
  </>
  );
}
