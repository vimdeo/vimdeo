import { generateToken } from "../lib/ults.js";
import User from "../models/user.model.js"
import  bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    const{fullName,email,password} = req.body
    try{

        if(!fullName || !email || !password) {
            return res.status(400).json({messade : " All fields are required "});
        }

        
        if (password.length <6 ){
            return res.status(400).json({messade : " Password must be atlest 6 characters"});
        }

        const user = await User.findOne({email})
    
        if (user) return res.status(400).json({message : "Email already exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User ({
            fullName,
            email,
            password:hashedpassword,

        })

        if(newUser) {
            // generate nwe token
            generateToken(newUser._id,res)
            await newUser.save();

            res.stsus(201).json({
                _id: newUser._id,
                fillName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });

        } else {
            res.status(400).json({message : "Invaild user data"});
        }


    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error"});

    }
    
};


export const login = (req, res) => {
    res.send("login route");
};


export const logout = (req, res) => {
    res.send("logout route");
};
