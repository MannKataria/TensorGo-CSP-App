const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect(process.env.GOOGLE_CLIENT_URL);
  });
});

module.exports = router;
// app.get("/", (req, res) => {
//   res.send("<h1><a href='/auth/google'>Login with Google</a></h1>");
// });

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res) => {
//     res.redirect("/profile");
//   }
// );

// app.get("/profile", (req, res) => {
//   res.send(
//     `<h1>Welcome ${req.user.displayName}</h1><br><h1><a href='/logout'>Logout</a></h1>`
//   );
// });

// app.get("/logout", (req, res) => {
//   req.logOut(() => {
//     res.redirect("/");
//   });
// });
