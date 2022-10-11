import { Sequelize } from "sequelize";
import db from "../config/Database.js"

const {DataTypes} = Sequelize;

const Transaction = db.define('transaction',{
    productname: DataTypes.STRING,
    price: DataTypes.STRING
},{
    freezeTableName: true
})

export default Transaction;

(async()=>{
    await db.sync();
})()