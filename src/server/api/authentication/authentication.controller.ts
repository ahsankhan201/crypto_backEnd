import { Request, Response } from "express";
import { jwtSecret } from "../../../configuration/connection";
import users from "./authentication.model";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/**
 * Sign up
 * @param req
 * @param res
 * @returns
 */
export const register = async function (req: any, res: Response) {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password required",
    });
  }

  const user = await users.findOne({
    email,
  });

  if (user) {
    return res.status(400).json({
      message: "Email Address Already Exist",
    });
  }
  const newUser = new users({
    email,
    password,
  });
  encryptPassword(newUser, res);
};

/**
 * Login
 * @param req
 * @param res
 */
export const login = async function (req: Request, res: Response) {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      message: "Cannot Login Required Email and Password",
    });
  }
  const user = await users.findOne({
    email: req.body.email,
  });
  if (user) {
    const isMatch = await comparePassword(req.body.password, user?.password);
    if (!isMatch) {
      res.status(400).json({
        message: " Invalid Email and Password",
      });
    } else {
      const expirationInSeconds = 24 * 60 * 60; // 24 hours in seconds
      // const expirationInSeconds = 2 * 60; // 2 minutes in seconds

      user.token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
        expiresIn: expirationInSeconds,
      });
      res.status(200).send({ user, message: "Sucessfully Logined" });
    }
  } else {
    res.status(404).json({
      message: "No User Found",
    });
  }
};

/**
 * Compare Password
 * @param password
 * @param hash
 * @returns
 */
const comparePassword = async function (password: string, hash: string) {
  return await bcrypt.compare(password, hash);
};

/**
 * Encrypt User Password
 * @param user
 * @param res
 */
const encryptPassword = async function (user: any, res: Response) {
  bcrypt.hash(user.password, 9, async function (err: any, hashedPassword: any) {
    if (err) {
      res.status(500).send(err);
    } else {
      user.password = hashedPassword;
      await user.save();
    return  res.status(201).json({ user, message: "Registration Successfull" });
    }
  });
};
