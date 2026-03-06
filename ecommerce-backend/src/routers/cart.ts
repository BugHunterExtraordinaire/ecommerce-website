import { Router } from "express";
import { 
  getUserCart, 
  deleteUserCart, 
  updateUserCart, 
  createUserCart 
} from "../controllers/cart";
import { authorizeUser, validateProduct } from "../middleware";

const router = Router();

router.route('/').get(authorizeUser, getUserCart)
                 .delete(authorizeUser, deleteUserCart);
router.route('/:productId').patch([authorizeUser, validateProduct], updateUserCart)
                           .post([authorizeUser, validateProduct], createUserCart);

export default router;