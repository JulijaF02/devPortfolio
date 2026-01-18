import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700"] });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata = {
  title: "Julija Filipović | Game Developer",
  description: "Portfolio of Julija Filipović",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} ${spaceMono.variable} bg-slate-950 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900`}>
        {children}
      </body>
    </html>
  );
}
