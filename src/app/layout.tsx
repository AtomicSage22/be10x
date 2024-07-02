"use client";
import "./globals.css";
import React from 'react';



import { SessionProvider } from 'next-auth/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Name */}
          <p className="text-xl font-semibold mb-2">Dev Singh Chauhan</p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mb-4">
            {/* GitHub Profile */}
            <a href="https://github.com/AtomicSage22" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-300" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12a12.015 12.015 0 008.207 11.385c.6.11.823-.26.823-.577 0-.286-.011-1.045-.017-2.052-3.338.725-4.043-1.61-4.043-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.745.083-.73.083-.73 1.204.085 1.837 1.237 1.837 1.237 1.07 1.833 2.807 1.304 3.492.997.108-.775.419-1.304.763-1.603-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 016.003 0c2.291-1.552 3.3-1.23 3.3-1.23.654 1.653.242 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.624-5.479 5.92.43.372.814 1.107.814 2.231 0 1.611-.014 2.91-.014 3.307 0 .319.218.694.827.576A12.015 12.015 0 0024 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn Profile */}
            <a href="https://www.linkedin.com/in/dev-singh-chauhan-319592149/" target="_blank" className="text-gray-400 hover:text-white transition-colors duration-300" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 12.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.45-2.16 2.97v5.7h-3v-11h2.88v1.5h.04c.4-.75 1.39-1.54 2.86-1.54 3.06 0 3.63 2.01 3.63 4.63v6.41z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">© 2024 Dev Singh Chauhan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>  
        <Footer />
      </body>
    </html>
  );
}

