

const isLinux = process.platform === "linux";

// we don't use NODE_ENV == "production" because it causes errors with the next.js build process
const isOnProdServer = isLinux; // probably too much of a simplification!

const urlPrefix = isOnProdServer ? "/bebras" : "";

console.log(`Config: isLinux=${isLinux}, urlPrefix='${urlPrefix}'`);

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: urlPrefix,
  assetPrefix: urlPrefix,
  publicRuntimeConfig: {
    basePath: urlPrefix, // publish it for components
  },
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/tasks",
        permanent: true,
      },
    ];
  },

};

module.exports = nextConfig;
