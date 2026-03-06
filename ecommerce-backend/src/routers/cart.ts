import { Router } from "express";
import { 
  getUserCart, 
  deleteUserCart, 
  updateUserCart, 
  createUserCart 
} from "../controllers/cart";
import { authorizeUser } from "../middleware/authorize";

const router = Router();

router.route('/').get(authorizeUser, getUserCart)
                 .delete(authorizeUser, deleteUserCart);
router.route('/:productId').patch(authorizeUser, updateUserCart)
                           .post(authorizeUser, createUserCart);

export default router;