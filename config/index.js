"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      // 配置跨域
      "/api": {
<<<<<<< HEAD
<<<<<<< HEAD
        target: "http://192.168.1.244:8080/",
=======
        // target: "http://192.168.2.180:8090/",
        target: "http://192.168.1.244:8090/",
        // target: "http://192.168.1.22:8182/",
>>>>>>> 09a5de415a2bbec1ac4ee1df983057e213c0ba2e
=======
        // target: "http://192.168.2.180:8090/",//刘永坤
        target: "http://192.168.1.244:8090/",//伟伟
        // target: "http://192.168.1.22:8182/",//服务器
        // target: "http://192.168.2.126:8090/",//天亮
>>>>>>> 8a119a715a6f732477686337d1dbc890901a6d49
        // ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/dev-api": {
        // target: "http://192.168.2.180:8090/",//刘永坤
        target: "http://192.168.1.244:8090/",//伟伟
        // target: "http://192.168.1.22:8182/",//服务器
        // target: "http://192.168.2.126:8090/",//天亮
        // ws: true,
        changOrigin: true,
      }
    },

    // Various Dev Server settings
    host: "localhost", // can be overwritten by process.env.HOST
    // host: "192.168.2.106", // can be overwritten by process.env.HOST
    // host: "192.168.2.93", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
