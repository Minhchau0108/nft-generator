const { startCreating, buildSetup } = require("./src/main.js");

const imageGenerator = (config) => {
  return new Promise((resolve, reject) => {
    try {
      buildSetup(config);
      startCreating();
      resolve({ message: "Success!" });
    } catch (error) {
      reject(new Error("Fail!"));
    }
  });
};

module.exports = imageGenerator;
