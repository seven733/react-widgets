const path = require('path');

module.exports = async ({
  config,
  mode
}) => {
  config.module.rules.unshift({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  })

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['react-app', {
          flow: false
        }]
      ],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')

  config.externals = {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  }

  return config
};