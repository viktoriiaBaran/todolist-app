module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@store': './src/redux/store',
        },
      },
    ],
  ],
};
