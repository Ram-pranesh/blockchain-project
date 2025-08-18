require('dotenv').config()

const express = require("express")
const mongoose = require("mongoose")
const router = require("./User-Registration/backend/routes/UserRoute")
const path = require("path")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));
// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "User-Registration/frontend"))) // can access frontend files directly without specifying the routes

// API routes
app.use("/api/v1/users", router) // API route for user operations

// Default route to serve the login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "User-Registration/frontend/login.html")) // Serve the login page as the default route
});

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI_ConnectionString

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("DB is connected")
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("DB connection failed: ", error)
        process.exit(1)
    })