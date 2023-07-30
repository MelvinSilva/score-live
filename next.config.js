/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.flashscore.com",
      "cdn.dribbble.com",
      "st4.depositphotos.com",
      "resizer.enetpulse.com",
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
