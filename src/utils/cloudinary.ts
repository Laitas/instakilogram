import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export function uploadImage(imageUploaded: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageUploaded, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
