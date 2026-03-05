import jwt from 'jsonwebtoken';
import { DefaultController } from '../types/express/controller';
import { UnAuthenticatedError } from '../errors';

export const authorizeUser: DefaultController = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next!(new UnAuthenticatedError("Not authorized to access this route"));

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = payload as Express.Request["userId"];
    next!();
  } catch (error) {
    next!(new UnAuthenticatedError("Not authorized to access this route"));
  }

}