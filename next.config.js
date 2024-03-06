// next.config.js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // 외부 이미지 호스트 불러오기
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
