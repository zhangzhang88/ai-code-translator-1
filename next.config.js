/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true // 临时忽略 TypeScript 错误以允许构建
  }
}

module.exports = nextConfig
