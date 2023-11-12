/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'zbvpfnoetighqxshnraa.supabase.co',
            pathname: '**',
          }
        ],
      }
}

module.exports = nextConfig
