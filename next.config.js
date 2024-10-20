/** @type {import('next').NextConfig} */
const nextConfig = {
    // Qualquer configuração adicional que você tenha no nextConfig
  };
  
  module.exports = {
    ...nextConfig,
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080',  // Altere o destino para o seu serviço
        },
      ];
    },
  };
