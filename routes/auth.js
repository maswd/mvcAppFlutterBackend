const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();
// signup api endpoint
authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        msg: "کاربر با ایمیل از قبل وجود دارد",
      });
    }
    // اعتبارسنجی طول پسورد قبل از هش کردن
    if (password.length < 8) {
      return res.status(400).json({
        msg: "پسورد باید حداقل 8 کاراکتر باشد",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);

      // ایجاد کاربر جدید با پسورد هش شده
      let user = new User({
        fullName,
        email,
        password: hashedPassword,
      });
      user = await user.save();

      // ارسال پاسخ با جزئیات کاربر جدید (بدون پسورد)
      res.json({
        user,
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// signin api endpoint

authRouter.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ msg: "کاربر با این ایمیل پیدا نشد" });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        res.status(404).json({ msg: "رمز عبور نامعتبر" });
      } else {
        const token = jwt.sign({ id: findUser._id }, "passwordKey");
        // remove sensitive information
        const { password, ...userWithoutPassword } = findUser._doc;
        //send the response
        res.json({ token, ...userWithoutPassword });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = authRouter;
