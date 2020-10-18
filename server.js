// Imports
const express = require("express");
const bodyParser = require("body-parser");
const apiRoutes = require("./router");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', apiRoutes);

app.get("/", function(request, result, next) {
  result.send("CS3219 OTOT Assignment Task B");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "...");
});

module.exports = app;