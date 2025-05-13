import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/Common/theme-provider";
import Navbar from "@/components/Landing/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Ed-Cred",
  description:
    "Your Trusted Platform for Honest Feedbacks. With stellar one-click reports and unmatched support, see how Circle will make a difference in your business.",
};

const inter = Geist({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased max-w-screen overflow-x-hidden bg-background relative`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
