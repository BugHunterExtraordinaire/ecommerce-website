import { StatusCodes } from 'http-status-codes';
import { default as Cart } from '../models/cart';
import { DefaultController } from "../types/express/controller";
import { NotFoundError } from '../errors';

const createUserCart: DefaultController = async (req, res) => {
  const { userId, product } = req;

  const cart = await Cart.create({
    userId: userId,
    products: [{
      productId: product!.productId,
      quantity: product!.quantity,
      price: product!.price,
    }]
  });

  res.status(StatusCodes.CREATED).json(cart);
}

const getUserCart: DefaultController = async (req, res) => {
  const cart = await Cart.findOne({
    userId: req.userId
  });
  if (!cart) throw new NotFoundError(`No cart was found for user: ${req.userId}`);

  res.status(StatusCodes.OK).json(cart);
}

const updateUserCart: DefaultController = async (req, res) => {

}

const deleteUserCart: DefaultController = async (req, res) => {

}

export {
  getUserCart,
  updateUserCart,
  deleteUserCart,
  createUserCart
}