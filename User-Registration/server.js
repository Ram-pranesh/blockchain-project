require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const user = require("./backend/models/userModels");
const router = require("./backend/routes/UserRoute");
const app = express();
app.use(express.json());
app.use("/api/v1/users",router);

const PORT = process.env.port;
const MONGO_URI = process.env.MONGO_URI_ConnectionString

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log("DB is connected");
    app.listen(PORT,() => {console.log(`app is listening to the port : ${PORT}`);})
})
.catch((error) => {
    console.log(error);
})