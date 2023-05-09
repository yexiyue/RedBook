/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const MetroSymlinkResolve =require('@rnx-kit/metro-resolver-symlinks')
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver:{
    resolveRequest:MetroSymlinkResolve()
  }
};
