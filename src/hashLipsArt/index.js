const { startCreating, buildSetup } = require('./src/main.js');

(() => {
  buildSetup(config = {});
  startCreating();
})();
