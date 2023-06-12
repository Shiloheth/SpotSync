import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SpotSync</title>
      </head>
      <body className={inter.className}>
        <div className="relative bg-[#000000]">{children}</div>
      </body>
    </html>
  );
}
