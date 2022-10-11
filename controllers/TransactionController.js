import Transaction from "../models/TransactionModel.js";
import path from "path";

export const getTransaction = async(req, res) => {
    try {
        const response = await Transaction.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTransactionById = async(req, res) => {
    try {
        const response = await Transaction.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveTransaction = async(req, res) => {

    const productname = req.body.productname;
    const price = req.body.price

    try {
        await Transaction.create({
            productname: productname,
            price: price
        })
        res.status(201).json({msg: "Transaction created successfully"})
    } catch (error) {
        console.log(error.message);
    }
}

