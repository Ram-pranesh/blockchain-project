require('dotenv').config()
const User = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const path = require('path')
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'User-Registration/frontend')));

// to create user
const SignUp = async(req,res) =>{
    try{
        const {name , email ,password, confirmPassword} = req.body
        const existingUser = await User.findOne({email})

        if(existingUser) return res.status(400).json({success:false,message:'User already exists'})
        
            if(!(password === confirmPassword)) return res.status(400).json({success:true,message:"passwords does not match"})
        
        const hashedPassword = await bcrypt.hash(password,4) // hashing password 
        const user = await User.create({name, email, password:hashedPassword, confirmPassword:hashedPassword})

        const token = await jwt.sign({id:user._id , mail:user.email},process.env.SECRET_TOKEN,{expiresIn:'3h'})

        console.log(user)
        return res.redirect(303, '/landing.html'); // redirect to landing page after signup
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}
//confirm password
const confirmPassword = async(req,res)=>{
    const {password, confirmPassword} = await req.body
    if(password !== confirmPassword) return res.status(400).json({
        success:false , message:'Passwords does not match'
    })
    else res.status(200).json({success:true})
}

// to fetch all users in database #admin
const fetchAll = async(req,res)=>{
    try{
        const allUsers = await User.find({})
        if(allUsers.length === 0) {
            return res.status(200).json({
                success:true,
                message:"The database currently contains no user entries.",
                user:[]
            })            
        }
        return res.status(200).json({
            success:true,
            users:allUsers
        })
    } catch(err){
        console.error(err)
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}
//login user
const login = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        
        if(!user) return res.status(400).json({
            success:false,
            message:'User mail does not exists'
        })

        const verify = await bcrypt.compare(password,user.password)
        const token = jwt.sign({id:user._id,mail:user.email},process.env.SECRET_TOKEN,{expiresIn:'3h'})
        if(verify){

            res.redirect(303,'/landing.html')

            return res.status(200).json({
                success:true,
                message : 'Login Succesful',
                token,user
            })
        }
        else return res.status(401).json({
            success:false,
            message:'Invalid Password'
        })

    } catch(err){
        return res.status(500).json({
            success:false,
            error:err.message
        })
    }
}

// to fetch by email #admin
const fetchByEmail = async(req,res)=>{
    const mail = req.body.email
    const user = await User.findOne({mail})
    
    if(!user) return res.status(400).json({success:false,message:"user does not exists"})
    
    try{
        console.log(mail)
        return res.status(200)
    } catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}
//to logout user
// const logout = async(req,res)=>{
//     try{
//         const mail = User.findOne({email})

//         return res.status(200).json({success:true,message:'user logged out successfully'})
//     } catch(err){
//         return res.status(500).json({success:false,error:err.message})
//     }
// }
//change password
const changePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user.id)
    if(!user) return res.status(400).json({success:false,message:'User Not Found'})
    try{
        const match = await bcrypt.compare(oldPassword,user.password)
        if(!match) return res.status(400).json({success:false,message:'Password is Incorrect'})

        const hashedNewPassword = await bcrypt.hash(newPassword,4)
        user.password = hashedNewPassword
        await user.save()

        return res.status(200).json({success:true,message:'Password Changed Succesfully'})

    } catch(err){
        return res.status(500).json({success:false,error:err.message})
    }
}


module.exports = {SignUp, fetchAll, login, fetchByEmail, changePassword}