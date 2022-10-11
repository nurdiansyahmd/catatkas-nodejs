import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import StockRoute from "./routes/StockRoute.js";
import TransactionRoute from "./routes/TransactionRoute.js"

const app = new express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(StockRoute);
app.use(TransactionRoute)

app.listen(5000, ()=>console.log("server up and running ..."));