const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");



mongoose.connect("mongodb://localhost:27017/Project")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log('Connection Failed')
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
