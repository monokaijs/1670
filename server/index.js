const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const path = require("path");
const bcrypt = require("bcryptjs");

require('dotenv').config();

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '..' , 'public')));

require("./routes/auth.route")(app);
require("./routes/main.route")(app);

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '..' , 'public/index.html'));
});

mongoose.connect(process.env.DB_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the Database.");
  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  const Account = require("./models/account.model");
  const Role = require("./models/role.model");

  Account.findOne({
    username: "admin"
  }).then(async account => {
    if (!account) {
      const newRole = await Role.create({
        slug: "admin",
        title: "Administrator"
      });
      const account = await Account.create({
        username: "admin",
        fullName: "Administrator",
        gender: 1,
        email: "admin@example.com",
        dob: "2001/01/10",
        role: newRole._id,
        password: bcrypt.hashSync("admin", 8)
      });
      account.save().then(() => {
        console.log("Created admin account");
      });
    }
  })
});
