// node imports
const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");

// create express app
const app = express();

// constants
const PORT = process.env.PORT || 3000;

// set up body parser - parse json data
app.use(express.json({ extended: false }));

// add header to all responses - allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// use helmet to set standard http headers for security
app.use(helmet());
app.use(compression());

app.use("/auth", require("./routes/auth"));
app.use("/post", require("./routes/post"));
app.use("/user", require("./routes/user"));

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
