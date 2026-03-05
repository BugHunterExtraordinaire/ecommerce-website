import { Router } from "express";

const router = Router();

router.route('/:userId').get(getUserCart)
                        .delete(deleteUserCart);;
router.patch('/:userId/:productId/update', updateUserCart);

export default router;