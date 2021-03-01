// node imports
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");

// create express app
const app = express();

// constants
const PORT = 3000 || process.env.PORT;

// set up body parser - parse json data
app.use(express.json({ extended: false }));

// add header to all responses - allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// use helmet to set standard http headers for security
app.use(helmet());
app.use(compression());

// TODO: implement routes
app.use("/auth", require("./routes/auth"));

// route not found
app.use("/", (req, res, next) => {
  res.status(404).json({ message: "route not found" });
});

// handling errors
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({ message });
});

// start server
mongoose
  .connect(process.env.MDB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  });
