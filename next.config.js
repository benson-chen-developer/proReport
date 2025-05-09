module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['cdn.wnba.com'],
    },
    productionBrowserSourceMaps: true, //Lowkey shud remove this in prod
    eslint: {
        ignoreDuringBuilds: true
    },
    images: {
        domains: ['cdn.nba.com', 'img.mlbstatic.com', 'a.espncdn.com'],
    },
};