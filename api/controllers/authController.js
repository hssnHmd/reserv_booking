import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import { createError } from "../utils.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    
    try {
        // const salt = bcrypt.genSaltSync(10);
        // bcrypt.genSalt(10, function(err, salt) {
        //     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
        //         // Store hash in your password DB.
        //     });
        // });
        // const hash = bcrypt.hashSync(req.body.password, salt);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });
        
        await newUser.save()
        res.status(200).send("new user created successfully")
    } catch (error) {
        next(error)
    }
}

// Login

export const login = async (req, res, next) => {
    
    try {
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(createError(404, "user not Found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400, "wrong password Or username !"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);

        const {password, isAdmin, ...rest} = user._doc
        res
            .cookie("access_token", token, {httpOnly:true})
            .status(200).json({details:{...rest}, isAdmin})
    } catch (error) {
        next(error)
    }
}