/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com', 'task.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request'],
    serverActions: true,
  },
  // webpack5: true,
  // webpack: config => {
  //   config.resolve.fallback = { fs: false };
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
