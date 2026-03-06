import { Router } from "express";
import { 
  getUserCart, 
  deleteUserCart, 
  updateUserCart
} from "../controllers/cart";
import { authorizeUser, validateProduct } from "../middleware";

const router = Router();

router.route('/').get(authorizeUser, getUserCart)
                 .delete(authorizeUser, deleteUserCart);
router.route('/:productId').post([authorizeUser, validateProduct], updateUserCart);

export default router;