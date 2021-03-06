// tdtoan : 14.11.2021 sử dụng thư viện multer để lưu file gửi từ client lên
let multer = require("multer");
let folderSaveFile = require('../config/configSave');
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, folderSaveFile);
  },
  filename: (req, file, callback) => {
    const { originalname } = file;

    callback(null, originalname);
  },
});
let upload = multer({ storage });
let saveFile = upload.array("file");

module.exports = saveFile;

