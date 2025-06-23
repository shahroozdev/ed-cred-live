import { Geist, Inter } from "next/font/google";
import "./globals.css";
import "react-quill-new/dist/quill.snow.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/Common/theme-provider";
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSideDataWithFeatures } from "@/actions/serverActions";
import { GlobalStore } from "@/hooks/generalHooks";
import GlobalStoreProvider from "@/lib/GlobalStore";

export const metadata = {
  title: "Ed-Cred",
  description:
    "Your Trusted Platform for Honest Feedbacks. With stellar one-click reports and unmatched support, see how Circle will make a difference in your business.",
  icons: {
    // icon: "/favicon.ico", // Standard favicon
    apple: [{ url: "/logo2.png", sizes: "180x180", type: "image/png" }],
  },
};

const inter = Geist({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const categories = await getServerSideDataWithFeatures({
    url: `/category`,
    key: "categories",
  });
  const schools = await getServerSideDataWithFeatures({
    url: "/school",
    key: "schools",
  });
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{metadata.title as ReactNode}</title>
        <meta name="description" content={metadata.description as string} />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo2.png" />
      </head>
      <body
        className={`${inter.variable} antialiased min-h-screen w-screen overflow-x-hidden bg-background relative`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <GlobalStoreProvider
              categories={categories?.categories}
              schools={schools}
            >
              {children}
            </GlobalStoreProvider>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
