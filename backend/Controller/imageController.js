const User = require("../Model/UserModel");
const FormData = require("form-data");
const axios = require("axios");
exports.generateImage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { prompt } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does not exists",
      });
    }
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please Enter some prompt",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No Credit Balance",
      });
    }

    const formData = new FormData();

    formData.append("prompt", prompt);

    const { data } = await axios.post(process.env.GEN_IMAGE_URL, formData, {
  headers: {
    ...formData.getHeaders(), // ✅ Important for multipart/form-data
    "x-api-key": process.env.CLIPDROP_API,
  },
  responseType: "arraybuffer",
});


    const base64Image = Buffer.from(data,'binary').toString('base64')
    const resultImage = `data:image/png;base64,${base64Image}`

    await User.findByIdAndUpdate(
  userId,
  { $inc: { creditBalance: -1 } }, // ✅ Cleaner way to decrement
  { new: true }
);

    res.status(200).json({
        success:true,
        message:"Image Generated",
        data:resultImage
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
