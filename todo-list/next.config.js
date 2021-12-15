/**  @type {import('next').NextConfig}*/
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    API_KEY: "AIzaSyCtcpHjcnq4H--sBUkL3fv3MoM_tYDziLI",
    AUTH_DOMAIN: "todolist-96ace.firebaseapp.com",
    databaseURL: "https://todolist-96ace-default-rtdb.firebaseio.com",
    TDLST: "todolist-96ace",
    STORAGE_BUCKET: "todolist-96ace.appspot.com",
    MESSAGING_SENDER_ID: "596132177363",
    APP_ID: "1:596132177363:web:7e299cd168817ebeccfb26",
    MEASUREMENT_ID: "G-7CQPQ2ZG0P",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.https = "https-browserify";
    config.resolve.alias.http = "http-browserify";
    config.resolve.alias.zlib = "browserify-zlib";
    return config;
  },
};
