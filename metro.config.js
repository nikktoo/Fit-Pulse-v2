const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'web-streams-polyfill/ponyfill/es6') {
    const path = require('path');
    const filePath = path.resolve(__dirname, 'node_modules/web-streams-polyfill/dist/ponyfill.es6.js');
    return { type: 'sourceFile', filePath };
  }
  if (platform === 'web' && moduleName === 'zustand/middleware') {
    const path = require('path');
    const filePath = path.resolve(__dirname, 'node_modules/zustand/middleware.js');
    return { type: 'sourceFile', filePath };
  }
  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });

