import './globals.css';

export const metadata = {
  title: 'Picturest',
  description: 'A Social media all about sharing your interests',
};

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
