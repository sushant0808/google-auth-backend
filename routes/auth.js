const passport = require("passport");

const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaa")
})

router.get("/login-success", (req, res) => {
    console.log(req.cookies);
    console.log("req.user", req.user);
    if (req.user) {
        res.json({
            success: true,
            status: 200,
            message: "Google login successful",
            user: req.user
        })
    }

})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL)
})

router.get("/login-failed", (req, res) => {
    res.json({
        success: false,
        status: 401,
        message: "Google login failed"
    })
})

// CLIENT_URL = https://google-auth-frontend-fu47.vercel.app


console.log("done", process.env.CLIENT_URL)

router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }))
router.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login-failed"
}))

router.get("/auth/github", passport.authenticate("github", { scope: ["profile"] }))
router.get("/auth/github/callback", passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login-failed"
}))

module.exports = router