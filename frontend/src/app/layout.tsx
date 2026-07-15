import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jay Kariya | Full-Stack Developer & CS Student Portfolio",
  description: "Personal portfolio website of Jay Kariya, B.Tech Computer Science student at PES University, Bengaluru. Showcasing software engineering projects, technical skills, and achievements.",
  keywords: ["Jay Kariya", "Software Engineer", "B.Tech Computer Science", "PES University", "Portfolio", "Full Stack Developer"],
  authors: [{ name: "Jay Kariya" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} style={{ scrollBehavior: "smooth" }}>
      <body>
        <ThemeProvider>
          {/* Animated Background Blobs for Glassmorphism pop */}
          <div className="bg-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

