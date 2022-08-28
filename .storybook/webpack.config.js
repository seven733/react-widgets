const path = require('path');

function removeLoaders(webpackConfig, matcher) {
  const result = removeLoadersRecursively(webpackConfig.module.rules, matcher)
  return {
    hasRemovedAny: result.removedCount > 0,
    removedCount: result.removedCount,
  }
}

function removeLoadersRecursively(rules, matcher) {
  const toRemove = []
  let removedCount = 0
  for (let i = 0, max = rules.length; i < max; i += 1) {
    const rule = rules[i]

    if (rule) {
      if (matcher(rule)) {
        toRemove.push(i)
      } else if (rule.use) {
        const result = removeLoadersRecursively(rule.use, matcher)
        removedCount += result.removedCount
        rule.use = result.rules
      } else if (rule.oneOf) {
        const result = removeLoadersRecursively(rule.oneOf, matcher)
        removedCount += result.removedCount
        rule.oneOf = result.rules
      }
    }
  }

  toRemove.forEach((ruleIndex, i) => {
    rules.splice(ruleIndex - i, 1)
  })

  return {
    rules,
    removedCount: removedCount + toRemove.length,
  }
}

function loaderByName(targetLoaderName) {
  return rule => {
    if (isString(rule.loader)) {
      return (
        rule.loader.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !== -1 ||
        rule.loader.indexOf(`@${targetLoaderName}${path.sep}`) !== -1
      )
    } else if (isString(rule)) {
      return (
        rule.indexOf(`${path.sep}${targetLoaderName}${path.sep}`) !== -1 ||
        rule.indexOf(`@${targetLoaderName}${path.sep}`) !== -1
      )
    }

    return false
  }
}

function isString(value) {
  return typeof value === 'string'
}


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
    // loader: require.resolve('swc-loader'),
    loader: require.resolve('babel-loader'),
    options: {
      presets: [
        ['react-app', {
          flow: false
        }]
      ],
    },
  })

  // removeLoaders(config, loaderByName('babel-loader'))

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