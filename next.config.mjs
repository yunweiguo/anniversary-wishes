/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['react', 'react-dom']
  },
  images: { unoptimized: true },
  i18n: {
    locales: ['en-IN', 'hi-IN'],
    defaultLocale: 'en-IN'
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'interest-cohort=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
        ]
      }
    ]
  }
}

export default nextConfig

