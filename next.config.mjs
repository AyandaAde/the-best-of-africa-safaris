/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "aceternity.com",
            },
            {
                hostname: "assets.aceternity.com",
            },
            {
                hostname: "images.unsplash.com",
            },
            {
                hostname: "demo.artureanec.com",
            },
            {
                hostname: "plus.unsplash.com",
            },
            {
                hostname: "img.clerk.com",
            },
            {
                hostname: "the-best-of-africa-safaris.s3.us-east-2.amazonaws.com",
            },
            {
                hostname: "unsplash.com",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ["three"],
};

export default nextConfig;
