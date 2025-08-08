const express = require('express')
const router = express.Router()
const app = express()
const jwt = require('jsonwebtoken')
require('dotenv').config()

app.use(express.json())

const {SignUp, fetchAll, login, fetchByEmail, changePassword} = require('../controller/userController')

router.post('/signup' ,SignUp) 
router.get('/',fetchAll)

router.get('/email/:email',fetchByEmail)
router.put('/change-password',changePassword)

router.post('/login',login)

//router.delete('/logout',logout)

module.exports = router
