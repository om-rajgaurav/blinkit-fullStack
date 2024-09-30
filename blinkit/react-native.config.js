module.exports = {
  project: {
    ios: {},
    android: {}
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    "react-native-vector-icons": {
      platforms: {
        android: null,
        ios: null
      }
    }
  },
  transformer: {
    getTransformModulePath() {
      return require.resolve('react-native-typescript-transformer');
    },
    getSourceExts() {
      return ['ts', 'tsx', 'js', 'jsx'];
    }
  }
};
