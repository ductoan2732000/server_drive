// var express = require("express");
// var router = express.Router();
// const multer = require("../multer/multer");
// router.get("/", function (req, res, next) {
//   res.send("trandcoan");
// });
// router.post("/upload", multer.array("avatar"), (req, res) => {
//   return res.json({ status: "OK", uploaded: req.files.length });
// });
// module.exports = router;



const express = require("express");
const todoRouter = require("./todo.routes");

const apiRoute = express();

apiRoute.use("/todo", todoRouter);
module.exports = apiRoute;
