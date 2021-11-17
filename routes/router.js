var express = require("express");
var router = express.Router();
const multer = require("../multer/multer");
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
router.post("/upload", multer.array("avatar"), (req, res) => {
  return res.json({ status: "OK", uploaded: req.files.length });
});
module.exports = router;




