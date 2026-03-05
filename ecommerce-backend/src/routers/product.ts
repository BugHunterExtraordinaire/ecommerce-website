import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product";

const router = Router();

router.get('/query', getAllProducts);
router.get('/:productId', getProduct);

export default router;