// app/layout.js
import './globals.css'; // Tailwind CSS
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './provider';
import {Outfit} from 'next/font/google';
// Importing global styles and fonts

export const metadata = {
  title: 'My App',
  description: 'An awesome app using Clerk and Tailwind',
};

const OutfitFont = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={OutfitFont.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
