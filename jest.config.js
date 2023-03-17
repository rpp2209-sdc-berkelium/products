const config = {
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/*.{config}.*',
    '!**/coverage/**'
  ]
}

module.exports = config;