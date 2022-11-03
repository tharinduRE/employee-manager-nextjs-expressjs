module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ["ui"],
  },
  images: {
    domains: ['randomuser.me'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/employee/list',
        permanent: true,
      },
    ]
  },

};
