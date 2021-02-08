const express = require("express");
const router = express.Router();

const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createAt: "desc" }).limit(2);

    res.render("index", { books: books });
  } catch (error) {
    res.redirect("/");
  }
});

module.exports = router;
