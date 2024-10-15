import { User } from "../models/user.model.js";

export const createUser = async (req , res) => {
    try {
        console.log("Form submission received:", req.body);
        const { name , email , message  } = req.body;

        const user = new User({
            name,
            email,
            message
        });
        await user.save();
        return res.status(201).json({ message : "Submitted successfully"});
    } catch (error) {
        console.error("Error in form submission:", error); 
        return res.status(500).json({ error : 'Failed to submit form!'});
    }
};