const express = require("express");
const router = express.Router();

const {signUp, login, userCredits, logout} = require("../Controller/UserController");
const {userAuth} = require("../middleware/auth")
const {generateImage} = require("../Controller/imageController");
console.log("Entered Routes.js")
router.post("/login",login);
router.post("/signup",signUp);
router.get("/logout",logout)

router.get("/userCredits",userAuth,userCredits)

router.post("/generateImage",userAuth,generateImage);


module.exports = router;