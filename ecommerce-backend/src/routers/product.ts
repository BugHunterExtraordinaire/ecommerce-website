import { Router } from "express";

const router = Router();

router.get('/query', getAllProducts);
router.get('/:productId', getProduct);

export default router;