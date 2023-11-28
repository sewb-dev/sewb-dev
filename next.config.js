/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\bcanvas\.node\b/,
      use: 'raw-loader',
    });

    if (isServer) {
      config.resolve.alias.encoding = false;
      config.resolve.alias.canvas = false;
    }

    return config;
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
