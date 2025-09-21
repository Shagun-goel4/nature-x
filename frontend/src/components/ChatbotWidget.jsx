import React, { useState } from "react";

const CHATBOT_API_URL = "http://localhost:5000/get_response"; // Change if your Flask server runs elsewhere

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);
    try {
      const res = await fetch(CHATBOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.response }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Error connecting to chatbot." },
      ]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}>
      {open ? (
        <div
          style={{
            width: 420,
            height: 520,
            background: "#18181b",
            borderRadius: 20,
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            padding: 24,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 12, fontSize: 22 }}>
            Farming FAQ Chatbot
          </div>
          <div
            style={{
              flex: 1,
              maxHeight: 340,
              overflowY: "auto",
              marginBottom: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.from === "user" ? "right" : "left",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    background: msg.from === "user" ? "#10b981" : "#374151",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "4px 8px",
                    display: "inline-block",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              style={{
                flex: 1,
                borderRadius: 10,
                border: "none",
                padding: "14px",
                fontSize: 16,
                color: "#fff",
                background: "#23232a",
                "::placeholder": { color: "#b3b3b3" },
              }}
              disabled={loading}
            />
            <button
              type="submit"
              style={{
                background: "#10b981",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "14px 20px",
                fontWeight: "bold",
                fontSize: 16,
              }}
              disabled={loading}
            >
              Send
            </button>
          </form>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginTop: 12,
              background: "#374151",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "10px 0px",
              width: "100%",
              fontSize: 16,
            }}
          >
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 72,
            height: 72,
            fontSize: 36,
            boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}
