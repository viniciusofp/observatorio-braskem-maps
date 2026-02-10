import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath:
    process.env.NODE_ENV === 'development' ? '/observatorio-braskem-maps' : ''
};

export default nextConfig;
