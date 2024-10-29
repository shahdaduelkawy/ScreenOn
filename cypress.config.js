const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'e1f3n3',
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://dev.screenon.app',
  },
})
