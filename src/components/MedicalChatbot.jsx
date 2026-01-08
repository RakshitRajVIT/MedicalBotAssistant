import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Activity, Loader2 } from 'lucide-react';

// OpenAI API Configuration
const OPENAI_API_KEY = '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';

const SYSTEM_PROMPT = `You are a helpful and empathetic Medical Assistant chatbot. Your role is to:
1. Provide general health information and guidance
2. Help users understand common symptoms and when to seek medical attention
3. Offer first-aid advice for minor issues
4. Guide users on scheduling appointments and clinic information
5. Recognize emergency situations and urgently direct users to call 911

Important guidelines:
- Always be empathetic and supportive
- Clearly state that you provide general information only, not medical diagnoses
- For any serious symptoms, always recommend consulting a healthcare professional
- For emergencies (chest pain, difficulty breathing, severe bleeding, etc.), immediately advise calling 911
- Keep responses concise but informative
- Use simple language that patients can understand

Clinic Information:
- Hours: Monday-Friday 8 AM - 6 PM, Saturday 9 AM - 2 PM, Sunday Closed
- Appointment Line: +1-555-HEALTH (432-584)
- Emergency services available 24/7
- We accept Blue Cross, Aetna, UnitedHealthcare, and Medicare`;

async function getOpenAIResponse(messages) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return "I'm sorry, I'm having trouble connecting right now. For urgent medical concerns, please call 911 or visit your nearest emergency room. For non-urgent matters, please try again in a moment.";
  }
}

function MedicalChatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm your Medical Assistant powered by AI. How can I help you today? You can ask me about symptoms, health concerns, appointments, or general medical information.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);
    
    const newHistory = [...conversationHistory, { role: 'user', content: input }];
    setConversationHistory(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await getOpenAIResponse(newHistory);
      
      const botMessage = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setConversationHistory(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: "I'm sorry, I encountered an error. Please try again. For urgent medical concerns, please call 911.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
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
          ))}
          {isLoading && (
            <div className="flex gap-3 flex-row">
              <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-2xl px-4 py-3 bg-white text-gray-800 shadow-md rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInput(action)}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              placeholder="Type your health question here..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors disabled:bg-gray-100"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              {isLoading ? 'Sending...' : 'Send'}
            </button>

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
