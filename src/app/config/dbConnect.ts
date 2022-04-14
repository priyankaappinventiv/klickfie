import mongoose from "mongoose";
import { DBURL } from "../constant/constant";

const url: string = String(DBURL.url);
mongoose.connect(url);

const dbConnection = mongoose.connection;
dbConnection.on("error", console.error.bind(console, "connection error:"));

dbConnection.once("open", function () {
  console.log("Connection Successful!");
});

export default dbConnection;
