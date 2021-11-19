var express = require("express");
var router = express.Router();
const saveFile = require("../multer/multer");
const {
  drive,
  uploadFile,
  deleteFile,
  setFilePuclic,
} = require("../common/drive");
let { serviceResponse } = require("../common/serviceResponse");
const { route } = require(".");
/**
 * tdtoan 17.11.2021
 * hàm get data từ server google drive
 * ex:http://localhost:8888/api/get/1bbJDp1xTzexqkdN0BbVU3lgYFEh4PldN
 */
router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  let response = await drive.files.get({
    fileId: id,
    fields: "webViewLink, webContentLink",
  });
  return res.json(
    serviceResponse(response.data, response.statusText, response.status)
  );
});
/**
 * tdtoan 17.11.2021
 * hàm post data lên google drive
 *
 */
router.post("/upload", async (req, res) => {
  await saveFile(req, res, async function (err) {
    if (err) {
      return res.json(serviceResponse(err, "err", 500));
    } else {
      let arrayFiles = req.files;
      let data = [];
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
            let response = await uploadFile(
              item.filePath,
              item.nameFile,
              item.mimeType
            );
            if (response) {
              let fileId = response.data.id;
              if (fileId) {
                let resPublicFile = await setFilePuclic(fileId);
                if (resPublicFile) {
                  data.push(response.data);
                }
              }
            }
          }
        }
      }

      return res.json(serviceResponse(data, "OK", 200));
    }
  });
});
/**
 * tdtoan 19.11.2021
 * hàm xóa theo id
 * ex: http://localhost:8888/api/delete/1RxYFkVmCx7Eh_2M2x3fyJC5Lnwa8iJkx
 */
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  let response = await deleteFile(id);
  return res.json(
    serviceResponse(response.data, response.statusText, response.status)
  );
});
module.exports = router;
