import express from "express";
import {
    getStocks,
    getStockById,
    saveStock,
    updateStock,
    deleteStock
} from "../controllers/StockController.js";

const router = express.Router();

router.get('/stocks', getStocks);
router.get('/stocks/:id', getStockById);
router.post('/stocks', saveStock);
router.patch('/stocks/:id', updateStock);
router.delete('/stocks/:id', deleteStock);

export default router;