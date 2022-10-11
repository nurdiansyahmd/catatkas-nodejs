import Stock from "../models/StockModels.js";
import { Op } from "sequelize";

export const stockSearch = async(req, res) => {
    //Query parameter
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Stock.count({
        where:{
            [Op.or]: [{productname:{
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows/limit);
    const result = await Stock.findAll({
        where:{
            [Op.or]: [{productname:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id','DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
}