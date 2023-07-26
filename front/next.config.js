/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images2.imgbox.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images2.imgbox.com',
        port: '/94',
      },
    ],
  },
}

module.exports = nextConfig
