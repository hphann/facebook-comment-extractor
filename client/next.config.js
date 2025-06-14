/** @type {import('next').NextConfig} */
const nextConfig = {
    // Không dùng proxy, để frontend gọi trực tiếp tới backend
    experimental: {
        serverComponentsExternalPackages: ['apify-client'],
    },
    staticPageGenerationTimeout: 300,
}

module.exports = nextConfig 