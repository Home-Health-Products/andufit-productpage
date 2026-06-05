import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.andupet.com',
      },
      {
        protocol: 'https',
        hostname: 'andupet.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
