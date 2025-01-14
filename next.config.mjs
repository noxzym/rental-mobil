/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                hostname: "*"
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    },
    async redirects() {
        return [
            {
                source: "/dashboard/manage",
                destination: "/dashboard/manage/car",
                permanent: true
            }
        ];
    }
};

export default nextConfig;
