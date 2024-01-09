/** @type {import('next').NextConfig} */
// const withTM = require("next-transpile-modules")(["@madzadev/image-slider"]);
// const withImages = require("next-images");

// exports.withImages(withTM());

const nextConfig = {
    images: {
        domains: ['picsum.photos'],
    },
    // withImages: withImages(withTM())
}

module.exports = nextConfig
