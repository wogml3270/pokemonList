/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"], // 외부 이미지 호스트 불러오기
  },
};

module.exports = nextConfig;
