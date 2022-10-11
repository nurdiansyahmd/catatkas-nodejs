import Stock from "../models/StockModels.js";
import path from "path";
import fs from "fs";


export const getStocks = async(req, res)=>{
    try {
        const response = await Stock.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getStockById = async(req, res)=>{
    try {
        const response = await Stock.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const saveStock = async(req, res)=>{
    if(req.files === null) return res.status(400).json({msg:"No data found!"});
    
    const productname = req.body.productname;
    const sellprice = req.body.sellprice;
    const quantity = req.body.quantity;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = [".png",".jpg",".jpeg"];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(402).json({msg:"Invalid image"});
    if(fileSize > 5000000) return res.status(402).json({msg:"Image must be less than 5mb"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message});

        try {
            await Stock.create({
                productname: productname,
                sellprice: sellprice,
                quantity: quantity,
                image: fileName,
                url: url
            });
            res.status(201).json({msg:"Stock created successfully"});
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const updateStock = async(req, res)=>{
    const stock = await Stock.findOne({
        where:{
            id: req.params.id
        }
    });

    if(!stock) return res.status(404).json({msg:"No data found!"});

    let fileName = "";

    if(req.files === null){
        fileName = stock.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png",".jpg",".jpeg"];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"invalid image"});
        if(fileSize > 5000000) return res.status(422).json({msg:"image must be less than 5mb"});

        const filePath = `./public/images/${stock.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg:err.message});
        });
    }

    const productname = req.body.productname;
    const sellprice = req.body.sellprice;
    const quantity = req.body.quantity;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

    try {
        await Stock.update({
            productname: productname,
            sellprice: sellprice,
            quantity: quantity,
            image: fileName,
            url: url
        },{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Stock updated successfully"});
    } catch (error) {
        console.log(error.message);
    }

}

export const deleteStock = async(req, res)=>{
    const stock = await Stock.findOne({
        where:{
            id: req.params.id
        }
    });

    if(!stock) return res.status(404).json({msg:"No data found"});

    try {
        const filePath = `./public/images/${stock.image}`;
        fs.unlinkSync(filePath);

        await Stock.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Stock deleted successfully"});
    } catch (error) {
        console.log(error.message);
    }
}