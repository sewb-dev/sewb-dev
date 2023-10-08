/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\bcanvas\.node\b/,
      use: 'raw-loader',
    });
    return config;
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
};

module.exports = nextConfig;
