
const express = require("express");
const c = require("../controllers/book.controller");
const router = express.Router();

router.get("/", c.getAll);
router.get("/:bookId", c.getOne);
router.post("/", c.create);
router.put("/:bookId", c.update);
router.delete("/:bookId", c.remove);

module.exports = router;
