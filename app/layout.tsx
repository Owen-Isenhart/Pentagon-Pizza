// app/layout.tsx

import type { Metadata } from "next";
import { Chakra_Petch, Silkscreen } from "next/font/google";
import "./globals.css";

// ok this is called oswald bc i was using it but then switched to this and didn't want to change all the variable names
const oswald = Silkscreen({
  weight: '400',
  variable: "--font-oswald",
  subsets: ["latin"],
});

// ok this is called ibm_mono bc i was using it but then switched to this and didn't want to change all the variable names
const ibm_mono = Chakra_Petch({
  weight: '400',
  variable: "--font-ibm-mono",
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Pentagon Pizza",
  description: "Is the Pentagon food court busy?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${ibm_mono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}