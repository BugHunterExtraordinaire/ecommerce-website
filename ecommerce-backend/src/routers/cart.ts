import { Router } from "express";
import { getUserCart, deleteUserCart, updateUserCart } from "../controllers/cart";

const router = Router();

router.route('/:userId').get(getUserCart)
                        .delete(deleteUserCart);;
router.patch('/:userId/:productId/update', updateUserCart);

export default router;