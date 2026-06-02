import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import ScrollProgress from "@/components/layout/ScrollProgress";
import ScrollToTop from "@/components/layout/ScrollToTop";
import MicroInteractions from "@/components/ui/MicroInteractions";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ThermoVault Systems — Securing the Cold Chain Ecosystem",
  description:
    "Advanced Cold Storage & Refrigeration Solutions. Engineered for performance. Built for reliability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white relative">
        <ScrollProgress />
        <ScrollToTop />
        <MicroInteractions />
        {children}

        {/* Floating Sticky Social Media Dock */}
        <div className="fixed bottom-24 right-6 z-50 flex flex-col gap-2.5 items-center select-none">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ominaikade0106?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-700/50 text-cyan-400 shadow-lg hover:shadow-cyan-500/25 hover:border-cyan-500/50 hover:bg-[#0a66c2] hover:text-white hover:scale-110 transition-all duration-300"
            title="LinkedIn"
          >
            <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/thermovault_systems?igsh=NTh3b2lrZ3VhdnA2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-700/50 text-[#e4405f] shadow-lg hover:shadow-orange-500/25 hover:border-orange-500/50 hover:bg-[#e4405f] hover:text-white hover:scale-110 transition-all duration-300"
            title="Instagram"
          >
            <svg className="h-4.5 w-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/profile.php?id=100067437094413"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 border border-slate-700/50 text-blue-400 shadow-lg hover:shadow-blue-500/25 hover:border-blue-500/50 hover:bg-[#1877f2] hover:text-white hover:scale-110 transition-all duration-300"
            title="Facebook"
          >
            <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>

        {/* Floating Sticky WhatsApp Button */}
        <a
          href="https://wa.me/918055010620?text=Hi%20ThermoVault,%20I%20have%20a%20project%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.597-1.012-5.039-2.859-6.884C16.375 2.078 13.938.85 11.332.85c-5.412 0-9.815 4.399-9.818 9.804 0 1.637.472 3.197 1.368 4.578L2.004 21.05l5.856-1.534zm11.378-6.196c-.299-.15-1.765-.87-2.039-.97-.274-.1-.474-.15-.674.15-.2.3-.77.97-.945 1.17-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.407-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.018-.463.13-.61.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.62-.924-2.22-.244-.585-.492-.507-.674-.516-.174-.008-.374-.01-.574-.01-.2 0-.525.075-.8.375-.274.3-1.049 1.025-1.049 2.5 0 1.475 1.074 2.9 1.224 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.71.635.717.228 1.37.196 1.885.12.573-.085 1.765-.72 2.014-1.42.25-.7.25-1.3.175-1.42-.075-.12-.275-.22-.575-.37z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
