import { v2 as cloudinary } from 'cloudinary';

// Config must be deferred to request time — cloudinary.config() at module load
// runs before dotenv in ES modules (all imports are hoisted above the module body).
function getCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    const result = await getCloudinary().uploader.upload(dataUri, {
      folder:         'green-light-house',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });

    res.json({
      url:      result.secure_url,
      publicId: result.public_id,
      width:    result.width,
      height:   result.height,
    });
  } catch (err) {
    console.error('[Upload] error:', err.message);
    next(err);
  }
}

export async function deleteImage(req, res, next) {
  try {
    const { publicId } = req.body;
    if (!publicId) return res.status(400).json({ message: 'publicId required.' });
    await getCloudinary().uploader.destroy(publicId);
    res.json({ message: 'Image deleted.' });
  } catch (err) {
    next(err);
  }
}
