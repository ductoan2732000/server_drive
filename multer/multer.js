// tdtoan : 14.11.2021 sử dụng thư viện multer để lưu file gửi từ client lên
// let multer = require("multer");
// let storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "file_uploads");
//   },
//   filename: (req, file, callback) => {
//     const { originalname } = file;

//     callback(null, originalname);
//   },
// });
// let upload = multer({ storage });
// module.exports = upload;


const express = require("express");
const todoRouter from "./todo.routes";

const apiRoute = express();

apiRoute.use("/todo", todoRouter);

export default apiRoute;
