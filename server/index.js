require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
