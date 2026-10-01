/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.60.202.137'],
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;
