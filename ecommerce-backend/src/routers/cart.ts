import { Router } from "express";
import { 
  getUserCart, 
  deleteUserCart, 
  updateUserCart, 
  createUserCart 
} from "../controllers/cart";
import { authorizeUser } from "../middleware/authorize";

const router = Router();

router.route('/:userId').get(authorizeUser, getUserCart)
                        .post(authorizeUser, createUserCart)
                        .delete(authorizeUser, deleteUserCart);
router.patch('/:userId/:productId/update', authorizeUser, updateUserCart);

export default router;