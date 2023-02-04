/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'lh3.googleusercontent.com', 'upload.wikimedia.org'],
  },
};

module.exports = nextConfig;
