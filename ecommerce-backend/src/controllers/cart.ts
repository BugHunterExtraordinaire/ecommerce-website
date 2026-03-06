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

  await cart.save();

  res.status(StatusCodes.CREATED).json(cart);
}

const getUserCart: DefaultController = async (req, res) => {
  const cart = await Cart.findOne({
    userId: req.userId
  });
  if (!cart) throw new NotFoundError(`No cart was found for user: ${req.userId}`);

  await cart.save();

  res.status(StatusCodes.OK).json(cart);
}

const updateUserCart: DefaultController = async (req, res) => {
  const { userId, product } = req;

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new NotFoundError("No cart was found for this user");

  if (cart.products.some(productItem => productItem.productId === product!.productId)) {
    const index: number = cart.products.findIndex((productItem) => productItem.productId === product!.productId);
    if (req.query.removeItem && Boolean(req.query.removeItem) === true) {
      cart.products.splice(index, 1);
    } else if (cart.products[index].quantity !== product!.quantity) {
      cart.products[index].quantity = product!.quantity;
    }
  } else {
    cart.products.push({
      productId: product!.productId,
      price: product!.price,
      quantity: product!.quantity
    });
  }

  await cart.save();

  res.status(StatusCodes.OK).send();
}

const deleteUserCart: DefaultController = async (req, res) => {
  const user = await Cart.findOneAndDelete({
    userId: req.userId
  });
  if (!user) throw new NotFoundError("No cart was found for this user");

  res.status(StatusCodes.OK).send();
}

export {
  getUserCart,
  updateUserCart,
  deleteUserCart,
  createUserCart
}