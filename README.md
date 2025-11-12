This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
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
