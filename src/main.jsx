import React from 'react';
import { createRoot } from 'react-dom/client';
import MedicalChatbot from './components/MedicalChatbot.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MedicalChatbot />
  </React.StrictMode>
);
