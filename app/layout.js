import { Space_Grotesk } from "next/font/google";
import { AuthProvider } from './context/AuthContext';
import ThemeRegistry from './ThemeRegistry';
import Navbar from './components/Navbar';
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata = {
  title: "Flashcard SaaS - AI-Powered Learning",
  description: "Transform your text into interactive flashcards with AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className={spaceGrotesk.className}>
        <ThemeRegistry>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
