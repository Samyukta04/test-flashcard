
# Flashcard SaaS - AI-Powered Learning Platform

> Built by **Samyukta04**

A modern, full-stack flashcard application built with Next.js 15 that uses AI to automatically generate flashcards from text. Features a sleek, dark glassmorphic UI with smooth animations and real-time database synchronization.

Link : https://test-flashcard.vercel.app/
## ✨ Features

- **AI-Powered Generation** - Automatically create flashcards from any text using Groq AI (Llama 3.1)
- **Interactive Flashcards** - Smooth 3D flip animations with modern card design
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
git clone https://github.com/Samyukta04/test-flashcard.git
cd test-flashcard
```

2. Install dependencies
```
npm install --legacy-peer-deps
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
├── .env.local                 # Environment variables (not tracked)
└── package.json
```

## 🎯 Usage

1. **Sign In** - Click "Get Started" and sign in with Google
2. **Generate Flashcards**:
   - Navigate to the "Generate" page
   - Paste your study text
   - Click "Generate Flashcards"
3. **Save Collection** - Name and save your flashcard set
4. **Study** - Click on any flashcard to flip and reveal the answer

## 🎨 Design Features

- Dark theme with animated gradient backgrounds
- Glassmorphic UI elements with backdrop blur
- Smooth 3D flip animations
- Responsive bento-grid layout
- Interactive hover effects
- Modern typography

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_*` | Firebase project configuration |
| `GROQ_API_KEY` | Groq AI API key for flashcard generation |

## 🚀 Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
