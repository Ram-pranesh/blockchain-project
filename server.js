require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const user = require("./User-Registration/backend/models/userModels");
const router = require("./User-Registration/backend/routes/UserRoute");
const app = express();
app.use(express.json());
app.use("/api/v1/users",router);

const PORT=process.env.PORT;
const MONGO_URI=process.env.MONGO_URI_ConnectionString

mongoose.connect(MONGO_URI)
.then(()=> {
    console.log("DB is connected");
    app.listen(PORT,() => {console.log(`app is listening to the port : ${PORT}`);})
})
.catch((error) => {
    console.error('DB connection failed : ' ,error);
    process.exit(1)
})