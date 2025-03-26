import React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/ui/page-transition";

export const metadata: Metadata = {
  title: "Armando Ovalle Jácome - Experto en Desarrollo Web WordPress y SEO",
  description: "Desarrollador web profesional especializado en WordPress, diseño UI/UX y optimización SEO. Más de 5 años de experiencia creando sitios web personalizados y tiendas online.",
  keywords: "desarrollo web, wordpress, diseño web, seo, tiendas online, ecommerce, diseño ui/ux, desarrollo frontend, optimización web, diseño responsivo",
  authors: [{ name: "Armando Ovalle Jácome" }],
  creator: "Armando Ovalle Jácome",
  publisher: "Armando Ovalle Jácome",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: [{ rel: "icon", url: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/de4bccb69ee4b23d94bd77b94912fbd6.png" }],
  openGraph: {
    title: "Armando Ovalle Jácome - Experto en Desarrollo Web WordPress y SEO",
    description: "Desarrollador web profesional especializado en WordPress, diseño UI/UX y optimización SEO. Más de 5 años de experiencia creando sitios web personalizados y tiendas online.",
    url: "https://www.webcincodev.com",
    siteName: "Armando Ovalle Jácome",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          <SplashCursor colorMode="dark" />
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
