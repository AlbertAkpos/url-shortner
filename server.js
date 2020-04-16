const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
//import controllers
const {
  createShortLink,
  openShortLink,
} = require("./controllers/url.controller");

const app = express();

//connect to database
db.connect();

//Use body-parser to parse incoming request
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.post("/createShortLink", createShortLink);

//route to open short link, ':' means unique name is a param
app.get("/:unique_name", openShortLink);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
