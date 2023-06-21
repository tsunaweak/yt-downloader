require("dotenv").config({ path: __dirname + "/.env.local" });
const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");

const app = express();

// app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());



fs.readdirSync(`${__dirname}/routes/api`).forEach(function (file) {
  app.use("/api", require(`${__dirname}/routes/api/` + file));
});

fs.readdirSync(`${__dirname}/routes/web`).forEach(function (file) {
  app.use("/", require(`${__dirname}/routes/web/` + file));
});

const port = process.env.PORT || 3000;
app.listen(port || 3000, (err) => {
  if (err) process.exit();
  console.log(`Listening to port ${port}`);
});
