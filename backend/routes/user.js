const express = require("express");
const userRouter = express.Router();
const zod = require("zod");
const {User, Account} = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const argon2  = require("argon2");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(8),
})

userRouter.post("/signup",async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);
    if(!success){
        return res.status(411).json(
            {
                message:"Email already taken / Incorrect inputs"
            }
        )
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if(existingUser){
        return res.status(411).json(
            {
                message:"Email already taken / Incorrect inputs"
            }
        )
    }
    const newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    var hashedPassword = await newUser.createHash(req.body.password);
    newUser.password = hashedPassword;
    await newUser.save();

    const userId = newUser._id;

    await Account.create({
        userId,
        balance:1+Math.random()*10000
    })
    const token = jwt.sign({userId},JWT_SECRET);
    return res.status(200).json(
        {
            message:"User created successfully",
            token
        }
    )
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

userRouter.post('/signin', async(req,res)=>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(411).json(
            {
                message: "Error while logging in"
            }
        )
    }
    const existingUser = await User.findOne({
        username:req.body.username
    })

    if (existingUser) {
        
        if (await existingUser.validatePassword(req.body.password)) {
            const token = jwt.sign({
                userId: existingUser._id
            }, JWT_SECRET);
          return res.status(200).json({
            token: token,
            message: "User Successfully Logged In",
          });
        } else {
          return res.status(400).json({
            message: "Incorrect Password",
          });
        }
    }
})

const updateBody=zod.object({
    password:zod.string().min(8).optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

userRouter.put('/',authMiddleware, async(req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Error while updating information"
        })
    }
    var hashedPassword = await argon2.hash(req.body.password)
    await User.updateOne({
        _id:req.userId
    },{
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:hashedPassword
    });
    
    res.status(200).json({
        message:"Updated successfully"
    })
})

userRouter.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[
            {firstName: {"$regex": filter}},
            {lastName: {"$regex": filter}}
        ]
    })

    res.json({
        user: users.map((u)=>{
            return {
                username:u.username,
                firstName:u.firstName,
                lastName:u.lastName,
                _id:u._id,
            }
        })
    })
})

userRouter.get('/dashboard',authMiddleware, async(req,res)=>{
    const user = await User.findById(req.userId);
    const char = user.firstName[0];
    return res.status(200).json({name:char})
})
module.exports = {userRouter}