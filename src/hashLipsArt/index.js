const { startCreating, buildSetup } = require("./src/main.js");

const imageGenerator = (config) => {
  return new Promise(async (resolve, reject) => {
    try {
      buildSetup(config);
      const img = await startCreating();
      const data = img.map(({res}) => {
        return res
      })
      resolve({ message: "Success!", data });
    } catch (error) {
      reject(new Error("Fail!"));
    }
  });
};

module.exports = imageGenerator;
