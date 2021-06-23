const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
require('dotenv').config();
console.log(process.env.GCLOUD_STORAGE_BUCKET);
const app = express();

app.use(cors({
  origin: "*"
}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// make image file static
app.use("/assets/avatars", express.static("app/assets/avatars"));

const db = require("./app/models");
