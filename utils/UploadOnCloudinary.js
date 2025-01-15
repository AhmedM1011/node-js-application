const cloudinary = require("cloudinary").v2;

const uploadOnCloudinary = async (files) => {
  console.log(files, "files in Cloudinary");

  try {
    if (Array.isArray(files)) {

      const uploadedResult = await Promise.all(
        files.map(async (file) => await cloudinary.uploader.upload(file.path))
      );
      console.log(uploadedResult, "upload result");

      return uploadedResult;
    } else {
      const result = await cloudinary.uploader.upload(files.path);
      return result.secure_url;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Cloudinary file upload went wrong");
  }
};

module.exports = uploadOnCloudinary;
