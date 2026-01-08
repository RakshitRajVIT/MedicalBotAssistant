https://medical-chatbot-henna-tau.vercel.app/

# Medical Assistant Chatbot (React + Vite + Tailwind)

A simple intent-based medical information chatbot UI built with React, Vite, Tailwind CSS, and lucide-react icons. This provides general, non-diagnostic health information only.

## Features

- Quick intent matching for common medical topics (fever, headache, cough, appointments, etc.)
- Clean responsive UI with Tailwind utility classes
- Scroll-to-latest message behavior
- Quick action buttons to prefill common queries
- Lucide icons for a modern look

## Prerequisites

- Node.js (v18+ recommended)
- Internet access (to install npm packages)

## Setup (PowerShell)

```powershell
# From project root
npm install
npm run dev
```

Open the local URL shown (typically http://localhost:5173) in your browser.

## Build for Production

```powershell
npm run build
npm run preview
```

## Project Structure

```
package.json
index.html
vite.config.js
tailwind.config.js
postcss.config.js
src/
  index.css
  main.jsx
  components/
    MedicalChatbot.jsx
```

## Medical Disclaimer

This chatbot provides general health-related information and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition. In an emergency, call 911 (or your local emergency number) immediately.

## Customization

- Add new intents by extending the `medicalIntents` object in `MedicalChatbot.jsx`.
- Replace Tailwind theme extensions inside `tailwind.config.js` as needed.
- Integrate a backend or real NLP model later for advanced understanding.

## License

No explicit license provided. Treat as personal/demo code unless otherwise specified.
