var express = require("express");
var router = express.Router();
const saveFile = require("../multer/multer");
const { drive, uploadFile } = require("../commonFunction/drive");
/**
 * tdtoan 17.11.2021
 * hàm get data từ server google drive
 */
router.get("/", function (req, res, next) {
  res.send("trandcoan");
});
/**
 * tdtoan 17.11.2021
 * hàm post data lên google drive
 */
router.post("/upload", async (req, res) => {
  await saveFile(req, res, function (err) {
    if (err) {
      throw err;
    } else {
      let arrayFiles = req.files;
      if (arrayFiles.length) {
        let arrayPath = [];
        arrayFiles.forEach((x) => {
          let temp = {
            filePath: "..\\" + x.path,
            nameFile: x.originalname,
            mimeType: x.mimetype,
          };
          arrayPath.push(temp);
        });
        if (arrayPath.length > 0) {
          for (let i = 0; i < arrayPath.length; i++) {
            let item = arrayPath[i];
            uploadFile(item.filePath, item.nameFile, item.mimeType);
          }
        }
      }
    }
  });
  return res.json({ status: "OK", uploaded: req.files.length });
});
module.exports = router;
