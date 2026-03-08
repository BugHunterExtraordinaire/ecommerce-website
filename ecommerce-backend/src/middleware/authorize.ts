import jwt from 'jsonwebtoken';
import { DefaultController } from '../types/express/controller';
import { UnAuthenticatedError } from '../errors';

const authorizeUser: DefaultController = async (req, res, next) => {
  const token = req.cookies.authCookie;

  if (token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET as string);
      
      req.userId = payload as Express.Request["userId"];
      next!();
    } catch (error) {
      next!(new UnAuthenticatedError("Invalid token"));
    }
  } else {
    next!(new UnAuthenticatedError("No token issued"));
  }

}

export default authorizeUser;