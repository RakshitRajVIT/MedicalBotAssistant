import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Heart, Activity } from 'lucide-react';

// Medical Intents Database
const medicalIntents = {
  greeting: {
    patterns: ["hi", "hello", "hey", "good morning", "good evening", "greetings"],
    response: "Hello! I'm your Medical Assistant. How can I help you today? You can ask about symptoms, appointments, or general health information."
  },
  goodbye: {
    patterns: ["bye", "goodbye", "see you", "exit", "quit"],
    response: "Take care of your health! Feel free to return if you have more questions. Goodbye!"
  },
  symptoms_fever: {
    patterns: ["fever", "high temperature", "feel hot", "burning up"],
    response: "For fever: Rest well, stay hydrated, and monitor your temperature. Take acetaminophen or ibuprofen as directed. If fever exceeds 103°F (39.4°C) or persists for more than 3 days, please consult a doctor immediately."
  },
  symptoms_headache: {
    patterns: ["headache", "head pain", "migraine", "head hurts"],
    response: "For headaches: Rest in a quiet, dark room. Stay hydrated and consider over-the-counter pain relievers. If headaches are severe, frequent, or accompanied by vision changes, seek medical attention."
  },
  symptoms_cough: {
    patterns: ["cough", "coughing", "throat irritation"],
    response: "For cough: Stay hydrated, use honey (for adults), rest your voice, and consider a humidifier. If cough persists beyond 3 weeks or includes blood, consult a healthcare provider."
  },
  appointment: {
    patterns: ["appointment", "schedule", "book", "visit", "see doctor"],
    response: "To schedule an appointment, please call our clinic at +1-555-HEALTH (432-584) or visit our online booking portal at www.healthclinic.com/book. Our hours are Monday-Friday, 8 AM to 6 PM."
  },
  emergency: {
    patterns: ["emergency", "urgent", "severe pain", "chest pain", "can't breathe", "breathing problem"],
    response: "⚠️ THIS IS AN EMERGENCY! Please call 911 immediately or go to the nearest emergency room. For chest pain, breathing difficulties, or severe symptoms, do not wait - seek immediate medical attention!"
  },
  medication: {
    patterns: ["medication", "medicine", "prescription", "drugs", "pills"],
    response: "For medication information, please consult your healthcare provider or pharmacist. Never take medications not prescribed to you. For prescription refills, call our pharmacy at +1-555-PHARMACY."
  },
  hours: {
    patterns: ["hours", "open", "timing", "when open", "schedule"],
    response: "Our clinic hours are: Monday-Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 2:00 PM, Sunday: Closed. Emergency services are available 24/7."
  },
  insurance: {
    patterns: ["insurance", "coverage", "payment", "cost", "billing"],
    response: "We accept most major insurance plans including Blue Cross, Aetna, UnitedHealthcare, and Medicare. Please bring your insurance card to your appointment. For billing questions, call +1-555-BILLING."
  },
  covid: {
    patterns: ["covid", "coronavirus", "covid-19", "pandemic"],
    response: "For COVID-19 concerns: Get tested if you have symptoms, isolate if positive, wear masks in public spaces, and ensure vaccinations are up to date. For testing appointments, call our COVID hotline at +1-555-COVID19."
  }
};

function cleanText(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '');
}

function getIntent(userInput) {
  const cleaned = cleanText(userInput);
  for (const [intent, data] of Object.entries(medicalIntents)) {
    for (const pattern of data.patterns) {
      if (cleaned.includes(pattern)) {
        return intent;
      }
    }
  }
  return null;
}

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

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const intent = getIntent(input);
      const botResponse = intent
        ? medicalIntents[intent].response
        : "I'm not sure about that. Please ask about symptoms (fever, headache, cough), appointments, emergency services, or general health information. For specific medical advice, please consult a healthcare professional.";

      const botMessage = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput('');
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
