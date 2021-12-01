const basePath = `${process.cwd()}/src/hashLipsArt`;
const { startCreating, buildSetup } = require(`${basePath}/src/main.js`);

(() => {
  buildSetup();
  startCreating();
})();
