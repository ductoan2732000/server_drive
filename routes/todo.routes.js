const express = require("express");
const TodoController = require("../controller/todo.controller");
const router = express.Router();

router.get("/", (req, res) => TodoController.getAllTodos());
module.exports = router;

