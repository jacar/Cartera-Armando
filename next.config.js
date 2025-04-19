/** @type {import("next").NextConfig} */
const config = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["www.webcincodev.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuraciones específicas para el entorno de desarrollo
  devIndicators: {
    buildActivity: false, // Reducir animaciones que puedan causar problemas
  },
  // Deshabilitar etag para evitar problemas de caché en móviles
  generateEtags: false,
  // Optimizaciones para el servicio y SSL
  webpack: (config, { isServer }) => {
    config.stats = "verbose";
    
    // Configuraciones específicas para mejorar compatibilidad móvil
    if (!isServer) {
      // Optimizar bundling para mejor rendimiento en dispositivos móviles
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
        }
      };
    }
    
    return config;
  },
  output: "export",
  // Configuración optimizada para exportación estática
};

// Solo para desarrollo: configurar variables de entorno para aceptar certificados SSL autofirmados
// Esto ayuda con problemas de certificados en navegadores móviles
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

export default config;
