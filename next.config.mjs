/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
            protocol: 'https',
            hostname: 'andrew0028-nextjs-demo-users-image.s3.us-east-2.amazonaws.com',
            port: '',
            pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
