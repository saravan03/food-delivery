const db = require("../models");
const config = require("config");

const Cryptr = require("cryptr");
const cryptr = new Cryptr(config.get("cryptSecret"));

const jwt = require("jsonwebtoken");
const generator = require("generate-password");

const UserModel = db.User;

const { sendForgotPasswordMail } = require("../util/sendForgotPasswordMail");

module.exports = {
  addUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let emailExist = await UserModel.findOne({
        where: {
          email,
          isActive: true,
        },
      });
      if (emailExist) {
        return res.status(400).send({
          code: 400,
          status: "failed",
          message: "User already exist. Please sign-in.",
        });
      }

      let createUser = await UserModel.create({
        name,
        email,
        password: cryptr.encrypt(password),
      });
      if (createUser) {
        return res.status(201).send({
          code: 201,
          status: "success",
          message: "User created successfully.",
        });
      } else {
        return res.status(500).send({
          code: 500,
          status: "failed",
          message: "Sorry, an error occurred on the server.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        code: 500,
        status: "failed",
        message: "Sorry, an error occurred on the server.",
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let emailExist = await UserModel.findOne({
        where: {
          email,
          isActive: true,
        },
        raw: true,
      });
      if (!emailExist) {
        return res.status(404).send({
          code: 404,
          status: "failed",
          message: "User not found.",
        });
      }
      if (password == cryptr.decrypt(emailExist.password)) {
        const accessToken = generateJWT(emailExist);
        const refreshToken = generateJWTRefreshToken(emailExist);
        let updateUser = await UserModel.update(
          {
            refreshToken,
          },
          {
            where: {
              id: emailExist.id,
            },
          }
        );

        delete emailExist.password;
        delete emailExist.refreshToken;
        return res.status(201).send({
          code: 201,
          message: "Login Success",
          user: { ...emailExist, accessToken, refreshToken },
        });
      } else {
        return res.status(403).send({
          code: 403,
          status: "failed",
          message: "Incorrect password.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        code: 500,
        status: "failed",
        message: "Sorry, an error occurred on the server.",
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userData = req.userData;
      let userExist = await UserModel.findOne({
        where: {
          email: userData.email,
          isActive: true,
        },
        raw: true,
      });

      if (!userExist) {
        return res.status(404).send({
          code: 404,
          status: "failed",
          message: "User not found.",
        });
      }

      if (oldPassword == newPassword) {
        return res.status(400).send({
          code: 400,
          status: "failed",
          message: "Old and new passwords can't be same.",
        });
      }

      if (oldPassword == cryptr.decrypt(userExist.password)) {
        let updateUser = await UserModel.update(
          {
            password: cryptr.encrypt(newPassword),
          },
          {
            where: {
              id: userExist.id,
            },
          }
        );
        return res.status(200).json({
          code: 200,
          message: "Password changed successfully",
        });
      } else {
        return res.status(403).send({
          code: 403,
          status: "failed",
          message: "Invalid existing password.",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        code: 500,
        status: "failed",
        message: "Sorry, an error occurred on the server.",
      });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      let userExist = await UserModel.findOne({
        where: {
          email: email,
          isActive: true,
        },
        raw: true,
      });

      if (!userExist) {
        return res.status(404).send({
          code: 404,
          status: "failed",
          message: "User not found.",
        });
      }
      let newPassword = generator.generate({
        length: 10,
        numbers: true,
        excludeSimilarCharacters: true,
      });

      let updateUser = await UserModel.update(
        {
          password: cryptr.encrypt(newPassword),
        },
        {
          where: {
            id: userExist.id,
          },
        }
      );
      await sendForgotPasswordMail({ to: email, password: newPassword });
      return res.status(200).json({
        code: 200,
        message:
          "A new password has been sent to your emailId. Please use the password to login and then change password",
        password: newPassword,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        code: 500,
        status: "failed",
        message: "Sorry, an error occurred on the server.",
      });
    }
  },
};
//generate acess token
const generateJWT = (user, expiry = null) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    },
    config.get("JwtKey"),
    {
      expiresIn: expiry ? expiry : config.get("AccessTokenExpiry"),
    }
  );
};

//generate refresh token
const generateJWTRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
    },
    config.get("JwtRefreshKey"),
    {
      expiresIn: config.get("RefreshTokenExpiry"),
    }
  );
};
