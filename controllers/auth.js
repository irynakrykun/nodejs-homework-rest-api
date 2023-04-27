const { HttpError } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require('fs/promises');
const Jimp = require('jimp');

require("dotenv").config();
const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname,'../','public','avatars')

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "98h" });
    console.log(token);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getCurrent = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;

    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json({
      message: "No Content",
    });
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
     const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    (await Jimp.read(tempUpload)).resize(250, 250)
    const fileName = `${_id}_${originalname}`
    const resultUpload = path.join(avatarsDir, fileName);
      await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', fileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    })
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
