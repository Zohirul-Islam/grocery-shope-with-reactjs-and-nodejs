import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
// register:/api/user/register
export const register = async(req,res) => {
   try {
       const { name, email, password } = req.body;
       if (!name || !email || !password) {
           return res.json({success:false,message:"All fields are required !"})
       }
       const existingUser = await User.findOne({ email });
       if (existingUser) {
           return res.json({success:false,message:"User already exists !"})
       }
       const hashPassword = await bcrypt.hash(password, 10);
       const user = await User.create({ name, email, password: hashPassword });
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
       res.cookie("token", token, {
           httpOnly: true ,//preventjs to access cookie
           secure: process.env.NODE_ENV === 'production',// use secure cookie in production
           sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",// CSRF protection
           maxAge:7*24*60*60*1000 // cookie expiration time
       })
       return res.json({success:true,message:"Registration successfull",user:{name:user.name,email:user.email}})
   } catch (error) {
       console.log(error.message);
         res.json({success:false,message:error.message})
   } 
}
// register:/api/user/login
export const login = async(req,res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({success:false,message:"The field is required !"})
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({success:false,message:"user not found yet !"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success:false,message:"wrong password !"})
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
       res.cookie("token", token, {
           httpOnly: true ,//preventjs to access cookie
           secure: process.env.NODE_ENV === 'production',// use secure cookie in production
           sameSite: process.env.NODE_ENV === 'production' ? "none" : "strict",// CSRF protection
           maxAge:7*24*60*60*1000 // cookie expiration time
       })
       return res.json({success:true,message:"login successfull",user:{name:user.name,email:user.email}})

    } catch (error) {
        console.log(error.message);
         res.json({success:false,message:error.message})
    }
}
// check auth:/api/user/is-auth
// this is protected route
export const isAuth = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).select("-password");

        return res.json({
            success: true,
            message: "authenticated user",
            user
        });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// logout user:/api/user/logout
export const logout = async (req,res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.json({success:true,message:"Successfully logout"})
    } catch (error) {
        console.log(error.message);
         res.json({success:false,message:error.message})
    }
}