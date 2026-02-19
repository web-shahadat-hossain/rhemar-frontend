import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "@/components/layout/ClientLayout";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "RHEMAR Signature | Redefining Men’s Luxury",
  description: "Luxury menswear crafted with elegance and confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Script */}
        <Script
          strategy="afterInteractive"
          src="https://connect.facebook.net/en_US/fbevents.js"
        />
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            window.fbq = window.fbq || function() {
              fbq.callMethod ?
              fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
            };
            if (!window._fbq) window._fbq = fbq;
            fbq.push = fbq;
            fbq.loaded = true;
            fbq.version = '2.0';
            fbq.queue = [];
            fbq('init', '1344133067520736');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>

      <body
        className={`
          ${inter.variable}
          ${playfair.variable}
          ${cormorant.variable}
          bg-primary text-secondary antialiased
        `}
      >
        <div className="grain-overlay"></div>
        <AuthProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
