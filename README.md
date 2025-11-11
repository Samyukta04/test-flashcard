
# Flashcard SaaS - AI-Powered Learning Platform

A modern, full-stack flashcard application built with Next.js 15 that uses AI to automatically generate flashcards from text or PDF documents. Features a sleek, dark glassmorphic UI with smooth animations and real-time database synchronization.

## ✨ Features

- **AI-Powered Generation** - Automatically create flashcards from any text using Groq AI (Llama 3.1)
- **PDF Support** - Upload PDF files and extract text to generate flashcards
- **Interactive Flashcards** - Smooth flip animations with modern card design
- **User Authentication** - Secure Google Sign-In with Firebase
- **Cloud Storage** - Save and organize flashcard collections in Firebase Firestore
- **Responsive Design** - Beautiful, mobile-friendly interface with glassmorphic effects
- **Real-time Sync** - Access your flashcards across all devices

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15.5
- React 19
- Material-UI (MUI)
- CSS3 with custom animations

**Backend:**
- Next.js API Routes
- Firebase Authentication
- Firebase Firestore
- Groq AI API

**Additional Libraries:**
- react-pdftotext - PDF text extraction
- groq-sdk - AI flashcard generation
- firebase - Authentication & Database

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Groq API account

### Installation

1. Clone the repository
```
git clone <your-repo-url>
cd flashcard-saas
```

2. Install dependencies
```
npm install
```

3. Create a `.env.local` file in the root directory:
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Groq API
GROQ_API_KEY=your_groq_api_key
```

4. Run the development server
```
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
flashcard-saas/
├── app/
│   ├── api/
│   │   └── generate/          # AI flashcard generation endpoint
│   ├── components/
│   │   └── Navbar.js          # Navigation component
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── flashcard/             # Individual flashcard view
│   ├── flashcards/            # Flashcard collections
│   ├── generate/              # Generate flashcards page
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page
│   └── firebase.js            # Firebase configuration
├── public/
├── .env.local                 # Environment variables
└── package.json
```

## 🎯 Usage

1. **Sign In** - Click "Get Started" and sign in with Google
2. **Generate Flashcards**:
   - Navigate to the "Generate" page
   - Either paste text or upload a PDF
   - Click "Generate Flashcards"
3. **Save Collection** - Name and save your flashcard set
4. **Study** - Click on any flashcard to flip and reveal the answer

## 🎨 Design Features

- Dark theme with animated gradient backgrounds
- Glassmorphic UI elements with backdrop blur
- Smooth 3D flip animations
- Responsive bento-grid layout
- Interactive hover effects
- Modern typography with Space Grotesk font

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase project configuration |
| `GROQ_API_KEY` | Groq AI API key for flashcard generation |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
