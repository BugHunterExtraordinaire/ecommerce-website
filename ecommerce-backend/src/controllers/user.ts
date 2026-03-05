import { DefaultController } from "../types/express";
import { default as User } from '../models/user';
import { NotFoundError, BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const loginUser: DefaultController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Please provide both email and password");

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("Invalid Credentials");

  const isVerified: boolean = await user.verifyPassword(password);
  if (!isVerified) throw new NotFoundError("Invalid Credentials");

  res.status(StatusCodes.OK).json({
    user
  });
}

const registerUser: DefaultController = async (req, res) => {

}

export {
  loginUser,
  registerUser
}