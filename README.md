# 🏥 Medical AI Assistant Chatbot

A modern, AI-powered medical chatbot application built with React and Node.js that provides general health guidance using OpenAI's GPT-4.1-mini model. This application offers an intuitive chat interface for users to ask health-related questions and receive informational guidance.

![Medical AI Assistant](https://img.shields.io/badge/Medical-AI%20Assistant-00D4FF?style=for-the-badge&logo=robot&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1--mini-412991?style=for-the-badge&logo=openai&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

---

## ✨ Features

- 🤖 **AI-Powered Responses** - Leverages OpenAI's GPT-4.1-mini for intelligent health guidance
- 💬 **Real-time Chat Interface** - Smooth, responsive messaging experience
- 🎨 **Modern UI Design** - Beautiful glassmorphism design with gradient effects
- ⚡ **Quick Action Buttons** - Pre-defined prompts for common queries
- 📱 **Fully Responsive** - Works seamlessly on desktop and mobile devices
- 🔒 **Safe Health Guidance** - Always recommends consulting licensed doctors

---

## 🖼️ Screenshots

### Chat Interface
The application features a sleek, dark-themed interface with:
- Gradient backgrounds and glassmorphism effects
- Distinct message bubbles for user and bot
- Online status indicator
- Quick action buttons for common queries

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Styling |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime Environment |
| **Express 5** | Web Framework |
| **OpenAI SDK** | AI Integration |
| **CORS** | Cross-Origin Resource Sharing |
| **dotenv** | Environment Variables |

---

## 📁 Project Structure

```
MedicalBotAssistant/
├── 📄 index.html              # Main HTML entry point
├── 📄 package.json            # Frontend dependencies
├── 📄 vite.config.js          # Vite configuration
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 postcss.config.js       # PostCSS configuration
│
├── 📂 src/
│   ├── 📄 main.jsx            # React entry point
│   ├── 📄 index.css           # Global styles
│   └── 📂 components/
│       └── 📄 MedicalChatbot.jsx  # Main chatbot component
│
└── 📂 backend/
    ├── 📄 index.js            # Express server & OpenAI integration
    └── 📄 package.json        # Backend dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/RakshitRajVIT/MedicalBotAssistant.git
cd MedicalBotAssistant
```

#### 2. Install Frontend Dependencies

```bash
npm install
```

#### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 4. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

### Running the Application

#### Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:3000`

#### Start the Frontend Development Server

In a new terminal:

```bash
# From the root directory
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 📡 API Endpoints

### POST `/chat`

Send a message to the AI assistant.

**Request Body:**
```json
{
  "message": "What are the symptoms of a common cold?"
}
```

**Response:**
```json
{
  "reply": "Common cold symptoms typically include..."
}
```

---

## ⚙️ Configuration

### Frontend Configuration

The frontend is configured to connect to the backend API. Update the API URL in `src/components/MedicalChatbot.jsx` if needed:

```javascript
const res = await fetch("http://localhost:3000/chat", {
  // ...
});
```

### Tailwind CSS

Customize the design in `tailwind.config.js`:

```javascript
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ Yes |
| `PORT` | Backend server port | ✅ Yes |

---

## 📜 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

### Backend

| Command | Description |
|---------|-------------|
| `npm start` | Start the server |

---

## ⚠️ Disclaimer

> **Important:** This AI assistant provides **general health information only**. It is **not a substitute for professional medical advice, diagnosis, or treatment**. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rakshit Raj** & **Aryan Amit Arya**

- GitHub: [@RakshitRajVIT](https://github.com/RakshitRajVIT) [@RelaxItsAryan](https://github.com/RelaxItsAryan)

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for the GPT API
- [React](https://react.dev/) for the frontend framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling utilities
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the blazing fast build tool

---

<div align="center">

Made with ❤️ for better healthcare accessibility

**⭐ Star this repo if you find it helpful!**

</div>

