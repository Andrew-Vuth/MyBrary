if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

//Routers
const indexRouter = require("./routes/index");
const authorsRouter = require("./routes/authors");
const booksRouter = require("./routes/books");

//Setting view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Setting layout path
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

// Database connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

// Identifying Routes
app.use("/", indexRouter);
app.use("/authors", authorsRouter);
app.use("/books", booksRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on ${PORT}........`));
