const imageGenerator = require('../../hashLipsArt')
export default async function handler(req, res) {
  try {
    const result = await imageGenerator(req.body)
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json(error);
  }
}
