import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Notes App',
  description: 'A simple notes application',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="min-h-full flex flex-col bg-gray-100">
        <header className="w-full  shadow-sm bg-gray-50 py-4 mb-6">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold text-lime-950 hover:text-lime-900 transition-colors"
            >
              Notes App
            </Link>
          </div>
        </header>

        <main className="flex-grow">{children}</main>
        <footer className="w-full bg-gray-50 shadow-inner py-4 mt-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            Notes App. Damir Yakupov
          </div>
        </footer>
      </body>
    </html>
  );
}
