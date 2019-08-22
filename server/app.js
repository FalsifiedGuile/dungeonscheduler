const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose")
const userRoutes = require("./routes/user");
const userScheduleRoutes = require("./routes/user-schedule");

app.use(cors())
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb://localhost:27017/dungeonscheduler", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
mongoose.set('useCreateIndex', true);

app.post('/api/posts', (req, res, next) => {
  const posts = req.body.username;
  console.log(posts);
  res.status(201).json({
    message: 'Post added successfuly'
  });
});

// app.use("/", (req, res, next) => {
//   console.log(req.url);
//   res.status(200).json({
//     message: "Posts fetched succesfully!",
//   });
// });
app.use("/api/schedule", userScheduleRoutes);
app.use("/api/user", userRoutes);

module.exports = app;