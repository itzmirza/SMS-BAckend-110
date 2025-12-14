var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var schoolRouter = require("./routes/School");
var busRouter = require("./routes/Bus");
var driverRouter = require("./routes/Driver");

var app = express();
app.use(cors());

// app.js or index.js
const mongoose = require('mongoose');

const mongoDBUri = 'mongodb+srv://mudasirmaqbool161_db_user:6a1m8H8175tWNivh@development.gau35t7.mongodb.net/SuperAdmin'; // Replace with your URI

async function main() {
  await mongoose.connect(mongoDBUri);
  console.log('Connected to MongoDB!');
}

main().catch(err => console.error(err));


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/school", schoolRouter);
app.use("/bus", busRouter);
app.use("/driver", driverRouter);

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
