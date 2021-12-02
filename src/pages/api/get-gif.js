const rootPath = process.cwd();
const imageFolder = `${rootPath}/public/build/gifs`;
const fs = require("fs");
export default function handler(req, res) {
  const result = [];
  fs.readdirSync(imageFolder).forEach((file) => {
    const name = `build/gifs/${file}`;
    result.push(name);
  });
  res.status(200).json(result);
}
