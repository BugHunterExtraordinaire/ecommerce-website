import { BadRequestError, NotFoundError } from '../errors';
import { default as Product } from '../models/product';
import { DefaultController } from "../types/express/controller";

const validateProduct: DefaultController = async (req, res, next) => {
  const product = await Product.findById(req.params.productId).select('_id price stock');

  if (!product || product.stock === 0) return next!(new NotFoundError("Product out of stock"));
  if (product.stock < Number(req.body.quantity)) return next!(new BadRequestError("Not enough in stock"));

  req.product = {
    productId: product._id,
    price: product.price,
    quantity: Number(req.body.quantity),
  }
  next!();
}

export default validateProduct;