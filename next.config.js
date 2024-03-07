// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/pokemon/:path*',
        destination: 'https://pokeapi.co/api/v2/:path*', // 포켓몬 API 프록시 설정
      },
    ];
  },
};

module.exports = nextConfig;
