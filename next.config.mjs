import legacyCss from './scripts/legacy-css.cjs';
import { createRequire } from 'node:module';
const legacyColorRules = createRequire(import.meta.url)('./scripts/legacy-css-colors.json');

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.optimization.realContentHash = true;
      config.plugins.push(new legacyCss.LegacyCssColorsPlugin(legacyColorRules));
    }
    return config;
  },
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
