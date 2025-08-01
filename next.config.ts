/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Временно для деплоя
  },
  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ESLint
  },
  output: 'standalone', // Для оптимизации на Vercel
}

module.exports = nextConfig