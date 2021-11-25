const path = require('path')

module.exports = {
  moduleDirectories: ["node_modules", path.join(__dirname, '../../', 'node_modules')],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    "\\.(css|less)$": "<rootDir>/__mocks__/cssMock.js",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
}