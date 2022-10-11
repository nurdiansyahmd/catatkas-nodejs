import express from "express";
import { 
    getTransaction, 
    getTransactionById, 
    saveTransaction
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get('/transaction', getTransaction);
router.get('/transaction/:id', getTransactionById);
router.post('/transaction/', saveTransaction);

export default router;
