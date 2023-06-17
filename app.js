const express = require("express");
require("./config/database").connect();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoos = require("mongoose");
const config = require("./config/config");
const routes = require("./routes/index");

//initiate express instance
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
//morgan logger
app.use(morgan("tiny"));
app.use("/api/v1/", routes);

app.listen(config.PORT, () => {
  console.log(`Listening at ${config.PORT}`);
});

app.all("*", (_req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;
