var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require(`./routes/products`);
var flavoursRouter = require(`./routes/flavours`);
const cors = require("cors");
var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.DEV_DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to mongoDB");
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const allowedOrigins =
  process.env.CLIENTSCORS_ALLOWED_ORIGINS.split(",") ||
  process.env.DEV_CORS_ALLOWED_ORIGINS.split(",");
app.use(
  cors({
    origin: allowedOrigins,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/flavours", flavoursRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
