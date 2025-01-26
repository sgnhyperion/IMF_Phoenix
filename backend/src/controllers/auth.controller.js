import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({ message:"Password must be at least 6 characters long" })
        } 

        const existingUser = await User.findOne({ where: { email } });

        if(existingUser){
            return res.status(400).json({message: "Email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if(newUser){
            generateToken(newUser.id, res);

            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            });
        } else {
            res.status(400).json({message: "Invalid user data"})
        }

    } catch (err) {
        console.log("Error in signup controller ", err.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        if(!user){
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message: "Invalid credentials"})
        }

        generateToken(user.id, res);

        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.log("Error in login controller ", error.message);
        return res.status(500).json({message: "Internal server error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({message: "Logout successful"})
    } catch (error) {
        console.log("Error in logout controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}