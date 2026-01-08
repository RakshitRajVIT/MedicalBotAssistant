import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Activity } from 'lucide-react';

// Medical Intents Database





function MedicalChatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm your Medical Assistant. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = {
    type: 'user',
    text: input,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  setMessages(prev => [...prev, userMessage]);

  const userInput = input;
  setInput('');

  try {
    const res = await fetch("https://backend-1-f58a.onrender.com/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userInput })
    });

    const data = await res.json();

    const botMessage = {
      type: 'bot',
      text: data.reply || "AI is currently unavailable.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (err) {
    setMessages(prev => [...prev, {
      type: 'bot',
      text: "Server error. Please try again later.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickActions = [
    'Book appointment',
    'Fever symptoms',
    'Emergency contact',
    'Clinic hours'
  ];


    return (
  <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] flex items-center justify-center p-6">

    <div className="w-full max-w-5xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.15)] flex flex-col overflow-hidden" style={{ height: "90vh" }}>

      {/* HEADER */}
      <div className="px-8 py-5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-b border-white/10 flex items-center justify-between">

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shadow-lg">
            <Activity className="text-cyan-400 w-7 h-7" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-wide">Medical AI Assistant</h1>
            <p className="text-cyan-300 text-xs">Powered by Artificial Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-400">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Online
        </div>

      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>

            <div className={`max-w-md flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>

              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                msg.type === "user"
                  ? "bg-blue-600"
                  : "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.6)]"
              }`}>
                {msg.type === "user"
                  ? <User className="text-white w-5 h-5" />
                  : <Bot className="text-white w-5 h-5" />}
              </div>

              <div className={`px-5 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-md shadow-xl border ${
                msg.type === "user"
                  ? "bg-blue-600 text-white border-blue-500/50 rounded-tr-none"
                  : "bg-white/10 text-gray-200 border-white/10 rounded-tl-none"
              }`}>
                {msg.text}
              </div>

            </div>

          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-8 py-3 bg-white/5 border-t border-white/10 flex gap-3 flex-wrap">

        {quickActions.map((a, i) => (
          <button
            key={i}
            onClick={() => setInput(a)}
            className="px-4 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs border border-cyan-500/20 transition"
          >
            {a}
          </button>
        ))}

      </div>

      {/* INPUT */}
      <div className="px-8 py-5 bg-gradient-to-t from-black/40 to-transparent border-t border-white/10">

        <div className="flex items-center gap-4">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask medical AI anything..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition"
          />

          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-xl text-white font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all flex gap-2 items-center"
          >
            <Send className="w-5 h-5" />
            Send
          </button>

        </div>

        <p className="text-center text-xs text-gray-400 mt-3">
          AI provides informational guidance only. Consult a doctor for diagnosis.
        </p>

      </div>

    </div>

  </div>
);

}

export default MedicalChatbot;
