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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ height: '90vh' }}>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Activity className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Medical Assistant</h1>
              <p className="text-blue-100 text-sm">Your 24/7 Health Information Helper</p>
            </div>
            <Heart className="w-6 h-6 animate-pulse" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                msg.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-cyan-500 to-blue-600'
              }`}>
                {msg.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div className={`flex flex-col max-w-xs lg:max-w-md ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-gray-800 shadow-md rounded-tl-none'
                }`}>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => setInput(action)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-full transition-colors duration-200"
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
              placeholder="Type your health question here..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            ⚠️ This chatbot provides general information only. For medical emergencies, call 911 immediately.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MedicalChatbot;
