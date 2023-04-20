const { User } = require("../models/user");

// const { HttpError } = require("../helpers")

const register = async (res, req, next) => {
  try {
    // const { email, password } = req.body;
    const newUser = await User.create(req.body);

    res.status(201).json({
      user: {
        email: newUser.email,
        password: newUser.password,
        
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
