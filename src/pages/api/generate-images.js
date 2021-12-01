// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { exec } = require("child_process");

export default async function handler(req, res) {
  exec("node src/hashLipsArt/index.js", (error, data, getter) => {
    if (error) {
      res.status(403).json({ message: "error" });
      return;
    }
    res.status(200).json({ message: "OK" });
  });
}
