const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

//set up view engine
app.set("view engine", "ejs");

//cookie
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

//initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

//setup routes
app.use("/auth", authRoutes);

//create routes
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});
