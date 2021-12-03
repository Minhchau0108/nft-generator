const cloudinary = require('cloudinary').v2
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const cloudinaryImageUploadMethod = async file => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, {
      overwrite: true,
      invalidate: true,
      folder: 'nft'
    }, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res.secure_url)
    })
  })
}

module.exports = {cloudinaryImageUploadMethod}