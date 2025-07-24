const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
   console.log("Called  Sing UP")
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //generate hashed password

    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only HTTPS in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Cross-origin allowed only in prod
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });
    res.status(200).json({
      success: true,
      message: "Signed in Successfully",
      token:token
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.login = async (req, res) => {
  console.log("Login function called");
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing Details",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    if(!await bcrypt.compare(password,user.password))
    {
        return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3h"});

    res.cookie("token",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 3 * 60 * 60 * 1000

    }).status(200).json({
        success:true,
        message:"Logged in Successfully",
        token:token
    })
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.userCredits = async (req, res) => {
   
  try{
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
        success:true,
        data:user
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.logout = async (req, res) => {
   
  try{
    res.clearCookie("token",{
      httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    }).status(200).json({
      success:true,
      message:"Log out Successfully"
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};