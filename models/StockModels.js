import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Stock = db.define('stock',{
    productname: DataTypes.STRING,
    sellprice: DataTypes.STRING,
    quantity: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
},{
    freezeTableName: true
})

export default Stock;

(async()=>{
    await db.sync();
})();