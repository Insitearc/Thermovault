import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "ThermoVault Systems — Securing the Cold Chain Ecosystem",
  description: "Advanced Cold Storage & Refrigeration Solutions. Engineered for performance. Built for reliability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white">
        {children}

        {/* Floating Sticky WhatsApp Button */}
        <a
          href="https://wa.me/918055010620?text=Hi%20ThermoVault,%20I%20have%20a%20project%20inquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 hover:bg-emerald-600 hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.597-1.012-5.039-2.859-6.884C16.375 2.078 13.938.85 11.332.85c-5.412 0-9.815 4.399-9.818 9.804 0 1.637.472 3.197 1.368 4.578L2.004 21.05l5.856-1.534zm11.378-6.196c-.299-.15-1.765-.87-2.039-.97-.274-.1-.474-.15-.674.15-.2.3-.77.97-.945 1.17-.175.2-.35.225-.65.075-.3-.15-1.263-.465-2.407-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.018-.463.13-.61.134-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.674-1.62-.924-2.22-.244-.585-.492-.507-.674-.516-.174-.008-.374-.01-.574-.01-.2 0-.525.075-.8.375-.274.3-1.049 1.025-1.049 2.5 0 1.475 1.074 2.9 1.224 3.1.15.2 2.11 3.22 5.11 4.52.714.31 1.272.496 1.71.635.717.228 1.37.196 1.885.12.573-.085 1.765-.72 2.014-1.42.25-.7.25-1.3.175-1.42-.075-.12-.275-.22-.575-.37z"/>
          </svg>
        </a>
      </body>
    </html>
  );
}
