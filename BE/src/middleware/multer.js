import multer from "multer"
export const customExtensions = {
  image: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"],
}
export function Multer(allowedExtensions = []) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (!allowedExtensions.includes(file.mimetype)) {
      cb(new Error("invalid file type"), false);
    } else {
      cb(null, true);
    }
  }
  const uploads = multer({ storage, fileFilter });
  return uploads;
}