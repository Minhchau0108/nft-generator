const imageGenerator = require('../../hashLipsArt')
export default async function handler(req, res) {
  try {
    await imageGenerator(req.body)
    res.status(200).json({ message: "error" });
  } catch (error) {
    res.status(403).json({ message: "error" });
  }
}
