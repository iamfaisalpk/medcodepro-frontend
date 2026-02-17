import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";
import { AuthInitializer } from "@/components/shared/AuthInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "MedCodePro Academy | Professional Medical Coding Mastery",
    template: "%s | MedCodePro Academy",
  },
  description: "Master medical coding with MedCodePro Academy. Professional courses, interactive quizzes, and career tracking for coders.",
  keywords: ["medical coding course", "ICD-10", "CPT", "CPC Exam prep", "medical billing training"],
  authors: [{ name: "MedCodePro Team" }],
  creator: "MedCodePro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://medcodepro-frontend.vercel.app",
    siteName: "MedCodePro",
    title: "MedCodePro | Medical Coding Excellence",
    description: "Streamline your medical coding workflow with our AI-powered platform.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MedCodePro",
    description: "Medical Coding Management made simple.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#6A89A7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-outfit antialiased bg-[#f8fafc] text-[#384959]">
        <Providers>
          <AuthInitializer>
            {children}
          </AuthInitializer>
        </Providers>
      </body>
    </html>
  );
}
