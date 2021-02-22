import cloudinary from 'cloudinary';
import multer from 'multer';
import DataUriParser from 'datauri/parser';
import path from 'path';

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const { uploader } = cloudinary;

const allowedImageFormats = ['.png', '.jpg', '.jpeg'];

const filter = (formats) => (_req, file, cb) => {
  if (file) {
    const fileExtension = path.extname(file.originalname).toString();
    if (!formats.includes(fileExtension)) {
      const error = new Error(['Unsupported file format']);
      error.status = 422;
      cb(error);
      return;
    }
  }
  cb(null, true);
};

const storage = multer.memoryStorage();
const multerUpload = (filterFile, format) => multer({ storage, fileFilter: filterFile(format) });
export const multerUploads = multerUpload(filter, allowedImageFormats);
const dUri = new DataUriParser();

/**
* @description This function converts the buffer to data uri
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = (file) => dUri.format(
  path.extname(file.originalname).toString(), file.buffer,
);

export const cloudinaryUpload = async (req, res, next) => {
  const { file } = req;
  try {
    if (file) {
      const { content } = dataUri(req.file);
      const { url } = await uploader.upload(content);
      req.body.avatar = url;
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
