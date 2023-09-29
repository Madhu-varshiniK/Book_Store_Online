const express = require("express");
const router = express.Router();
const Book = require("../model/Book")
const booksController =  require("../controllers/books-controller")


router.get("/", booksController.getAllBooks);
router.post("/", booksController.addBook);
router.get("/:id", booksController.getId);
router.put("/:id",booksController.updateBook);
router.delete("/:id",booksController.deleteBook);

module.exports = router;