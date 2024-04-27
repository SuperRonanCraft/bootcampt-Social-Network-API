const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

//Allow JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use(routes);

//Connect to database
db.once("open", () => {
  //Start express app
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});
