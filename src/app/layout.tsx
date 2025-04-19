import React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/ui/page-transition";
import ClientSplashCursor from "@/components/ui/ClientSplashCursor";
import MobileOptimizer from "@/components/MobileOptimizer";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Armando Ovalle Jácome - Experto en Desarrollo Web WordPress y SEO",
  description:
    "Desarrollador web profesional especializado en WordPress, diseño UI/UX y optimización SEO. Más de 5 años de experiencia creando sitios web personalizados y tiendas online.",
  keywords:
    "desarrollo web, wordpress, diseño web, seo, tiendas online, ecommerce, diseño ui/ux, desarrollo frontend, optimización web, diseño responsivo",
  authors: [{ name: "Armando Ovalle Jácome" }],
  creator: "Armando Ovalle Jácome",
  publisher: "Armando Ovalle Jácome",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: [
    {
      rel: "icon",
      url: "https://pre-built-images.s3.amazonaws.com/webapp-uploads/de4bccb69ee4b23d94bd77b94912fbd6.png",
    },
  ],
  openGraph: {
    title: "Armando Ovalle Jácome - Experto en Desarrollo Web WordPress y SEO",
    description:
      "Desarrollador web profesional especializado en WordPress, diseño UI/UX y optimización SEO. Más de 5 años de experiencia creando sitios web personalizados y tiendas online.",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconectar con dominios externos para acelerar carga */}
        <link rel="preconnect" href="https://www.webcincodev.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Precargar imágenes críticas */}
        <link rel="preload" href="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1s.png" as="image" />
        <link rel="preload" href="https://www.webcincodev.com/blog/wp-content/uploads/2025/04/lofoweb2-1e.png" as="image" />
      </head>
      <body className="bg-background text-foreground overscroll-y-auto touch-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          {/* Optimizador unificado para rendimiento móvil */}
          <MobileOptimizer />
          
          {/* SplashCursor solo para escritorio */}
          <ClientSplashCursor />
          
          <Header />
          <main className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          
          {/* Script de optimización de rendimiento con prioridad afterInteractive */}
          {/* Script de optimización simplificado para evitar errores */}
          <Script
            id="performance-optimizations"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Optimizar comportamiento del scroll
                  document.documentElement.style.cssText += 'overflow-y: auto !important; overscroll-behavior-y: contain;';
                  document.body.style.cssText += 'overflow-y: auto !important; overscroll-behavior-y: contain;';
                  
                  // Función para cargar optimizaciones básicas
                  function applyBasicOptimizations() {
                    if (typeof window !== 'undefined') {
                      // Habilitar scroll y comportamiento táctil apropiado
                      document.documentElement.style.touchAction = 'auto';
                      document.body.style.touchAction = 'auto';
                      
                      // Asegurar que el scroll funcione en móviles
                      document.documentElement.style.overscrollBehavior = 'auto';
                      document.body.style.overscrollBehavior = 'auto';
                      
                      // Eliminar clases que puedan bloquear el scroll
                      document.body.classList.remove('overflow-hidden', 'fixed', 'no-scroll');
                    }
                  }
                  
                  // Aplicar optimizaciones básicas inmediatamente
                  applyBasicOptimizations();
                })();
              `
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
