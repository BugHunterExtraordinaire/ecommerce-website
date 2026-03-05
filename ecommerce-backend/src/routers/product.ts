import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product";
import { authorizeUser } from "../middleware/authorize";

const router = Router();

router.get('/query', authorizeUser, getAllProducts);
router.get('/:productId', authorizeUser, getProduct);

export default router;