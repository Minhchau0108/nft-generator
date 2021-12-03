const { startCreating, buildSetup } = require("./src/main.js");

const imageGenerator = (config) => {
  return new Promise(async (resolve, reject) => {
    try {
      buildSetup(config);
      const data = await startCreating();

      resolve({ message: "Success!", data });
    } catch (error) {
      reject(new Error("Fail!"));
    }
  });
};

module.exports = imageGenerator;
