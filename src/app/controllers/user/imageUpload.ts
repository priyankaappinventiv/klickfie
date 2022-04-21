import multer from "multer";
import path from "path";

const storage:multer.StorageEngine = multer.diskStorage({
  destination: `${__dirname}../../../../public/upload`,
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
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
  const filetypes:RegExp = /jpeg|jpg|png|gif/;
  const extname:boolean = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype:boolean = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}
export default upload;
