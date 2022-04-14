import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: `${__dirname}../../../../public/upload`,
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fields: 5,
    fieldNameSize: 50,
    fieldSize: 20000,
    fileSize: 15000000,
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
export default upload;
