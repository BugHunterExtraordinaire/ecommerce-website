import { StatusCodes } from 'http-status-codes';
import { default as Cart } from '../models/cart';
import { default as Product } from '../models/product';
import { DefaultController } from "../types/express/controller";
import { BadRequestError, NotFoundError } from '../errors';

const createUserCart: DefaultController = async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findById(req.params.productId).select("_id price stock");

  if (!product || product.stock === 0) throw new NotFoundError("Product out of stock");
  if (product.stock < Number(quantity)) throw new BadRequestError("Not enough in stock");

  const cart = await Cart.create({
    userId: req.userId,
    products: [{
      productId: product._id,
      quantity: Number(quantity),
      price: product.price,
    }]
  });
  
  res.status(StatusCodes.CREATED).json(cart);
}

const getUserCart: DefaultController = async (req, res) => {

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