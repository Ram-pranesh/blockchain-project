const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/userModels");
const router = require("./routes/UserRoute");
const app = express();
app.use(express.json());
app.use("/api/v1/users",router);

const port = 5000;
mongoose.connect("")
.then(()=> {
    console.log("DB is connected");
    app.listen(port,() => {console.log(`app is listening to the port : ${port}`);})
})
.catch((error) => {
    console.log(error);
})