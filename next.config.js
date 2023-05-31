/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.flashscore.com", "cdn.dribbble.com"],
  },
  env: { NEXT_PUBLIC_X_RAPIDAPI_KEY: process.env.NEXT_PUBLIC_X_RAPIDAPI_KEY },
};

module.exports = nextConfig;
