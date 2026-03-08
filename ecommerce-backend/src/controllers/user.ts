import { DefaultController } from "../types/express/controller";
import { default as User } from '../models/user';
import { NotFoundError, BadRequestError } from "../errors";
import { StatusCodes } from "http-status-codes";

const isProduction: boolean = process.env.NODE_ENV === "production";

const loginUser: DefaultController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new BadRequestError("Please provide both email and password");

  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("Invalid Credentials");

  const isVerified: boolean = await user.verifyPassword(password);
  if (!isVerified) throw new NotFoundError("Invalid Credentials");

  const token: string = user.generateJwt();

  res.cookie("authCookie", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 1 * 60 * 60 * 1000
  });

  res.status(StatusCodes.OK).json({
    status: "Success",
    user: {
      name: user.name
    }
  });
}

const registerUser: DefaultController = async (req, res) => {
  const user = await User.create(req.body);

  const token: string = user.generateJwt();

  res.cookie("authCookie", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    maxAge: 1 * 60 * 60 * 1000
  });

  res.status(StatusCodes.CREATED).json({
    status: "Success",
    user: {
      name: user.name
    }
  });
}

const logoutUser: DefaultController = async (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax"
  });

  res.status(StatusCodes.OK).json();
}

export {
  loginUser,
  registerUser
}